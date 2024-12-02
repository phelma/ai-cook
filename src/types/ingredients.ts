export type IngredientType = 'protein' | 'carb' | 'veg'

export interface Ingredient {
  id: string
  name: string
  type: IngredientType
}

export interface UserPreferences {
  allergies: string[]
  dietaryPreferences: string[]
  equipment: string[]
  servings: number
  unitPreference: 'metric' | 'imperial'
}
