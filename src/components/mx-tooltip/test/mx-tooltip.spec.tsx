import { newSpecPage } from '@stencil/core/testing';
import { MxTooltip } from '../mx-tooltip';

describe('mx-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxTooltip],
      html: `<mx-tooltip></mx-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-tooltip>
    `);
  });
});
