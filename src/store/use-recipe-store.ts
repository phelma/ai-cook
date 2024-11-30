import { create } from 'zustand'

interface RecipeState {
  suggestions: Recipe[]
  selectedRecipe: Recipe | null
  selectedProtein: string | null
  selectedCarb: string | null
  selectedVeg: string | null
  generatedMeals: string
  selectedMeal: string | null
  recipeText: string | null

  // Actions
  setSuggestions: (recipes: Recipe[]) => void
  setSelectedRecipe: (recipe: Recipe | null) => void
  setSelectedProtein: (protein: string | null) => void
  setSelectedCarb: (carb: string | null) => void
  setSelectedVeg: (veg: string | null) => void
  setGeneratedMeals: (meals: string) => void
  setSelectedMeal: (meal: string | null) => void
  setRecipeText: (text: string | null) => void
}

interface Recipe {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
}

export const useRecipeStore = create<RecipeState>((set) => ({
  suggestions: [],
  selectedRecipe: null,
  selectedProtein: null,
  selectedCarb: null,
  selectedVeg: null,
  generatedMeals: '',
  selectedMeal: null,
  recipeText: null,

  setSuggestions: (recipes) => set({ suggestions: recipes }),
  setSelectedRecipe: (recipe) => set({ selectedRecipe: recipe }),
  setSelectedProtein: (protein) => set({ selectedProtein: protein }),
  setSelectedCarb: (carb) => set({ selectedCarb: carb }),
  setSelectedVeg: (veg) => set({ selectedVeg: veg }),
  setGeneratedMeals: (meals) => set({ generatedMeals: meals }),
  setSelectedMeal: (meal) => set({ selectedMeal: meal }),
  setRecipeText: (text) => set({ recipeText: text })
}))
