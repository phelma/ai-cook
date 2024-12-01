import { RecipeSuggestions } from './recipe-picker'

export default function Step2({ next }) {
  return <RecipeSuggestions onComplete={next} />
}
