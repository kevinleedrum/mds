import '../../../utils/matchMedia.mock';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { MxMenu } from '../mx-menu';
import { MxMenuItem } from '../../mx-menu-item/mx-menu-item';
import { MxInput } from '../../mx-input/mx-input';

// Full menu keyboard navigation not tested because `page.doc.activeElement` is always undefined

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
      <input type="text">
      `,
    });
    root = page.root as HTMLMxMenuElement;
    button = page.doc.querySelector('button');
    menuItems = root.querySelectorAll('mx-menu-item');
    root.anchorEl = button;
    // HACK: Jest's Node.contains implementation is incorrect; it does not match the node itself
    button.contains = node => node === button;
    await page.waitForChanges();
  });

  it('has a role of menu', () => {
    expect(root.getAttribute('role')).toBe('menu');
  });

  it('opens when the anchorEl is clicked', async () => {
    expect(root.isOpen).toBe(false);
    button.click();
    await page.waitForChanges();
    expect(root.isOpen).toBe(true);
  });

  it('opens when the triggerEl is clicked', async () => {
    root.anchorEl = page.doc.querySelector('input');
    root.triggerEl = button;
    await page.waitForChanges();
    expect(root.isOpen).toBe(false);
    button.click();
    await page.waitForChanges();
    expect(root.isOpen).toBe(true);
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

  it('closes when an element that is not the menu or anchorEl is focused', async () => {
    await root.openMenu();
    expect(root.isOpen).toBe(true);
    page.doc.querySelector('input').dispatchEvent(new Event('focus', { bubbles: true }));
    await page.waitForChanges();
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

describe('mx-menu (autocomplete)', () => {
  let page: SpecPage;
  let mxInput: HTMLMxInputElement;
  let input: HTMLInputElement;
  let root: HTMLMxMenuElement;
  let menuItems: NodeListOf<HTMLMxMenuItemElement>;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxMenu, MxMenuItem, MxInput],
      html: `
      <mx-menu>
        <mx-menu-item>Apple</mx-menu-item>
        <mx-menu-item>Banana</mx-menu-item>
      </mx-menu>
      <mx-input />
      `,
    });
    root = page.root as HTMLMxMenuElement;
    mxInput = page.doc.querySelector('mx-input');
    input = mxInput.querySelector('input');
    menuItems = root.querySelectorAll('mx-menu-item');
    root.anchorEl = mxInput;
    // HACK: Jest's Node.contains implementation is incorrect; it does not match the node itself
    mxInput.contains = node => node === mxInput;
    input.contains = node => node === input;
    await page.waitForChanges();
    await page.waitForChanges();
  });

  it('sets the input\'s autocomplete attribute to "off"', async () => {
    expect(input.getAttribute('autocomplete')).toBe('off');
  });

  it('sets an explicit menu width to match to that of the anchorEl', async () => {
    expect(root.getAttribute('style')).toContain('width');
  });

  it('opens the menu when the input is focused', async () => {
    input.dispatchEvent(new Event('focus', { bubbles: true }));
    await page.waitForChanges();
    expect(root.isOpen).toBe(true);
  });

  it('opens the menu when typing into the input', async () => {
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'x', bubbles: true }));
    await page.waitForChanges();
    expect(root.isOpen).toBe(true);
  });

  it('focuses the input when typing with the menu open', async () => {
    await root.openMenu();
    const mockFocus = jest.fn();
    input.focus = mockFocus;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'y' }));
    await page.waitForChanges();
    expect(mockFocus).toHaveBeenCalled();
  });

  it('selects the first menu item when pressing Enter with autocompleteOnly set to true', async () => {
    root.autocompleteOnly = true;
    const listener = jest.fn();
    menuItems[0].addEventListener('click', listener);
    await root.openMenu();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await page.waitForChanges();
    expect(listener).toHaveBeenCalled();
  });
});
