import { newSpecPage } from '@stencil/core/testing';
import { MxDatePicker } from '../mx-date-picker';

describe('mx-date-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxDatePicker],
      html: `<mx-date-picker></mx-date-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-date-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-date-picker>
    `);
  });
});
