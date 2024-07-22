import ComicApi from '../api/ComicApi';
import { loadImage } from '../helpers/LoadImage';
import { ComicFetchResponse } from '../interfaces/ComicResponse';
import { ComicActions } from '../interfaces/store/ComicActions';
import { state } from './state';
import { DateTime } from 'luxon';

export const actions: ComicActions = {
  async fetchAndUpdateComicData(query) {
    // The method that trigger the loader
    this.updateComicLoader(true);
    try {
      let response: ComicFetchResponse;
      if (!!query) {
        response = await ComicApi.fetchComicByQuery(query).catch((err) => {
          return err;
        });
      } else {
        response = await ComicApi.fetchCurrentComic().catch((err) => {
          return err;
        });
      }

      // Check if the response is an error
      if ('code' in response && response.error) {
        state.comicData.value = null;
        return;
      }
      // Check if the response is contains correctly the comic data
      if (
        !('title' in response) ||
        !('img' in response) ||
        !('num' in response)
      ) {
        throw new Error('Invalid response format');
      }

      if (!query) {
        const { num } = response;
        this.updateComicControllers({
          last: num,
        });
      }

      const { month, day, year, num, alt, img, title, link } = response;
      const getPrevious = num - 1;
      console.log(getPrevious);

      this.updateComicControllers({
        first: getPrevious <= 0 ? 0 : getPrevious,
        current: query || num,
      });

      // Makes a preload of the image
      await loadImage(img).finally(() => {
        this.updateComicLoader(false);
      });

      // Use luxon to parse the date to a easy to read format
      const date =
        !!month && !!day && !!year
          ? DateTime.fromObject({
              year: parseInt(year),
              month: parseInt(month),
              day: parseInt(day),
            }).toFormat('MMMM dd, yyyy')
          : '';
      const number = !!num ? `# ${num}` : '';
      state.comicData.value = {
        title,
        img,
        date,
        description: alt,
        num: number,
        link,
      };
    } catch (err) {
      console.error(err);
    }
  },
  updateComicControllers(value) {
    const copyComicControllers = { ...state.comicControllers.value };

    state.comicControllers.value = { ...copyComicControllers, ...value };
  },
  updateComicNumber(value) {
    // If the method is called without a param return a random ID, if have a param update with this value
    const randomNumber = Math.floor(Math.random() * (2952 - 1 + 1) + 1);
    state.comicNumber.value = !value ? randomNumber : value;
  },
  updateComicLoader(value) {
    state.comicLoader.value = value;
  },
};
