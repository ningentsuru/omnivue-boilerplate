import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the mobile-features-view url', async ({ page }) => {
  await page.goto(ROUTES.MOBILE_FEATURES_VIEW.path)

  const container = page.locator('.mobile-features-view')

  await expect(container).toContainClass('mobile-features-view')
  await expect(container).toBeAttached()
})
