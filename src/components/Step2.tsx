import { RecipeSuggestions } from './recipe-suggestions'

export default function Step2({ onComplete }: { onComplete: () => void }) {
  return <RecipeSuggestions onComplete={onComplete} />
}
