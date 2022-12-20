import { r as registerInstance, h, e as Host, g as getElement } from './index-7d7e62d7.js';
import { r as ripple } from './ripple-140c6d57.js';
import { p as propagateDataAttributes } from './utils-eee50014.js';

const MxButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.componentWillRender = propagateDataAttributes;
    this.btnType = 'contained';
    this.elAriaLabel = undefined;
    this.type = 'button';
    this.value = undefined;
    this.form = undefined;
    this.formaction = undefined;
    this.disabled = false;
    this.xl = false;
    this.href = undefined;
    this.target = undefined;
    this.full = false;
    this.dropdown = false;
    this.icon = undefined;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    ripple(e, this.href ? this.anchorElem : this.btnElem);
  }
  get buttonClass() {
    // The btnType and dropdown classes are only used for colors
    let str = this.btnType;
    if (this.dropdown)
      str += ' dropdown';
    // Common classes
    str +=
      ' flex items-center justify-center relative overflow-hidden cursor-pointer appearance-none disabled:pointer-events-none disabled:cursor-auto hover:no-underline';
    // Contained & Outlined Buttons
    if (['contained', 'outlined'].includes(this.btnType)) {
      str += ' w-full rounded-lg font-semibold uppercase';
      if (this.btnType === 'outlined')
        str += ' border';
      if (this.xl)
        str += ' min-h-48 px-32 text-3 tracking-1-5';
      else
        str += ' min-h-36 px-16 text-4 tracking tracking-1-25';
    }
    // Simple Button
    if (this.btnType === 'simple') {
      str += ' w-full min-h-36 px-16 border rounded-3xl text-4';
    }
    // Text Button
    if (this.btnType === 'text') {
      str += ' w-full min-h-36 px-8 py-10 text-4 rounded-lg';
      str += this.dropdown ? ' font-normal' : ' font-semibold uppercase tracking-1-25';
    }
    return str;
  }
  connectedCallback() {
    // The 'action' type has been renamed to 'simple'
    if (this.btnType === 'action')
      this.btnType = 'simple';
  }
  render() {
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative overflow-hidden whitespace-nowrap" }, this.icon && h("i", { class: 'mr-8 text-3 ' + this.icon }), h("span", { class: "slot-content truncate" }, h("slot", null)), this.dropdown && this.btnType === 'text' && h("span", { class: "separator inline-block w-1 ml-4 -my-4 h-24" }), this.dropdown && (h("i", { "data-testid": "chevron", class: 'mds-chevron-down text-icon ' + (this.btnType === 'text' ? 'chevron-icon' : 'ml-4') }))));
    return (h(Host, { class: 'mx-button appearance-none' + (this.full ? ' flex' : ' inline-flex') }, this.href ? (h("a", Object.assign({ href: this.href, target: this.target, "aria-disabled": this.disabled ? 'true' : null, class: this.buttonClass, ref: el => (this.anchorElem = el), onClick: this.onClick.bind(this) }, this.dataAttributes), buttonContent)) : (h("button", Object.assign({ type: this.type, form: this.form, formaction: this.formaction, value: this.value, disabled: this.disabled, class: this.buttonClass, ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-label": this.elAriaLabel }, this.dataAttributes), buttonContent))));
  }
  get element() { return getElement(this); }
};

export { MxButton as mx_button };
