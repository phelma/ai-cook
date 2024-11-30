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
  setSuggestions: (recipes: Recipe[]) => void
  setSelectedRecipe: (recipe: Recipe | null) => void
}

export const useRecipeStore = create<RecipeState>((set) => ({
  suggestions: [],
  selectedRecipe: null,
  setSuggestions: (recipes) => set({ suggestions }),
  setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),
}))
