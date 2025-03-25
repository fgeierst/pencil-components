import { html } from 'lit';
import type { Meta } from '@storybook/web-components';
import { expect, userEvent } from '@storybook/test';

import type { PenInput } from './pen-input';
import { waitForHydration } from '../../utils/storybook-test.utils';

const meta = {
  title: 'Components/Input',
  args: {
    label: 'Name',
    description: '',
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
  },
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-input');
    await waitForHydration(component);
    const input = component.shadowRoot.querySelector('input');

    await userEvent.type(input, 'John Doe');

    expect(input.value).toBe('John Doe');
  },
  render: ({ label, description }) => html`<pen-input label=${label} description=${description}></pen-input>`,
} satisfies Meta<PenInput>;

export default meta;

export const Default = {};

export const WithDescription = {
  args: {
    description: 'Enter your name',
  },
};

export const Form = {
  args: {
    label: 'Form Name',
    description: 'Enter your form name',
  },
};
