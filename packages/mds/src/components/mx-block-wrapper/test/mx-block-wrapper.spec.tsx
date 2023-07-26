import { newSpecPage } from '@stencil/core/testing';
import { MxBlockWrapper } from '../mx-block-wrapper';

describe('mx-block-wrapper', () => {
  let page;
  let root: HTMLMxBlockInputElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxBlockWrapper],
      html: `
        <mx-block-wrapper
          columns="2"
        />
      `,
    });
    root = page.root;
  });

  it('assigns proper class for columns', async () => {
    const div = root.querySelector('div');
    expect(div.className).toContain('md:grid-cols-2');
  });
});
