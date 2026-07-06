import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the profile-view url', async ({ page }) => {
  await page.goto(ROUTES.PROFILE_VIEW.path)

  const container = page.locator('.profile-view')

  await expect(container).toContainClass('profile-view')
  await expect(container).toBeAttached()
})
