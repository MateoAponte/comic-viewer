export interface ComicActions {
  fetchAndUpdateComicData: (query: number) => Promise<void>;
  updateComicNumber: (value?: number) => void;
  updateComicLoader: (value?: boolean) => void;
}
