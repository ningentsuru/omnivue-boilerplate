import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the landing-view url', async ({ page }) => {
  await page.goto(ROUTES.LANDING_VIEW.path)

  const container = page.locator('.landing-view')

  await expect(container).toHaveClass('landing-view')
  await expect(container).toBeAttached()
})
