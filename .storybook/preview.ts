import type { Preview } from '@storybook/web-components-vite';
import { defineCustomElements } from '../loader';
import '../dist/pencil-components/pencil-components.css';

defineCustomElements(window);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
