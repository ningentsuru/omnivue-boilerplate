import { test, expect } from '@playwright/test'
import { ROUTES } from '../src/constants/index.js'

test('visits the optimized-data-list-view url', async ({ page }) => {
  await page.goto(ROUTES.OPTIMIZED_DATA_LIST_VIEW.path)

  const container = page.getByTestId('optimized-data-list-view')

  await expect(container).toBeAttached()
})
