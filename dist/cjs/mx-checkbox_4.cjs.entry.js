'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f1d14aa.js');
const utils = require('./utils-1f7ef40d.js');
const chevronDown = require('./chevron-down-696a796a.js');
const popover = require('./popover-8846ea88.js');
const transitions = require('./transitions-c9a33e78.js');
const minWidthSync = require('./minWidthSync-93e92215.js');
const check = require('./check-830696a9.js');
const arrowTriangleDown = require('./arrow-triangle-down-a4cc75c3.js');

const MxCheckbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelLeft = false;
    this.labelName = '';
    this.labelClass = '';
    /** Hide the label text visually, but still make it accessible for screen readers */
    this.hideLabel = false;
    this.checked = false;
    this.disabled = false;
    this.indeterminate = false;
    this.componentWillRender = utils.propagateDataAttributes;
  }
  get checkClass() {
    let str = 'flex h-18 w-18 flex-shrink-0';
    str += this.labelLeft ? ' order-2' : ' order-1';
    if (this.labelLeft && !this.hideLabel)
      str += ' ml-16';
    return str;
  }
  get checkLabelClass() {
    let str = 'checkbox-label inline-block';
    if (this.hideLabel)
      str += ' sr-only';
    str += this.labelLeft ? ' order-1 flex-1' : ' order-2';
    if (!this.labelLeft && !this.hideLabel)
      str += ' ml-16';
    return str;
  }
  /** Keep checked prop in sync with input element attribute */
  onInput(e) {
    this.checked = e.target.checked;
  }
  render() {
    return (index.h(index.Host, { class: "mx-checkbox inline-flex items-center" }, index.h("label", { class: [
        'relative flex-1 inline-flex flex-nowrap align-center items-center text-4' +
          (this.disabled ? '' : ' cursor-pointer'),
        this.labelClass,
      ].join(' ') }, index.h("input", Object.assign({ class: 'absolute h-0 w-0 opacity-0' + (this.indeterminate ? ' indeterminate' : ''), type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, indeterminate: this.indeterminate }, this.dataAttributes, { onInput: this.onInput.bind(this) })), index.h("span", { class: this.checkClass }), index.h("div", { class: this.checkLabelClass, "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return index.getElement(this); }
};

const MxIconButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.type = 'button';
    this.disabled = false;
    /** Show downward chevron icon */
    this.chevronDown = false;
    /** Show left-pointing chevron icon */
    this.chevronLeft = false;
    /** Show right-pointing chevron icon */
    this.chevronRight = false;
    this.componentWillRender = utils.propagateDataAttributes;
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
    const buttonContent = (index.h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && index.h("i", { class: ['text-1', this.icon].join(' ') }), index.h("span", { class: "slot-content" }, index.h("slot", null)), this.isChevron && (index.h("span", { class: "chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center shadow-1" }, index.h("span", { "data-testid": "chevron", class: this.chevronLeft ? 'transform rotate-90' : this.chevronRight ? 'transform -rotate-90' : '', innerHTML: chevronDown.chevronSvg })))));
    return (index.h(index.Host, { class: "mx-icon-button inline-block" }, index.h("button", Object.assign({ type: this.type, formaction: this.formaction, value: this.value, class: "flex appearance-none items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto", ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled ? 'true' : null, "aria-label": this.ariaLabel }, this.dataAttributes), buttonContent)));
  }
  get element() { return index.getElement(this); }
};

const MxMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxClose = index.createEvent(this, "mxClose", 7);
    this.mxOpen = index.createEvent(this, "mxOpen", 7);
    this.isClosing = false;
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
    this.popoverInstance = await popover.createPopover(this.anchorEl, this.element, this.placement, offset);
    await transitions.fadeScaleIn(this.menuElem, undefined, popover.convertPlacementToOrigin(this.popoverInstance.state.placement));
    return true;
  }
  /** Close the menu.  Returns a promise that resolves to false if the menu was already closed. */
  async closeMenu() {
    if (!this.isOpen || this.isClosing)
      return false;
    this.isClosing = true; // Prevents invoking closeMenu again while it is transitioning out
    this.menuItems.forEach(m => m.closeSubMenu());
    await transitions.fadeOut(this.menuElem);
    this.isClosing = false;
    this.mxClose.emit();
    this.isOpen = false;
    if (!this.popoverInstance)
      return true;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
    return true;
  }
  connectedCallback() {
    const role = !!this.element.querySelector('[role="option"]') ? 'listbox' : 'menu';
    this.element.setAttribute('role', role);
    this.anchorEl && this.anchorEl.setAttribute('aria-haspopup', 'true');
  }
  componentDidLoad() {
    this.setInputEl();
  }
  componentWillUpdate() {
    this.setInputEl();
    if (this.inputEl)
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
    return (index.h(index.Host, { class: this.hostClass }, index.h("div", { ref: el => (this.menuElem = el), class: "flex flex-col shadow-9 rounded-lg" }, index.h("div", { ref: el => (this.scrollElem = el), class: "scroll-wrapper overflow-y-auto overflow-x-hidden max-h-216 overscroll-contain" }, index.h("slot", null)))));
  }
  get element() { return index.getElement(this); }
};

const MxMenuItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxClick = index.createEvent(this, "mxClick", 7);
    /** If `multiSelect` is false, this will render a checkmark on the right side of the menu item.  If both `multiSelect` and `checked` are `true`, then the rendered multi-select checkbox will be checked. */
    this.checked = false;
    this.disabled = false;
    /** Render a checkbox as part of the menu item.  On small screens, the checkbox will appear on the left; otherwise, it will be on the right. */
    this.multiSelect = false;
    /** This is automatically set by a parent Dropdown Menu. */
    this.selected = false;
    this.minWidths = new minWidthSync.MinWidths();
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
    this.role = !!this.element.closest('mx-dropdown-menu') ? 'option' : 'menuitem';
    minWidthSync.minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.minWidthSync.unsubscribeComponent(this);
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
    return (index.h(index.Host, { class: 'mx-menu-item block' + (!!this.submenu ? ' has-submenu' : '') }, index.h("div", { ref: el => (this.menuItemElem = el), role: this.role, "aria-checked": this.checked ? 'true' : null, "aria-disabled": this.disabled ? 'true' : null, "aria-selected": this.selected ? 'true' : null, tabindex: this.disabled || this.multiSelect ? '-1' : '0', class: "block w-full cursor-pointer select-none text-4 outline-none", onClick: this.onClick.bind(this) }, this.label && (index.h("p", { class: "item-label flex items-end py-0 px-12 my-0 h-18 uppercase subtitle5" }, index.h("span", { class: "block -mb-4" }, this.label))), index.h("div", { class: 'flex items-center w-full justify-between px-12 h-48 sm:h-32 whitespace-nowrap' +
        (this.multiSelect ? ' hidden' : '') }, index.h("div", { class: "flex items-center w-full h-full" }, this.icon !== undefined && (index.h("i", { class: 'inline-flex items-center justify-center text-1 w-20 mr-8 ' + this.icon })), index.h("span", { ref: el => (this.slotWrapper = el), class: "truncate" }, index.h("slot", null))), this.checked && !this.multiSelect && (index.h("span", { class: "check ml-12", "data-testid": "check", innerHTML: check.checkSvg })), !!this.submenu && index.h("span", { class: "transform -rotate-90", "data-testid": "arrow", innerHTML: arrowTriangleDown.arrowSvg })), this.subtitle && (index.h("p", { class: "item-subtitle flex items-start py-0 px-12 my-0 h-16 caption2" }, index.h("span", { class: "block -mt-4 truncate" }, this.subtitle))), this.multiSelect && (index.h("mx-checkbox", { class: "flex items-stretch w-full overflow-hidden h-48 sm:h-32", "label-class": "pl-12 pr-16", checked: this.checked, "label-name": this.checkboxLabel, "label-left": !this.minWidths.sm }))), index.h("slot", { name: "submenu" })));
  }
  get element() { return index.getElement(this); }
};

exports.mx_checkbox = MxCheckbox;
exports.mx_icon_button = MxIconButton;
exports.mx_menu = MxMenu;
exports.mx_menu_item = MxMenuItem;
