'use client'

import { useState, useEffect } from 'react'
import defaultIngredients from '@/data/default-ingredients.json'
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

type Ingredient = {
  name: string
  type: 'protein' | 'carb' | 'veg' | 'other'
}

export default function IngredientPicker() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    ...defaultIngredients.protein.map(name => ({ name, type: 'protein' })),
    ...defaultIngredients.carb.map(name => ({ name, type: 'carb' })),
    ...defaultIngredients.veg.map(name => ({ name, type: 'veg' }))
  ])
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    ingredients.map(ing => ing.name)
  )
  const [newIngredient, setNewIngredient] = useState('')
  const [newIngredientType, setNewIngredientType] =
    useState<Ingredient['type']>('other')
  const [equipment, setEquipment] = useState<string[]>([])
  const [allergies, setAllergies] = useState<string[]>([])
  const [dietPreferences, setDietPreferences] = useState<string[]>([])
  const [servings, setServings] = useState(1)
  const [units, setUnits] = useState('metric')
  const [additionalRequirements, setAdditionalRequirements] = useState('')

  const addIngredient = () => {
    if (newIngredient) {
      setIngredients([
        ...ingredients,
        { name: newIngredient, type: newIngredientType },
      ])
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
                      onCheckedChange={(checked) => {
                        setSelectedIngredients(
                          checked
                            ? [...selectedIngredients, ing.name]
                            : selectedIngredients.filter((name) => name !== ing.name)
                        )
                      }}
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
          {['Oven', 'Stovetop', 'Microwave', 'Blender', 'Slow Cooker'].map(
            (item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={item}
                  checked={equipment.includes(item)}
                  onCheckedChange={(checked) => {
                    setEquipment(
                      checked
                        ? [...equipment, item]
                        : equipment.filter((i) => i !== item)
                    )
                  }}
                />
                <Label htmlFor={item}>{item}</Label>
              </div>
            )
          )}
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
                    onCheckedChange={(checked) => {
                      setAllergies(
                        checked
                          ? [...allergies, item]
                          : allergies.filter((i) => i !== item)
                      )
                    }}
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
                      onCheckedChange={(checked) => {
                        setDietPreferences(
                          checked
                            ? [...dietPreferences, item]
                            : dietPreferences.filter((i) => i !== item)
                        )
                      }}
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
              onChange={(e) => setServings(parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="units">Units of Measurement</Label>
            <Select value={units} onValueChange={setUnits}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select units" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric</SelectItem>
                <SelectItem value="imperial">Imperial</SelectItem>
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

      <Button className="w-full">Find Recipes</Button>
    </div>
  )
}
