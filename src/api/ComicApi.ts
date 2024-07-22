import axios, { AxiosResponse } from 'axios';
import { ComicFetchResponse } from '../interfaces/ComicResponse';
import { CODES_RESPONSE } from '../contants/code';

class ComicApi {
  private comicEndpointQueryUrl: string;
  private comicEndpointCurrentUrl: string;

  constructor() {
    this.comicEndpointQueryUrl = import.meta.env.VITE_APP_COMIC_API_QUERY_URL;
    this.comicEndpointCurrentUrl =
      import.meta.env.VITE_APP_COMIC_API_CURRENT_URL;
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
}

export default new ComicApi();
