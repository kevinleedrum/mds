import { r as registerInstance, h, e as Host } from './index-4fecf128.js';

const mxInputCss = ":host{display:block}";

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null, "Help")));
  }
};
MxInput.style = mxInputCss;

export { MxInput as mx_input };
