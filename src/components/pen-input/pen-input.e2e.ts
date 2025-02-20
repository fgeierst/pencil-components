import { newE2EPage } from '@stencil/core/testing';

describe('pen-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><pen-input label="My Label"></pen-input></form>');

    const element = await page.find('pen-input');

    expect(element).toHaveClass('hydrated');
    //await new Promise(r => setTimeout(r, 15000)); // For headed browser mode, wait before closing the browser
  });
});
