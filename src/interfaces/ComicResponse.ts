export interface ComicResponse {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
  date?: string;
}

export interface ComicError {
  code: number;
  error: boolean;
}

export type ComicFetchResponse = ComicResponse | ComicError;

export interface ComicRated {
  num: number;
  title: string;
  img: string;
  alt: string;
  rating: number;
}

export type ComicRateResponse = ComicRated | ComicError;
