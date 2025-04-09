import { expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';

it('renders', async () => {
  const screen = render(html`<pen-combobox label="My Favorite Color" data-testid="pen-combobox">
    <pen-combobox-option value="red">Red</pen-combobox-option>
    <pen-combobox-option value="blue">Blue</pen-combobox-option>
    <pen-combobox-option value="green">Green</pen-combobox-option>
  </pen-combobox>`);
  const element = screen.getByRole('combobox', {
    name: 'My Favorite Color',
  });
  await expect.element(element).toBeInTheDocument();
});
