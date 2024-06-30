import { ComicDataStore } from '../../types/ComicDataStore';
import { ComicResponse } from '../ComicResponse';
import { ComicData } from './ComicData';
import { ref } from 'vue';

export interface ComicState {
  comicData: ref<ComicDataStore>;
  comicPreferences: ref<Array<ComicData>>;
  comicNumber: ref<number>;
  comicLoader: ref<boolean>;
}
