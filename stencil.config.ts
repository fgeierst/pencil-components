import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'pencil-components',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'docs-vscode',
      file: 'vscode-data.json',
    },
  ],
  testing: {
    browserHeadless: 'shell',
    // browserHeadless: false, // headed browser mode
    testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  },
  devServer: {
    reloadStrategy: 'pageReload',
  },
};
