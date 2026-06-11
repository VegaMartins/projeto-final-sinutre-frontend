export type MealCategory = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface FoodItem {
  id: number;
  foodId: number;

  name: string;
  grams: number;

  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export interface Meal {
  id: number;
  date: string;
  category: MealCategory;
  calories: number;
  items?: FoodItem[];
}

export interface MacroSummary {
  carbs: number;
  proteins: number;
  fats: number;
  calories: number;
  caloriesGoal: number;
}

export interface MealsSummary {
  total: number;
  thisMonth: number;
  today: number;
}
