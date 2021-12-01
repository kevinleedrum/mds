import { newSpecPage } from '@stencil/core/testing';
import { MxCode } from '../mx-code';

describe('mx-code', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxCode],
      html: `<mx-code></mx-code>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-code>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-code>
    `);
  });
});
