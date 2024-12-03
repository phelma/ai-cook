'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useIngredientsStore } from '@/store/use-ingredients-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { PlusCircle } from 'lucide-react'
import { Ingredient } from '@/types/ingredients'

export default function IngredientPicker() {
  const [newIngredient, setNewIngredient] = useState('')
  const [newIngredientType, setNewIngredientType] = useState<
    'protein' | 'carb' | 'veg' | 'other'
  >('other')

  const {
    ingredients,
    selectedIngredients,
    equipment,
    allergies,
    dietPreferences,
    servings,
    locale,
    additionalRequirements,
    addIngredient: addIngredientToStore,
    toggleIngredientSelection,
    toggleEquipment,
    toggleAllergy,
    toggleDietPreference,
    setServings,
    setLocale,
    setAdditionalRequirements,
  } = useIngredientsStore()

  const addIngredient = () => {
    if (newIngredient) {
      addIngredientToStore(newIngredient, newIngredientType)
      setNewIngredient('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Ingredient Picker</h1>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Ingredients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['protein', 'carb', 'veg'].map((type) => (
            <div key={type} className="space-y-2">
              <h3 className="text-lg font-medium capitalize">{type}</h3>
              {ingredients
                .filter((ing) => ing.type === type)
                .map((ing) => (
                  <div key={ing.name} className="flex items-center space-x-2">
                    <Checkbox
                      id={ing.name}
                      checked={selectedIngredients.includes(ing.name)}
                      onCheckedChange={() =>
                        toggleIngredientSelection(ing.name)
                      }
                    />
                    <Label htmlFor={ing.name}>{ing.name}</Label>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Add new ingredient"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          <Select
            value={newIngredientType}
            onValueChange={(value: Ingredient['type']) =>
              setNewIngredientType(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="protein">Protein</SelectItem>
              <SelectItem value="carb">Carb</SelectItem>
              <SelectItem value="veg">Veg</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addIngredient}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Other Ingredients</h2>
        <div className="flex flex-wrap gap-2">
          {ingredients
            .filter((ing) => ing.type === 'other')
            .map((ing) => (
              <div key={ing.name} className="flex items-center space-x-2">
                <Checkbox id={ing.name} />
                <Label htmlFor={ing.name}>{ing.name}</Label>
              </div>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Equipment</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Oven',
            'Stovetop',
            'Microwave',
            'Blender',
            'Slow Cooker',
            'Air Fryer',
            'Pressure Cooker',
          ].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={equipment.includes(item)}
                onCheckedChange={() => toggleEquipment(item)}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Dietary Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium">Allergies</h3>
            <div className="space-y-2">
              {['Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Soy'].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={`allergy-${item}`}
                    checked={allergies.includes(item)}
                    onCheckedChange={() => toggleAllergy(item)}
                  />
                  <Label htmlFor={`allergy-${item}`}>{item}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Diet Preferences</h3>
            <div className="space-y-2">
              {['Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Low-carb'].map(
                (item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={`diet-${item}`}
                      checked={dietPreferences.includes(item)}
                      onCheckedChange={() => toggleDietPreference(item)}
                    />
                    <Label htmlFor={`diet-${item}`}>{item}</Label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Cooking Details</h2>
        <div className="flex space-x-4">
          <div className="space-y-2">
            <Label htmlFor="servings">Number of Servings</Label>
            <Input
              id="servings"
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="units">Units of Measurement</Label>
            <Select value={locale} onValueChange={setLocale}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select units" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="US">US</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Additional Requirements</h2>
        <Textarea
          placeholder="Enter any additional requirements or preferences..."
          value={additionalRequirements}
          onChange={(e) => setAdditionalRequirements(e.target.value)}
        />
      </div>

      <Link href="/" className="w-full">
        <Button className="w-full">Find Recipes</Button>
      </Link>
    </div>
  )
}
