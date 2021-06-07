import { newSpecPage } from '@stencil/core/testing';
import { MxSelect } from '../mx-select';

describe('mx-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxSelect],
      html: `<mx-select></mx-select>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-select>
    `);
  });
});
