import '../../../utils/matchMedia.mock';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxMenu } from '../mx-menu';
import { MxMenuItem } from '../../mx-menu-item/mx-menu-item';

// Behavior not tested due to spec page testing limitations:
// - opening the menu when the anchorEl is clicked (because `anchorEl.contains(e.target)` is always false)
// - full menu keyboard navigation (because `page.doc.activeElement` is always undefined)

describe('mx-menu', () => {
  let page: SpecPage;
  let button: HTMLButtonElement;
  let root: HTMLMxMenuElement;
  let menuItems: NodeListOf<HTMLMxMenuItemElement>;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxMenu, MxMenuItem],
      html: `
      <button>Open Menu</button>
      <mx-menu>
        <mx-menu-item>Open</mx-menu-item>
        <mx-menu-item>Save</mx-menu-item>
      </mx-menu>
      `,
    });
    root = page.root as HTMLMxMenuElement;
    button = page.doc.querySelector('button');
    menuItems = root.querySelectorAll('mx-menu-item');
    root.anchorEl = button;
    await page.waitForChanges();
  });

  it('has a role of menu', () => {
    expect(root.getAttribute('role')).toBe('menu');
  });

  it('opens when MxMenu.openMenu is called', async () => {
    expect(root.isOpen).toBe(false);
    await root.openMenu();
    expect(root.isOpen).toBe(true);
  });

  it('closes when MxMenu.closeMenu is called', async () => {
    expect(root.isOpen).toBe(false);
    await root.openMenu();
    expect(root.isOpen).toBe(true);
    await root.closeMenu();
    expect(root.isOpen).toBe(false);
  });

  it('closes when an mxClick event is fired', async () => {
    await root.openMenu();
    const mxClick = new CustomEvent('mxClick');
    root.dispatchEvent(mxClick);
    await page.waitForChanges();
    expect(root.isOpen).toBe(false);
  });

  it('closes the menu when an mxClick event is fired', async () => {
    await root.openMenu();
    const mxClick = new CustomEvent('mxClick');
    root.dispatchEvent(mxClick);
    await page.waitForChanges();
    expect(root.isOpen).toBe(false);
  });

  it('emits an mxClose event when it closes', async () => {
    await root.openMenu();
    const listener = jest.fn();
    root.addEventListener('mxClose', listener);
    await root.closeMenu();
    expect(listener).toHaveBeenCalled();
  });

  it('closes when an element outside the menu is clicked', async () => {
    await root.openMenu();
    expect(root.isOpen).toBe(true);
    page.doc.documentElement.click();
    await page.waitForChanges();
    expect(root.isOpen).toBe(false);
  });

  it('closes when Escape is pressed', async () => {
    await root.openMenu();
    expect(root.isOpen).toBe(true);
    const escape = new KeyboardEvent('keydown', { key: 'Escape' });
    page.doc.dispatchEvent(escape);
    await page.waitForChanges();
    expect(root.isOpen).toBe(false);
  });

  it('focuses the first menu item when pressing down after the menu is opened', async () => {
    const mockFocus = jest.fn();
    menuItems[0].querySelector('div').focus = mockFocus;
    await root.openMenu();
    expect(mockFocus).not.toHaveBeenCalled();
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await page.waitForChanges();
    expect(mockFocus).toHaveBeenCalled();
  });
});
