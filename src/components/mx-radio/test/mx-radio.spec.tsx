import { newSpecPage } from '@stencil/core/testing';
import { MxRadio } from '../mx-radio';

describe('mx-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxRadio],
      html: `<mx-radio></mx-radio>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-radio>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-radio>
    `);
  });
});
