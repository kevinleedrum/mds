import { r as registerInstance, h, H as Host } from './index-f1e89dca.js';

const MxCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-checkbox" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm" }, h("input", { class: "absolute h-0 w-0 opacity-0", type: "checkbox", name: this.name, value: this.value, checked: this.checked }), h("span", { class: "flex h-18 w-18 cursor-pointer" }), h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
};

export { MxCheckbox as mx_checkbox };
