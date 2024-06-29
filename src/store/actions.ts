import { useComicStore } from '.';
import ComicApi from '../api/ComicApi';
import { ComicResponse } from '../interfaces/ComicResponse';
import { ComicActions } from '../interfaces/store/ComicActions';
import { state } from './state';

export const actions: ComicActions = {
  async fetchComic() {
    const response: ComicResponse = await ComicApi.fetchComicByQuery(state.comicNumber);
    state.comicData = response;
  },
  updateComicNumber(value) {
    const randomNumber = Math.floor(Math.random() * (2952 - 1 + 1) + 1);
    state.comicNumber = !value ? randomNumber : value;
  },
};
