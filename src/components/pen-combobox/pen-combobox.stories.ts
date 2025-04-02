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
      <pen-combobox-option value="apple">Apple</pen-combobox-option>
      <pen-combobox-option value="orange">Orange</pen-combobox-option>
      <pen-combobox-option value="banana">Banana</pen-combobox-option>
      <pen-combobox-option value="grape">Grape</pen-combobox-option>
      <pen-combobox-option value="kiwi">Kiwi</pen-combobox-option>
    </pen-combobox>
    <p>lorem ipsum dolor sit amet</p>
  `,
} satisfies Meta<PenCombobox>;

export default meta;

export const Default = {};

export const FilterOptions = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-combobox');
    await waitForHydration(component);
    const input = component.shadowRoot.querySelector('input[type="combobox"]');
    const options = canvasElement.querySelectorAll('pen-combobox-option');

    await userEvent.type(input, 'apple');
    expect(options[0].style.display).toBe('block');
    expect(options[1].style.display).toBe('none');
  },
};
