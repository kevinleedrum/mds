'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c246f020.js');

const MxSwitch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (index.h(index.Host, { class: "mx-switch" }, index.h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4" }, index.h("input", { class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, checked: this.checked }), index.h("div", { class: "slider relative cursor-pointer round w-36 h-14 flex-shrink-0" }), index.h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
};

exports.mx_switch = MxSwitch;
