'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f1d14aa.js');
const utils = require('./utils-1f7ef40d.js');

const xSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2803 4.71967C19.5732 5.01256 19.5732 5.48744 19.2803 5.78033L5.78033 19.2803C5.48744 19.5732 5.01256 19.5732 4.71967 19.2803C4.42678 18.9874 4.42678 18.5126 4.71967 18.2197L18.2197 4.71967C18.5126 4.42678 18.9874 4.42678 19.2803 4.71967Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.71967 4.71967C5.01256 4.42678 5.48744 4.42678 5.78033 4.71967L19.2803 18.2197C19.5732 18.5126 19.5732 18.9874 19.2803 19.2803C18.9874 19.5732 18.5126 19.5732 18.2197 19.2803L4.71967 5.78033C4.42678 5.48744 4.42678 5.01256 4.71967 4.71967Z" fill="currentColor"/>
</svg>
`;

const searchSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8748 3.75C6.93979 3.75 3.74982 6.93997 3.74982 10.875C3.74982 14.81 6.93979 18 10.8748 18C14.8098 18 17.9998 14.81 17.9998 10.875C17.9998 6.93997 14.8098 3.75 10.8748 3.75ZM2.24982 10.875C2.24982 6.11154 6.11136 2.25 10.8748 2.25C15.6383 2.25 19.4998 6.11154 19.4998 10.875C19.4998 15.6385 15.6383 19.5 10.8748 19.5C6.11136 19.5 2.24982 15.6385 2.24982 10.875Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9126 15.913C16.2055 15.6201 16.6804 15.6201 16.9733 15.913L21.5296 20.4693C21.8225 20.7622 21.8225 21.2371 21.5296 21.53C21.2367 21.8229 20.7618 21.8229 20.4689 21.53L15.9126 16.9737C15.6197 16.6808 15.6197 16.2059 15.9126 15.913Z" fill="currentColor"/>
</svg>
`;

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
    return (index.h(index.Host, { class: "mx-search flex items-center relative" }, index.h("input", Object.assign({ ref: el => (this.inputEl = el), type: "search", "aria-label": this.ariaLabel || this.placeholder || 'Search', name: this.name, placeholder: this.placeholder, value: this.value, class: this.inputClass }, this.dataAttributes, { onInput: this.onInput.bind(this) })), index.h("span", { innerHTML: searchSvg, class: "absolute left-16 pointer-events-none" }), this.showClear && (index.h("button", { class: this.clearButtonClass, "data-testid": "clear-button", onClick: this.onClear.bind(this) }, index.h("span", { innerHTML: xSvg })))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_search = MxSearch;
