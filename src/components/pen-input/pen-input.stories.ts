import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import type { PenInput } from './pen-input';

const meta = {
  title: 'Input',
  args: {
    label: 'Name',
    description: 'Enter your name',
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<PenInput>;

export default meta;

export const Default = {
  render: ({ label, description }) => html`<pen-input label=${label} description=${description}></pen-input>`,
} satisfies StoryObj<PenInput>;

export const WithDescription = {
  render: ({ label, description }) => html`<pen-input label=${label} description=${description}></pen-input>`,
} satisfies StoryObj<PenInput>;
