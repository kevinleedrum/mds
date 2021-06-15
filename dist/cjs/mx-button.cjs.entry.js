'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c59b4a75.js');
const ripple = require('./ripple-b35647b1.js');

const MxButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.btnType = 'contained';
    this.type = 'button';
    this.disabled = false;
    this.xl = false;
    /** Sets display to flex instead of inline-flex */
    this.full = false;
    /** Show chevron icon */
    this.dropdown = false;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (this.btnType !== 'icon')
      ripple.ripple(e, this.href ? this.anchorElem : this.btnElem);
  }
  get buttonClass() {
    // The btnType and dropdown classes are only used for colors
    let str = this.btnType;
    if (this.dropdown)
      str += ' dropdown';
    // Common classes
    str += ' flex items-center justify-center relative overflow-hidden cursor-pointer hover:no-underline';
    // Contained & Outlined Buttons
    if (['contained', 'outlined'].includes(this.btnType)) {
      str += ' w-full rounded-lg font-semibold uppercase';
      if (this.btnType === 'outlined')
        str += ' border';
      if (this.xl)
        str += ' h-48 px-32 text-base tracking-1-5';
      else
        str += ' h-36 px-16 text-sm tracking tracking-1-25';
    }
    // Action Button
    if (this.btnType === 'action') {
      str += ' w-full h-36 px-16 border rounded-3xl text-sm';
    }
    // Text Button
    if (this.btnType === 'text') {
      str += ' w-full h-36 px-8 py-10 text-sm rounded-lg';
      str += this.dropdown ? ' font-normal' : ' font-semibold uppercase tracking-1-25';
    }
    // Icon Button
    if (this.btnType === 'icon') {
      str += ' w-48 h-48 rounded-full';
    }
    return str;
  }
  get chevronClass() {
    if (this.btnType === 'text')
      return 'ml-4';
    if (this.btnType === 'icon')
      return 'chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center shadow-1';
    return 'ml-8';
  }
  render() {
    const chevronIcon = (index.h("svg", { class: "chevron-icon", width: "13", height: "7", viewBox: "0 0 13 7", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { d: "M10.8849 0L6.29492 4.58L1.70492 0L0.294922 1.41L6.29492 7.41L12.2949 1.41L10.8849 0Z", fill: "currentColor", "fill-opacity": "0.88" })));
    const buttonContent = (index.h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && index.h("i", { class: (this.btnType === 'icon' ? 'text-xl ' : 'mr-8 text-base ') + this.icon }), this.btnType !== 'icon' && (index.h("span", { class: "slot-content" }, index.h("slot", null))), this.dropdown && this.btnType === 'text' && index.h("span", { class: "separator inline-block w-1 ml-4 -my-4 h-24" }), this.dropdown && index.h("span", { class: this.chevronClass }, chevronIcon)));
    return (index.h(index.Host, { class: 'mx-button' + (this.full ? ' flex' : ' inline-flex') }, this.href ? (index.h("a", { href: this.href, target: this.target, class: this.buttonClass, ref: el => (this.anchorElem = el), onClick: this.onClick.bind(this) }, buttonContent)) : (index.h("button", { type: this.type, value: this.value, class: this.buttonClass, ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled }, buttonContent))));
  }
};

exports.mx_button = MxButton;
