import type { StorybookConfig } from '@storybook/web-components-vite';
// import dynamicImport from 'vite-plugin-dynamic-import';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.mdx', '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  // previewHead: head => `${head}
  //   <script type="module" src="/www/build/pencil-components.esm.js"></script>
  //   <script nomodule src="/www/build/pencil-components.js"></script>
  //   <link rel="stylesheet" href="/www/build/pencil-components.css">
  // `,
  core: {
    disableTelemetry: true,
  },
  // Dynamic import
  // https://github.com/baloise/design-system/issues/1690
  // async viteFinal(config) {
  //   // Merge custom configuration into the default config
  //   const { mergeConfig } = await import('vite');

  //   return mergeConfig(config, {
  //     plugins: [dynamicImport()],
  //   });
  // },
};
export default config;
