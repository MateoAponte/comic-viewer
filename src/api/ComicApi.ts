import axios from 'axios';

class ComicApi {
  private comicEndpointUrl: string;

  constructor() {
    this.comicEndpointUrl = import.meta.env.VUE_APP_COMIC_API_URL;
  }

  public async fetchComicByQuery(query: string) {
    return axios.get(`${this.comicEndpointUrl}.${query}.json`);
  }
}

export default new ComicApi();
