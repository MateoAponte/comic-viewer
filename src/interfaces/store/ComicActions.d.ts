export interface ComicActions {
  fetchAndUpdateComicData: () => Promise<void>;
  updateComicNumber: (value?: number) => void;
  updateComicLoader: (value?: boolean) => void;
}
