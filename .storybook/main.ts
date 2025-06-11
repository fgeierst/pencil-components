import type { StorybookConfig } from '@storybook/web-components-vite';
// import dynamicImport from 'vite-plugin-dynamic-import';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.mdx', '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-webpack5-compiler-swc'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
    builder: {
      name: '@storybook/builder-webpack5',
      options: {},
    },
  },
};
export default config;
