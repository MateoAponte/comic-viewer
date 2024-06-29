import { ComicDataStore } from '../../types/ComicDataStore';
import { ComicResponse } from '../ComicResponse';
import { ComicData } from './ComicData';

export interface ComicState {
  comicData: ComicDataStore;
  comicPreferences: Array<ComicData>;
  comicNumber: number;
}
