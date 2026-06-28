import { vi } from 'vitest'

vi.mock('/linkedin.ico', () => ({
  default: 'mocked-linkedin-icon',
}))

vi.mock('/github.ico', () => ({
  default: 'mocked-github-icon',
}))
