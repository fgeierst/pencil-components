import { expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';

it('renders', async () => {
  const screen = render(html` <pen-button>Hello Pen Button!</pen-button> `);
  const element = screen.getByRole('button', {
    name: 'Hello Pen Button!',
  });
  await expect.element(element).toBeInTheDocument();
});
