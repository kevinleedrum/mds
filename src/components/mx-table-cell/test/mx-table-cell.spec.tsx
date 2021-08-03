import { newSpecPage } from '@stencil/core/testing';
import { MxTableCell } from '../mx-table-cell';

describe('mx-table-cell', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxTableCell],
      html: `<mx-table-cell></mx-table-cell>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-table-cell>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-table-cell>
    `);
  });
});
