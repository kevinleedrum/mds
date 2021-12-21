'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-54a36eac.js');
const utils = require('./utils-1f7ef40d.js');

const MxSearch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.dense = false;
    this.flat = false;
    /** Set to `false` to hide the clear button. */
    this.showClear = true;
    this.componentWillRender = utils.propagateDataAttributes;
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
    return (index.h(index.Host, { class: "mx-search flex items-center relative" }, index.h("input", Object.assign({ ref: el => (this.inputEl = el), type: "search", "aria-label": this.ariaLabel || this.placeholder || 'Search', name: this.name, placeholder: this.placeholder, value: this.value, class: this.inputClass }, this.dataAttributes, { onInput: this.onInput.bind(this) })), index.h("i", { class: "absolute mds-search text-icon left-16 pointer-events-none" }), this.showClear && (index.h("button", { class: this.clearButtonClass, "data-testid": "clear-button", onClick: this.onClear.bind(this) }, index.h("i", { class: "mds-x text-icon" })))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_search = MxSearch;
