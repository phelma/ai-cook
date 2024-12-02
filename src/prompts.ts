export const MEAL_IDEAS_PROMPT = (protein: string, carb: string, veg: string) =>
  `Generate 5 meal ideas using these ingredients: ${protein}, ${carb}, and ${veg}. Only output the meal names, with no numbers, separated by newlines, include the ingredient names in the meal name where appropriate.`

export const RECIPE_PROMPT = ({
  mealName = '',
  protein = '',
  carb = '',
  veg = '',
  equipment = [],
  allergies = [],
  dietPreferences = [],
  servings = 4,
  locale = 'UK',
  additionalRequirements = '',
}: {
  mealName: string
  protein: string
  carb: string
  veg: string
  equipment: string[]
  allergies: string[]
  dietPreferences: string[]
  servings: number
  locale: string
  additionalRequirements: string
}) => /* xml */ `<instructions>
Generate a detailed recipe for the mea using the main ingredients. The recipe should be easy to follow and should include the following:
  1. A list of all ingredients with quantities
  2. Step by step cooking instructions
  3. Use any of the available equipment.
  4. Don't include ingreditends containing any of the allergens.
  5. Make sure the recipe obeys the diet preferences.
  6. Use units appropriate for the locale country.
  7. Obey any additional requirements.
  8. The recipe should be suitable for the locale.
</instructions>

<meal>
${mealName}
</meal>

<main-ingredients>
${protein},
${carb},
${veg}
</main-ingredients>

<equipment>
${equipment.join('\n')}
</equipment>

<allergens>
${allergies.join('\n')}
</allergens>

<diet-preferences>
${dietPreferences.join('\n')}
</diet-preferences>

<servings>
${servings}
</servings>

<locale>
${locale}
</locale>

<additional-requirements>
${additionalRequirements}
</additional-requirements>

<formatting>
Format the output with clear sections for ingredients and instructions.
Use markdown formatting for the recipe.
</formatting>
`
