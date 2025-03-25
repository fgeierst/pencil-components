import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn, userEvent, waitFor, expect } from '@storybook/test';
import { PenButton } from './pen-button';
import { waitForHydration } from '../../utils/storybook-test.utils';

interface ExendedStoryObj extends PenButton {
  content: string;
  click: () => void;
}

const meta = {
  title: 'Components/Button',
  component: 'pen-button',
  args: {
    content: '<strong>My Button</strong>',
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
  play: async ({ canvasElement, args }) => {
    const component = canvasElement.querySelector('pen-button');
    await waitForHydration(component);
    const button = component.shadowRoot.querySelector('button');

    await userEvent.click(button);

    await waitFor(() => expect(args.click).toHaveBeenCalled());
  },
  render: ({ content, click }) => html`<pen-button @click=${click}>${unsafeHTML(content)}</pen-button>`,
} satisfies Meta<ExendedStoryObj>;

export default meta;

export const Default: StoryObj = {};

export const LongLabel: StoryObj = {
  args: {
    content: 'This is a very long label for a button that should be tested for overflow',
  },
};
