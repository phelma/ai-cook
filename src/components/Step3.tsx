'use client'

import { useEffect, useState } from 'react'
import { useRecipeStore } from '@/store/use-recipe-store'
import { getRecipe } from '@/app/actions'

export default function Step3({ next }) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    selectedMeal,
    selectedProtein,
    selectedCarb,
    selectedVeg,
    setRecipeText,
    recipeText,
  } = useRecipeStore()

  useEffect(() => {
    async function fetchRecipe() {
      if (!selectedMeal || !selectedProtein || !selectedCarb || !selectedVeg)
        return

      setIsLoading(true)
      try {
        const { text } = await getRecipe({
          mealName: selectedMeal,
          protein: selectedProtein,
          carb: selectedCarb,
          veg: selectedVeg,
        })
        setRecipeText(text)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipe()
  }, [selectedMeal, selectedProtein, selectedCarb, selectedVeg, setRecipeText])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <>
      {recipeText && (
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-4">{selectedMeal}</h3>
          <div className="whitespace-pre-wrap">{recipeText}</div>
        </div>
      )}
    </>
  )
}
