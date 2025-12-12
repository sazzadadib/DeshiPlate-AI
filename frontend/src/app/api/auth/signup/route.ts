import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Groq } from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface NutritionalData {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  bmi: number;
}

async function calculateNutritionalNeeds(
  age: number,
  height: number,
  weight: number,
  gender: string,
  medicalCondition?: string
): Promise<NutritionalData> {
  const prompt = `You are a nutritionist AI. Calculate the daily nutritional requirements for a person with the following details:
- Age: ${age} years
- Height: ${height} cm
- Weight: ${weight} kg
- Gender: ${gender}
${medicalCondition ? `- Medical Condition: ${medicalCondition}` : ""}

Please calculate and provide ONLY a JSON object with these exact fields (no additional text):
{
  "dailyCalories": <number>,
  "dailyProtein": <number in grams>,
  "dailyCarbs": <number in grams>,
  "dailyFat": <number in grams>,
  "bmi": <number>
}

Use standard formulas:
- BMI = weight(kg) / (height(m))^2
- Use Mifflin-St Jeor Equation for BMR and multiply by activity factor (1.2-1.9)
- Protein: 0.8-2.0g per kg body weight
- Carbs: 45-65% of total calories
- Fat: 20-35% of total calories

Consider the medical condition if provided. Return ONLY the JSON object, nothing else.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3, // Lower temperature for more consistent results
      max_completion_tokens: 500,
      top_p: 1,
      stream: false, // Disable streaming for easier JSON parsing
      stop: null,
    });

    const response = chatCompletion.choices[0]?.message?.content || "";
    
    // Extract JSON from response (in case there's any extra text)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse nutritional data from AI response");
    }

    const nutritionalData: NutritionalData = JSON.parse(jsonMatch[0]);

    // Validate the response has all required fields
    if (
      !nutritionalData.dailyCalories ||
      !nutritionalData.dailyProtein ||
      !nutritionalData.dailyCarbs ||
      !nutritionalData.dailyFat ||
      !nutritionalData.bmi
    ) {
      throw new Error("Incomplete nutritional data received");
    }

    return nutritionalData;
  } catch (error) {
    console.error("Error calculating nutritional needs:", error);
    // Fallback to basic calculations if API fails
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Basic BMR calculation (Mifflin-St Jeor)
    let bmr;
    if (gender.toLowerCase() === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    const dailyCalories = bmr * 1.5; // Moderate activity level
    const dailyProtein = weight * 1.2; // 1.2g per kg
    const dailyCarbs = (dailyCalories * 0.5) / 4; // 50% of calories, 4 cal/g
    const dailyFat = (dailyCalories * 0.25) / 9; // 25% of calories, 9 cal/g

    return {
      dailyCalories: Math.round(dailyCalories),
      dailyProtein: Math.round(dailyProtein),
      dailyCarbs: Math.round(dailyCarbs),
      dailyFat: Math.round(dailyFat),
      bmi: Math.round(bmi * 10) / 10,
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, age, height, weight, gender, medicalCondition } = body;

    // Validation
    if (!name || !email || !password || !age || !height || !weight || !gender) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Calculate nutritional needs using Groq AI
    const nutritionalData = await calculateNutritionalNeeds(
      parseInt(age),
      parseInt(height),
      parseInt(weight),
      gender,
      medicalCondition
    );

    // Create user with nutritional data
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        age: parseInt(age),
        height: parseInt(height),
        weight: parseInt(weight),
        gender,
        medicalCondition: medicalCondition || null,
        dailyCalories: nutritionalData.dailyCalories,
        dailyProtein: nutritionalData.dailyProtein,
        dailyCarbs: nutritionalData.dailyCarbs,
        dailyFat: nutritionalData.dailyFat,
        bmi: nutritionalData.bmi,
      })
      .returning();

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: newUser[0].id,
        nutritionalData: {
          dailyCalories: newUser[0].dailyCalories,
          dailyProtein: newUser[0].dailyProtein,
          dailyCarbs: newUser[0].dailyCarbs,
          dailyFat: newUser[0].dailyFat,
          bmi: newUser[0].bmi,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}