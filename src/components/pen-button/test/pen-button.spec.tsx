import { newSpecPage } from '@stencil/core/testing';
import { PenButton } from '../pen-button';

describe('pen-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PenButton],
      html: `<pen-button></pen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <pen-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pen-button>
    `);
  });
});
