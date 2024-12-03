'use client'

import React, { useEffect, useState } from 'react'
import { useRecipeStore } from '@/store/use-recipe-store'
import { Button } from './ui/button'
import { getMealIdeas } from '@/app/actions'

export function RecipeSuggestions({ onComplete }: { onComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
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

  useEffect(() => {
    async function generateMeals() {
      if (!selectedProtein || !selectedCarb || !selectedVeg) return

      setIsLoading(true)
      try {
        const { text } = await getMealIdeas({
          protein: selectedProtein,
          carb: selectedCarb,
          veg: selectedVeg,
        })
        setGeneratedMeals(text)
        setSelectedMeal(null)
        setRecipeText(null)
      } finally {
        setIsLoading(false)
      }
    }

    generateMeals()
  }, [
    selectedProtein,
    selectedCarb,
    selectedVeg,
    setGeneratedMeals,
    setSelectedMeal,
    setRecipeText,
  ])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recipe suggestions</h2>
      {selectedProtein && selectedCarb && selectedVeg && (
        <div className="flex gap-2 items-center text-sm text-gray-600 mt-2">
          <span className="font-medium">Selected ingredients:</span>
          <span className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 rounded-full font-medium shadow-sm">
            {selectedProtein}
          </span>
          <span className="px-2 py-1 bg-stone-100 rounded">{selectedCarb}</span>
          <span className="px-2 py-1 bg-stone-100 rounded">{selectedVeg}</span>
        </div>
      )}
      <div className="mt-2">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
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

      {generatedMeals && (
        <div className="flex flex-col gap-4 items-start">
          {generatedMeals
            .split('\n')
            .filter(Boolean)
            .map((item) => (
              <Button
                key={item}
                variant={selectedMeal === item ? 'default' : 'secondary'}
                className={`w-full text-left justify-start hover:translate-x-1 transition-transform ${
                  selectedMeal === item ? 'shadow-md' : ''
                }`}
                onClick={async () => {
                  setSelectedMeal(item)
                  onComplete()
                }}
              >
                {item}
              </Button>
            ))}
        </div>
      )}
      {selectedMeal && recipeText && (
        <div className="mt-4 p-4 border rounded">
          <div className="whitespace-pre-wrap">{recipeText}</div>
        </div>
      )}
    </div>
  )
}
