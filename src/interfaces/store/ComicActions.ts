import { ComicControllers, ComicDataStore } from '../../types/ComicDataStore';
import {
  ComicFetchResponse,
  ComicRated,
  ComicResponse,
} from '../ComicResponse';
import { ComicData } from './ComicData';

export interface ComicActions {
  fetchAllComics: () => Promise<void>;
  fetchAndUpdateComicData: (query?: number) => Promise<void>;
  fetchComicByQuery: (query: number) => Promise<ComicFetchResponse>;
  fetchCurrentComic: () => Promise<ComicFetchResponse>;
  updateComicDataByFetch: (
    value: ComicFetchResponse | ComicResponse,
    query?: number
  ) => void;
  updateComicData: (value: ComicData) => void;
  updateComicNumber: (value?: number) => void;
  updateComicLoader: (value: boolean) => void;
  updateComicControllers: (val: ComicControllers) => void;
  updateComicRating: (comicData: ComicDataStore, rating: number) => void;
  updateCurrentComicRating: (comic: ComicResponse) => void;
  updateAllRatedComics: (value: Array<ComicRated>) => void;
  deleteComicById: (comic: ComicRated) => void;
}
