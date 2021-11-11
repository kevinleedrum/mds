import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-e21e00f4.js';
import { c as createPopover, a as convertPlacementToOrigin } from './popover-1f909484.js';
import { b as fadeScaleIn, a as fadeOut } from './transitions-71c871da.js';
import './utils-18e3dfde.js';

const MxMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxClose = createEvent(this, "mxClose", 7);
    this.mxOpen = createEvent(this, "mxOpen", 7);
    /** The placement of the menu, relative to the `anchorEl`. */
    this.placement = 'bottom-start';
    /** This is set to true automatically when the `anchorEl` is clicked.  Dropdown menus read this prop internally for styling purposes. */
    this.isOpen = false;
  }
  onMenuItemClick() {
    // Close menu when a descendent menu item is clicked
    this.closeMenu();
  }
  onClick(e) {
    const triggerEl = this.triggerEl || this.anchorEl;
    const triggerElWasClicked = triggerEl && triggerEl.contains(e.target);
    if (triggerElWasClicked)
      e.preventDefault();
    if (!this.isOpen && triggerElWasClicked) {
      // Open closed menu when the anchorEl is clicked
      this.openMenu();
      e.preventDefault();
    }
    else if (this.isOpen && this.element && !this.element.contains(e.target)) {
      if (this.isSubMenu && triggerElWasClicked)
        return; // Do not close submenu when its anchor is clicked
      // Otherwise, close menu when a click occurs outside the menu
      this.closeMenu();
    }
  }
  onDocumentKeyDown(e) {
    // Open menu if Enter or Space is pressed while anchor is focused
    if (['Enter', ' '].includes(e.key) && this.anchorEl && this.anchorEl.contains(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      document.activeElement.click();
      return;
    }
    if (!this.isOpen)
      return;
    // Close menus on Escape key
    if (e.key === 'Escape')
      this.closeMenu();
    else if (e.key === 'ArrowDown' && this.anchorEl.contains(e.target)) {
      // If focus is still on anchor, switch focus to first menu item on arrow down
      e.preventDefault();
      e.stopPropagation();
      const enabledMenuItems = this.menuItems.filter(m => !m.disabled);
      enabledMenuItems.length && enabledMenuItems[0].focusMenuItem();
    }
  }
  onKeydown(e) {
    if (!this.isOpen)
      return;
    if (!['ArrowDown', 'ArrowUp'].includes(e.key))
      return;
    // Menu item keyboard navigation
    e.preventDefault(); // Prevent scrolling
    e.stopPropagation();
    const menuItems = this.menuItems.filter(m => !m.disabled);
    const focusedIndex = menuItems.findIndex(m => m.contains(document.activeElement));
    if (e.key === 'ArrowDown' && focusedIndex !== menuItems.length - 1) {
      menuItems[focusedIndex + 1].focusMenuItem();
    }
    else if (e.key === 'ArrowUp' && focusedIndex !== 0) {
      menuItems[focusedIndex - 1].focusMenuItem();
    }
  }
  /** Open the menu.  Returns a promise that resolves to false if the menu was already open. */
  async openMenu() {
    if (this.isOpen || !this.anchorEl)
      return false;
    this.isOpen = true;
    this.mxOpen.emit();
    const offset = this.offset || (this.isSubMenu ? [-8, 0] : null); // Offset submenus by -8px to line up menu items
    this.popoverInstance = await createPopover(this.anchorEl, this.element, this.placement, offset);
    await fadeScaleIn(this.menuElem, undefined, convertPlacementToOrigin(this.popoverInstance.state.placement));
    return true;
  }
  /** Close the menu.  Returns a promise that resolves to false if the menu was already closed. */
  async closeMenu() {
    if (!this.isOpen)
      return false;
    this.menuItems.forEach(m => m.closeSubMenu());
    await fadeOut(this.menuElem);
    this.mxClose.emit();
    this.isOpen = false;
    if (!this.popoverInstance)
      return true;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
    return true;
  }
  connectedCallback() {
    this.anchorEl && this.anchorEl.setAttribute('aria-haspopup', 'true');
  }
  componentWillUpdate() {
    // If any menu item has an icon, ensure that all menu items at least have a null icon.
    // This will ensure the inner text of all the menu items is aligned.
    const anyMenuItemHasIcon = this.menuItems.some(m => !!m.icon);
    if (anyMenuItemHasIcon) {
      this.menuItems.forEach(m => {
        if (m.icon === undefined)
          m.icon = null;
      });
    }
  }
  get menuItems() {
    return (Array.from(this.scrollElem.children).filter(e => e.tagName === 'MX-MENU-ITEM') ||
      []);
  }
  get isSubMenu() {
    return this.element.hasAttribute('slot') && this.element.getAttribute('slot') === 'submenu';
  }
  render() {
    return (h(Host, { class: 'mx-menu block z-50 w-screen sm:w-auto' + (this.isOpen ? '' : ' hidden'), role: "menu" }, h("div", { ref: el => (this.menuElem = el), class: "flex flex-col py-8 shadow-9 rounded-lg" }, h("div", { ref: el => (this.scrollElem = el), class: "scroll-wrapper overflow-y-auto overflow-x-hidden max-h-216 overscroll-contain" }, h("slot", null)))));
  }
  get element() { return getElement(this); }
};

export { MxMenu as mx_menu };
