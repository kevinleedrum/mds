import { newSpecPage } from '@stencil/core/testing';
import { MxPageHeader } from '../mx-page-header';

describe('mx-page-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxPageHeader],
      html: `<mx-page-header></mx-page-header>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-page-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-page-header>
    `);
  });
});
