'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7252b109.js');
const utils = require('./utils-4d672927.js');

const MxSwitch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelClass = '';
    this.labelName = '';
    this.checked = false;
    this.disabled = false;
    this.componentWillRender = utils.propagateDataAttributes;
  }
  /** Keep checked prop in sync with input element attribute */
  onInput(e) {
    this.checked = e.target.checked;
  }
  get labelClassNames() {
    let str = 'relative inline-flex flex-nowrap align-center items-center text-4';
    if (!this.disabled)
      str += ' cursor-pointer';
    if (this.labelClass)
      str += ' ' + this.labelClass;
    return str;
  }
  render() {
    return (index.h(index.Host, { class: "mx-switch" }, index.h("label", { class: this.labelClassNames }, index.h("input", Object.assign({ class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, value: this.value, disabled: this.disabled, checked: this.checked }, this.dataAttributes, { onInput: this.onInput.bind(this) })), index.h("div", { class: 'slider relative round w-36 h-14 flex-shrink-0' + (this.disabled ? '' : ' cursor-pointer') }), index.h("div", { class: "switch-label ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_switch = MxSwitch;
