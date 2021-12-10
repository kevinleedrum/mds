import { newSpecPage } from '@stencil/core/testing';
import { MxChart } from '../mx-chart';

describe('mx-chart', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxChart],
      html: `<mx-chart></mx-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-chart>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-chart>
    `);
  });
});
