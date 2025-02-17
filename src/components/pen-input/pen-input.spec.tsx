import { newSpecPage } from '@stencil/core/testing';
import { PenInput } from './pen-input';

// Todo: "Property setFormValue was accessed on ElementInternals, but this property is not implemented. Testing components with ElementInternals is fully supported in e2e tests."
xdescribe('pen-input', () => {
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

  it('is form associated', async () => {
    const page = await newSpecPage({
      components: [PenInput],
      html: `<form><pen-input label="Name" name="custom" ></pen-input></form>`,
    });
    const form = page.body.querySelector('form');

    form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(form);
      console.log('formdata', formData);
      expect(formData.get('custom')).toBe('test-value');
    });

    form.dispatchEvent(new Event('submit', { bubbles: true }));
  });
});
