import { r as registerInstance, h, e as Host } from './index-5d582d27.js';
import { n as nanoid } from './index.browser-083ffff9.js';

const MxRadio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.identifier = nanoid(5);
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-radio" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm" }, h("input", { class: "absolute h-0 w-0 opacity-0", type: "radio", name: this.name, checked: this.checked }), h("span", { class: "flex h-20 w-20 cursor-pointer rounded-full" }), h("div", { class: "ml-16 inline-block" }, this.labelName))));
  }
};

export { MxRadio as mx_radio };
