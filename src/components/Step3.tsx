'use client'

import { getRecipe } from '@/app/actions'
import { useIngredientsStore } from '@/store/use-ingredients-store'
import { useRecipeStore } from '@/store/use-recipe-store'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Step3({}) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    selectedMeal,
    selectedProtein,
    selectedCarb,
    selectedVeg,
    setRecipeText,
    recipeText,
  } = useRecipeStore()

  const {
    equipment,
    allergies,
    dietPreferences,
    servings,
    locale,
    additionalRequirements,
  } = useIngredientsStore()

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
          equipment,
          allergies,
          dietPreferences,
          servings,
          locale,
          additionalRequirements,
        })
        setRecipeText(text)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipe()
  }, [
    selectedMeal,
    selectedProtein,
    selectedCarb,
    selectedVeg,
    setRecipeText,
    equipment,
    allergies,
    dietPreferences,
    servings,
    locale,
    additionalRequirements,
  ])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-stone-200 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100"></div>
      </div>
    )
  }

  return (
    <>
      {selectedMeal && recipeText && (
        <div className="p-8 border rounded-lg bg-white/90 dark:bg-stone-900/90 shadow-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4">{selectedMeal}</h3>
          <ReactMarkdown className="prose prose-stone max-w-none">
            {recipeText}
          </ReactMarkdown>
        </div>
      )}
    </>
  )
}
