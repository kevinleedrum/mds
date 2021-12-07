import { newSpecPage } from '@stencil/core/testing';
import { MxTab } from '../mx-tab';
import { MxTabs } from '../../mx-tabs/mx-tabs';

describe('mx-tab (text, selected)', () => {
  let page;
  let root: HTMLMxTabsElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTabs, MxTab],
      html: `<mx-tab selected label="Home" />`,
    });
    root = page.root;
  });

  it('renders the label text', async () => {
    expect(root.innerText).toContain('Home');
  });

  it('sets the aria-label', async () => {
    expect(root.querySelector('[aria-label="Home"]')).not.toBeNull();
  });

  it('sets aria-selected', async () => {
    expect(root.querySelector('[aria-selected="true"]')).not.toBeNull();
  });
});

describe('mx-tab (icon, badge, not selected)', () => {
  let page;
  let root: HTMLMxTabsElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxTabs, MxTab],
      html: `<mx-tab icon="ph-house" aria-label="Home" badge />`,
    });
    root = page.root;
  });

  it('renders the icon', async () => {
    expect(root.querySelector('i')).not.toBeNull();
  });

  it('renders the badge', async () => {
    expect(root.querySelector('mx-badge')).not.toBeNull();
  });

  it('sets the aria-label', async () => {
    expect(root.querySelector('[aria-label="Home"]')).not.toBeNull();
  });

  it('does not set aria-selected', async () => {
    expect(root.querySelector('[aria-selected="true"]')).toBeNull();
  });
});
