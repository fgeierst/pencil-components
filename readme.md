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

[Stencil's unit tests](https://stenciljs.com/docs/unit-testing) are built upon Jest. 

```bash
pnpm test
pnpm test:watch
```
To use the [VSCode Jest extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest), make sure to set `"jest.jestCommandLine": "pnpm test -- "` in the workspace's *.vscode/setting.json*.