export interface ComicActions {
  fetchAndUpdateComicData: () => Promise<void>;
  updateComicNumber: (value: number) => void;
}
