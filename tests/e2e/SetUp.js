import { test as base, type Page } from '@playwright/test';

export const test =
  base.extend <
  { page: Page } >
  {
    login: async ({ page }, use) => {
      await page.goto('http://127.0.0.1:5173');
      await page.getByRole('button', { name: 'Use endpoints' }).click();
      await page.getByText('Local values').click();
      await use(page);
    },
    page: async ({ page }, use) => {
      await page.goto('http://127.0.0.1:5173');
      await page.getByRole('button', { name: 'Use endpoints' }).click();
      await page.getByText('Local values').click();
      await use(page);
    },
  };
export { expect } from '@playwright/test';
