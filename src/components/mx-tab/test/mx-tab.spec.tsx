import { newSpecPage } from '@stencil/core/testing';
import { MxTab } from '../mx-tab';
import { MxTabs } from '../../mx-tabs/mx-tabs';

describe('mx-tab (text, selected)', () => {
  let page;
  let root: HTMLMxTabsElement;
  let tab: HTMLMxTabElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTabs, MxTab],
      html: `<mx-tabs>
      <mx-tab selected label="Home" />
      </mx-tabs>`,
    });
    root = page.root;
    tab = root.querySelector('mx-tab');
  });

  it('renders the label text', async () => {
    expect(tab.innerText).toContain('Home');
  });

  it('sets the aria-label', async () => {
    expect(tab.querySelector('[aria-label="Home"]')).not.toBeNull();
  });

  it('sets aria-selected', async () => {
    expect(tab.querySelector('[aria-selected]')).not.toBeNull();
  });
});

describe('mx-tab (icon, badge, not selected)', () => {
  let page;
  let root: HTMLMxTabsElement;
  let tab: HTMLMxTabElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTabs, MxTab],
      html: `<mx-tabs>
      <mx-tab icon="ph-house" aria-label="Home" badge />
      </mx-tabs>`,
    });
    root = page.root;
    tab = root.querySelector('mx-tab');
  });

  it('renders the icon', async () => {
    expect(tab.querySelector('i')).not.toBeNull();
  });

  it('renders the badge', async () => {
    expect(tab.querySelector('mx-badge')).not.toBeNull();
  });

  it('sets the aria-label', async () => {
    expect(tab.querySelector('[aria-label="Home"]')).not.toBeNull();
  });

  it('does not set aria-selected', async () => {
    expect(tab.querySelector('[aria-selected]')).toBeNull();
  });
});
