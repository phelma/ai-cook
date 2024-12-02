import { RecipeSuggestions } from './recipe-suggestions'

export default function Step2({ next }: { next: () => void }) {
  return <RecipeSuggestions onComplete={next} />
}
