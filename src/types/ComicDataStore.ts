import { ComicData } from '../interfaces/store/ComicData';

export type ComicDataStore = ComicData | null;

export interface ComicControllers {
  first?: number;
  current?: number;
  last?: number;
}
