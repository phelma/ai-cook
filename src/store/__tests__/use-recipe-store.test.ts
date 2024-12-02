import { describe, it, expect, beforeEach } from 'vitest'
import { useRecipeStore } from '../use-recipe-store'

describe('useRecipeStore', () => {
  beforeEach(() => {
    useRecipeStore.setState({
      suggestions: [],
      selectedRecipe: null,
      selectedProtein: null,
      selectedCarb: null,
      selectedVeg: null,
      generatedMeals: '',
      selectedMeal: null,
      recipeText: null,
    })
  })

  it('should set suggestions', () => {
    const store = useRecipeStore.getState()
    const mockRecipes = [{
      id: '1',
      title: 'Test Recipe',
      ingredients: ['ingredient1'],
      instructions: ['step1']
    }]
    
    store.setSuggestions(mockRecipes)
    expect(useRecipeStore.getState().suggestions).toEqual(mockRecipes)
  })

  it('should set selected recipe', () => {
    const store = useRecipeStore.getState()
    const mockRecipe = {
      id: '1',
      title: 'Test Recipe',
      ingredients: ['ingredient1'],
      instructions: ['step1']
    }
    
    store.setSelectedRecipe(mockRecipe)
    expect(useRecipeStore.getState().selectedRecipe).toEqual(mockRecipe)
  })

  it('should set selected protein', () => {
    const store = useRecipeStore.getState()
    store.setSelectedProtein('Chicken')
    expect(useRecipeStore.getState().selectedProtein).toBe('Chicken')
  })

  it('should set selected carb', () => {
    const store = useRecipeStore.getState()
    store.setSelectedCarb('Rice')
    expect(useRecipeStore.getState().selectedCarb).toBe('Rice')
  })

  it('should set selected veg', () => {
    const store = useRecipeStore.getState()
    store.setSelectedVeg('Broccoli')
    expect(useRecipeStore.getState().selectedVeg).toBe('Broccoli')
  })

  it('should set generated meals', () => {
    const store = useRecipeStore.getState()
    store.setGeneratedMeals('Meal 1\nMeal 2')
    expect(useRecipeStore.getState().generatedMeals).toBe('Meal 1\nMeal 2')
  })

  it('should set selected meal', () => {
    const store = useRecipeStore.getState()
    store.setSelectedMeal('Meal 1')
    expect(useRecipeStore.getState().selectedMeal).toBe('Meal 1')
  })

  it('should set recipe text', () => {
    const store = useRecipeStore.getState()
    store.setRecipeText('Recipe instructions')
    expect(useRecipeStore.getState().recipeText).toBe('Recipe instructions')
  })
})
