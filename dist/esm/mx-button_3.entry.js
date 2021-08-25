import { r as registerInstance, h, H as Host, c as createEvent, g as getElement } from './index-ede217a8.js';
import { r as ripple } from './ripple-54ef50dc.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';
import { c as checkSvg } from './check-754da8c1.js';
import { a as arrowSvg } from './arrow-triangle-down-6c587423.js';

const chevronSvg = `<svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M10.8849 0L6.29492 4.58L1.70492 0L0.294922 1.41L6.29492 7.41L12.2949 1.41L10.8849 0Z"
    fill="currentColor"
    fill-opacity="0.88"
  />
</svg>
`;

const MxButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.btnType = 'contained';
    this.type = 'button';
    this.disabled = false;
    this.xl = false;
    /** Sets display to flex instead of inline-flex */
    this.full = false;
    /** Show chevron icon */
    this.dropdown = false;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    ripple(e, this.href ? this.anchorElem : this.btnElem);
  }
  get buttonClass() {
    // The btnType and dropdown classes are only used for colors
    let str = this.btnType;
    if (this.dropdown)
      str += ' dropdown';
    // Common classes
    str += ' flex items-center justify-center relative overflow-hidden cursor-pointer hover:no-underline';
    // Contained & Outlined Buttons
    if (['contained', 'outlined'].includes(this.btnType)) {
      str += ' w-full rounded-lg font-semibold uppercase';
      if (this.btnType === 'outlined')
        str += ' border';
      if (this.xl)
        str += ' h-48 px-32 text-3 tracking-1-5';
      else
        str += ' h-36 px-16 text-4 tracking tracking-1-25';
    }
    // Action Button
    if (this.btnType === 'action') {
      str += ' w-full h-36 px-16 border rounded-3xl text-4';
    }
    // Text Button
    if (this.btnType === 'text') {
      str += ' w-full h-36 px-8 py-10 text-4 rounded-lg';
      str += this.dropdown ? ' font-normal' : ' font-semibold uppercase tracking-1-25';
    }
    return str;
  }
  render() {
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && h("i", { class: 'mr-8 text-3 ' + this.icon }), h("span", { class: "slot-content" }, h("slot", null)), this.dropdown && this.btnType === 'text' && h("span", { class: "separator inline-block w-1 ml-4 -my-4 h-24" }), this.dropdown && (h("span", { "data-testid": "chevron", class: this.btnType === 'text' ? 'chevron-icon ml-4' : 'ml-8', innerHTML: chevronSvg }))));
    return (h(Host, { class: 'mx-button' + (this.full ? ' flex' : ' inline-flex') }, this.href ? (h("a", { href: this.href, target: this.target, class: this.buttonClass, ref: el => (this.anchorElem = el), onClick: this.onClick.bind(this) }, buttonContent)) : (h("button", { type: this.type, value: this.value, class: this.buttonClass, ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled }, buttonContent))));
  }
};

const MxIconButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'button';
    this.disabled = false;
    /** Show downward chevron icon */
    this.chevronDown = false;
    /** Show left-pointing chevron icon */
    this.chevronLeft = false;
    /** Show right-pointing chevron icon */
    this.chevronRight = false;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
  }
  get isChevron() {
    return this.chevronDown || this.chevronLeft || this.chevronRight;
  }
  render() {
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && h("i", { class: ['text-1', this.icon].join(' ') }), h("span", { class: "slot-content" }, h("slot", null)), this.isChevron && (h("span", { class: "chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center shadow-1" }, h("span", { "data-testid": "chevron", class: this.chevronLeft ? 'transform rotate-90' : this.chevronRight ? 'transform -rotate-90' : '', innerHTML: chevronSvg })))));
    return (h(Host, { class: "mx-icon-button" }, h("button", { type: this.type, value: this.value, class: "flex items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer", ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled, "aria-label": this.ariaLabel }, buttonContent)));
  }
};

const MxMenuItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxClick = createEvent(this, "mxClick", 7);
    /** If `multiSelect` is false, this will render a checkmark on the right side of the menu item.  If both `multiSelect` and `checked` are `true`, then the rendered multi-select checkbox will be checked. */
    this.checked = false;
    this.disabled = false;
    /** Render a checkbox as part of the menu item.  On small screens, the checkbox will appear on the left; otherwise, it will be on the right. */
    this.multiSelect = false;
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
    // Treat Enter or Space as a click
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      document.activeElement.click();
    }
  }
  componentWillLoad() {
    this.submenu = this.element.querySelector('[slot="submenu"]');
  }
  connectedCallback() {
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
      this.submenu.anchorEl = this.element;
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
    return (h(Host, { class: 'mx-menu-item block' + (!!this.submenu ? ' has-submenu' : '') }, h("div", { ref: el => (this.menuItemElem = el), role: "menuitem", "aria-selected": this.checked, "aria-disabled": this.disabled, tabindex: this.disabled || this.multiSelect ? '-1' : '0', class: "block w-full cursor-pointer select-none text-4 outline-none", onClick: this.onClick.bind(this) }, this.label && (h("p", { class: "item-label flex items-end py-0 px-12 my-0 h-18 uppercase subtitle5" }, h("span", { class: "block -mb-4" }, this.label))), h("div", { class: 'flex items-center w-full justify-between px-12 h-48 sm:h-32 whitespace-nowrap' +
        (this.multiSelect ? ' hidden' : '') }, h("div", { class: "flex items-center w-full h-full" }, this.icon !== undefined && (h("i", { class: 'inline-flex items-center justify-center text-1 w-20 mr-8 ' + this.icon })), h("span", { ref: el => (this.slotWrapper = el), class: "overflow-hidden overflow-ellipsis" }, h("slot", null))), this.checked && !this.multiSelect && (h("span", { class: "check ml-12", "data-testid": "check", innerHTML: checkSvg })), !!this.submenu && h("span", { class: "transform -rotate-90", "data-testid": "arrow", innerHTML: arrowSvg })), this.multiSelect && (h("mx-checkbox", { class: "flex items-stretch w-full h-48 sm:h-32", "label-class": "pl-12 pr-16", checked: this.checked, "label-name": this.checkboxLabel, "label-left": !this.minWidths.sm }))), h("slot", { name: "submenu" })));
  }
  get element() { return getElement(this); }
};

export { MxButton as mx_button, MxIconButton as mx_icon_button, MxMenuItem as mx_menu_item };
