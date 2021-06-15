import { newSpecPage } from '@stencil/core/testing';
import { MxMenuItem } from '../mx-menu-item';

describe('mx-menu-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxMenuItem],
      html: `<mx-menu-item></mx-menu-item>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-menu-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-menu-item>
    `);
  });
});
