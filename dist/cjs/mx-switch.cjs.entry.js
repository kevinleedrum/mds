'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-dc34efd9.js');

const MxSwitch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (index.h(index.Host, { class: "mx-switch" }, index.h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm w-36 h-14" }, index.h("input", { class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, checked: this.checked }), index.h("span", { class: "slider round" }), index.h("div", { class: "pl-48 inline-block whitespace-nowrap", "data-testid": "labelName" }, this.labelName))));
  }
};

exports.mx_switch = MxSwitch;
