import { pgTable, serial, text, varchar, integer, timestamp, real, boolean, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  age: integer("age").notNull(),
  height: integer("height").notNull(), // in cm
  weight: integer("weight").notNull(), // in kg
  gender: varchar("gender", { length: 20 }).notNull(),
  medicalCondition: text("medical_condition"),
  // Nutritional requirements
  dailyCalories: real("daily_calories"),
  dailyProtein: real("daily_protein"), // in grams
  dailyCarbs: real("daily_carbs"), // in grams
  dailyFat: real("daily_fat"), // in grams
  bmi: real("bmi"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const foodLogs = pgTable("food_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  foodName: varchar("food_name", { length: 255 }).notNull(),
  calories: real("calories").notNull(),
  protein: real("protein").notNull(), // in grams
  carbs: real("carbs").notNull(), // in grams
  fat: real("fat").notNull(), // in grams
  // AI Analysis
  aiAnalysis: text("ai_analysis"), // Full AI response
  recommendation: varchar("recommendation", { length: 50 }), // "recommended", "moderate", "not_recommended"
  pros: text("pros"), // JSON array of pros
  cons: text("cons"), // JSON array of cons
  // Metadata
  imageUrl: text("image_url"), // Store image URL if needed
  consumedAt: timestamp("consumed_at").defaultNow().notNull(),
  date: date("date").notNull(), // For daily tracking
});

export const dailyNutrition = pgTable("daily_nutrition", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  totalCalories: real("total_calories").default(0).notNull(),
  totalProtein: real("total_protein").default(0).notNull(),
  totalCarbs: real("total_carbs").default(0).notNull(),
  totalFat: real("total_fat").default(0).notNull(),
  mealsCount: integer("meals_count").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
