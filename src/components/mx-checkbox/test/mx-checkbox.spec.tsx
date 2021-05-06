import { newSpecPage } from '@stencil/core/testing';
import { MxCheckbox } from '../mx-checkbox';

describe('mx-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxCheckbox],
      html: `<mx-checkbox></mx-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-checkbox>
    `);
  });
});
