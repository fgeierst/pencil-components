import { newE2EPage } from '@stencil/core/testing';

describe('pen-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><pen-input label="My Label"></pen-input></form>');

    const element = await page.find('pen-input');
    expect(element).toHaveClass('hydrated');

    console.log('element', element.shadowRoot.innerHTML);
  });
});
