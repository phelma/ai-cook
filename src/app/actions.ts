'use server'

import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { MEAL_IDEAS_PROMPT, RECIPE_PROMPT } from '../prompts'
import { useIngredientsStore } from '../store/use-ingredients-store'

export async function getMealIdeas({
  protein,
  carb,
  veg,
}: {
  protein: string
  carb: string
  veg: string
}) {
  const prompt = MEAL_IDEAS_PROMPT(protein, carb, veg)
  const { text, finishReason, usage } = await generateText({
    model: anthropic('claude-3-5-haiku-latest'),
    prompt,
  })

  return { text, finishReason, usage }
}

export async function getRecipe({
  mealName,
  protein,
  carb,
  veg,
  equipment,
  allergies,
  dietPreferences,
  servings,
  units,
  additionalRequirements,
}: {
  mealName: string
  protein: string
  carb: string
  veg: string
  equipment: string[]
  allergies: string[]
  dietPreferences: string[]
  servings: number
  units: 'UK' | 'US'
  additionalRequirements: string
}) {
  const prompt = RECIPE_PROMPT({
    mealName,
    protein,
    carb,
    veg,
    equipment,
    allergies,
    dietPreferences,
    servings,
    units,
    additionalRequirements,
  })

  const { text, finishReason, usage } = await generateText({
    model: anthropic('claude-3-5-haiku-latest'),
    prompt,
  })

  return { text, finishReason, usage }
}
