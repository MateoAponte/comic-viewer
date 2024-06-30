import { vi } from 'vitest';
import axios from './unit/__mocks__/axios';

vi.stubGlobal('conf', conf.dev);
vi.mock('axios', () => {
  return {
    default: axios,
  };
});
