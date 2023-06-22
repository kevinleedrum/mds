import '../../../utils/matchMedia.mock';
import { newSpecPage } from '@stencil/core/testing';
import { MxTabs } from '../mx-tabs';
import { MxTab } from '../../mx-tab/mx-tab';
import { MxSelect } from '../../mx-select/mx-select';

describe('mx-tabs (horizontal stack)', () => {
  let page;
  let root: HTMLMxTabsElement;
  let tabs: NodeListOf<HTMLMxTabElement>;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTabs, MxTab, MxSelect],
      html: `<mx-tabs />`,
    });
    page.root.tabs = [{ label: 'Home' }, { label: 'Search' }];
    await page.waitForChanges();
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

  it('uses an mx-select when screen width <= 768 and >2 tabs', async () => {
    root.tabs = [{ label: 'Home' }, { label: 'Favorites' }, { label: 'Search' }];
    await page.waitForChanges();
    const select = root.querySelector('mx-select');
    const options = root.querySelectorAll('option');
    expect(select).not.toBeNull();
    expect(options.length).toBe(3);
  });
});
