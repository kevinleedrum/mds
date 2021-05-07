import { r as registerInstance, h, H as Host } from './index-62ff7c7d.js';
import { n as nanoid } from './index.browser-9b266c44.js';

const MxSwitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.identifier = nanoid(5);
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-switch" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm w-36 h-14" }, h("input", { class: "absolute h-0 w-0 opacity-0", type: "checkbox", name: this.name, checked: this.checked }), h("span", { class: "slider round" }), h("div", { class: "ml-48 inline-block whitespace-nowrap" }, this.labelName))));
  }
};

export { MxSwitch as mx_switch };
