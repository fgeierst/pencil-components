import { newE2EPage } from '@stencil/core/testing';

describe('pen-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pen-button></pen-button>');

    const element = await page.find('pen-button');
    expect(element).toHaveClass('hydrated');
  });
});
