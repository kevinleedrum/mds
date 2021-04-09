import { r as registerInstance, h, e as Host } from './index-8b01c27c.js';

const mxInputCss = "mx-input .standard{max-height:48px}mx-input .dense{max-height:36px}";

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dense = false;
  }
  returnType() {
    const type = this.dense ? 'dense' : 'normal';
    return `mx-input-wrapper ${type}`;
  }
  render() {
    return (h(Host, null, h("div", { class: this.returnType() }, h("div", { class: "mx-input-inner-wrapper" }, "Hello"))));
  }
};
MxInput.style = mxInputCss;

export { MxInput as mx_input };
