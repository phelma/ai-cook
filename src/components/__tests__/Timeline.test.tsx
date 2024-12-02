import { describe, it, expect } from 'vitest'
import { render } from '../../test/test-utils'
import Timeline from '../Timeline'

describe('Timeline', () => {
  const steps = ['Step 1', 'Step 2', 'Step 3']

  it('renders all steps', () => {
    const { getByText } = render(<Timeline steps={steps} currentStep={1} />)
    steps.forEach(step => {
      expect(getByText(step)).toBeDefined()
    })
  })

  it('shows check mark for completed steps', () => {
    const { container } = render(<Timeline steps={steps} currentStep={2} />)
    const checkIcons = container.querySelectorAll('.lucide-check')
    expect(checkIcons.length).toBe(1) // First step should show check
  })

  it('shows numbers for upcoming steps', () => {
    const { getByText } = render(<Timeline steps={steps} currentStep={1} />)
    expect(getByText('2')).toBeDefined()
    expect(getByText('3')).toBeDefined()
  })

  it('applies correct styling for current step', () => {
    const { container } = render(<Timeline steps={steps} currentStep={2} />)
    const stepElements = container.querySelectorAll('.bg-primary')
    expect(stepElements.length).toBe(2) // Current and completed steps
  })
})
