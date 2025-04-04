import { newE2EPage } from '@stencil/core/testing';

describe('pen-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pen-button></pen-button>');

    const element = await page.find('pen-button');
    expect(element).toHaveClass('hydrated');
  });

  it('has accessible name and role', async () => {
    const page = await newE2EPage();
    await page.setContent('<pen-button>Click me</pen-button>');

    const accessibleName = 'Click me';
    const role = 'button';
    const element = await page.find(`pen-button >>> ::-p-aria([name="${accessibleName}"][role="${role}"])`);
    expect(element).not.toBeNull();
  });
});
