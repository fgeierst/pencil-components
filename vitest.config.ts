import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    dir: 'vitest',
    include: ['**/*.vitest.ts'],
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
});
