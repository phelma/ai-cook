'use client'

import React from 'react'
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
import { useChat } from 'ai/react'
import { useEffect } from 'react'

import { useCompletion } from 'ai/react'

function RecipeSuggestions({
  protein,
  carb,
  veg,
}: {
  protein: string
  carb: string
  veg: string
}) {
  const { completion, complete } = useCompletion({
    api: '/api/chat',
  })

  const { suggestions, setSuggestions, setSelectedRecipe } = useRecipeStore()

  useEffect(() => {
    const generateSuggestions = async () => {
      const result = await complete(
        `Generate 5 meal ideas using these ingredients: ${protein}, ${carb}, and ${veg}. Only output the meal names, include the ingredient names in the meal name where appropriate.`
      )
      if (result) {
        const mealIdeas = result
          .split('\n')
          .filter((line) => line.trim())
          .map((title) => ({
            id: crypto.randomUUID(),
            title,
            ingredients: [],
            instructions: [],
          }))
        setSuggestions(mealIdeas)
      }
    }
    generateSuggestions()
  }, [protein, carb, veg, complete, setSuggestions])

  return (
    <div className="space-y-4">
      {suggestions.map((recipe) => (
        <Button
          key={recipe.id}
          variant="outline"
          className="w-full text-left h-auto py-4"
          onClick={() => setSelectedRecipe(recipe)}
        >
          {recipe.title}
        </Button>
      ))}
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
        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <Button 
              onClick={() => {
                setSuggestions([]);
                setShowSuggestions(true);
              }}
              className="w-full"
            >
              Generate Recipe Suggestions
            </Button>
          ) : null}
          {suggestions.length > 0 && (
            <RecipeSuggestions
              protein={selectedProtein}
              carb={selectedCarb}
              veg={selectedVeg}
            />
          )}
        </div>
      ) : (
        <div className="text-stone-500">
          Select one ingredient from each category to generate recipe
          suggestions.
        </div>
      )}
    </div>
  )
}
