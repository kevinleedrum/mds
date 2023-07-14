import { newSpecPage } from '@stencil/core/testing';
import { MxToggleButtonGroup } from '../mx-toggle-button-group';
import { MxToggleButton } from '../../mx-toggle-button/mx-toggle-button';

describe('mx-toggle-button-group', () => {
  let page;
  let root;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxToggleButtonGroup, MxToggleButton],
      html: `
      <mx-toggle-button-group value="heart">
        <mx-toggle-button icon="ph-apple-logo" value="apple"></mx-toggle-button>
        <mx-toggle-button icon="ph-heart" value="heart"></mx-toggle-button>
      </mx-toggle-button-group>`,
    });
    root = page.root;
  });

  it('renders the host element', async () => {
    expect(root.tagName).toBe('mx-toggle-button-group'.toUpperCase());
  });

  it('selects the correct toggle button by default', async () => {
    const appleBtn = root.querySelector('mx-toggle-button[value="apple"]');
    const heartBtn = root.querySelector('mx-toggle-button[value="heart"]');
    expect(appleBtn.getAttribute('selected')).toBeNull();
    expect(heartBtn.getAttribute('selected')).not.toBeNull();
  });

  it('(de)selects the correct toggle button when a button is clicked', async () => {
    const appleBtn = root.querySelector('mx-toggle-button[value="apple"]');
    const heartBtn = root.querySelector('mx-toggle-button[value="heart"]');
    appleBtn.click();
    await page.waitForChanges();
    expect(appleBtn.getAttribute('selected')).not.toBeNull();
    expect(heartBtn.getAttribute('selected')).toBeNull();
    appleBtn.click();
    await page.waitForChanges();
    expect(appleBtn.getAttribute('selected')).toBeNull();
  });

  it('does not deselect a selected button if the required prop is set', async () => {
    root.required = true;
    await page.waitForChanges();
    const appleBtn = root.querySelector('mx-toggle-button[value="apple"]');
    appleBtn.click();
    await page.waitForChanges();
    expect(appleBtn.getAttribute('selected')).not.toBeNull();
    expect(root.value).toBe('apple');
    appleBtn.click();
    await page.waitForChanges();
    expect(appleBtn.getAttribute('selected')).not.toBeNull();
    expect(root.value).toBe('apple');
  });

  it('selects the correct toggle button when the value prop changes', async () => {
    root.value = 'apple';
    await page.waitForChanges();
    const appleBtn = root.querySelector('mx-toggle-button[value="apple"]');
    const heartBtn = root.querySelector('mx-toggle-button[value="heart"]');
    expect(appleBtn.getAttribute('selected')).not.toBeNull();
    expect(heartBtn.getAttribute('selected')).toBeNull();
  });

  it('emits an mxInput event when a toggle button is clicked', async () => {
    let emittedValue;
    root.addEventListener('mxInput', e => (emittedValue = e.detail));
    const appleBtn = root.querySelector('mx-toggle-button[value="apple"]');
    appleBtn.click();
    expect(emittedValue).toBe('apple');
  });
});
