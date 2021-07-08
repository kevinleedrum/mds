import { newSpecPage } from '@stencil/core/testing';
import { MxDropdownMenu } from '../mx-dropdown-menu';

describe('mx-dropdown-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxDropdownMenu],
      html: `<mx-dropdown-menu></mx-dropdown-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-dropdown-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-dropdown-menu>
    `);
  });
});
