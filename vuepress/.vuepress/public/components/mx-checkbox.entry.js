import { r as registerInstance, h, f as Host } from './index-a4e4d6b0.js';

const MxCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  }
  get checkClass() {
    let str = 'flex h-18 w-18';
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
  render() {
    return (h(Host, { class: "mx-checkbox" }, h("label", { class: [
        'relative flex-1 inline-flex flex-nowrap align-center items-center text-4' +
          (this.disabled ? '' : ' cursor-pointer'),
        this.labelClass,
      ].join(' ') }, h("input", { class: 'absolute h-0 w-0 opacity-0' + (this.indeterminate ? ' indeterminate' : ''), type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled }), h("span", { class: this.checkClass }), h("div", { class: this.checkLabelClass, "data-testid": "labelName" }, this.labelName))));
  }
};

export { MxCheckbox as mx_checkbox };
