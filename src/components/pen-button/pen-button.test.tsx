import { expect, test } from 'vitest';

import './pen-button';

test('should render component correctly', async () => {
  const button = document.createElement('pen-button');
  button.innerText = `Click me`;
  document.body.appendChild(button);

  await new Promise(resolve => requestIdleCallback(resolve));
  expect(button.shadowRoot?.querySelector('div')?.innerText).toBe(`Click me`);
});
