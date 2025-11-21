import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { expect, userEvent, waitFor } from 'storybook/test';
import { waitForHydration } from '../../utils/storybook-test.utils';
import type { PenCombobox } from './pen-combobox';

interface PenComboboxStory extends PenCombobox {
  optionsSlot: string;
}

const meta = {
  title: 'Components/Combobox',
  args: {
    label: 'Favorite fruit',
    optionsSlot: `<pen-combobox-option value="apple">Apple</pen-combobox-option>
      <pen-combobox-option value="orange">Orange</pen-combobox-option>
      <pen-combobox-option value="banana">Banana</pen-combobox-option>
      <pen-combobox-option value="grape">Grape</pen-combobox-option>
      <pen-combobox-option value="kiwi">Kiwi</pen-combobox-option>
      <pen-combobox-option value="mango">Mango</pen-combobox-option>
      <pen-combobox-option value="peach">Peach</pen-combobox-option>
      <pen-combobox-option value="pear">Pear</pen-combobox-option>
      <pen-combobox-option value="pineapple">Pineapple</pen-combobox-option>
      <pen-combobox-option value="strawberry">Strawberry</pen-combobox-option>
      <pen-combobox-option value="watermelon">Watermelon</pen-combobox-option>`,
  },
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-combobox');
    await waitForHydration(component);
    const popover = component.shadowRoot.querySelector('.popover');
    expect(popover).not.toBeVisible();
  },
  render: ({ label, optionsSlot }) => html`
    <pen-combobox label="${label}"> ${unsafeHTML(optionsSlot)} </pen-combobox>
    <p>lorem ipsum dolor sit amet</p>
  `,
} satisfies Meta<PenComboboxStory>;

export default meta;

export const Default = {};

export const Dismissal = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-combobox');
    await waitForHydration(component);
    const input = component.shadowRoot.querySelector('input[type="text"]');
    const popover = component.shadowRoot.querySelector('.popover');

    await userEvent.type(input, 'apple');
    waitFor(() => {
      expect(popover).toBeVisible();
    });

    await userEvent.keyboard('{Escape}'); // Escape key
    await waitFor(() => {
      expect(popover).not.toBeVisible();
    });
  },
};

export const Filtering = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector('pen-combobox');
    await waitForHydration(component);
    const input = component.shadowRoot.querySelector('input[type="text"]');
    const popover = component.shadowRoot.querySelector('.popover');
    const options = canvasElement.querySelectorAll('pen-combobox-option');

    await expect(popover).not.toBeVisible();

    await userEvent.type(input, 'apple');
    await expect(popover).toBeVisible();
    await expect(options[0]).toBeVisible();
    await expect(options[1]).not.toBeVisible();
  },
};

// export const Selecting = {
//   play: async ({ canvasElement }) => {
//     const component = canvasElement.querySelector('pen-combobox');
//     await waitForHydration(component);
//     const input = component.shadowRoot.querySelector('input[type="text"]');
//     const popover = component.shadowRoot.querySelector('.popover');
//     const options = canvasElement.querySelectorAll('pen-combobox-option');

//     // select first option
//     await userEvent.type(input, '{ArrowDown}');
//     await waitFor(() => {
//       expect(popover).toBeVisible();
//     });
//     expect(options[0].selected).toBe(true);

//     // select second option
//     await userEvent.keyboard('{ArrowDown}');
//     await waitFor(() => {
//       expect(options[0].selected).toBe(false);
//       expect(options[1].selected).toBe(true);
//     });
//   },
// };
