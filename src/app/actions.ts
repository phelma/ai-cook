'use server'

import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { MEAL_IDEAS_PROMPT, RECIPE_PROMPT } from '../prompts'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

if (!ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY is not set')
}

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
  locale,
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
  locale: 'UK' | 'US'
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
    locale,
    additionalRequirements,
  })

  console.log('Prompt:', prompt)

  const { text, finishReason, usage } = await generateText({
    model: anthropic('claude-3-5-sonnet-latest'),
    prompt,
  })

  return { text, finishReason, usage }
}
