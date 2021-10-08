import { r as registerInstance, h, H as Host, g as getElement } from './index-d7d68a6b.js';
import { p as propagateDataAttributes } from './utils-18e3dfde.js';

const MxSwitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
    this.componentWillRender = propagateDataAttributes;
  }
  render() {
    return (h(Host, { class: "mx-switch" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4" }, h("input", Object.assign({ class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, checked: this.checked }, this.dataAttributes)), h("div", { class: "slider relative cursor-pointer round w-36 h-14 flex-shrink-0" }), h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return getElement(this); }
};

export { MxSwitch as mx_switch };
