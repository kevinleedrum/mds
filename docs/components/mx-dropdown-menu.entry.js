import { r as registerInstance, h, e as Host } from './index-20e785a9.js';

const MxDropdownMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.disabled = false;
    this.readonly = false;
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
    this.attachMenu();
  }
  onValueChange() {
    this.updateInputValue();
  }
  attachMenu() {
    if (!this.disabled && !this.readonly)
      this.menu.anchorEl = this.dropdownWrapper;
    else
      this.menu.anchorEl = undefined;
  }
  onBlur() {
    if (this.menu && this.menu.isOpen)
      return; // Style as focused/active while menu is open
    this.isFocused = false;
  }
  onFocus() {
    this.isFocused = true;
    this.error = false;
  }
  onMenuClose(e) {
    e.stopPropagation();
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
    if (this.disabled || this.readonly)
      str += ' disabled';
    if (this.error)
      str += ' error';
    if (this.dropdownClass)
      str += ' ' + this.dropdownClass;
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
    return (h(Host, { class: "mx-dropdown-menu block text-3" }, h("div", { ref: el => (this.dropdownWrapper = el), class: this.dropdownWrapperClass }, h("input", { "aria-label": this.elAriaLabel || this.label, class: this.inputClass, id: this.dropdownId, name: this.name, onBlur: this.onBlur.bind(this), onFocus: this.onFocus.bind(this), placeholder: this.label, disabled: this.disabled, readonly: !this.disabled, ref: el => (this.inputElem = el), tabindex: "0", type: "text" }), h("span", { class: this.suffixClass }, this.suffix && h("span", { class: "suffix flex items-center h-full px-4" }, this.suffix), this.error ? (h("i", { class: "mds-warning-circle text-icon pointer-events-none" })) : (h("i", { "data-testid": "arrow", class: "mds-arrow-triangle-down text-icon" })))), this.assistiveText && h("div", { class: "assistive-text caption1 mt-4 ml-16" }, this.assistiveText), h("mx-menu", { ref: el => (this.menu = el), placement: "bottom", offset: [0, 1], onMxClose: this.onMenuClose.bind(this) }, h("slot", null))));
  }
  static get watchers() { return {
    "value": ["onValueChange"],
    "disabled": ["attachMenu"],
    "readonly": ["attachMenu"]
  }; }
};

export { MxDropdownMenu as mx_dropdown_menu };
