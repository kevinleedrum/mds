import { newSpecPage } from '@stencil/core/testing';
import { MxTabs } from '../mx-tabs';
import { MxTab } from '../../mx-tab/mx-tab';

describe('mx-tabs (horizontal stack)', () => {
  let page;
  let root: HTMLMxTabsElement;
  let tabs: NodeListOf<HTMLMxTabElement>;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTabs, MxTab],
      html: `<mx-tabs>
      <mx-tab label="Home" />
      <mx-tab label="Search" />
      </mx-tabs>`,
    });
    root = page.root;
    tabs = root.querySelectorAll('mx-tab');
  });

  it('renders an inline grid by default', async () => {
    const grid = root.firstElementChild;
    expect(grid.getAttribute('class')).toContain('inline-grid');
  });

  it('renders a grid with the fill prop', async () => {
    root.fill = true;
    await page.waitForChanges();
    const grid = root.firstElementChild;
    expect(grid.getAttribute('class')).toContain('grid');
  });

  it('sets a tab as selected based on the value prop', async () => {
    expect(tabs[1].selected).toBe(false);
    root.value = 1;
    await page.waitForChanges();
    expect(tabs[1].selected).toBe(true);
  });

  it('emits an mxChange event when a tab is clicked', async () => {
    let emittedValue;
    root.addEventListener('mxChange', (e: CustomEvent) => (emittedValue = e.detail));
    tabs[1].click();
    expect(emittedValue).toBe(1);
  });
});
