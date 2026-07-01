import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the read-me-view url', async ({ page }) => {
  await page.goto(ROUTES.READ_ME_VIEW.path)

  const container = page.locator('.read-me-view')

  await expect(container).toContainClass('read-me-view')
  await expect(container).toBeAttached()
})
