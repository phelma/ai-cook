'use client'

import { useEffect } from 'react'
import { useRecipeStore } from '@/store/use-recipe-store'
import { getRecipe } from '@/app/actions'

export default function Step3({ next }) {
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

      const { text } = await getRecipe({
        mealName: selectedMeal,
        protein: selectedProtein,
        carb: selectedCarb,
        veg: selectedVeg,
      })
      setRecipeText(text)
    }

    fetchRecipe()
  }, [selectedMeal, selectedProtein, selectedCarb, selectedVeg, setRecipeText])

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
