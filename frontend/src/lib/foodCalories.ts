// src/lib/foodCalories.ts
export interface FoodData {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}

export const foodDatabase: Record<string, FoodData> = {
  "Biriyani": { calories: 480, protein: 15, carbs: 65, fat: 16 },
  "Cake": { calories: 320, protein: 4, carbs: 48, fat: 13 },
  "Cha": { calories: 100, protein: 1, carbs: 20, fat: 2 },
  "Chicken_curry": { calories: 300, protein: 22, carbs: 12, fat: 18 },
  "Chicken_wings": { calories: 100, protein: 10, carbs: 0, fat: 7 },
  "Chocolate_cake": { calories: 350, protein: 5, carbs: 48, fat: 17 },
  "Chow_mein": { calories: 350, protein: 12, carbs: 45, fat: 12 },
  "Crab_Dish_Kakra": { calories: 250, protein: 28, carbs: 8, fat: 12 },
  "Doi": { calories: 150, protein: 8, carbs: 18, fat: 6 },
  "Fish_Bhuna_Mach_Bhuna": { calories: 250, protein: 25, carbs: 6, fat: 14 },
  "French_fries": { calories: 365, protein: 4, carbs: 48, fat: 17 },
  "Fried_fish_Mach_Bhaja": { calories: 300, protein: 24, carbs: 12, fat: 18 },
  "Fried_rice": { calories: 400, protein: 10, carbs: 55, fat: 14 },
  "Khichuri": { calories: 280, protein: 12, carbs: 45, fat: 6 },
  "Meat_Curry_Gosht_Bhuna": { calories: 380, protein: 28, carbs: 10, fat: 26 },
  "Misti": { calories: 120, protein: 2, carbs: 26, fat: 2 },
  "Momos": { calories: 45, protein: 2, carbs: 7, fat: 1 },
  "Salad": { calories: 80, protein: 3, carbs: 15, fat: 1 },
  "Sandwich": { calories: 250, protein: 10, carbs: 35, fat: 8 },
  "Shik_kabab": { calories: 180, protein: 18, carbs: 3, fat: 11 },
  "Singgara": { calories: 140, protein: 3, carbs: 18, fat: 6 },
  "bakorkhani": { calories: 200, protein: 5, carbs: 35, fat: 5 },
  "cheesecake": { calories: 350, protein: 6, carbs: 35, fat: 20 },
  "cup_cakes": { calories: 200, protein: 2, carbs: 30, fat: 8 },
  "fuchka": { calories: 40, protein: 1, carbs: 8, fat: 1 },
  "haleem": { calories: 350, protein: 22, carbs: 30, fat: 16 },
  "ice_cream": { calories: 210, protein: 4, carbs: 24, fat: 11 },
  "jilapi": { calories: 150, protein: 1, carbs: 35, fat: 2 },
  "nehari": { calories: 400, protein: 24, carbs: 12, fat: 28 },
  "pakora": { calories: 75, protein: 2, carbs: 10, fat: 3 },
  "pizza": { calories: 285, protein: 12, carbs: 36, fat: 11 },
  "poached_egg": { calories: 70, protein: 6, carbs: 0.4, fat: 5 },
  "porota": { calories: 180, protein: 4, carbs: 25, fat: 7 },
};

export function getFoodData(foodName: string): FoodData {
  // Try exact match first
  if (foodDatabase[foodName]) {
    return foodDatabase[foodName];
  }
  
  // Try case-insensitive match
  const lowerFoodName = foodName.toLowerCase();
  for (const [key, value] of Object.entries(foodDatabase)) {
    if (key.toLowerCase() === lowerFoodName) {
      return value;
    }
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(foodDatabase)) {
    if (key.toLowerCase().includes(lowerFoodName) || lowerFoodName.includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // Default values if not found (estimated based on typical food)
  return {
    calories: 200,
    protein: 8,
    carbs: 30,
    fat: 6
  };
}

// Backward compatibility
export function getCalories(foodName: string): number {
  return getFoodData(foodName).calories;
}

// Legacy export for backward compatibility
export const foodCalories: Record<string, number> = Object.entries(foodDatabase).reduce((acc, [key, value]) => {
  acc[key] = value.calories;
  return acc;
}, {} as Record<string, number>);