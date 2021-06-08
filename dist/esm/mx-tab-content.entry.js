import { r as registerInstance, h, H as Host } from './index-f1e89dca.js';

const MxTabContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  get isActiveTab() {
    return this.value >= 0 && this.index === this.value;
  }
  render() {
    return (h(Host, { class: !this.isActiveTab ? 'hidden' : '' }, h("slot", null)));
  }
};

export { MxTabContent as mx_tab_content };
