export const MEAL_IDEAS_PROMPT = (protein: string, carb: string, veg: string) =>
  `Generate 5 meal ideas using these ingredients: ${protein}, ${carb}, and ${veg}. Only output the meal names, with no numbers, separated by newlines, include the ingredient names in the meal name where appropriate.`

export const RECIPE_PROMPT = (mealName: string, protein: string, carb: string, veg: string) =>
  `Generate a detailed recipe for "${mealName}" using ${protein}, ${carb}, and ${veg} as the main ingredients. Include:
  1. A list of all ingredients with quantities
  2. Step by step cooking instructions
  Format the output with clear sections for ingredients and instructions.`
