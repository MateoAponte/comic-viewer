import { vi } from 'vitest';

module.exports = {
  get: vi.fn(() => {
    return Promise.resolve();
  }),
  post: vi.fn(),
  put: vi.fn(),
};
