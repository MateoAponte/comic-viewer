import { test, expect } from './SetUp';

test.describe('Test the user interaction flows with the Comic Generator Web', () => {
  test('Should load the skeleton view on firts load', async ({ page }) => {
    const loader = page.locator('.v-spinner');
    const titleSkeleton = page.locator('.comic-preview__header-title--skeleton');
    const descriptionSkeleton = page.locator('.comic-preview__content-description--skeleton');
    const dateSkeleton = page.locator('.comic-preview__content-date--skeleton');
    expect(loader).toBeVisible();
    expect(dateSkeleton).toBeVisible();
    expect(descriptionSkeleton).toBeVisible();
    expect(titleSkeleton).toBeVisible();
  });
  test('Shouldn´t permit the access of the form when an generic error ocurred', async ({ login, page }) => {
    await login.fillLoginFields('wrong_user', '123');
    await expect(login.nameInput).toBeInViewport();
    await expect(login.passInput).toBeInViewport();
    await expect(login.nameInput).toHaveClass(/(-{2})error/g);
    await expect(login.passInput).toHaveClass(/(-{2})error/g);

    const banner = page.locator('.oaq-banner');
    await expect(banner).toHaveClass(/(-{2})danger/g);
    await expect(banner).toContainText('Sorry, your email or password is incorrect. Please try again or contact support if you forgot your password.');
  });
});
