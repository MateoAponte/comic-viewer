import ComicApi from '../api/ComicApi';
import { ComicResponse } from '../interfaces/ComicResponse';
import { ComicActions } from '../interfaces/store/ComicActions';
import { state } from './state';
import { DateTime } from 'luxon';

export const actions: ComicActions = {
  async fetchAndUpdateComicData() {
    this.updateComicLoader(true);
    const response: ComicResponse = await ComicApi.fetchComicByQuery(state.comicNumber.value).finally(() => {});

    const { month, day, year, num, alt, img, title, link } = response;

    // Crear una promesa para cargar la imagen
    const loadImage = (src: any) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(new Error('Error loading image'));
        img.src = src;
      });
    };

    // Esperar a que la imagen se cargue
    await loadImage(img).finally(() => {
      this.updateComicLoader(false);
    });

    const date = !!month && !!day && !!year ? DateTime.fromObject({ year, month, day }).toFormat('MMMM dd, yyyy') : '';
    const number = !!num ? `# ${num}` : '';
    state.comicData.value = {
      title,
      img,
      date,
      description: alt,
      num: number,
      link,
    };
  },
  updateComicNumber(value) {
    const randomNumber = Math.floor(Math.random() * (2952 - 1 + 1) + 1);
    state.comicNumber.value = !value ? randomNumber : value;
  },
  updateComicLoader(value) {
    state.comicLoader.value = value;
  },
};
