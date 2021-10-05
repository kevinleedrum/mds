import { newSpecPage } from '@stencil/core/testing';
import { MxImageUpload } from '../mx-image-upload';

describe('mx-image-upload', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MxImageUpload],
      html: `<mx-image-upload></mx-image-upload>`,
    });
    expect(page.root).toEqualHtml(`
      <mx-image-upload>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mx-image-upload>
    `);
  });
});
