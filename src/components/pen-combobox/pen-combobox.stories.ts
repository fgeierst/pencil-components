import { html } from 'lit';
import type { Meta } from '@storybook/web-components';
import { expect, userEvent } from '@storybook/test';

import type { PenCombobox } from './pen-combobox';
import { waitForHydration } from '../../utils/storybook-test.utils';

const meta = {
  title: 'Components/Combobox',
  args: {},
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-combobox');
    await waitForHydration(component);
  },
  render: ({}) => html`
    <pen-combobox>
      <pen-combobox-item value="apple">Apple</pen-combobox-item>
      <pen-combobox-item value="orange">Orange</pen-combobox-item>
    </pen-combobox>
    <p>lorem ipsum dolor sit amet</p>
  `,
} satisfies Meta<PenCombobox>;

export default meta;

export const Default = {};
