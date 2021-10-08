'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c246f020.js');
const utils = require('./utils-1f7ef40d.js');

const MxRadio = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
    this.componentWillRender = utils.propagateDataAttributes;
  }
  render() {
    return (index.h(index.Host, { class: "mx-radio" }, index.h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4" }, index.h("input", Object.assign({ class: "absolute h-0 w-0 opacity-0", type: "radio", name: this.name, value: this.value, checked: this.checked }, this.dataAttributes)), index.h("span", { class: "flex h-20 w-20 cursor-pointer flex-shrink-0 rounded-full" }), index.h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_radio = MxRadio;
