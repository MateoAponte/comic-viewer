import axios, { AxiosResponse } from 'axios';
import { ComicFetchResponse } from '../interfaces/ComicResponse';
import { CODES_RESPONSE } from '../contants/code';

class ComicApi {
  private comicEndpointUrl: string;

  constructor() {
    this.comicEndpointUrl = import.meta.env.VITE_APP_COMIC_API_URL;
  }

  public async fetchComicByQuery(query: number): Promise<ComicFetchResponse> {
    try {
      if (typeof query !== 'number') throw 'No same type';
      const response: AxiosResponse<ComicFetchResponse> = await axios.get(`${this.comicEndpointUrl}/${query}/info.0.json`);
      return response.data;
    } catch (error) {
      return { code: CODES_RESPONSE.CODE_ERROR, error: true };
    }
  }
}

export default new ComicApi();
