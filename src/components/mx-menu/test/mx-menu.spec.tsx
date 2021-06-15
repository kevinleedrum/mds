import { newSpecPage } from '@stencil/core/testing';
import { MxMenu } from '../mx-menu';

describe('mx-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxMenu],
      html: `<mx-menu></mx-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-menu>
    `);
  });
});
