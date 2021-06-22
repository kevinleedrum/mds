import { r as registerInstance, h, H as Host } from './index-eaf28d08.js';

const MxSwitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-switch" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm w-36 h-14" }, h("input", { class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, checked: this.checked }), h("span", { class: "slider round" }), h("div", { class: "pl-48 inline-block whitespace-nowrap", "data-testid": "labelName" }, this.labelName))));
  }
};

export { MxSwitch as mx_switch };
