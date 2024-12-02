import { RecipePicker } from './recipe-picker'

export default function Step1({ next }: { next: () => void }) {
  return <RecipePicker onComplete={next} />
}
