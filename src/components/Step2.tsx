import { RecipeSuggestions } from './recipe-suggestions'

export default function Step2({ next }) {
  return <RecipeSuggestions onComplete={next} />
}
