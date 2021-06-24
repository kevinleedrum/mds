import { newSpecPage } from '@stencil/core/testing';
import { MxSearch } from '../mx-search';

describe('mx-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxSearch],
      html: `<mx-search></mx-search>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-search>
    `);
  });
});
