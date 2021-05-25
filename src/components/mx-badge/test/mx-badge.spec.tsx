import { newSpecPage } from '@stencil/core/testing';
import { MxBadge } from '../mx-badge';

describe('mx-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxBadge],
      html: `<mx-badge></mx-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-badge>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-badge>
    `);
  });
});
