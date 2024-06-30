import { ref } from 'vue';
import { ComicState } from '../interfaces/store/ComicState';

export const state: ComicState = {
  comicData: ref(null),
  comicPreferences: ref([]),
  comicNumber: ref(0),
  comicLoader: ref(false),
};
