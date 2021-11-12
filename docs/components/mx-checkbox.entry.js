import { r as registerInstance, h, f as Host, g as getElement } from './index-e21e00f4.js';
import { p as propagateDataAttributes } from './utils-18e3dfde.js';

const MxCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelLeft = false;
    this.labelName = '';
    this.labelClass = '';
    /** Hide the label text visually, but still make it accessible for screen readers */
    this.hideLabel = false;
    this.checked = false;
    this.disabled = false;
    this.indeterminate = false;
    this.componentWillRender = propagateDataAttributes;
  }
  get checkClass() {
    let str = 'flex h-18 w-18 flex-shrink-0';
    str += this.labelLeft ? ' order-2' : ' order-1';
    if (this.labelLeft && !this.hideLabel)
      str += ' ml-16';
    return str;
  }
  get checkLabelClass() {
    let str = 'checkbox-label inline-block';
    if (this.hideLabel)
      str += ' sr-only';
    str += this.labelLeft ? ' order-1 flex-1' : ' order-2';
    if (!this.labelLeft && !this.hideLabel)
      str += ' ml-16';
    return str;
  }
  /** Keep checked prop in sync with input element attribute */
  onInput(e) {
    this.checked = e.target.checked;
  }
  render() {
    return (h(Host, { class: "mx-checkbox inline-flex items-center" }, h("label", { class: [
        'relative flex-1 inline-flex flex-nowrap align-center items-center text-4' +
          (this.disabled ? '' : ' cursor-pointer'),
        this.labelClass,
      ].join(' ') }, h("input", Object.assign({ class: 'absolute h-0 w-0 opacity-0' + (this.indeterminate ? ' indeterminate' : ''), type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled }, this.dataAttributes, { onInput: this.onInput.bind(this) })), h("span", { class: this.checkClass }), h("div", { class: this.checkLabelClass, "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return getElement(this); }
};

export { MxCheckbox as mx_checkbox };
