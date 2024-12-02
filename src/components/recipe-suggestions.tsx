'use client'

import React from 'react'
import { useRecipeStore } from '@/store/use-recipe-store'
import { Button } from './ui/button'
import { getMealIdeas, getRecipe } from '@/app/actions'

export function RecipeSuggestions() {
  const {
    generatedMeals,
    selectedMeal,
    recipeText,
    setGeneratedMeals,
    setSelectedMeal,
    setRecipeText,
    suggestions,
    selectedProtein,
    selectedCarb,
    selectedVeg,
  } = useRecipeStore()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recipe Suggestions</h2>
      <div className="mt-2">
        {suggestions.length === 0 ? (
          <div className="text-stone-500">
            No recipes generated yet. Click generate to get AI suggestions.
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((recipe) => (
              <div key={recipe.id} className="p-4 border rounded">
                <h3 className="text-xl font-semibold">{recipe.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button
        className="w-full"
        onClick={async () => {
          const { text } = await getMealIdeas({ 
            protein: selectedProtein!, 
            carb: selectedCarb!, 
            veg: selectedVeg! 
          })
          setGeneratedMeals(text)
          setSelectedMeal(null)
          setRecipeText(null)
        }}
      >
        Generate Recipe Ideas
      </Button>

      {generatedMeals && (
        <div className="flex flex-col gap-4 items-start">
          {generatedMeals
            .split('\n')
            .filter(Boolean)
            .map((item) => (
              <Button
                key={item}
                variant={selectedMeal === item ? 'default' : 'secondary'}
                onClick={async () => {
                  setSelectedMeal(item)
                  const { text } = await getRecipe({
                    mealName: item,
                    protein: selectedProtein!,
                    carb: selectedCarb!,
                    veg: selectedVeg!,
                  })
                  setRecipeText(text)
                }}
              >
                {item}
              </Button>
            ))}
        </div>
      )}

      {recipeText && (
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-4">{selectedMeal}</h3>
          <div className="whitespace-pre-wrap">{recipeText}</div>
        </div>
      )}
    </div>
  )
}
