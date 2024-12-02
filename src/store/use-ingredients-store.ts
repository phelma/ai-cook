import defaultIngredients from '@/data/default-ingredients.json'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

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
  locale: 'UK' | 'US'
  additionalRequirements: string

  // Actions
  addIngredient: (name: string, type: Ingredient['type']) => void
  toggleIngredientSelection: (name: string) => void
  toggleEquipment: (item: string) => void
  toggleAllergy: (item: string) => void
  toggleDietPreference: (item: string) => void
  setServings: (servings: number) => void
  setLocale: (locale: 'UK' | 'US') => void
  setAdditionalRequirements: (text: string) => void
}

export const useIngredientsStore = create<IngredientsState>()(
  devtools(
    persist(
      (set) => ({
        ingredients: [
          ...defaultIngredients.protein.map((name) => ({
            name,
            type: 'protein' as const,
          })),
          ...defaultIngredients.carb.map((name) => ({
            name,
            type: 'carb' as const,
          })),
          ...defaultIngredients.veg.map((name) => ({
            name,
            type: 'veg' as const,
          })),
        ] as Ingredient[],
        selectedIngredients: [],
        equipment: [],
        allergies: [],
        dietPreferences: [],
        servings: 4,
        locale: 'UK',
        additionalRequirements: '',

        addIngredient: (name, type) =>
          set((state) => ({
            ingredients: [...state.ingredients, { name, type }],
            selectedIngredients: [...state.selectedIngredients, name],
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
        setLocale: (locale) => set({ locale }),
        setAdditionalRequirements: (text) =>
          set({ additionalRequirements: text }),
      }),
      {
        name: 'ingredients-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)

// Subscribe to all state changes
useIngredientsStore.subscribe((state) => state)
