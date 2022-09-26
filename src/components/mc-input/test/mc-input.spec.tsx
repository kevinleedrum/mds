import { newSpecPage } from '@stencil/core/testing';
import { McInput } from '../mc-input';

describe('mc-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [McInput],
      html: `<mc-input></mc-input>`,
    });
    expect(page.root).toEqualHtml(`
      <mc-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mc-input>
    `);
  });
});
