import { test } from './SetUp';
import { ComicPreviewInfo } from './interfaces/ComicPreviewInfo';

test.describe('Test the user interaction flows with the Comic Generator Web', () => {
  test('Should load the skeleton view on firts load', async ({ page, comic }) => {
    // Init variables to compare data
    const comicPreviewInfo = new ComicPreviewInfo();
    // Check skeleton
    await comic.checkSkeletonInViewport();
    // Confirm that the information is correctly printed
    await comic.getComicData(comicPreviewInfo, page);

    // Interact with next control and compare data
    await comic.setControlls();
    await comic.handleRightController();
    await comic.getComicData(comicPreviewInfo, page);
    await comic.compareWithLastComic(comicPreviewInfo);

    // Interact with previous control and compare data
    await comic.handleLeftController();
    await comic.handleLeftController();
    await comic.getComicData(comicPreviewInfo, page);
    await comic.compareWithLastComic(comicPreviewInfo);

    // Interact with random control and compare data
    await comic.handleRandomController();
    await comic.getComicData(comicPreviewInfo, page);
    await comic.compareWithLastComic(comicPreviewInfo);

    // Rate a comic and change the comic, this one gonna to check that the rating is reset and can update
    await comic.getStarsAndSelect(3, page, true);
    await comic.handleRandomController();
    await comic.getComicData(comicPreviewInfo, page);
    await comic.compareWithLastComic(comicPreviewInfo);

    await comic.getStarsAndSelect(1, page, true);
    await comic.handleRandomController();
    await comic.getComicData(comicPreviewInfo, page);
    await comic.compareWithLastComic(comicPreviewInfo);

    await comic.getStarsAndSelect(4, page, true);
    await comic.getStarsAndSelect(5, page, false);
    await comic.getStarsAndSelect(2, page, false);
  });
});
