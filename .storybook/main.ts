import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.mdx', '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  previewHead: head => `${head}
    <script type="module" src="/www/build/pencil-components.esm.js"></script>
    <script nomodule src="/www/build/pencil-components.js"></script>
    <link rel="stylesheet" href="/www/build/pencil-components.css">
  `,
};
export default config;
