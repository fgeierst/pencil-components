import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta = {
  title: 'Components/Toast',
  component: 'pen-toast',
  args: {
    label: 'Hello from a toast',
  },
  argTypes: {
    label: {
      table: { category: 'props' },
      control: 'text',
      description: 'Text content displayed inside the toast',
    },
  },
  render: ({ label }) => html`<pen-toast label="${label}"></pen-toast>`,
} satisfies Meta<{ label: string }>;

export default meta;

export const Default: StoryObj = {};

export const LongContent: StoryObj = {
  args: {
    label: 'This is a much longer toast message that should wrap across multiple lines to demonstrate layout.',
  },
};
