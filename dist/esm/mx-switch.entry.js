import { r as registerInstance, h, H as Host } from './index-d7d68a6b.js';

const MxSwitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-switch" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4" }, h("input", { class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, checked: this.checked }), h("div", { class: "slider relative cursor-pointer round w-36 h-14 flex-shrink-0" }), h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
};

export { MxSwitch as mx_switch };
