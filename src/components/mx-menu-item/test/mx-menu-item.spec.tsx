import '../../../utils/matchMedia.mock';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxMenuItem } from '../mx-menu-item';
import { MxMenu } from '../../mx-menu/mx-menu';

describe('mx-menu-item', () => {
  let page: SpecPage;
  let root: HTMLMxMenuItemElement;
  let menuItem: HTMLElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxMenuItem],
      html: `<mx-menu-item>Open</mx-menu-item>`,
    });
    root = page.root as HTMLMxMenuItemElement;
    menuItem = root.querySelector('div');
  });

  it('has a role of menuitem', () => {
    expect(menuItem.getAttribute('role')).toBe('menuitem');
  });

  it('renders the slot content', () => {
    expect(menuItem.innerText).toBe('Open');
  });

  it('renders the label', async () => {
    root.label = 'Label';
    await page.waitForChanges();
    expect(menuItem.innerText).toBe(['Label', 'Open'].join(''));
  });

  it('renders the subtitle', async () => {
    root.subtitle = 'Subtitle';
    await page.waitForChanges();
    expect(menuItem.innerText).toBe(['Open', 'Subtitle'].join(''));
  });

  it('emits an mxClick event on click', () => {
    const listener = jest.fn();
    root.addEventListener('mxClick', listener);
    menuItem.click();
    expect(listener).toHaveBeenCalled();
  });

  it('does not emit an mxClick event when disabled', async () => {
    root.disabled = true;
    await page.waitForChanges();
    const listener = jest.fn();
    root.addEventListener('mxClick', listener);
    menuItem.click();
    expect(listener).not.toHaveBeenCalled();
  });

  it('has a tabindex of -1 when disabled', async () => {
    expect(menuItem.getAttribute('tabindex')).toBe('0');
    root.disabled = true;
    await page.waitForChanges();
    expect(menuItem.getAttribute('tabindex')).toBe('-1');
  });

  it('sets aria-disabled to true when disabled', async () => {
    expect(menuItem.getAttribute('aria-disabled')).not.toBe('true');
    root.disabled = true;
    await page.waitForChanges();
    expect(menuItem.getAttribute('aria-disabled')).toBe('true');
  });

  it('displays an icon if the prop is set', async () => {
    root.icon = 'ph-folder-open';
    await page.waitForChanges();
    expect(menuItem.querySelector('i')).not.toBeNull();
  });

  it('displays a checkmark and sets aria-checked to true if the checked prop is set', async () => {
    root.checked = true;
    await page.waitForChanges();
    expect(menuItem.querySelector('[data-testid="check"]')).not.toBeNull();
    expect(menuItem.getAttribute('aria-checked')).toBe('true');
  });

  it('renders an mx-checkbox if the multiSelect prop is set', async () => {
    root.multiSelect = true;
    await page.waitForChanges();
    const checkbox: HTMLMxCheckboxElement = menuItem.querySelector('mx-checkbox');
    expect(checkbox).not.toBeNull();
  });

  it('renders a checked mx-checkbox if both the checked and multiSelect props are set', async () => {
    root.multiSelect = true;
    await page.waitForChanges();
    let checkbox: HTMLMxCheckboxElement = menuItem.querySelector('mx-checkbox');
    expect(checkbox.getAttribute('checked')).toBeNull();
    root.checked = true;
    await page.waitForChanges();
    checkbox = menuItem.querySelector('mx-checkbox');
    expect(checkbox.getAttribute('checked')).not.toBeNull();
  });

  it('sets aria-selected to true if the selected prop is true', async () => {
    expect(root.children[0].getAttribute('aria-selected')).not.toBe('true');
    root.selected = true;
    await page.waitForChanges();
    expect(root.children[0].getAttribute('aria-selected')).toBe('true');
  });

  it('getValue() returns the inner text without the label or subtitle', async () => {
    root.label = 'Label';
    root.subtitle = 'Subtitle';
    await page.waitForChanges();
    expect(await root.getValue()).toBe('Open');
  });
});

describe('mx-menu-item (with submenu)', () => {
  let page: SpecPage;
  let root: HTMLMxMenuItemElement;
  let menuItem: HTMLElement;
  let submenu: HTMLMxMenuElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxMenuItem, MxMenu],
      html: `<mx-menu-item>
      Open Recent
      <mx-menu slot="submenu">
        <mx-menu-item>file.jpg</mx-menu-item>
      </mx-menu>
      </mx-menu-item>`,
    });
    root = page.root as HTMLMxMenuItemElement;
    menuItem = root.querySelector('div');
    submenu = root.querySelector('mx-menu');
  });

  it('renders an arrow SVG', () => {
    expect(menuItem.querySelector('[data-testid="arrow"]')).not.toBeNull();
  });

  it('does not emit an mxClick event', () => {
    const listener = jest.fn();
    root.addEventListener('mxClick', listener);
    menuItem.click();
    expect(listener).not.toHaveBeenCalled();
  });

  it('has an unopened submenu by default', () => {
    expect(submenu).not.toBeNull();
    expect(submenu.isOpen).toBe(false);
  });

  it('opens the submenu on Enter', async () => {
    const enter = new KeyboardEvent('keydown', { key: 'Enter' });
    root.dispatchEvent(enter);
    await page.waitForChanges();
    expect(submenu.isOpen).toBe(true);
  });
});
