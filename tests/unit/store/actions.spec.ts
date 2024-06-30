import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { useComicStore } from '@/store/index';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ComicParsed from '../__mocks__/payloads/comicParsed.json';
import axios from 'axios';
import axiosMocked from '../__mocks__/axios';
import ComicJson from '../__mocks__/payloads/comic.json';

beforeEach(() => {
  vi.clearAllMocks();
});
const getObjectRequest = (url) => {
  return {
    url,
  };
};

describe('The Comic Action Store File should works correctly and should update the state correctly or call the endpoints', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Should call the updateComicNumber action when doont received a param, this one gonna generate by random way and update the comicNumber state', () => {
    const comicStore = useComicStore();
    const { comicNumber } = storeToRefs(comicStore);

    comicStore.updateComicNumber();
    expect(comicNumber.value).toBeGreaterThan(0);
    expect(comicNumber.value).toBeLessThan(2952);
  });

  it('Should call the updateComicNumber action when received a param, this one gonna be equal than the param and update the comicNumber state', () => {
    const comicStore = useComicStore();
    const { comicNumber } = storeToRefs(comicStore);

    comicStore.updateComicNumber(25);
    expect(comicNumber.value).toEqual(25);
  });

  it('Should call the updateComicLoader action with a false param, this one gonna update the comicLoader state', () => {
    const comicStore = useComicStore();
    const { comicLoader } = storeToRefs(comicStore);

    comicStore.updateComicLoader(false);
    expect(comicLoader.value).toBeFalsy();
  });

  it('Should call the updateComicLoader action with a true param, this one gonna update the comicLoader state', () => {
    const comicStore = useComicStore();
    const { comicLoader } = storeToRefs(comicStore);

    comicStore.updateComicLoader(true);
    expect(comicLoader.value).toBeTruthy();
  });

  it('Should update the fetchAndUpdateComicData action with a valid query param, this one gonna update the comicData state', async () => {
    axiosMocked.get.mockResolvedValueOnce({ data: ComicJson });
    const comicStore = useComicStore();
    const { comicData } = storeToRefs(comicStore);

    const QUERY = 25;
    await comicStore.fetchAndUpdateComicData(QUERY);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${getObjectRequest(import.meta.env.VITE_APP_COMIC_API_URL).url}/${QUERY}/info.0.json`);
    expect(comicData.value).toEqual(ComicParsed);
  });

  it('Should update the fetchAndUpdateComicData action with a invalid query param, failed and not update ComicData', async () => {
    const comicStore = useComicStore();
    const { comicData } = storeToRefs(comicStore);

    const QUERY = undefined;
    const res = await comicStore.fetchAndUpdateComicData(QUERY);

    expect(res).toEqual(undefined);
    expect(comicData.value).toEqual(null);
    expect(axios.get).toHaveBeenCalledTimes(0);
  });
});
