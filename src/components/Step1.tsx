import { RecipePicker } from './recipe-picker'

export default function Step1({ onComplete }: { onComplete: () => void }) {
  return <RecipePicker onComplete={onComplete} />
}
