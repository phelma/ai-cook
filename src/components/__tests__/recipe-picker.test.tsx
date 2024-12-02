import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '../../test/test-utils'
import { RecipePicker } from '../recipe-picker'
import { useIngredientsStore } from '../../store/use-ingredients-store'
import { useRecipeStore } from '../../store/use-recipe-store'

// Mock the stores
vi.mock('../../store/use-ingredients-store')
vi.mock('../../store/use-recipe-store')

describe('RecipePicker', () => {
  const mockOnComplete = vi.fn()

  const mockIngredients = {
    ingredients: [
      { name: 'Chicken', type: 'protein' as const },
      { name: 'Rice', type: 'carb' as const },
      { name: 'Broccoli', type: 'veg' as const },
    ],
    selectedIngredients: [],
    equipment: [],
    allergies: [],
    dietPreferences: [],
    servings: 4,
    locale: 'UK' as const,
    additionalRequirements: '',
    addIngredient: vi.fn(),
    toggleIngredientSelection: vi.fn(),
    toggleEquipment: vi.fn(),
    toggleAllergy: vi.fn(),
    toggleDietPreference: vi.fn(),
    setServings: vi.fn(),
    setLocale: vi.fn(),
    setAdditionalRequirements: vi.fn(),
  }

  const mockRecipeState = {
    suggestions: [],
    selectedRecipe: null,
    selectedProtein: null,
    selectedCarb: null,
    selectedVeg: null,
    generatedMeals: '',
    selectedMeal: null,
    recipeText: null,
    setSuggestions: vi.fn(),
    setSelectedRecipe: vi.fn(),
    setSelectedProtein: vi.fn(),
    setSelectedCarb: vi.fn(),
    setSelectedVeg: vi.fn(),
    setGeneratedMeals: vi.fn(),
    setSelectedMeal: vi.fn(),
    setRecipeText: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock the ingredients store
    vi.mocked(useIngredientsStore).mockImplementation((selector) =>
      selector(mockIngredients)
    )

    // Mock the recipe store
    vi.mocked(useRecipeStore).mockImplementation(() => mockRecipeState)
  })

  it('renders without crashing', () => {
    const { getByText } = render(<RecipePicker onComplete={mockOnComplete} />)
    expect(getByText('Protein')).toBeDefined()
    expect(getByText('Carbs')).toBeDefined()
    expect(getByText('Vegetables')).toBeDefined()
  })

  it('shows helper text when not all ingredients are selected', () => {
    const { getByText } = render(<RecipePicker onComplete={mockOnComplete} />)
    expect(
      getByText(
        'Select one ingredient from each category to generate recipe suggestions.'
      )
    ).toBeDefined()
  })

  it('shows "Pick a meal" button when all ingredients are selected', () => {
    const selectedState = {
      ...mockRecipeState,
      selectedProtein: 'Chicken',
      selectedCarb: 'Rice',
      selectedVeg: 'Broccoli',
    }
    vi.mocked(useRecipeStore).mockImplementation(() => selectedState)

    const { getByText } = render(<RecipePicker onComplete={mockOnComplete} />)
    expect(getByText('Pick a meal')).toBeDefined()
  })

  it('calls onComplete when "Pick a meal" button is clicked', () => {
    const selectedState = {
      ...mockRecipeState,
      selectedProtein: 'Chicken',
      selectedCarb: 'Rice',
      selectedVeg: 'Broccoli',
    }
    vi.mocked(useRecipeStore).mockImplementation(() => selectedState)

    const { getByText } = render(<RecipePicker onComplete={mockOnComplete} />)
    getByText('Pick a meal').click()
    expect(mockOnComplete).toHaveBeenCalled()
  })
})
