import { vi } from 'vitest';

module.exports = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  request: vi.fn()
};
