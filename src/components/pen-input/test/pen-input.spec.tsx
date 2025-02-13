import { newSpecPage } from '@stencil/core/testing';
import { PenInput } from '../pen-input';

describe('pen-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PenInput],
      html: `<pen-input></pen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <pen-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pen-input>
    `);
  });
});
