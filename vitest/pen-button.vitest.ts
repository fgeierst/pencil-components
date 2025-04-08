/// <reference types="@vitest/browser/matchers" />
/// <reference types="@vitest/browser/providers/playwright" />

import { expect, test } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { defineCustomElements } from '../loader/index.js';

test('renders button', async () => {
  defineCustomElements(window);
  const screen = render(html` <pen-button>Hello Pen Button!</pen-button> `);
  const element = screen.getByRole('button', {
    name: 'Hello Pen Button!',
  });
  await expect.element(element).toBeInTheDocument();
});

test('renders input', async () => {
  defineCustomElements(window);
  const screen = render(html`<pen-input data-testid="pen-input" label="Input Label"></pen-input>`);
  const element = screen.getByTestId('pen-input');
  await expect.element(element).toHaveClass('hydrated');

  const input = screen.getByRole('textbox', {
    name: 'Input Label',
  });
  await expect(input).toBeInTheDocument();

  await input.fill('My value');
  await expect(input).toHaveValue('My value');
});
