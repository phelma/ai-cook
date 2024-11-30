import { create } from 'zustand'

interface Recipe {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
}

interface RecipeState {
  suggestions: Recipe[]
  selectedRecipe: Recipe | null
  selectedProtein: string | null
  selectedCarb: string | null
  selectedVeg: string | null
  setSuggestions: (recipes: Recipe[]) => void
  setSelectedRecipe: (recipe: Recipe | null) => void
  setSelectedProtein: (protein: string | null) => void
  setSelectedCarb: (carb: string | null) => void
  setSelectedVeg: (veg: string | null) => void
}

export const useRecipeStore = create<RecipeState>((set) => ({
  suggestions: [],
  selectedRecipe: null,
  selectedProtein: null,
  selectedCarb: null,
  selectedVeg: null,
  setSuggestions: (recipes) => set({ suggestions: recipes }),
  setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),
  setSelectedProtein: (protein) => set({ selectedProtein: protein }),
  setSelectedCarb: (carb) => set({ selectedCarb: carb }),
  setSelectedVeg: (veg) => set({ selectedVeg: veg })
}))
