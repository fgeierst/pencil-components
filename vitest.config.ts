import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    dir: 'src',
    include: ['**/*.test.ts'],
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
});
