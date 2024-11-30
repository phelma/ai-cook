'use client'

import React, { useState } from 'react'
import { useIngredientsStore } from '@/store/use-ingredients-store'
import { useRecipeStore } from '@/store/use-recipe-store'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { getMealIdeas } from '@/app/actions'

function RecipeSuggestions({
  protein,
  carb,
  veg,
}: {
  protein: string
  carb: string
  veg: string
}) {
  const [generation, setGeneration] = useState<string>('')
  // const { suggestions, setSuggestions, setSelectedRecipe } = useRecipeStore()

  return (
    <div>
      <button
        onClick={async () => {
          const { text } = await getMealIdeas({ protein, carb, veg })
          setGeneration(text)
        }}
      >
        Answer
      </button>
      <div>{generation}</div>
    </div>
  )
}

export function RecipePicker() {
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const ingredients = useIngredientsStore((state) => state.ingredients)
  const {
    suggestions,
    selectedProtein,
    selectedCarb,
    selectedVeg,
    setSelectedProtein,
    setSelectedCarb,
    setSelectedVeg,
    setSuggestions,
  } = useRecipeStore()

  const proteins = ingredients.filter((ing) => ing.type === 'protein')
  const carbs = ingredients.filter((ing) => ing.type === 'carb')
  const veggies = ingredients.filter((ing) => ing.type === 'veg')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-lg font-medium mb-2">Protein</h2>
          <Select
            value={selectedProtein || undefined}
            onValueChange={setSelectedProtein}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select protein" />
            </SelectTrigger>
            <SelectContent>
              {proteins.map((protein) => (
                <SelectItem key={protein.name} value={protein.name}>
                  {protein.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Carbs</h2>
          <Select
            value={selectedCarb || undefined}
            onValueChange={setSelectedCarb}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select carbs" />
            </SelectTrigger>
            <SelectContent>
              {carbs.map((carb) => (
                <SelectItem key={carb.name} value={carb.name}>
                  {carb.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Vegetables</h2>
          <Select
            value={selectedVeg || undefined}
            onValueChange={setSelectedVeg}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select vegetable" />
            </SelectTrigger>
            <SelectContent>
              {veggies.map((veg) => (
                <SelectItem key={veg.name} value={veg.name}>
                  {veg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

      {selectedProtein && selectedCarb && selectedVeg ? (
        <RecipeSuggestions
          protein={selectedProtein}
          carb={selectedCarb}
          veg={selectedVeg}
        />
      ) : (
        <div className="text-stone-500">
          Select one ingredient from each category to generate recipe
          suggestions.
        </div>
      )}
    </div>
  )
}
