import { test as base, type Page } from '@playwright/test';
import { Comic } from './pom/Comic';
import { ComicPageInterface } from './interfaces/ComicPageInterface';

export const test = base.extend<{ comic: ComicPageInterface; page: Page }>({
  comic: async ({ page }, use) => {
    await page.goto('https://www.comic-generator.online/');
    const ComicInfo = new Comic(page);
    await use(ComicInfo);
  },
  page: async ({ page }, use) => {
    await page.goto('https://www.comic-generator.online/');
    await use(page);
  },
});
export { expect } from '@playwright/test';
