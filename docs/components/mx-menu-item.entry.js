import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-7d7e62d7.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';

const MxMenuItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxClick = createEvent(this, "mxClick", 7);
    this.hasParentLink = false;
    this.checked = false;
    this.disabled = false;
    this.icon = undefined;
    this.label = undefined;
    this.subtitle = undefined;
    this.multiSelect = false;
    this.selected = false;
    this.minWidths = new MinWidths();
  }
  onMouseEnter() {
    this.closeSiblingSubMenus();
    // Focus menu item on hover for consistent keyboard navigation
    this.focusMenuItem();
    if (this.submenu) {
      // Delay opening the submenu when hovering
      clearTimeout(this.submenuDelayTimeout);
      this.submenuDelayTimeout = setTimeout(this.openSubMenu.bind(this), 150);
    }
  }
  onMouseLeave() {
    clearTimeout(this.submenuDelayTimeout);
    document.activeElement.blur();
  }
  onFocus() {
    this.closeSiblingSubMenus();
  }
  onKeyDown(e) {
    if (this.submenu)
      return this.onKeyDownSubMenu(e);
    // Treat Enter (or Space if multi-select) as a click
    const clickKeys = ['Enter'];
    if (this.multiSelect)
      clickKeys.push(' ');
    if (clickKeys.includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      document.activeElement.click();
    }
  }
  componentWillLoad() {
    this.submenu = this.element.querySelector('[slot="submenu"]');
  }
  connectedCallback() {
    const parentLink = this.element.closest('a');
    if (parentLink) {
      this.hasParentLink = true;
      parentLink.setAttribute('role', 'menuitem');
    }
    else {
      this.role = this.element.closest('mx-dropdown-menu') ? 'option' : 'menuitem';
    }
    minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  /** Close the item's submenu. */
  async closeSubMenu() {
    if (this.submenu) {
      clearTimeout(this.submenuDelayTimeout);
      return await this.submenu.closeMenu();
    }
  }
  /** Returns the menu item inner text (excluding any label or subtitle) */
  async getValue() {
    return this.slotWrapper && this.slotWrapper.innerText.trim();
  }
  /** Focuses the menu item. */
  async focusMenuItem() {
    if (this.multiSelect) {
      const label = this.menuItemElem.querySelector('mx-checkbox label');
      label && label.focus();
    }
    else {
      this.menuItemElem.focus();
    }
  }
  async onKeyDownSubMenu(e) {
    if (['Enter', ' ', 'ArrowRight'].includes(e.key)) {
      // Open submenu and focus its first item when pressing Enter, Space, or right arrow
      e.preventDefault();
      e.stopPropagation();
      const didOpen = await this.openSubMenu();
      if (didOpen) {
        const firstMenuItem = this.element.querySelector('mx-menu-item:not(:disabled)');
        firstMenuItem && firstMenuItem.focusMenuItem();
      }
    }
    else if (e.key === 'ArrowLeft') {
      // Close submenu when pressing left arrow
      e.preventDefault();
      e.stopPropagation();
      const didClose = await this.closeSubMenu();
      if (didClose) {
        this.focusMenuItem();
      }
      else {
        // If submenu was already closed, propagate event to parent (to close next parent menu).
        // We have to manually propagate the event because we are awaiting a promise beforehand.
        this.element.parentElement.dispatchEvent(new KeyboardEvent(e.type, e));
      }
    }
  }
  closeSiblingSubMenus() {
    const siblingMenuItems = Array.from(this.element.parentElement.children).filter(e => e !== this.element && e.tagName === 'MX-MENU-ITEM');
    siblingMenuItems.forEach((m) => m.closeSubMenu());
  }
  openSubMenu() {
    if (this.submenu) {
      this.submenu.placement = 'right-start';
      this.submenu.anchorEl = this.menuItemElem;
      return this.submenu.openMenu();
    }
  }
  onClick(e) {
    if (this.disabled || !!this.submenu) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (!this.multiSelect)
      this.mxClick.emit(e);
  }
  get checkboxLabel() {
    // After initial render, the text must be read from the slotWrapper because
    // this.element.innerText will include both the slot text AND the checkbox label.
    return (this.slotWrapper || this.element).innerText;
  }
  render() {
    return (h(Host, { role: "none", class: 'mx-menu-item block' + (this.submenu ? ' has-submenu' : '') }, h("div", { ref: el => (this.menuItemElem = el), role: this.role, "aria-checked": this.role === 'option' ? (this.checked ? 'true' : 'false') : null, "aria-disabled": this.disabled ? 'true' : null, "aria-haspopup": this.submenu ? 'true' : null, "aria-selected": this.selected ? 'true' : null, tabindex: this.disabled || this.multiSelect || this.hasParentLink ? '-1' : '0', class: "block w-full cursor-pointer select-none text-4 outline-none", onClick: this.onClick.bind(this) }, this.label && (h("p", { class: "item-label flex items-end py-0 px-12 my-0 h-18 uppercase subtitle5" }, h("span", { class: "block -mb-4" }, this.label))), h("div", { class: 'flex items-center w-full justify-between px-12 h-48 sm:h-32 whitespace-nowrap' +
        (this.multiSelect ? ' hidden' : '') }, h("div", { class: "flex items-center w-full h-full" }, this.icon !== undefined && (h("i", { class: 'inline-flex items-center justify-center text-1 w-20 mr-8 ' + this.icon })), h("span", { ref: el => (this.slotWrapper = el), class: "truncate" }, h("slot", null))), this.checked && !this.multiSelect && h("i", { class: "check mds-check text-icon ml-12", "data-testid": "check" }), !!this.submenu && (h("i", { class: "mds-arrow-triangle-down text-icon transform -rotate-90", "data-testid": "arrow" }))), this.subtitle && (h("p", { class: "item-subtitle flex items-start py-0 px-12 my-0 h-16 caption2" }, h("span", { class: "block -mt-4 truncate" }, this.subtitle))), this.multiSelect && (h("mx-checkbox", { class: "flex items-stretch w-full overflow-hidden h-48 sm:h-32", "label-class": "pl-12 pr-16", checked: this.checked, "label-name": this.checkboxLabel, "label-left": !this.minWidths.sm }))), h("slot", { name: "submenu" })));
  }
  get element() { return getElement(this); }
};

export { MxMenuItem as mx_menu_item };
