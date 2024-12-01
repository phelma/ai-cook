import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '../../test/test-utils'
import { RecipeSuggestions } from '../recipe-picker'
import { useRecipeStore } from '../../store/use-recipe-store'

// Mock the store
vi.mock('../../store/use-recipe-store')
vi.mock('../../app/actions', () => ({
  getMealIdeas: vi.fn().mockResolvedValue({ text: 'Meal 1\nMeal 2' }),
  getRecipe: vi.fn().mockResolvedValue({ text: 'Recipe instructions' }),
}))

describe('RecipeSuggestions', () => {
  const mockRecipeState = {
    suggestions: [],
    generatedMeals: '',
    selectedMeal: null,
    recipeText: null,
    setGeneratedMeals: vi.fn(),
    setSelectedMeal: vi.fn(),
    setRecipeText: vi.fn(),
    setSuggestions: vi.fn(),
    setSelectedRecipe: vi.fn(),
    setSelectedProtein: vi.fn(),
    setSelectedCarb: vi.fn(),
    setSelectedVeg: vi.fn(),
    selectedProtein: null,
    selectedCarb: null,
    selectedVeg: null,
    selectedRecipe: null,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useRecipeStore).mockImplementation(() => mockRecipeState)
  })

  it('renders without crashing', () => {
    const { getByText } = render(
      <RecipeSuggestions protein="Chicken" carb="Rice" veg="Broccoli" />
    )
    expect(getByText('Recipe Suggestions')).toBeDefined()
  })

  it('shows empty state message when no suggestions', () => {
    const { getByText } = render(
      <RecipeSuggestions protein="Chicken" carb="Rice" veg="Broccoli" />
    )
    expect(
      getByText(
        'No recipes generated yet. Click generate to get AI suggestions.'
      )
    ).toBeDefined()
  })

  it('shows generate button', () => {
    const { getByText } = render(
      <RecipeSuggestions protein="Chicken" carb="Rice" veg="Broccoli" />
    )
    expect(getByText('Generate Recipe Ideas')).toBeDefined()
  })

  it('displays generated meals when available', () => {
    const stateWithMeals = {
      ...mockRecipeState,
      generatedMeals: 'Meal 1\nMeal 2',
    }
    vi.mocked(useRecipeStore).mockImplementation(() => stateWithMeals)

    const { getByText } = render(
      <RecipeSuggestions protein="Chicken" carb="Rice" veg="Broccoli" />
    )
    expect(getByText('Meal 1')).toBeDefined()
    expect(getByText('Meal 2')).toBeDefined()
  })

  it('displays recipe text when available', () => {
    const stateWithRecipe = {
      ...mockRecipeState,
      selectedMeal: 'Meal 1',
      recipeText: 'Recipe instructions',
    }
    vi.mocked(useRecipeStore).mockImplementation(() => stateWithRecipe)

    const { getByText } = render(
      <RecipeSuggestions protein="Chicken" carb="Rice" veg="Broccoli" />
    )
    expect(getByText('Recipe instructions')).toBeDefined()
  })
})
