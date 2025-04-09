import { expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';

it('renders', async () => {
  const screen = render(html`<pen-input label="My input"></pen-input>`);
  const input = screen.getByRole('textbox', {
    name: 'My input',
  });
  await expect.element(input).toBeInTheDocument();

  await input.fill('My value');
  await expect.element(input).toHaveValue('My value');
});
