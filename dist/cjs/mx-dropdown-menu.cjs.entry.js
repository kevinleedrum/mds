'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f1d14aa.js');

const MxDropdownMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dense = false;
    /** Style as a filter dropdown with a 1dp elevation */
    this.elevated = false;
    /** Style as a filter dropdown with a "flat" border color */
    this.flat = false;
    this.isFocused = false;
  }
  async onClick(e) {
    // Resize the menu width to match the input.  This is done every click in case the input is resized after initial load.
    this.menu.style.width = this.dropdownWrapper.getBoundingClientRect().width + 'px';
    const clickedMenuItem = e.target.closest('mx-menu-item');
    if (!clickedMenuItem)
      return;
    this.value = await clickedMenuItem.getValue();
    // Fire native input event for consistency with mx-select
    this.inputElem.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }
  componentDidLoad() {
    this.updateInputValue();
    this.menu.anchorEl = this.dropdownWrapper;
  }
  onValueChange() {
    this.updateInputValue();
  }
  onBlur() {
    if (this.menu && this.menu.isOpen)
      return; // Style as focused/active while menu is open
    this.isFocused = false;
  }
  onFocus() {
    this.isFocused = true;
  }
  onMenuClose() {
    if (!this.inputElem.contains(document.activeElement))
      this.isFocused = false;
  }
  updateInputValue() {
    this.inputElem.value = this.value;
  }
  get dropdownWrapperClass() {
    let str = 'dropdown-wrapper flex items-center relative rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    if (this.elevated)
      str += ' elevated shadow-1';
    if (this.flat)
      str += ' flat';
    str += this.isFocused ? ' focused border-2' : ' border';
    return str;
  }
  get inputClass() {
    let str = 'absolute inset-0 w-full h-full pl-16 overflow-hidden outline-none appearance-none select-none bg-transparent cursor-pointer disabled:cursor-auto';
    if (this.isFocused)
      str += ' -ml-1'; // prevent shifting due to border-width change
    return str;
  }
  get suffixClass() {
    let str = 'icon-suffix absolute flex items-center h-full right-12 space-x-8 pointer-events-none';
    if (this.isFocused)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  render() {
    return (index.h(index.Host, { class: "mx-dropdown-menu" }, index.h("div", { ref: el => (this.dropdownWrapper = el), class: this.dropdownWrapperClass }, index.h("input", { "aria-label": this.ariaLabel || this.label, class: this.inputClass, id: this.dropdownId, name: this.name, onBlur: this.onBlur.bind(this), onFocus: this.onFocus.bind(this), placeholder: this.label, readonly: true, ref: el => (this.inputElem = el), tabindex: "0", type: "text" }), index.h("span", { class: this.suffixClass }, this.suffix && index.h("span", { class: "suffix flex items-center h-full px-4" }, this.suffix), index.h("i", { "data-testid": "arrow", class: "mds-arrow-triangle-down text-icon" }))), index.h("mx-menu", { ref: el => (this.menu = el), placement: "bottom", offset: [0, 1], onMxClose: this.onMenuClose.bind(this) }, index.h("slot", null))));
  }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

exports.mx_dropdown_menu = MxDropdownMenu;
