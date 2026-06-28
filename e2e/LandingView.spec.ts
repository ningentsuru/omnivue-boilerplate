import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the app root url', async ({ page }) => {
  await page.goto(ROUTES.LANDING_VIEW.path)

  const container = page.locator('.landing-view')

  await expect(container).toContainClass('landing-view')
  await expect(container).toBeAttached()
})
