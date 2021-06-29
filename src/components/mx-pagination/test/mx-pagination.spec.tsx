import { newSpecPage } from '@stencil/core/testing';
import { MxPagination } from '../mx-pagination';

describe('mx-pagination', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxPagination],
      html: `<mx-pagination></mx-pagination>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-pagination>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-pagination>
    `);
  });
});
