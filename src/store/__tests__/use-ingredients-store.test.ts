import { describe, it, expect, beforeEach } from 'vitest'
import { useIngredientsStore } from '../use-ingredients-store'
import defaultIngredients from '@/data/default-ingredients.json'

describe('useIngredientsStore', () => {
  beforeEach(() => {
    useIngredientsStore.setState({
      ingredients: [],
      selectedIngredients: [],
      equipment: [],
      allergies: [],
      dietPreferences: [],
      servings: 4,
      units: 'UK',
      additionalRequirements: '',
    })
  })

  it('should initialize with default ingredients', () => {
    const state = useIngredientsStore.getState()
    expect(state.ingredients.length).toBeGreaterThan(0)
    expect(state.ingredients).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'protein' }),
      expect.objectContaining({ type: 'carb' }),
      expect.objectContaining({ type: 'veg' })
    ]))
  })

  it('should add new ingredient', () => {
    const store = useIngredientsStore.getState()
    store.addIngredient('New Protein', 'protein')
    
    const updatedState = useIngredientsStore.getState()
    expect(updatedState.ingredients).toContainEqual({
      name: 'New Protein',
      type: 'protein'
    })
    expect(updatedState.selectedIngredients).toContain('New Protein')
  })

  it('should toggle ingredient selection', () => {
    const store = useIngredientsStore.getState()
    const initialIngredient = store.ingredients[0].name
    
    store.toggleIngredientSelection(initialIngredient)
    expect(useIngredientsStore.getState().selectedIngredients).not.toContain(initialIngredient)
    
    store.toggleIngredientSelection(initialIngredient)
    expect(useIngredientsStore.getState().selectedIngredients).toContain(initialIngredient)
  })

  it('should toggle equipment', () => {
    const store = useIngredientsStore.getState()
    store.toggleEquipment('Oven')
    expect(useIngredientsStore.getState().equipment).toContain('Oven')
    
    store.toggleEquipment('Oven')
    expect(useIngredientsStore.getState().equipment).not.toContain('Oven')
  })

  it('should toggle allergies', () => {
    const store = useIngredientsStore.getState()
    store.toggleAllergy('Nuts')
    expect(useIngredientsStore.getState().allergies).toContain('Nuts')
    
    store.toggleAllergy('Nuts')
    expect(useIngredientsStore.getState().allergies).not.toContain('Nuts')
  })

  it('should toggle diet preferences', () => {
    const store = useIngredientsStore.getState()
    store.toggleDietPreference('Vegetarian')
    expect(useIngredientsStore.getState().dietPreferences).toContain('Vegetarian')
    
    store.toggleDietPreference('Vegetarian')
    expect(useIngredientsStore.getState().dietPreferences).not.toContain('Vegetarian')
  })

  it('should update servings', () => {
    const store = useIngredientsStore.getState()
    store.setServings(6)
    expect(useIngredientsStore.getState().servings).toBe(6)
  })

  it('should update units', () => {
    const store = useIngredientsStore.getState()
    store.setUnits('US')
    expect(useIngredientsStore.getState().units).toBe('US')
  })

  it('should update additional requirements', () => {
    const store = useIngredientsStore.getState()
    store.setAdditionalRequirements('No spicy food')
    expect(useIngredientsStore.getState().additionalRequirements).toBe('No spicy food')
  })
})
