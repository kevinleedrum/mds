import { newSpecPage } from '@stencil/core/testing';
import { MxTabs } from '../mx-tabs';

describe('mx-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxTabs],
      html: `<mx-tabs></mx-tabs>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-tabs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-tabs>
    `);
  });
});
