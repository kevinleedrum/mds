import { r as registerInstance, h, e as Host, g as getElement } from './index-b3442404.js';
import { p as propagateDataAttributes } from './utils-18e3dfde.js';

const MxSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.dense = false;
    this.flat = false;
    /** Set to `false` to hide the clear button. */
    this.showClear = true;
    this.componentWillRender = propagateDataAttributes;
  }
  onInput(e) {
    this.value = e.target.value;
  }
  onClear() {
    this.inputEl.value = '';
    this.inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    if (typeof jest === 'undefined')
      this.inputEl.focus();
  }
  get inputClass() {
    let str = 'w-full pl-56 pr-16 rounded-lg outline-none border focus:border-2';
    str += this.flat ? ' flat' : ' shadow-1';
    str += this.dense ? ' h-36 py-8 text-4' : ' h-48 py-12';
    return str;
  }
  get clearButtonClass() {
    let str = 'clear-button absolute right-8 inline-flex items-center justify-center w-24 h-24 cursor-pointer';
    if (!this.value)
      str += ' hidden';
    return str;
  }
  render() {
    return (h(Host, { class: "mx-search flex items-center relative" }, h("input", Object.assign({ ref: el => (this.inputEl = el), type: "search", "aria-label": this.ariaLabel || this.placeholder || 'Search', name: this.name, placeholder: this.placeholder, value: this.value, class: this.inputClass }, this.dataAttributes, { onInput: this.onInput.bind(this) })), h("i", { class: "absolute mds-search text-icon left-16 pointer-events-none" }), this.showClear && (h("button", { class: this.clearButtonClass, "data-testid": "clear-button", onClick: this.onClear.bind(this) }, h("i", { class: "mds-x text-icon" })))));
  }
  get element() { return getElement(this); }
};

export { MxSearch as mx_search };
