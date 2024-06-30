import ComicApi from '../api/ComicApi';
import { loadImage } from '../helpers/LoadImage';
import { ComicFetchResponse } from '../interfaces/ComicResponse';
import { ComicActions } from '../interfaces/store/ComicActions';
import { state } from './state';
import { DateTime } from 'luxon';

export const actions: ComicActions = {
  async fetchAndUpdateComicData(query) {
    this.updateComicLoader(true);
    try {
      const response: ComicFetchResponse = await ComicApi.fetchComicByQuery(query).catch((err) => {
        return err;
      });

      if ('code' in response && response.error) {
        state.comicData.value = null;
        return;
      }
      if (!('title' in response) || !('img' in response) || !('num' in response)) {
        throw new Error('Invalid response format');
      }
      const { month, day, year, num, alt, img, title, link } = response;

      // Esperar a que la imagen se cargue
      await loadImage(img).finally(() => {
        this.updateComicLoader(false);
      });

      const date =
        !!month && !!day && !!year ? DateTime.fromObject({ year: parseInt(year), month: parseInt(month), day: parseInt(day) }).toFormat('MMMM dd, yyyy') : '';
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
  updateComicNumber(value) {
    const randomNumber = Math.floor(Math.random() * (2952 - 1 + 1) + 1);
    state.comicNumber.value = !value ? randomNumber : value;
  },
  updateComicLoader(value) {
    state.comicLoader.value = value;
  },
};
