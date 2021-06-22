'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-e2d1a458.js');

const MxRadio = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (index.h(index.Host, { class: "mx-radio" }, index.h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm" }, index.h("input", { class: "absolute h-0 w-0 opacity-0", type: "radio", name: this.name, value: this.value, checked: this.checked }), index.h("span", { class: "flex h-20 w-20 cursor-pointer rounded-full" }), index.h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
};

exports.mx_radio = MxRadio;
