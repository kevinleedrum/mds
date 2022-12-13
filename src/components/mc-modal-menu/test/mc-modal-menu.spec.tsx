import { newSpecPage } from '@stencil/core/testing';
import { McModalMenu } from '../mc-modal-menu';

describe('mc-modal-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [McModalMenu],
      html: `<mc-modal-menu></mc-modal-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <mc-modal-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mc-modal-menu>
    `);
  });
});
