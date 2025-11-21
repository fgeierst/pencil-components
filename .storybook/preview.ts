import { setCustomElementsManifest, type Preview } from '@storybook/web-components-vite';
import manifest from "../custom-elements.json" with { type: "json" };
import '../dist/pencil-components/pencil-components.css';
import { defineCustomElements } from '../loader';

setCustomElementsManifest(manifest);
defineCustomElements(window);

const preview: Preview = {
  parameters: {
    docs: {
      codePanel: true,
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
