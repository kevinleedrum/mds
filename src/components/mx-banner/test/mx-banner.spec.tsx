import { newSpecPage } from '@stencil/core/testing';
import { MxBanner } from '../mx-banner';

describe('mx-banner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxBanner],
      html: `<mx-banner></mx-banner>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-banner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-banner>
    `);
  });
});
