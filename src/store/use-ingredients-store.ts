import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { persist, createJSONStorage } from 'zustand/middleware'
import defaultIngredients from '@/data/default-ingredients.json'

type Ingredient = {
  name: string
  type: 'protein' | 'carb' | 'veg' | 'other'
}

interface IngredientsState {
  ingredients: Ingredient[]
  selectedIngredients: string[]
  equipment: string[]
  allergies: string[]
  dietPreferences: string[]
  servings: number
  units: 'UK' | 'US'
  additionalRequirements: string

  // Actions
  addIngredient: (name: string, type: Ingredient['type']) => void
  toggleIngredientSelection: (name: string) => void
  toggleEquipment: (item: string) => void
  toggleAllergy: (item: string) => void
  toggleDietPreference: (item: string) => void
  setServings: (servings: number) => void
  setUnits: (units: 'metric' | 'imperial') => void
  setAdditionalRequirements: (text: string) => void
}

export const useIngredientsStore = create<IngredientsState>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set) => ({
          ingredients: [
            ...defaultIngredients.protein.map((name) => ({
              name,
              type: 'protein',
            })),
            ...defaultIngredients.carb.map((name) => ({ name, type: 'carb' })),
            ...defaultIngredients.veg.map((name) => ({ name, type: 'veg' })),
          ],
          selectedIngredients: [
            ...defaultIngredients.protein,
            ...defaultIngredients.carb,
            ...defaultIngredients.veg,
          ],
          equipment: [],
          allergies: [],
          dietPreferences: [],
          servings: 4,
          units: 'UK',
          additionalRequirements: '',

          addIngredient: (name, type) =>
            set((state) => ({
              ingredients: [...state.ingredients, { name, type }],
            })),

          toggleIngredientSelection: (name) =>
            set((state) => ({
              selectedIngredients: state.selectedIngredients.includes(name)
                ? state.selectedIngredients.filter((n) => n !== name)
                : [...state.selectedIngredients, name],
            })),

          toggleEquipment: (item) =>
            set((state) => ({
              equipment: state.equipment.includes(item)
                ? state.equipment.filter((i) => i !== item)
                : [...state.equipment, item],
            })),

          toggleAllergy: (item) =>
            set((state) => ({
              allergies: state.allergies.includes(item)
                ? state.allergies.filter((i) => i !== item)
                : [...state.allergies, item],
            })),

          toggleDietPreference: (item) =>
            set((state) => ({
              dietPreferences: state.dietPreferences.includes(item)
                ? state.dietPreferences.filter((i) => i !== item)
                : [...state.dietPreferences, item],
            })),

          setServings: (servings) => set({ servings }),
          setUnits: (units) => set({ units }),
          setAdditionalRequirements: (text) =>
            set({ additionalRequirements: text }),
        }),
        {
          name: 'Ingredients Store',
          enabled: true,
        }
      ),
      {
        name: 'ingredients-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)

// Subscribe to all state changes
useIngredientsStore.subscribe(
  (state) => state,
  (state) => {
    console.log('Store updated:', state)
  }
)
