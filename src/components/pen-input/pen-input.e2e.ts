import { newE2EPage } from '@stencil/core/testing';

describe('pen-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pen-input></pen-input>');

    const element = await page.find('pen-input');
    expect(element).toHaveClass('hydrated');
  });
});
