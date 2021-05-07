'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7a6d2fc8.js');
const index_browser = require('./index.browser-c9a9927c.js');

const MxCheckbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.identifier = index_browser.nanoid(5);
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (index.h(index.Host, { class: "mx-checkbox" }, index.h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm" }, index.h("input", { class: "absolute h-0 w-0 opacity-0", type: "checkbox", checked: this.checked }), index.h("span", { class: "flex h-18 w-18 cursor-pointer" }), index.h("div", { class: "ml-16 inline-block" }, this.labelName))));
  }
};

exports.mx_checkbox = MxCheckbox;
