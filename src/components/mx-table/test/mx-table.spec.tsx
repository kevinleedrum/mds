import { newSpecPage } from '@stencil/core/testing';
import { MxTable } from '../mx-table';

describe('mx-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxTable],
      html: `<mx-table></mx-table>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-table>
    `);
  });
});
