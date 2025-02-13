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
});
