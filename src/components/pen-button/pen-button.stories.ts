import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Button',
  args: {
    textContent: 'Button',
  },
  argTypes: {
    textContent: {
      control: 'text',
    },
  },
} satisfies Meta;

export default meta;

export const Default = {
  render: args => html`<pen-button>${args.textContent}</pen-button>`,
} satisfies StoryObj;
