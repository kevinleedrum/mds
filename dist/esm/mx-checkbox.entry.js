import { r as registerInstance, h, H as Host } from './index-ede217a8.js';

const MxCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.labelLeft = false;
    this.labelName = '';
    this.labelClass = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-checkbox" }, h("label", { class: [
        'relative flex-1 inline-flex flex-nowrap align-center items-center cursor-pointer text-4',
        this.labelClass,
      ].join(' ') }, h("input", { class: "absolute h-0 w-0 opacity-0", type: "checkbox", name: this.name, value: this.value, checked: this.checked }), h("span", { class: 'flex h-18 w-18 cursor-pointer' + (this.labelLeft ? ' order-2 ml-16' : ' order-1') }), h("div", { class: 'inline-block' + (this.labelLeft ? ' order-1 flex-1' : ' order-2 ml-16'), "data-testid": "labelName" }, this.labelName))));
  }
};

export { MxCheckbox as mx_checkbox };
