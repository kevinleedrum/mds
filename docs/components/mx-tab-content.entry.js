import { r as registerInstance, h, e as Host } from './index-7d7e62d7.js';

const MxTabContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.index = undefined;
    this.value = undefined;
  }
  get isActiveTab() {
    return this.value >= 0 && this.index === this.value;
  }
  render() {
    return (h(Host, { class: !this.isActiveTab ? 'hidden' : '', role: "tabpanel" }, h("slot", null)));
  }
};

export { MxTabContent as mx_tab_content };
