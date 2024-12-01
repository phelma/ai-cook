import React from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Custom render function that includes providers if needed
function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
