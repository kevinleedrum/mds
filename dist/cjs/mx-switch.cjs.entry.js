'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c246f020.js');
const utils = require('./utils-1f7ef40d.js');

const MxSwitch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
    this.componentWillRender = utils.propagateDataAttributes;
  }
  /** Keep checked prop in sync with input element attribute */
  onInput(e) {
    this.checked = e.target.checked;
  }
  render() {
    return (index.h(index.Host, { class: "mx-switch" }, index.h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4" }, index.h("input", Object.assign({ class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, value: this.value, checked: this.checked }, this.dataAttributes, { onInput: this.onInput.bind(this) })), index.h("div", { class: "slider relative cursor-pointer round w-36 h-14 flex-shrink-0" }), index.h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_switch = MxSwitch;
