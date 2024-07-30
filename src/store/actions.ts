import ComicApi from '../api/ComicApi';
import { loadImage } from '../helpers/LoadImage';
import SessionMagagement from '../helpers/SessionMagagement';
import {
  ComicFetchResponse,
  ComicRated,
  ComicResponse,
} from '../interfaces/ComicResponse';
import { ComicActions } from '../interfaces/store/ComicActions';
import { state } from './state';
import { DateTime } from 'luxon';
import { ComicData } from '../interfaces/store/ComicData';

export const actions: ComicActions = {
  async updateComicDataByFetch(value, query) {
    // Check if the response is contains correctly the comic data
    if (!('title' in value) || !('img' in value) || !('num' in value)) {
      throw new Error('Invalid response format');
    }

    const { date, month, day, year, num, alt, img, title, link } = value;
    const getPrevious = num - 1;

    this.updateComicControllers({
      first: getPrevious <= 0 ? 0 : getPrevious,
      current: query || num,
    });

    // Makes a preload of the image
    await loadImage(img).finally(() => {
      this.updateComicLoader(false);
    });

    let newDate = '';
    // Use luxon to parse the date to a easy to read format
    if ('month' in value && 'day' in value && 'year' in value) {
      newDate =
        !!month && !!day && !!year
          ? DateTime.fromObject({
              year: parseInt(year),
              month: parseInt(month),
              day: parseInt(day),
            }).toFormat('MMMM dd, yyyy')
          : '';
    } else {
      newDate = date || '-';
    }
    const number = !!num ? `# ${num}` : '';
    state.comicData.value = {
      title,
      img,
      date: newDate,
      description: alt,
      num: number,
      link,
      rating: 0,
    };
  },
  async fetchAllComics() {
    return await ComicApi.fetchAllComics()
      .then((res) => {
        state.ratedComics.value = res;
      })
      .catch((err) => {
        return err;
      });
  },
  async fetchComicByQuery(query: number) {
    return await ComicApi.fetchComicByQuery(query).catch((err) => {
      return err;
    });
  },
  async fetchCurrentComic() {
    return await ComicApi.fetchCurrentComic().catch((err) => {
      return err;
    });
  },
  async fetchAndUpdateComicData(query) {
    // The method that trigger the loader
    this.updateComicLoader(true);

    try {
      let response: ComicFetchResponse;
      if (!!query) {
        response = await this.fetchComicByQuery(query);
      } else {
        response = await this.fetchCurrentComic();
        const { num } = response as ComicResponse;
        this.updateComicControllers({
          last: num,
        });
      }
      await this.updateComicDataByFetch(response, query);
      this.updateCurrentComicRating(response as ComicResponse);
    } catch (err) {
      console.error(err);
    }
  },
  updateCurrentComicRating(comic) {
    if (!!state.ratedComics.value.length) {
      const ratedComic = state.ratedComics.value.find(
        (item: ComicRated) => item.num === comic.num
      );
      state.comicData.value = {
        ...state.comicData.value,
        rating: ratedComic?.rating || 0,
      };
    }
  },
  updateAllRatedComics(allComics) {
    state.ratedComics.value = allComics;
  },
  updateComicControllers(value) {
    const copyComicControllers = { ...state.comicControllers.value };

    state.comicControllers.value = { ...copyComicControllers, ...value };
  },
  updateComicNumber(value) {
    // If the method is called without a param return a random ID, if have a param update with this value
    const randomNumber = Math.floor(
      Math.random() * (state.comicControllers.value.last - 1 + 1) + 1
    );
    state.comicNumber.value = !value ? randomNumber : value;
  },
  updateComicLoader(value) {
    state.comicLoader.value = value;
  },
  async updateComicRating(comic, rating) {
    const getComicNum = parseInt(
      comic?.num.toString().split('#').join('') || ''
    );
    const getUser = SessionMagagement.getSession();
    if (!!getComicNum && comic?.title) {
      const comicData = {
        num: getComicNum,
        title: comic.title,
        img: comic.img,
        date: comic.date,
        alt: comic.description,
        rating,
      };

      await ComicApi.setRatingComic(getUser, comicData).then(async (res) => {
        await actions.fetchAllComics();
        await actions.updateComicDataByFetch(res, state.comicNumber.value);
        this.updateCurrentComicRating(res as ComicResponse);
      });
    }
  },
  async deleteComicById(comic: ComicData) {
    const getComicNum = parseInt(
      comic?.num.toString().split('#').join('') || ''
    );
    const getUser = SessionMagagement.getSession();
    return await ComicApi.deleteComicById(getUser, getComicNum).then(
      async () => {
        const deletedData = { ...state.comicData.value, rating: null };
        await actions.fetchAllComics();
        await actions.updateComicDataByFetch(
          deletedData,
          state.comicNumber.value
        );
        this.updateCurrentComicRating(deletedData as ComicResponse);
      }
    );
  },
};
