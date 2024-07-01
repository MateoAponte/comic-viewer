import { Locator, Page } from '@playwright/test';
import { ComicPreviewInterface, ComicProperties } from './ComicPreviewInfo';

export interface ComicPageInterface {
  page: Page;
  loader: Locator;
  titleSkeleton: Locator;
  descriptionSkeleton: Locator;
  dateSkeleton: Locator;

  rightController: Locator;
  leftController: Locator;
  randomController: Locator;

  lastValue: ComicProperties;

  checkSkeletonInViewport: () => void;
  setControlls: () => void;
  handleRightController: () => void;
  handleLeftController: () => void;
  handleRandomController: () => void;
  checkLoaderAndRemove: () => void;
  getComicData: (comicData: ComicPreviewInterface, page: Page) => void;
  compareWithLastComic: (comicData: ComicPreviewInterface) => void;
  getStarsAndSelect: (startToSelect: number, page: Page, reset: Boolean) => void;
}
