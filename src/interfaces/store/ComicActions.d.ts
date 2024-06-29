export interface ComicActions {
  fetchComic: () => Promise<void>;
  updateComicNumber: (value: number) => void;
}
