import { newE2EPage } from '@stencil/core/testing';

describe('pen-combobox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pen-combobox></pen-combobox>');

    const element = await page.find('pen-combobox');
    expect(element).toHaveClass('hydrated');
  });
});
