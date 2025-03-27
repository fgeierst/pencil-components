import { newSpecPage } from '@stencil/core/testing';
import { PenCombobox } from '../pen-combobox';

describe('pen-combobox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PenCombobox],
      html: `<pen-combobox></pen-combobox>`,
    });
    expect(page.root).toEqualHtml(`
      <pen-combobox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pen-combobox>
    `);
  });
});
