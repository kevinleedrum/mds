import { newSpecPage } from '@stencil/core/testing';
import { MxTab } from '../mx-tab';

describe('mx-tab', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxTab],
      html: `<mx-tab></mx-tab>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-tab>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-tab>
    `);
  });
});
