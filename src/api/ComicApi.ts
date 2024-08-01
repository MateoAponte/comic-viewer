import axios, { AxiosResponse } from 'axios';
import { ComicFetchResponse, ComicRated } from '../interfaces/ComicResponse';
import { CODES_RESPONSE } from '../contants/code';

class ComicApi {
  private comicEndpointQueryUrl: string;
  private comicEndpointCurrentUrl: string;
  private comicEndpointRatedUrl: string;

  constructor() {
    this.comicEndpointQueryUrl = import.meta.env.VITE_APP_COMIC_API_QUERY_URL;
    this.comicEndpointCurrentUrl =
      import.meta.env.VITE_APP_COMIC_API_CURRENT_URL;
    this.comicEndpointRatedUrl = import.meta.env.VITE_APP_COMIC_API_RATED_URL;
  }

  public async fetchAllComics(): Promise<ComicFetchResponse> {
    try {
      const response: AxiosResponse<ComicFetchResponse> = await axios.get(
        `${this.comicEndpointRatedUrl}`
      );

      return response.data || [];
    } catch (err) {
      return { code: CODES_RESPONSE.CODE_ERROR, error: true };
    }
  }

  public async fetchCurrentComic(): Promise<ComicFetchResponse> {
    try {
      const response: AxiosResponse<ComicFetchResponse> = await axios.get(
        `${this.comicEndpointCurrentUrl}`
      );
      return response.data;
    } catch (error) {
      return { code: CODES_RESPONSE.CODE_ERROR, error: true };
    }
  }

  public async fetchComicByQuery(query: number): Promise<ComicFetchResponse> {
    try {
      if (typeof query !== 'number') throw 'No same type';
      const response: AxiosResponse<ComicFetchResponse> = await axios.get(
        `${this.comicEndpointQueryUrl}?query=${query}`
      );
      return response.data;
    } catch (error) {
      return { code: CODES_RESPONSE.CODE_ERROR, error: true };
    }
  }

  public async setRatingComic(
    user: number,
    ratedComic: ComicRated
  ): Promise<ComicFetchResponse> {
    try {
      if (typeof user !== 'number') throw 'No same type';
      const response: AxiosResponse<ComicFetchResponse> = await axios.post(
        `${this.comicEndpointRatedUrl}`,
        {
          data: { rating: JSON.stringify(ratedComic), user },
        }
      );
      return response.data;
    } catch (error) {
      return { code: CODES_RESPONSE.CODE_ERROR, error: true };
    }
  }

  public async deleteComicById(
    user: number,
    comicNum: number
  ): Promise<ComicFetchResponse> {
    try {
      const response: AxiosResponse<ComicFetchResponse> = await axios.delete(
        `${this.comicEndpointRatedUrl}`,
        {
          params: {
            userId: user,
            comicId: comicNum,
          },
        }
      );
      return response.data;
    } catch (error) {
      return { code: CODES_RESPONSE.CODE_ERROR, error: true };
    }
  }
}

export default new ComicApi();
