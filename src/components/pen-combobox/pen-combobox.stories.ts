import { html } from 'lit';
import type { Meta } from '@storybook/web-components';
import { expect, userEvent, waitFor } from '@storybook/test';
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

export const Dismissal = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-combobox');
    await waitForHydration(component);
    const input = component.shadowRoot.querySelector('input[type="combobox"]');
    const modal = component.shadowRoot.querySelector('dialog');

    await userEvent.type(input, 'apple');
    waitFor(() => {
      expect(modal.open).toBe(true);
    });

    await userEvent.keyboard('{Escape}'); // Escape key
    await waitFor(() => {
      expect(modal.open).toBe(false);
    });
  },
};

export const Filtering = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-combobox');
    await waitForHydration(component);
    const input = component.shadowRoot.querySelector('input[type="combobox"]');
    const modal = component.shadowRoot.querySelector('dialog');
    const options = canvasElement.querySelectorAll('pen-combobox-option');

    expect(modal).not.toBeVisible();

    await userEvent.type(input, 'apple');
    expect(modal).toBeVisible();
    expect(options[0]).toBeVisible();
    expect(options[1]).not.toBeVisible();
  },
};

export const Selecting = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-combobox');
    await waitForHydration(component);
    const input = component.shadowRoot.querySelector('input[type="combobox"]');
    const modal = component.shadowRoot.querySelector('dialog');
    const options = canvasElement.querySelectorAll('pen-combobox-option');

    // select first option
    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(modal).toBeVisible();
    });
    expect(options[0].selected).toBe(true);

    // select second option
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(options[0].selected).toBe(false);
      expect(options[1].selected).toBe(true);
    });
  },
};
