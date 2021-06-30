import { r as registerInstance, h, e as Host } from './index-5253f6cc.js';

const MxCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-checkbox" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4" }, h("input", { class: "absolute h-0 w-0 opacity-0", type: "checkbox", name: this.name, value: this.value, checked: this.checked }), h("span", { class: "flex h-18 w-18 cursor-pointer" }), h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
};

export { MxCheckbox as mx_checkbox };
