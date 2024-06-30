import ComicApi from '@/api/ComicApi';
import axios from 'axios';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import ComicJson from '../__mocks__/payloads/comic.json';
import { CODES_RESPONSE } from '@/contants/code';
import axiosMocked from '../__mocks__/axios';

const getObjectRequest = (url) => {
  return {
    url,
  };
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('The Login API File should works correctly and call axios to comunicate with the endpoints', () => {
  test('Should call the fetchComicByQuery method and this gonna call the axios.request method', async () => {
    axiosMocked.get.mockResolvedValueOnce({ data: ComicJson });
    const QUERY = 5;
    const response = await ComicApi.fetchComicByQuery(QUERY);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${getObjectRequest(import.meta.env.VITE_APP_COMIC_API_URL).url}/${QUERY}/info.0.json`);
    expect(response).toEqual(ComicJson);
  });
  test('Should call the fetchComicByQuery method and show an error when the param is invalid', async () => {
    const auth = await ComicApi.fetchComicByQuery(undefined);
    expect(auth).toEqual({ code: CODES_RESPONSE.CODE_ERROR, error: true });
  });
  test('Should call the fetchComicByQuery method and show an error when endpoints failed', async () => {
    const QUERY = 5;

    axiosMocked.get.mockRejectedValueOnce(new Error('Endpoint failed'));
    expect(axios.get).rejects.toThrowError('Endpoint failed');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
