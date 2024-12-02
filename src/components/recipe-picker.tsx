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

export function RecipePicker({ onComplete }: { onComplete: () => void }) {
  const ingredients = useIngredientsStore((state) => state.ingredients)
  const {
    selectedProtein,
    selectedCarb,
    selectedVeg,
    setSelectedProtein,
    setSelectedCarb,
    setSelectedVeg,
  } = useRecipeStore()

  const proteins = ingredients.filter((ing) => ing.type === 'protein')
  const carbs = ingredients.filter((ing) => ing.type === 'carb')
  const veg = ingredients.filter((ing) => ing.type === 'veg')

  return (
    <div className="space-y-6 container">
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
              {veg.map((veg) => (
                <SelectItem key={veg.name} value={veg.name}>
                  {veg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedProtein && selectedCarb && selectedVeg ? (
        <Button onClick={onComplete}>Pick a meal</Button>
      ) : (
        <div className="text-stone-500">
          Select one ingredient from each category to generate recipe
          suggestions.
        </div>
      )}
    </div>
  )
}
