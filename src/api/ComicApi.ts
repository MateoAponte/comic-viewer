import axios, { AxiosResponse } from 'axios';
import { ComicResponse } from '../interfaces/ComicResponse';

class ComicApi {
  private comicEndpointUrl: string;

  constructor() {
    this.comicEndpointUrl = import.meta.env.VITE_APP_COMIC_API_URL;
  }

  public async fetchComicByQuery(query: number): Promise<ComicResponse> {
    const response: AxiosResponse<ComicResponse> = await axios.get(`${this.comicEndpointUrl}/${query}/info.0.json`);
    return response.data;
  }
}

export default new ComicApi();
