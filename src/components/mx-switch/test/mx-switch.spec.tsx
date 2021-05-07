import { newSpecPage } from '@stencil/core/testing';
import { MxSwitch } from '../mx-switch';

describe('mx-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxSwitch],
      html: `<mx-switch></mx-switch>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-switch>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-switch>
    `);
  });
});
