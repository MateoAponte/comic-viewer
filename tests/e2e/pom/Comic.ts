import { expect } from '@playwright/test';
import { type Page } from '@playwright/test';
import { ComicPageInterface } from '../interfaces/ComicPageInterface';

export class Comic implements ComicPageInterface {
  public page;

  public loader;
  public titleSkeleton;
  public descriptionSkeleton;
  public dateSkeleton;

  public rightController;
  public leftController;
  public randomController;

  public lastValue;

  constructor(page: Page) {
    this.page = page;
  }

  async checkSkeletonInViewport() {
    const { page } = this;
    this.titleSkeleton = page.locator('.comic-preview__header-title--skeleton');
    this.descriptionSkeleton = page.locator('.comic-preview__content-description--skeleton');
    this.dateSkeleton = page.locator('.comic-preview__content-date--skeleton');

    await expect(this.dateSkeleton).toBeInViewport({ timeout: 10000 });
    await expect(this.descriptionSkeleton).toBeInViewport();
    await expect(this.titleSkeleton).toBeInViewport();

    await expect(this.dateSkeleton).not.toBeInViewport({ timeout: 10000 });
    await expect(this.descriptionSkeleton).not.toBeInViewport();
    await expect(this.titleSkeleton).not.toBeInViewport();
  }

  async setControlls() {
    const { page } = this;
    this.rightController = await page.locator('.comic-controller__control--right');
    this.randomController = await page.locator('.comic-controller__control--center');
    this.leftController = await page.locator('.comic-controller__control--left');
  }

  async getComicData(comicData, page) {
    this.page = page;
    const loader = await page.locator('.comic-loader');
    await expect(loader).not.toBeVisible({ timeout: 5000 });
    const starsModified = await page.locator('.fa.fa-star-o').all();
    expect(starsModified.length).toEqual(5);
    // Confirm that the information is correctly printed
    const title = (await page.locator('.comic-preview__header-title').textContent()) || '';
    const img = (await page.locator('.comic-preview__content-image-preview').getAttribute('alt')) || '';
    const num = (await page.locator('.comic-preview__header-num').textContent()) || '';
    const date = (await page.locator('.comic-preview__content-date').textContent()) || '';
    const description = (await page.locator('.comic-preview__content-description').textContent()) || '';

    this.lastValue = comicData.getData();
    comicData.updateData(title, img, num, date, description);
    expect(title?.length).toBeGreaterThan(0);
    expect(num?.length).toBeGreaterThan(0);
    expect(date?.length).toBeGreaterThan(0);
    expect(description?.length).toBeGreaterThan(0);
    expect(img?.length).toBeGreaterThan(0);
  }

  async compareWithLastComic(comicData) {
    let { date, description, img, num, title } = this.lastValue;
    expect(comicData.date).not.toEqual(date);
    expect(comicData.description).not.toEqual(description);
    expect(comicData.img).not.toEqual(img);
    expect(comicData.title).not.toEqual(title);
    expect(comicData.num).not.toEqual(num);
  }

  async checkLoaderAndRemove() {
    const { page } = this;
    const loader = await page.locator('.comic-loader');
    await expect(loader).toBeVisible();
  }

  async handleRightController() {
    await this.rightController.click();
    await this.checkLoaderAndRemove();
  }

  async handleLeftController() {
    await this.leftController.click();
    await this.checkLoaderAndRemove();
  }

  async handleRandomController() {
    await this.randomController.click();
    await this.checkLoaderAndRemove();
  }

  async getStarsAndSelect(startToSelect, page, reset) {
    const stars = await page.locator(reset ? '.fa.fa-star-o' : '.fa').all();
    reset && expect(stars.length).toEqual(5);
    await stars[startToSelect - 1].click();
    const starsModified = await page.locator('.fa.fa-star').all();
    expect(starsModified.length).toEqual(startToSelect);
  }
}

export default {};
