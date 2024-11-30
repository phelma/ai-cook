'use server'

import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

export async function getMealIdeas({
  protein,
  carb,
  veg,
}: {
  protein: string
  carb: string
  veg: string
}) {
  const prompt = `Generate 5 meal ideas using these ingredients: ${protein}, ${carb}, and ${veg}. Only output the meal names, with no numbers, separated by newlines, include the ingredient names in the meal name where appropriate.`
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
}: {
  mealName: string
  protein: string
  carb: string
  veg: string
}) {
  const prompt = `Generate a detailed recipe for "${mealName}" using ${protein}, ${carb}, and ${veg} as the main ingredients. Include:
  1. A list of all ingredients with quantities
  2. Step by step cooking instructions
  Format the output with clear sections for ingredients and instructions.`
  
  const { text, finishReason, usage } = await generateText({
    model: anthropic('claude-3-5-haiku-latest'),
    prompt,
  })

  return { text, finishReason, usage }
}