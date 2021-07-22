'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-3b63d393.js');

const MxCheckbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.labelLeft = false;
    this.labelName = '';
    this.labelClass = '';
    this.checked = false;
  }
  render() {
    return (index.h(index.Host, { class: "mx-checkbox" }, index.h("label", { class: [
        'relative flex-1 inline-flex flex-nowrap align-center items-center cursor-pointer text-4',
        this.labelClass,
      ].join(' ') }, index.h("input", { class: "absolute h-0 w-0 opacity-0", type: "checkbox", name: this.name, value: this.value, checked: this.checked }), index.h("span", { class: 'flex h-18 w-18 cursor-pointer' + (this.labelLeft ? ' order-2 ml-16' : ' order-1') }), index.h("div", { class: 'inline-block' + (this.labelLeft ? ' order-1 flex-1' : ' order-2 ml-16'), "data-testid": "labelName" }, this.labelName))));
  }
};

exports.mx_checkbox = MxCheckbox;
