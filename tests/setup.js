import { vi } from 'vitest';
import axios from './unit/__mocks__/axios';
import { loadImageStub } from './unit/__mocks__/loadImageStub';

vi.mock('axios', () => {
  return {
    default: axios,
  };
});
vi.mock('@/helpers/LoadImage', () => {
  return {
    loadImage: loadImageStub,
  };
});
