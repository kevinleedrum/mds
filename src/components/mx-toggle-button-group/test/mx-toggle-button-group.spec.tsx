import { newSpecPage } from '@stencil/core/testing';
import { MxToggleButtonGroup } from '../mx-toggle-button-group';

describe('mx-toggle-button-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxToggleButtonGroup],
      html: `<mx-toggle-button-group></mx-toggle-button-group>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-toggle-button-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-toggle-button-group>
    `);
  });
});
