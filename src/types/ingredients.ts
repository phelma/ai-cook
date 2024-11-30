export type IngredientType = 'protein' | 'carbs' | 'veggies';

export interface Ingredient {
  id: string;
  name: string;
  type: IngredientType;
}

export interface UserPreferences {
  allergies: string[];
  dietaryPreferences: string[];
  equipment: string[];
  servings: number;
  unitPreference: 'metric' | 'imperial';
}
