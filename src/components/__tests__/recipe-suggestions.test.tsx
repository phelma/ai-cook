import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '../../test/test-utils'
import { RecipeSuggestions } from '../recipe-suggestions'
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
    const { getByText } = render(<RecipeSuggestions />)
    expect(getByText('Recipe suggestions')).toBeDefined()
  })

  it('displays generated meals when available', () => {
    const stateWithMeals = {
      ...mockRecipeState,
      generatedMeals: 'Meal 1\nMeal 2',
    }
    vi.mocked(useRecipeStore).mockImplementation(() => stateWithMeals)

    const { getByText } = render(<RecipeSuggestions />)
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

    const { getByText } = render(<RecipeSuggestions />)
    expect(getByText('Recipe instructions')).toBeDefined()
  })

  it('handles loading state correctly', () => {
    const { container } = render(<RecipeSuggestions />)
    const loadingSpinner = container.querySelector('.animate-spin')
    expect(loadingSpinner).toBeDefined()
  })

  it('calls onComplete when a meal is selected', async () => {
    const mockOnComplete = vi.fn()
    const stateWithMeals = {
      ...mockRecipeState,
      generatedMeals: 'Meal 1\nMeal 2',
    }
    vi.mocked(useRecipeStore).mockImplementation(() => stateWithMeals)

    const { getByText } = render(
      <RecipeSuggestions onComplete={mockOnComplete} />
    )

    getByText('Meal 1').click()
    expect(mockOnComplete).toHaveBeenCalled()
  })
})
