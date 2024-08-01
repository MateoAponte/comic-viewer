import { Ref } from 'vue';
import { ComicControllers, ComicDataStore } from '../../types/ComicDataStore';
import { ComicData } from './ComicData';
import { ComicRated } from '../ComicResponse';

export interface ComicState {
  comicData: Ref<ComicDataStore>;
  comicPreferences: Ref<Array<ComicData>>;
  comicNumber: Ref<number>;
  comicLoader: Ref<boolean>;
  comicControllers: Ref<ComicControllers>;
  ratedComics: Ref<Array<ComicRated>>;
}
