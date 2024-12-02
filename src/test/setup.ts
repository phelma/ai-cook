import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect method with testing-library matchers
expect.extend(matchers)

// Mock fetch globally
global.fetch = vi.fn()

// Cleanup after each test case
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
