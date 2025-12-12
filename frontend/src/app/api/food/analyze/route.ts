// app/api/food/analyze/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users, dailyNutrition } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Groq } from "groq-sdk";
import { getFoodData } from "@/lib/foodCalories";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface AnalysisResult {
  recommendation: "recommended" | "moderate" | "not_recommended";
  pros: string[];
  cons: string[];
  summary: string;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    if (!user || user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = user[0];

    // Validate required nutritional data
    if (
      userData.dailyCalories === null ||
      userData.dailyProtein === null ||
      userData.dailyCarbs === null ||
      userData.dailyFat === null
    ) {
      return NextResponse.json(
        { error: "User nutritional profile is incomplete" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { foodName } = body;

    if (!foodName) {
      return NextResponse.json({ error: "Food name is required" }, { status: 400 });
    }

    // Get today's consumption
    const today = new Date().toISOString().split("T")[0];
    const todayNutrition = await db
      .select()
      .from(dailyNutrition)
      .where(
        and(
          eq(dailyNutrition.userId, userData.id),
          eq(dailyNutrition.date, today)
        )
      )
      .limit(1);

    const currentConsumption = todayNutrition[0] || {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      mealsCount: 0,
    };

    // Calculate remaining allowances
    const remainingCalories = userData.dailyCalories - currentConsumption.totalCalories;
    const remainingProtein = userData.dailyProtein - currentConsumption.totalProtein;
    const remainingCarbs = userData.dailyCarbs - currentConsumption.totalCarbs;
    const remainingFat = userData.dailyFat - currentConsumption.totalFat;

    // Get food nutritional data
    const foodData = getFoodData(foodName);

    // Calculate percentages
    const caloriesPercentage = ((currentConsumption.totalCalories / userData.dailyCalories) * 100).toFixed(1);
    const proteinPercentage = ((currentConsumption.totalProtein / userData.dailyProtein) * 100).toFixed(1);
    const carbsPercentage = ((currentConsumption.totalCarbs / userData.dailyCarbs) * 100).toFixed(1);
    const fatPercentage = ((currentConsumption.totalFat / userData.dailyFat) * 100).toFixed(1);

    // Calculate what percentage this food will add
    const foodCaloriesPercentage = ((foodData.calories / userData.dailyCalories) * 100).toFixed(1);
    const foodProteinPercentage = ((foodData.protein / userData.dailyProtein) * 100).toFixed(1);
    const foodCarbsPercentage = ((foodData.carbs / userData.dailyCarbs) * 100).toFixed(1);
    const foodFatPercentage = ((foodData.fat / userData.dailyFat) * 100).toFixed(1);

    const prompt = `You are a nutritionist AI assistant speaking directly to the user. Analyze if this food is suitable for them based on their profile, nutritional needs, and MOST IMPORTANTLY their TODAY'S CONSUMPTION.

USER PROFILE:
- Age: ${userData.age} years
- Gender: ${userData.gender}
- Height: ${userData.height} cm
- Weight: ${userData.weight} kg
- BMI: ${userData.bmi}
- Medical Condition: ${userData.medicalCondition || "None"}

DAILY NUTRITIONAL TARGETS:
- Calories: ${userData.dailyCalories} kcal
- Protein: ${userData.dailyProtein}g
- Carbs: ${userData.dailyCarbs}g
- Fat: ${userData.dailyFat}g

⚠️ TODAY'S CONSUMPTION SO FAR (${currentConsumption.mealsCount} meals):
- Calories: ${currentConsumption.totalCalories.toFixed(0)} kcal (${caloriesPercentage}% of daily target)
- Protein: ${currentConsumption.totalProtein.toFixed(1)}g (${proteinPercentage}% of daily target)
- Carbs: ${currentConsumption.totalCarbs.toFixed(1)}g (${carbsPercentage}% of daily target)
- Fat: ${currentConsumption.totalFat.toFixed(1)}g (${fatPercentage}% of daily target)

REMAINING ALLOWANCE FOR TODAY:
- Calories: ${remainingCalories.toFixed(0)} kcal (${(100 - parseFloat(caloriesPercentage)).toFixed(1)}% remaining)
- Protein: ${remainingProtein.toFixed(1)}g (${(100 - parseFloat(proteinPercentage)).toFixed(1)}% remaining)
- Carbs: ${remainingCarbs.toFixed(1)}g (${(100 - parseFloat(carbsPercentage)).toFixed(1)}% remaining)
- Fat: ${remainingFat.toFixed(1)}g (${(100 - parseFloat(fatPercentage)).toFixed(1)}% remaining)

FOOD TO ANALYZE: ${foodName}
NUTRITIONAL CONTENT (per serving):
- Calories: ${foodData.calories} kcal (${foodCaloriesPercentage}% of daily target)
- Protein: ${foodData.protein}g (${foodProteinPercentage}% of daily target)
- Carbs: ${foodData.carbs}g (${foodCarbsPercentage}% of daily target)
- Fat: ${foodData.fat}g (${foodFatPercentage}% of daily target)

AFTER EATING THIS FOOD, TOTALS WOULD BE:
- Calories: ${(currentConsumption.totalCalories + foodData.calories).toFixed(0)} kcal (${((currentConsumption.totalCalories + foodData.calories) / userData.dailyCalories * 100).toFixed(1)}% of target)
- Protein: ${(currentConsumption.totalProtein + foodData.protein).toFixed(1)}g (${((currentConsumption.totalProtein + foodData.protein) / userData.dailyProtein * 100).toFixed(1)}% of target)
- Carbs: ${(currentConsumption.totalCarbs + foodData.carbs).toFixed(1)}g (${((currentConsumption.totalCarbs + foodData.carbs) / userData.dailyCarbs * 100).toFixed(1)}% of target)
- Fat: ${(currentConsumption.totalFat + foodData.fat).toFixed(1)}g (${((currentConsumption.totalFat + foodData.fat) / userData.dailyFat * 100).toFixed(1)}% of target)

🎯 CRITICAL ANALYSIS REQUIREMENTS:
1. If eating this food would exceed ANY daily limit (>100%), strongly consider "not_recommended"
2. If the user has already consumed >80% of any nutrient, be cautious about high amounts of that nutrient
3. If the user has consumed <50% of daily needs and this food helps, favor "recommended"
4. Consider if this food fits within their remaining allowance
5. Account for medical conditions
6. Consider meal timing (if they've had ${currentConsumption.mealsCount} meals already)

IMPORTANT: Write in second person (use "you", "your") as you are speaking directly to the user. DO NOT use "the user" or "their" - always use "you" and "your".

Provide response in this JSON format ONLY:
{
  "recommendation": "recommended" | "moderate" | "not_recommended",
  "pros": ["pro1", "pro2", "pro3"],
  "cons": ["con1", "con2", "con3"],
  "summary": "A brief 2-3 sentence summary that EXPLICITLY mentions YOUR current consumption and remaining allowance, speaking directly to YOU"
}

Be specific about how this food impacts YOUR remaining daily allowance. If it would push YOU over limits, clearly state this.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_completion_tokens: 1000,
      top_p: 1,
      stream: false,
    });

    const response = chatCompletion.choices[0]?.message?.content || "";
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const analysis: AnalysisResult = JSON.parse(jsonMatch[0]);

    if (!analysis.recommendation || !analysis.pros || !analysis.cons || !analysis.summary) {
      throw new Error("Incomplete analysis received");
    }

    return NextResponse.json({
      success: true,
      foodName,
      nutritionalData: foodData,
      analysis: {
        recommendation: analysis.recommendation,
        pros: analysis.pros,
        cons: analysis.cons,
        summary: analysis.summary,
      },
      userProfile: {
        dailyCalories: userData.dailyCalories,
        dailyProtein: userData.dailyProtein,
        dailyCarbs: userData.dailyCarbs,
        dailyFat: userData.dailyFat,
      },
      currentConsumption: {
        totalCalories: currentConsumption.totalCalories,
        totalProtein: currentConsumption.totalProtein,
        totalCarbs: currentConsumption.totalCarbs,
        totalFat: currentConsumption.totalFat,
        mealsCount: currentConsumption.mealsCount,
      },
      afterConsumption: {
        totalCalories: currentConsumption.totalCalories + foodData.calories,
        totalProtein: currentConsumption.totalProtein + foodData.protein,
        totalCarbs: currentConsumption.totalCarbs + foodData.carbs,
        totalFat: currentConsumption.totalFat + foodData.fat,
      },
    });
  } catch (error) {
    console.error("Food analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze food" }, { status: 500 });
  }
}