import { newSpecPage } from '@stencil/core/testing';
import { McModalNav } from '../mc-modal-nav';

describe('mc-modal-nav', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [McModalNav],
      html: `<mc-modal-nav></mc-modal-nav>`,
    });
    expect(page.root).toEqualHtml(`
      <mc-modal-nav>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mc-modal-nav>
    `);
  });
});
