import { r as registerInstance, h, e as Host } from './index-e0085757.js';

const mxInputCss = "mx-input .mx-input-wrapper{position:relative;border:1px solid rgba(51, 51, 51, 0.38);border-radius:8px;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center}mx-input .mx-input-wrapper i{font-size:24px}mx-input .mx-input-wrapper label{position:absolute;left:10px;display:block;cursor:text;-webkit-transition:color 0.1s ease-out, -webkit-transform 0.1s ease-out;transition:color 0.1s ease-out, -webkit-transform 0.1s ease-out;transition:transform 0.1s ease-out, color 0.1s ease-out;transition:transform 0.1s ease-out, color 0.1s ease-out, -webkit-transform 0.1s ease-out;-webkit-transform-origin:0% 100%;transform-origin:0% 100%;text-align:initial;padding:0 5px;margin-top:0px;font-size:16px;z-index:10;cursor:pointer}mx-input .mx-input-wrapper label.indented{left:50px}mx-input .mx-input-wrapper label.active{color:#ababab;-webkit-transform-origin:0 0;transform-origin:0 0;background:#fff}mx-input .mx-input-wrapper.focused{border:2px solid #0457af}mx-input .mx-input-wrapper.focused .mx-input-inner-wrapper{padding:0 15px}mx-input .mx-input-wrapper.standard{min-height:48px;max-height:48px}mx-input .mx-input-wrapper.standard label{top:11px}mx-input .mx-input-wrapper.standard label.active{-webkit-transform:translateY(-22px) scale(0.8);transform:translateY(-22px) scale(0.8)}mx-input .mx-input-wrapper.standard.focused label.active{padding:0 4px;top:10px !important}mx-input .mx-input-wrapper.dense{min-height:36px;max-height:36px}mx-input .mx-input-wrapper.dense label{top:5px;font-size:14px}mx-input .mx-input-wrapper.dense label.active{-webkit-transform:translateY(-17px) scale(0.8);transform:translateY(-17px) scale(0.8)}mx-input .mx-input-wrapper.dense.focused label.active{padding:0 4px;top:4px !important}mx-input .mx-input-inner-wrapper{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center;width:100%;padding:0 16px}mx-input .mx-input-inner-wrapper .mds-input-left-content{display:flex;width:24px;flex-shrink:0;margin-right:16px}mx-input .mx-input-inner-wrapper .mds-input{flex-grow:1}mx-input .mx-input-inner-wrapper .mds-input input{width:100%;outline:0}mx-input .mx-input-inner-wrapper .mds-input-right-content{display:flex;width:24px;flex-shrink:0;margin-left:16px}";

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'text';
    this.dense = false;
    this.isActive = false;
    this.isFocused = false;
    this.outerContainerClass = '';
    this.labelClass = '';
  }
  connectedCallback() {
    this.setLabelClass();
  }
  setLabelClass(target = undefined) {
    this.labelClass = '';
    if ((this.leftIcon && !this.isActive) || (this.leftIcon && target && target.value === '')) {
      this.setIndentedLabel();
    }
    if (target && target.value !== '') {
      this.labelClass += ' active';
    }
  }
  setIndentedLabel() {
    this.labelClass += ' indented';
  }
  makeTypeClass() {
    const type = this.dense ? 'dense' : 'standard';
    return `mx-input-wrapper ${type}`;
  }
  handleFocus() {
    this.isActive = true;
    this.isFocused = true;
    this.labelClass = ' active focus';
  }
  handleBlur(event) {
    const { target } = event;
    this.isFocused = false;
    this.setLabelClass(target);
  }
  focusOnInput() {
    this.textInput.focus();
  }
  render() {
    return (h(Host, null, h("div", { class: `${this.makeTypeClass()} ${this.isFocused ? 'focused' : ''}` }, h("div", { class: "mx-input-inner-wrapper" }, this.leftIcon && (h("div", { class: "mds-input-left-content" }, h("i", { class: this.leftIcon }))), this.label && h("label", { class: this.labelClass, onClick: () => this.focusOnInput() }, this.label), h("div", { class: "mds-input" }, h("input", { type: this.type, name: this.name, value: this.value, onFocus: () => this.handleFocus(), onBlur: event => this.handleBlur(event), ref: (el) => this.textInput = el })), this.rightIcon && (h("div", { class: "mds-input-right-content" }, h("i", { class: this.rightIcon })))))));
  }
};
MxInput.style = mxInputCss;

export { MxInput as mx_input };
