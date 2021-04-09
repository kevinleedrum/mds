import { newSpecPage } from '@stencil/core/testing';
import { MxInput } from '../mx-input';

describe('mx-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxInput],
      html: `<mx-input></mx-input>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-input>
    `);
  });
});
