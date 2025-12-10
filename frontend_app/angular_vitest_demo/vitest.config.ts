import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['vitest.setup.ts', 'src/testing/**']
    },
    css: false
  }
});
