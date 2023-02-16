import { r as registerInstance, h, e as Host, g as getElement } from './index-7d7e62d7.js';
import { p as propagateDataAttributes } from './utils-a3c69dbe.js';

const MxSwitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.componentWillRender = propagateDataAttributes;
    this.name = '';
    this.value = '';
    this.labelClass = '';
    this.labelName = '';
    this.checked = false;
    this.disabled = false;
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
    return (h(Host, { class: "mx-switch" }, h("label", { class: this.labelClassNames }, h("input", Object.assign({ class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, value: this.value, disabled: this.disabled, checked: this.checked }, this.dataAttributes, { onInput: this.onInput.bind(this) })), h("div", { class: 'slider relative round w-36 h-14 flex-shrink-0' + (this.disabled ? '' : ' cursor-pointer') }), h("div", { class: "switch-label ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return getElement(this); }
};

export { MxSwitch as mx_switch };
