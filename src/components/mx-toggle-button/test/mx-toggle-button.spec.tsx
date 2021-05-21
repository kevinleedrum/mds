import { newSpecPage } from '@stencil/core/testing';
import { MxToggleButton } from '../mx-toggle-button';

describe('mx-toggle-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxToggleButton],
      html: `<mx-toggle-button></mx-toggle-button>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-toggle-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-toggle-button>
    `);
  });
});
