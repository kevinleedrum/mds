'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7252b109.js');
const ripple = require('./ripple-93b636e3.js');
const utils = require('./utils-33993629.js');

const MxButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.btnType = 'contained';
    this.type = 'button';
    this.disabled = false;
    this.xl = false;
    /** Sets display to flex instead of inline-flex */
    this.full = false;
    /** Show chevron icon */
    this.dropdown = false;
    this.componentWillRender = utils.propagateDataAttributes;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    ripple.ripple(e, this.href ? this.anchorElem : this.btnElem);
  }
  get buttonClass() {
    // The btnType and dropdown classes are only used for colors
    let str = this.btnType;
    if (this.dropdown)
      str += ' dropdown';
    // Common classes
    str +=
      ' flex items-center justify-center relative overflow-hidden cursor-pointer appearance-none disabled:cursor-auto hover:no-underline';
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
    const buttonContent = (index.h("div", { class: "flex justify-center items-center content-center relative whitespace-nowrap" }, this.icon && index.h("i", { class: 'mr-8 text-3 ' + this.icon }), index.h("span", { class: "slot-content" }, index.h("slot", null)), this.dropdown && this.btnType === 'text' && index.h("span", { class: "separator inline-block w-1 ml-4 -my-4 h-24" }), this.dropdown && (index.h("i", { "data-testid": "chevron", class: 'mds-chevron-down text-icon ' + (this.btnType === 'text' ? 'chevron-icon' : 'ml-4') }))));
    return (index.h(index.Host, { class: 'mx-button appearance-none' + (this.full ? ' flex' : ' inline-flex') }, this.href ? (index.h("a", { href: this.href, target: this.target, class: this.buttonClass, ref: el => (this.anchorElem = el), onClick: this.onClick.bind(this) }, buttonContent)) : (index.h("button", Object.assign({ type: this.type, formaction: this.formaction, value: this.value, class: this.buttonClass, ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-label": this.elAriaLabel, "aria-disabled": this.disabled ? 'true' : null }, this.dataAttributes), buttonContent))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_button = MxButton;
