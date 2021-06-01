import { newSpecPage } from '@stencil/core/testing';
import { MxTabs } from '../mx-tabs';
import { MxTab } from '../../mx-tab/mx-tab';

describe('mx-tabs (horizontal stack)', () => {
  let page;
  let root: HTMLMxTabsElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTabs, MxTab],
      html: `<mx-tabs>
      <mx-tab label="Home" />
      <mx-tab selected label="Search" />
      </mx-tabs>`,
    });
    root = page.root;
  });

  it('renders an inline grid by default', async () => {
    const grid = root.firstElementChild;
    expect(grid.getAttribute('class')).toContain('inline-grid');
  });
});

describe('mx-tabs (horizontal fill)', () => {
  let page;
  let root: HTMLMxTabsElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTabs, MxTab],
      html: `<mx-tabs fill>
      <mx-tab label="Home" />
      <mx-tab selected label="Search" />
      </mx-tabs>`,
    });
    root = page.root;
  });

  it('renders a grid with the fill prop', async () => {
    const grid = root.firstElementChild;
    expect(grid.getAttribute('class')).toContain('grid');
  });
});
