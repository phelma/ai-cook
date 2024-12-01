import { RecipePicker } from './recipe-picker'

export default function Step1({ next }) {
  return <RecipePicker onComplete={next} />
}
