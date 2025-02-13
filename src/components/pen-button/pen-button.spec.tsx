import { newSpecPage } from '@stencil/core/testing';
import { PenButton } from './pen-button';

describe('pen-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PenButton],
      html: `<pen-button>Hello</pen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <pen-button>
        <mock:shadow-root>
          <button>
            <slot></slot>
          </button>
        </mock:shadow-root>
        Hello
      </pen-button>
    `);
  });
});
