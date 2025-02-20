# Pencil Components

This is a demo for building Web Components using Stencil.


## Getting Started

```bash
git clone https://github.com/fgeierst/pencil-components.git
cd pencil-components
pnpm install
pnpm start
```

## Storybook

```bash
pnpm storybook
```

## Testing 

The [Stencil test runnner](https://stenciljs.com/docs/testing/stencil-testrunner/overview) is built upon Jest and Puppeteer.

```bash
pnpm test
pnpm test:watch
```
- To use the [VSCode Jest extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest), make sure to set `"jest.jestCommandLine": "pnpm test -- "` in the workspace's *.vscode/setting.json*.
- Pupeteer headed mode can be enabled in *stencil.config.ts* with `testing.browserHeadless: false`. 
- To prevent the browser window to immediately close, add a timeout to the test file `await new Promise(r => setTimeout(r, 15000))`.