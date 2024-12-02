'use client'

import React, { useEffect, useState } from 'react'
import { useRecipeStore } from '@/store/use-recipe-store'
import { Button } from './ui/button'
import { getMealIdeas, getRecipe } from '@/app/actions'

export function RecipeSuggestions({ onComplete }) {
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
  }, [selectedProtein, selectedCarb, selectedVeg, setGeneratedMeals, setSelectedMeal, setRecipeText])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recipe Suggestions</h2>
      <div className="mt-2">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-stone-500">
            Waiting for ingredient selection...
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
    </div>
  )
}
