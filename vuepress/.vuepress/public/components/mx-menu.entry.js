import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-a1e2f5c6.js';
import { c as createPopover, a as convertPlacementToOrigin } from './popover-a2a2acc7.js';
import { d as fadeScaleIn, b as fadeOut } from './transitions-29f7f3e5.js';
import { u as uuidv4 } from './utils-eee50014.js';

const MxMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxClose = createEvent(this, "mxClose", 7);
    this.mxOpen = createEvent(this, "mxOpen", 7);
    this.isClosing = false;
    this.uuid = uuidv4();
    /** If the anchor element contains an `input`, setting this to `true` will always select the first menu item when Enter is pressed inside the input.  */
    this.autocompleteOnly = false;
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
      if (this.inputEl && this.inputEl.contains(e.target))
        return; // Do not close suggestion menu on input click
      // Otherwise, close menu when a click occurs outside the menu
      this.closeMenu();
    }
  }
  onFocus(e) {
    if (!this.anchorEl)
      return;
    // Close menu when focus leaves both the menu and the anchorEl
    if (this.isOpen && !this.anchorEl.contains(e.target) && !this.element.contains(e.target))
      this.closeMenu();
    // If the input is focused, open the menu
    else if (this.inputEl && this.inputEl.contains(e.target) && !this.isOpen)
      this.openMenu();
  }
  onDocumentKeyDown(e) {
    const isFocused = (el) => el && el.contains(e.target);
    const enabledMenuItems = this.menuItems.filter(m => !m.disabled);
    // For autocomplete menus, select first item by default when pressing Enter
    if (this.autocompleteOnly && this.inputEl && this.isOpen && e.key === 'Enter' && !isFocused(this.element)) {
      e.preventDefault();
      enabledMenuItems.length && enabledMenuItems[0].click();
      this.onMenuItemClick();
      return;
    }
    // Toggle menu if Enter (or Space if no input) is pressed while anchor is focused
    const openKeys = ['Enter'];
    if (!this.inputEl)
      openKeys.push(' ');
    if (openKeys.includes(e.key) && this.anchorEl && isFocused(this.anchorEl)) {
      (this.triggerEl || this.anchorEl).click();
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Open the menu when typing into the input
    if (!this.isOpen && this.inputEl && isFocused(this.inputEl)) {
      (this.triggerEl || this.anchorEl).click();
    }
    if (!this.isOpen)
      return;
    const shouldEditInput = e.key.length === 1 || ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key);
    if (this.inputEl && shouldEditInput && !isFocused(this.inputEl)) {
      // Typing visible characters, etc. while the menu is open should refocus the input
      this.inputEl.focus();
    }
    else if (e.key === 'Escape') {
      // Close menus on Escape key
      this.closeMenu();
      e.preventDefault();
    }
    else if (['Tab', 'ArrowDown'].includes(e.key) && isFocused(this.anchorEl) && enabledMenuItems.length > 0) {
      // Pressing Tab or down focuses the first menu item (or second if first is already "focused" due to autocomplete)
      if (e.shiftKey && e.key === 'Tab')
        return; // ... unless Shift+Tab
      if (!this.inputEl || !this.autocompleteOnly) {
        enabledMenuItems[0].focusMenuItem();
      }
      else if (this.autocompleteOnly && enabledMenuItems.length >= 2) {
        enabledMenuItems[1].focusMenuItem();
      }
      e.preventDefault();
      e.stopPropagation();
    }
    else if (e.key === 'ArrowUp' && isFocused(this.inputEl)) {
      // Prevent up arrow from moving cursor to start of input (Firefox, possibly others)
      e.preventDefault();
    }
    else if (this.inputEl && isFocused(this.inputEl)) {
      // HACK: When typing in the input while the menu is open, force the menu to re-render in case
      // menu items are added/removed in the slot.
      this.isOpen = !this.isOpen;
      this.isOpen = !this.isOpen;
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
    const offset = this.offset || (this.isSubMenu ? [-8, 0] : [0, 1]); // Offset submenus by -8px to line up menu items
    this.popoverInstance = await createPopover(this.anchorEl, this.element, this.placement, offset);
    await fadeScaleIn(this.menuElem, undefined, convertPlacementToOrigin(this.popoverInstance.state.placement));
    return true;
  }
  setTriggerElAttributes() {
    if (!this.anchorEl && !this.triggerEl)
      return;
    (this.triggerEl || this.anchorEl).setAttribute('aria-haspopup', 'true');
    (this.triggerEl || this.anchorEl).setAttribute('aria-controls', this.uuid);
  }
  /** Close the menu.  Returns a promise that resolves to false if the menu was already closed. */
  async closeMenu() {
    if (!this.isOpen || this.isClosing)
      return false;
    this.isClosing = true; // Prevents invoking closeMenu again while it is transitioning out
    this.menuItems.forEach(m => m.closeSubMenu());
    await fadeOut(this.menuElem);
    this.isClosing = false;
    this.mxClose.emit();
    this.isOpen = false;
    if (!this.popoverInstance)
      return true;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
    return true;
  }
  componentDidLoad() {
    this.setInputEl();
    if (this.menuItems.length) {
      const role = this.element.querySelector('[role="option"]') ? 'listbox' : 'menu';
      this.scrollElem.setAttribute('role', role);
    }
    this.setTriggerElAttributes();
  }
  componentWillUpdate() {
    this.setInputEl();
    this.anchorEl &&
      this.anchorEl.getAttribute('role') === 'menuitem' &&
      this.anchorEl.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
    if (this.inputEl && this.anchorEl)
      this.element.style.width = this.anchorEl.getBoundingClientRect().width + 'px';
    // If any menu item has an icon, ensure that all menu items at least have a null icon.
    // This will ensure the inner text of all the menu items is aligned.
    const anyMenuItemHasIcon = this.menuItems.some(m => !!m.icon);
    if (anyMenuItemHasIcon) {
      this.menuItems.forEach(m => {
        if (m.icon === undefined)
          m.icon = null;
      });
    }
    // Set selected prop on dropdown menu items (which updates aria-selected attribute)
    if (this.inputEl) {
      this.menuItems.forEach(async (m) => {
        m.selected = this.inputEl.value === (await m.getValue());
      });
    }
  }
  setInputEl() {
    if (this.anchorEl && !this.inputEl) {
      this.inputEl = this.anchorEl.querySelector('input[type="text"], input[type="search"]');
      this.inputEl && this.inputEl.setAttribute('autocomplete', 'off');
    }
  }
  get menuItems() {
    return (Array.from(this.scrollElem.children).filter(e => e.tagName === 'MX-MENU-ITEM') ||
      []);
  }
  get isSubMenu() {
    return this.element.hasAttribute('slot') && this.element.getAttribute('slot') === 'submenu';
  }
  get hostClass() {
    let str = 'mx-menu block z-50 w-screen sm:w-auto';
    if (!this.isOpen)
      str += ' hidden';
    if (this.autocompleteOnly)
      str += ' autocomplete-only';
    return str;
  }
  render() {
    return (h(Host, { class: this.hostClass }, h("div", { ref: el => (this.menuElem = el), class: "flex flex-col shadow-9 rounded-lg" }, h("div", { id: this.uuid, ref: el => (this.scrollElem = el), class: "scroll-wrapper overflow-y-auto overflow-x-hidden overscroll-contain" }, h("slot", null)))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "anchorEl": ["setTriggerElAttributes"],
    "triggerEl": ["setTriggerElAttributes"]
  }; }
};

export { MxMenu as mx_menu };
