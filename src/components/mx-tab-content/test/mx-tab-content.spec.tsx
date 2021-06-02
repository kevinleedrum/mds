import { newSpecPage } from '@stencil/core/testing';
import { MxTabContent } from '../mx-tab-content';

describe('mx-tab-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxTabContent],
      html: `<mx-tab-content></mx-tab-content>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-tab-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-tab-content>
    `);
  });
});
