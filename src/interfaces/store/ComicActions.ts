import { ComicControllers, ComicDataStore } from '../../types/ComicDataStore';

export interface ComicActions {
  fetchAndUpdateComicData: (query?: number) => Promise<void>;
  updateComicNumber: (value?: number) => void;
  updateComicLoader: (value?: boolean) => void;
  updateComicControllers: (val: ComicControllers) => void;
  updateComicRating: (comicData: ComicDataStore, rating: number) => void;
}
