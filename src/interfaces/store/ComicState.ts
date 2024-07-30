import { ComicControllers, ComicDataStore } from '../../types/ComicDataStore';
import { ComicData } from './ComicData';
import { ref } from 'vue';

export interface ComicState {
  comicData: ref<ComicDataStore>;
  comicPreferences: ref<Array<ComicData>>;
  comicNumber: ref<number>;
  comicLoader: ref<boolean>;
  comicControllers: ref<ComicControllers>;
  ratedComics: ref<Array<ComicData>>;
}
