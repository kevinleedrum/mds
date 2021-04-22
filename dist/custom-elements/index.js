import { h, Host, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';

const MxInput$2 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.type = 'contained';
    this.disabled = false;
    this.xl = false;
    this.full = false;
  }
  ripple(e) {
    const elem = this.href ? this.anchorElem : this.btnElem;
    // Create span element
    let ripple = document.createElement('span');
    // Add ripple class to span
    ripple.classList.add('ripple');
    // Add span to the button
    elem.appendChild(ripple);
    // Get position of X
    let x = e.clientX - e.target.offsetLeft;
    // Get position of Y
    let y = e.clientY - e.target.offsetTop;
    // Position the span element
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }
  returnBaseClass() {
    let str = `btn ${this.type}`;
    if (this.xl)
      str = `${str} xl`;
    if (this.full)
      str = `${str} full`;
    return str;
  }
  render() {
    return (h(Host, { class: "mx-button" }, this.href ? (h("a", { href: this.href, target: this.target, class: this.returnBaseClass(), ref: el => (this.anchorElem = el), onClick: e => {
        this.ripple(e);
      } }, h("div", { class: "flex justify-center items-center content-center" }, this.iconLeft && h("i", { class: this.iconLeft }), this.value))) : (h("button", { class: this.returnBaseClass(), ref: el => (this.btnElem = el), onClick: e => {
        this.ripple(e);
      }, disabled: this.disabled }, h("div", { class: "flex justify-center items-center content-center" }, this.iconLeft && h("i", { class: this.iconLeft }), this.value)))));
  }
};

const MxInput$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
  overrideTextArea() {
    if (!this.textarea)
      return {};
    return { alignItems: 'start' }; // For icon placement.
  }
  isTextarea() {
    return this.textarea ? 'textarea' : '';
  }
  render() {
    return (h(Host, { class: "mx-input" }, h("div", { class: `${this.makeTypeClass()} ${this.isFocused ? 'focused' : ''} ${this.error ? 'error' : ''}`, ref: el => (this.containerElem = el) }, h("div", { class: `mx-input-inner-wrapper ${this.isTextarea()}`, style: this.overrideTextArea() }, this.leftIcon && (h("div", { class: "mds-input-left-content" }, h("i", { class: this.leftIcon }))), this.label && (h("label", { class: this.labelClass, onClick: () => this.focusOnInput() }, this.label)), !this.textarea ? (h("div", { class: "mds-input" }, h("input", { type: this.type, name: this.name, value: this.value, onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), ref: el => (this.textInput = el) }))) : (h("textarea", { style: this.returnTaHeight(), name: this.name, onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), ref: el => (this.textArea = el) }, this.value)), (this.rightIcon || this.error) && (h("div", { class: "mds-input-right-content" }, this.error ? h("i", { class: "ph-warning-circle" }) : h("i", { class: this.rightIcon }))))), this.assistiveText && h("div", { class: "assistive-text" }, this.assistiveText)));
  }
};

const MxButton = /*@__PURE__*/proxyCustomElement(MxInput$2, [0,"mx-button",{"type":[1],"value":[1],"disabled":[4],"xl":[4],"href":[1],"target":[1],"full":[4],"iconLeft":[1,"icon-left"]}]);
const MxInput = /*@__PURE__*/proxyCustomElement(MxInput$1, [0,"mx-input",{"name":[1],"label":[1],"value":[1],"type":[1],"dense":[4],"leftIcon":[1,"left-icon"],"rightIcon":[1,"right-icon"],"isActive":[1028,"is-active"],"isFocused":[1028,"is-focused"],"outerContainerClass":[1,"outer-container-class"],"labelClass":[1025,"label-class"],"error":[1028],"assistiveText":[1,"assistive-text"],"textarea":[4],"textareaHeight":[1025,"textarea-height"]}]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      MxButton,
  MxInput
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { MxButton, MxInput, defineCustomElements };
