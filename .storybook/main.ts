import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.mdx', '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  viteFinal: async config => {
    return {
      ...config,
      server: {
        ...config.server,
        watch: {
          ...config.server?.watch,
          ignored: ['!**/dist/**'], // By default Vite ignores the dist folder, which breaks Storybooks HMR.
        },
      },
    };
  },
};
export default config;
