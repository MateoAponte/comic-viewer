import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@test': fileURLToPath(new URL('./tests', import.meta.url)),
      },
      setupFiles: ['dotenv/config', './tests/setup.js'],
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'tests/e2e/*', 'src/assets/*', 'playwright-report/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      reporters: ['verbose'],
      coverage: {
        reporter: ['lcov'],
        provider: 'istanbul', // or 'v8'
        reportsDirectory: './coverage',
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/**/*.js'],
      },
    },
  }),
);
