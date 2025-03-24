import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from '@storybook/test';

const meta: Meta = {
  title: 'Components/Button',
  component: 'pen-button',
  args: {
    content: 'My Button',
    click: fn(),
  },
  argTypes: {
    content: {
      table: {
        category: 'slots',
      },
    },
    click: {
      table: {
        category: 'events',
      },
    },
  },
  render: ({ content, click }) => html`<pen-button @click=${click}>${content}</pen-button>`,
};

export default meta;

export const Default: StoryObj = {};

export const LongLabel: StoryObj = {
  args: {
    content: 'This is a very long label for a button that should be tested for overflow',
  },
};
