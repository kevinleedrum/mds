import { r as registerInstance, h, e as Host } from './index-ad244c33.js';

const mxInputCss = "mx-input .foo{color:orange}";

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("div", { class: "foo" }, "This is foo")));
  }
};
MxInput.style = mxInputCss;

export { MxInput as mx_input };
