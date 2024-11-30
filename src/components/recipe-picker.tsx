'use client'

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

function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialInput: 'foo',
  })
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}

export function RecipePicker() {
  const ingredients = useIngredientsStore((state) => state.ingredients)
  const {
    suggestions,
    selectedProtein,
    selectedCarb,
    selectedVeg,
    setSelectedProtein,
    setSelectedCarb,
    setSelectedVeg,
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

      <Button>Generate Recipe Suggestions</Button>
      <Chat />
    </div>
  )
}
