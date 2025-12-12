// app/api/user/profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user data
    const user = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        age: users.age,
        height: users.height,
        weight: users.weight,
        gender: users.gender,
        medicalCondition: users.medicalCondition,
        dailyCalories: users.dailyCalories,
        dailyProtein: users.dailyProtein,
        dailyCarbs: users.dailyCarbs,
        dailyFat: users.dailyFat,
        bmi: users.bmi,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    if (!user || user.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: user[0],
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}