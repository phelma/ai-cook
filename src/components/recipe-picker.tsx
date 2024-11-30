'use client'

import { useIngredientsStore } from "@/store/use-ingredients-store"
import { useRecipeStore } from "@/store/use-recipe-store"
import { Button } from "./ui/button"

export function RecipePicker() {
  const selectedIngredients = useIngredientsStore((state) => state.selectedIngredients)
  const { suggestions, selectedRecipe } = useRecipeStore()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Selected Ingredients</h2>
        <div className="mt-2 space-y-2">
          {selectedIngredients.map((ingredient) => (
            <div key={ingredient} className="p-2 bg-stone-100 rounded">
              {ingredient}
            </div>
          ))}
        </div>
      </div>

      <div>
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
                  {/* Add more recipe details here */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button>Generate Recipe Suggestions</Button>
    </div>
  )
}
