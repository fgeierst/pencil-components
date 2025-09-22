import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta = {
  title: 'Components/Toast Container',
  component: 'pen-toast-container',
  render: ({}) => html`<pen-toast-container></pen-toast-container>`,
  play: async ({ canvasElement, args }) => {
    const container = canvasElement.querySelector('pen-toast-container');
    args.toasts.forEach((label, index) => {
      setTimeout(() => {
        const toast = document.createElement('pen-toast');
        toast.setAttribute('label', label);
        container.appendChild(toast);
      }, (index + 1) * 2000);
    });
  },
  args: { toasts: ['First toast', 'Second toast', 'Third toast'] },
} satisfies Meta<{ toasts: string[] }>;

export default meta;

export const Default: StoryObj = {};

export const Manual: StoryObj = {
  args: {
    toasts: ['First toast', 'Second toast', 'Third toast'],
  },
  play: async () => {},
  decorators: [
    story =>
      html`<pen-button
          @click="${() => {
            setTimeout(() => {
              const toast = document.createElement('pen-toast');
              toast.setAttribute('label', faker.book.title());
              document.querySelector('pen-toast-container').appendChild(toast);
            }, 1000);
          }}"
          >Show Toast</pen-button
        >
        ${story()}`,
  ],
  render: () => html`<pen-toast-container></pen-toast-container>`,
};
