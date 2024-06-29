import { defineStore } from 'pinia';

import { state } from './state';
import { actions } from './actions';
import { getters } from './getters';

export const useComicStore = defineStore('useComicStore', () => {
  return {
    ...state,
    ...actions,
    ...getters,
  };
});
