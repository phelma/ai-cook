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
    setRecipeText
  } = useRecipeStore()

  useEffect(() => {
    async function fetchRecipe() {
      if (!selectedMeal || !selectedProtein || !selectedCarb || !selectedVeg) return
      
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

  return <h1>Step 3</h1>
}
