import { r as registerInstance, h, e as Host } from './index-23d59bdf.js';

const mcInputCss = ":host{display:block}";

const McInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
McInput.style = mcInputCss;

export { McInput as mc_input };
