import { r as registerInstance, h, e as Host, g as getElement } from './index-f6edd80d.js';
import { p as propagateDataAttributes } from './utils-f31b72fe.js';

const MxRadio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelClass = '';
    this.labelName = '';
    this.checked = false;
    this.disabled = false;
    this.componentWillRender = propagateDataAttributes;
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
    return (h(Host, { class: "mx-radio inline-block" }, h("label", { class: this.labelClassNames }, h("input", Object.assign({ class: "absolute h-0 w-0 opacity-0", type: "radio", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled }, this.dataAttributes, { onInput: this.onInput.bind(this) })), h("span", { class: 'flex h-20 w-20 flex-shrink-0 rounded-full' + (this.disabled ? '' : ' cursor-pointer') }), h("div", { class: "radio-label ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return getElement(this); }
};

export { MxRadio as mx_radio };
