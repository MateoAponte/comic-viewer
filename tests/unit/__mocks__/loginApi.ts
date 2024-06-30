import { vi } from 'vitest';

class LoginApi {
  authSession = vi.fn((context: string) => {
    return Promise.resolve();
  });

  passwordValidationToken = vi.fn(() => {
    return Promise.resolve();
  });

  forgotPassword = vi.fn(() => {
    return Promise.resolve();
  });

  tokenValidation = vi.fn(() => {
    return Promise.resolve();
  });
}

export default new LoginApi();
