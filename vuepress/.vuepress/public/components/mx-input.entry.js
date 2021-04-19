import { r as registerInstance, h, e as Host } from './index-d7718e8b.js';

const mxInputCss = "mx-input .mx-input-wrapper{position:relative;border:1px solid rgba(51, 51, 51, 0.38);border-radius:8px;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center}mx-input .mx-input-wrapper i{font-size:24px}mx-input .mx-input-wrapper.error{border:2px solid #ff0c3e;color:#ff0c3e}mx-input .mx-input-wrapper label{position:absolute;left:10px;display:block;cursor:text;-webkit-transition:color 0.1s ease-out, -webkit-transform 0.1s ease-out;transition:color 0.1s ease-out, -webkit-transform 0.1s ease-out;transition:transform 0.1s ease-out, color 0.1s ease-out;transition:transform 0.1s ease-out, color 0.1s ease-out, -webkit-transform 0.1s ease-out;-webkit-transform-origin:0% 100%;transform-origin:0% 100%;text-align:initial;padding:0 5px;margin-top:0px;font-size:16px;z-index:10;cursor:pointer}mx-input .mx-input-wrapper label.indented{left:50px}mx-input .mx-input-wrapper label.active{color:#ababab;-webkit-transform-origin:0 0;transform-origin:0 0;background:#fff}mx-input .mx-input-wrapper label.error{color:#ff0c3e}mx-input .mx-input-wrapper.focused{border:2px solid #0457af}mx-input .mx-input-wrapper.focused .mx-input-inner-wrapper{padding:0 15px}mx-input .mx-input-wrapper.standard{min-height:48px}mx-input .mx-input-wrapper.standard label{top:11px}mx-input .mx-input-wrapper.standard label.active{-webkit-transform:translateY(-22px) scale(0.8);transform:translateY(-22px) scale(0.8)}mx-input .mx-input-wrapper.standard.focused label.active{padding:0 4px;top:10px !important}mx-input .mx-input-wrapper.dense{min-height:36px;max-height:36px}mx-input .mx-input-wrapper.dense label{top:6px;font-size:14px}mx-input .mx-input-wrapper.dense label.active{-webkit-transform:translateY(-16px) scale(0.8);transform:translateY(-16px) scale(0.8)}mx-input .mx-input-wrapper.dense.focused label.active{padding:0 4px;top:5px !important}mx-input .mx-input-inner-wrapper{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center;width:100%;padding:0 16px}mx-input .mx-input-inner-wrapper .mds-input-left-content{display:flex;width:24px;flex-shrink:0;margin-right:11px}mx-input .mx-input-inner-wrapper .mds-input{flex-grow:1}mx-input .mx-input-inner-wrapper .mds-input input{width:100%;outline:0}mx-input .mx-input-inner-wrapper .mds-input-right-content{display:flex;width:24px;flex-shrink:0;margin-left:16px}mx-input .assistive-text{font-size:12px;color:#929292;margin:5px 0 0 16px}mx-input textarea{background:transparent;width:100%;padding:16px 0;outline:none}";

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'text';
    this.dense = false;
    this.isActive = false;
    this.isFocused = false;
    this.outerContainerClass = '';
    this.labelClass = '';
    this.error = false;
    this.textarea = false;
    this.textareaHeight = '250px';
  }
  connectedCallback() {
    if (this.error) {
      this.isActive = true;
      this.labelClass += ' active error';
    }
    else {
      this.setLabelClass();
    }
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
    this.removeError();
  }
  handleBlur() {
    const workingElem = this.textarea ? this.textArea : this.textInput;
    this.isFocused = false;
    this.setLabelClass(workingElem);
  }
  focusOnInput() {
    const workingElem = this.textarea ? this.textArea : this.textInput;
    workingElem.focus();
  }
  removeError() {
    this.error = false;
    this.containerElem.classList.remove('error');
  }
  returnTaHeight() {
    return { height: this.textareaHeight };
  }
  render() {
    return (h(Host, null, h("div", { class: `${this.makeTypeClass()} ${this.isFocused ? 'focused' : ''} ${this.error ? 'error' : ''}`, ref: el => (this.containerElem = el) }, h("div", { class: "mx-input-inner-wrapper" }, this.leftIcon && (h("div", { class: "mds-input-left-content" }, h("i", { class: this.leftIcon }))), this.label && (h("label", { class: this.labelClass, onClick: () => this.focusOnInput() }, this.label)), !this.textarea ? (h("div", { class: "mds-input" }, h("input", { type: this.type, name: this.name, value: this.value, onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), ref: el => (this.textInput = el) }))) : (h("textarea", { style: this.returnTaHeight(), name: this.name, onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), ref: el => (this.textArea = el) }, this.value)), (this.rightIcon || this.error) && (h("div", { class: "mds-input-right-content" }, this.error ? h("i", { class: "ph-warning-circle" }) : h("i", { class: this.rightIcon }))))), this.assistiveText && h("div", { class: "assistive-text" }, this.assistiveText)));
  }
};
MxInput.style = mxInputCss;

export { MxInput as mx_input };
