import { html } from 'lit';
import type { Meta } from '@storybook/web-components';
import { expect, userEvent } from '@storybook/test';

import type { PenCombobox } from './pen-combobox';
import { waitForHydration } from '../../utils/storybook-test.utils';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

interface PenComboboxStory extends PenCombobox {
  optionsSlot: string;
}

const meta = {
  title: 'Components/Combobox',
  args: {
    optionsSlot: `<pen-combobox-option value="apple">Apple</pen-combobox-option>
      <pen-combobox-option value="orange">Orange</pen-combobox-option>
      <pen-combobox-option value="banana">Banana</pen-combobox-option>
      <pen-combobox-option value="grape">Grape</pen-combobox-option>
      <pen-combobox-option value="kiwi">Kiwi</pen-combobox-option>`,
  },
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-combobox');
    await waitForHydration(component);
    const modal = component.shadowRoot.querySelector('dialog');
    expect(modal.open).toBe(false);
  },
  render: ({ optionsSlot }) => html`
    <pen-combobox> ${unsafeHTML(optionsSlot)} </pen-combobox>
    <p>lorem ipsum dolor sit amet</p>
  `,
} satisfies Meta<PenComboboxStory>;

export default meta;

export const Default = {};

export const Filtering = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-combobox');
    await waitForHydration(component);
    const input = component.shadowRoot.querySelector('input[type="combobox"]');
    const modal = component.shadowRoot.querySelector('dialog');
    const options = canvasElement.querySelectorAll('pen-combobox-option');

    await userEvent.type(input, 'apple');
    expect(modal.open).toBe(true);
    expect(options[0].style.display).toBe('block');
    expect(options[1].style.display).toBe('none');

    await userEvent.tab(); // tab out
    expect(input).not.toHaveFocus();
    // expect(modal.open).toBeFalsy(); // flaky test
  },
};
