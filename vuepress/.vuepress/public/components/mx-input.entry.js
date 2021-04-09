import { r as registerInstance, h, e as Host } from './index-a2e7d936.js';

const mxInputCss = "mx-input .mx-input-wrapper{position:relative;border:1px solid rgba(51, 51, 51, 0.38);border-radius:8px;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center}mx-input .mx-input-wrapper label{position:absolute;left:10px;display:block;cursor:text;-webkit-transition:color 0.2s ease-out, -webkit-transform 0.2s ease-out;transition:color 0.2s ease-out, -webkit-transform 0.2s ease-out;transition:transform 0.2s ease-out, color 0.2s ease-out;transition:transform 0.2s ease-out, color 0.2s ease-out, -webkit-transform 0.2s ease-out;-webkit-transform-origin:0% 100%;transform-origin:0% 100%;text-align:initial;padding:0 5px;font-size:16px;z-index:10}mx-input .mx-input-wrapper label.active{color:#ababab;-webkit-transform-origin:0 0;transform-origin:0 0;background:#fff}mx-input .mx-input-wrapper.standard{min-height:48px;max-height:48px}mx-input .mx-input-wrapper.standard label{top:11px}mx-input .mx-input-wrapper.standard label.active{-webkit-transform:translateY(-22px) scale(0.8);transform:translateY(-22px) scale(0.8)}mx-input .mx-input-wrapper.dense{min-height:36px;max-height:36px}mx-input .mx-input-wrapper.dense label{top:4px}mx-input .mx-input-wrapper.dense label.active{-webkit-transform:translateY(-17px) scale(0.8);transform:translateY(-17px) scale(0.8)}mx-input .mx-input-inner-wrapper{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center;width:100%}mx-input .mx-input-inner-wrapper .mds-input-left-content{width:60px;flex-shrink:0;margin:0 16px}mx-input .mx-input-inner-wrapper .mds-input{flex-grow:1;margin:0 16px}mx-input .mx-input-inner-wrapper .mds-input input{width:100%;outline:0}mx-input .mx-input-inner-wrapper .mds-input-right-content{width:60px;flex-shrink:0;margin:0 16px}";

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'text';
    this.dense = false;
    this.isActive = false;
    this.isFocused = false;
  }
  makeTypeClass() {
    const type = this.dense ? 'dense' : 'standard';
    return `mx-input-wrapper ${type}`;
  }
  handleFocus() {
    this.labelClass = 'active focus';
  }
  handleBlur(event) {
    const { target } = event;
    this.labelClass = target.value === '' ? '' : 'active';
  }
  render() {
    return (h(Host, null, h("div", { class: this.makeTypeClass() }, h("div", { class: "mx-input-inner-wrapper" }, this.leftIcon && h("div", { class: "mds-input-left-content" }, "1"), this.label && h("label", { class: this.labelClass }, this.label), h("div", { class: "mds-input" }, h("input", { type: this.type, name: this.name, value: this.value, onFocus: () => this.handleFocus(), onBlur: event => this.handleBlur(event) })), this.rightIcon && h("div", { class: "mds-input-right-content" }, "3")))));
  }
};
MxInput.style = mxInputCss;

export { MxInput as mx_input };
