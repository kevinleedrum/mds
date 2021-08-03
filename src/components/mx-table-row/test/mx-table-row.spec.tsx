import { newSpecPage } from '@stencil/core/testing';
import { MxTableRow } from '../mx-table-row';

describe('mx-table-row', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxTableRow],
      html: `<mx-table-row></mx-table-row>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-table-row>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-table-row>
    `);
  });
});
