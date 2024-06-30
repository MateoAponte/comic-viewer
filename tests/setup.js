import { vi } from 'vitest';
import axios from './unit/__mocks__/axios';

vi.mock('axios', () => {
  return {
    default: axios,
  };
});
