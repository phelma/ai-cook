import { useEffect } from 'react'

export default function Step3({ next }) {
  useEffect(async () => {
    const { text } = await getRecipe({
      mealName: item,
      protein: selectedProtein!,
      carb: selectedCarb!,
      veg: selectedVeg!,
    })
    setRecipeText(text)
  })
  return <h1>Step 3</h1>
}
