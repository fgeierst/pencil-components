import { newSpecPage } from '@stencil/core/testing';
import { PenInput } from './pen-input';

describe('pen-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PenInput],
      html: `<pen-input label="Name" ></pen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <pen-input label="Name">
        <mock:shadow-root>
          <label htmlFor="pen-input">Name</label>
          <input id="pen-input" type="text" />
        </mock:shadow-root>
      </pen-input>
    `);
  });

  xit('is form associated', async () => {
    const page = await newSpecPage({
      components: [PenInput],
      html: `<form><pen-input label="Name" ></pen-input></form>`,
    });
    const form = page.body.querySelector('form');
    console.log('form elements', form.elements);
    expect(form.elements).not.toBeNull();
    // expect(form.elements.length).toBeGreaterThan(0);
    // expect(form.elements[0].tagName).toBe('PEN-INPUT');
  });
});
