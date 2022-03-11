import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-d3b6906c.js';
import { p as propagateDataAttributes } from './utils-f31b72fe.js';

const MxSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxClear = createEvent(this, "mxClear", 7);
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
    this.inputEl.dispatchEvent(new window.Event('input', { bubbles: true }));
    this.mxClear.emit();
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
    return (h(Host, { class: "mx-search flex items-center relative" }, h("input", Object.assign({ ref: el => (this.inputEl = el), type: "search", "aria-label": this.elAriaLabel || this.placeholder || 'Search', name: this.name, placeholder: this.placeholder, value: this.value, class: this.inputClass }, this.dataAttributes, { onInput: this.onInput.bind(this) })), h("i", { class: "absolute mds-search text-icon left-16 pointer-events-none" }), this.showClear && (h("button", { type: "button", "aria-label": "Clear search", class: this.clearButtonClass, "data-testid": "clear-button", onClick: this.onClear.bind(this) }, h("i", { class: "mds-x text-icon" })))));
  }
  get element() { return getElement(this); }
};

export { MxSearch as mx_search };
