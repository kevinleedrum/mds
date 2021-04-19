import { r as registerInstance, h, e as Host } from './index-d7718e8b.js';

const mxButtonCss = "mx-button button.btn{background-color:var(--primary-bg-color);color:var(--primary-bg-text-color);text-transform:uppercase;font-size:14px;border-radius:8px;padding:10px 16px;font-weight:600;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center}";

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'outlined';
  }
  render() {
    return (h(Host, null, h("button", { class: "btn" }, this.value)));
  }
};
MxInput.style = mxButtonCss;

export { MxInput as mx_button };
