// app/api/food/log/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users, foodLogs, dailyNutrition } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    if (!user || user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user[0].id;

    // Get request body
    const body = await request.json();
    const {
      foodName,
      calories,
      protein,
      carbs,
      fat,
      recommendation,
      pros,
      cons,
      aiAnalysis,
      imageUrl,
    } = body;

    // Validate required fields
    if (!foodName || !calories || !protein || !carbs || !fat) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const today = new Date().toISOString().split("T")[0];

    // Insert food log
    const newFoodLog = await db
      .insert(foodLogs)
      .values({
        userId,
        foodName,
        calories: parseFloat(calories),
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        recommendation: recommendation || "moderate",
        pros: JSON.stringify(pros || []),
        cons: JSON.stringify(cons || []),
        aiAnalysis: aiAnalysis || null,
        imageUrl: imageUrl || null,
        date: today,
      })
      .returning();

    // Update or create daily nutrition
    const existingDailyNutrition = await db
      .select()
      .from(dailyNutrition)
      .where(
        and(
          eq(dailyNutrition.userId, userId),
          eq(dailyNutrition.date, today)
        )
      )
      .limit(1);

    if (existingDailyNutrition.length > 0) {
      // Update existing record
      await db
        .update(dailyNutrition)
        .set({
          totalCalories: existingDailyNutrition[0].totalCalories + parseFloat(calories),
          totalProtein: existingDailyNutrition[0].totalProtein + parseFloat(protein),
          totalCarbs: existingDailyNutrition[0].totalCarbs + parseFloat(carbs),
          totalFat: existingDailyNutrition[0].totalFat + parseFloat(fat),
          mealsCount: existingDailyNutrition[0].mealsCount + 1,
          updatedAt: new Date(),
        })
        .where(eq(dailyNutrition.id, existingDailyNutrition[0].id));
    } else {
      // Create new record
      await db.insert(dailyNutrition).values({
        userId,
        date: today,
        totalCalories: parseFloat(calories),
        totalProtein: parseFloat(protein),
        totalCarbs: parseFloat(carbs),
        totalFat: parseFloat(fat),
        mealsCount: 1,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Food logged successfully",
      foodLog: newFoodLog[0],
    });
  } catch (error) {
    console.error("Food logging error:", error);
    return NextResponse.json(
      { error: "Failed to log food" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    if (!user || user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user[0].id;
    const today = new Date().toISOString().split("T")[0];

    // Get today's nutrition
    const todayNutrition = await db
      .select()
      .from(dailyNutrition)
      .where(
        and(
          eq(dailyNutrition.userId, userId),
          eq(dailyNutrition.date, today)
        )
      )
      .limit(1);

    // Get today's food logs
    const todayFoodLogs = await db
      .select()
      .from(foodLogs)
      .where(
        and(
          eq(foodLogs.userId, userId),
          eq(foodLogs.date, today)
        )
      )
      .orderBy(foodLogs.consumedAt);

    return NextResponse.json({
      success: true,
      dailyNutrition: todayNutrition[0] || {
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        mealsCount: 0,
      },
      foodLogs: todayFoodLogs,
    });
  } catch (error) {
    console.error("Error fetching food logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch food logs" },
      { status: 500 }
    );
  }
}