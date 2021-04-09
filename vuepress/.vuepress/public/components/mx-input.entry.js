import { r as registerInstance, h, e as Host } from './index-bc281795.js';

const mxInputCss = "mx-input .mx-input-wrapper{position:relative;border:1px solid rgba(51, 51, 51, 0.38);border-radius:8px;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center}mx-input .standard{min-height:48px;max-height:48px}mx-input .dense{max-height:36px}mx-input .mx-input-inner-wrapper{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center;width:100%}mx-input .mx-input-inner-wrapper .mds-icon-left{width:60px;flex-shrink:0;margin:0 16px}mx-input .mx-input-inner-wrapper .mds-input{flex-grow:1;margin:0 16px}mx-input .mx-input-inner-wrapper .mds-input input{width:100%;outline:0}mx-input .mx-input-inner-wrapper .mds-icon-right{width:60px;flex-shrink:0;margin:0 16px}mx-input label{position:absolute;top:11px;left:10px;display:block;cursor:text;-webkit-transition:color 0.2s ease-out, -webkit-transform 0.2s ease-out;transition:color 0.2s ease-out, -webkit-transform 0.2s ease-out;transition:transform 0.2s ease-out, color 0.2s ease-out;transition:transform 0.2s ease-out, color 0.2s ease-out, -webkit-transform 0.2s ease-out;-webkit-transform-origin:0% 100%;transform-origin:0% 100%;text-align:initial;padding:0 5px;font-size:16px;z-index:10}";

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'text';
    this.dense = false;
  }
  returnType() {
    const type = this.dense ? 'dense' : 'standard';
    return `mx-input-wrapper ${type}`;
  }
  render() {
    return (h(Host, null, h("div", { class: this.returnType() }, h("div", { class: "mx-input-inner-wrapper" }, this.leftIcon && h("div", { class: "mds-icon-left" }, "1"), this.label && h("label", null, this.label), h("div", { class: "mds-input" }, h("input", { type: this.type, name: this.name, value: this.value })), this.rightIcon && h("div", { class: "mds-icon-right" }, "3")))));
  }
};
MxInput.style = mxInputCss;

export { MxInput as mx_input };
