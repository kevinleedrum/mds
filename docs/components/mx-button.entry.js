import { r as registerInstance, h, f as Host } from './index-935f3e8d.js';
import { r as ripple } from './ripple-54ef50dc.js';
import { c as chevronSvg } from './chevron-down-6a7bb36b.js';

const MxButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    ripple(e, this.href ? this.anchorElem : this.btnElem);
  }
  get buttonClass() {
    // The btnType and dropdown classes are only used for colors
    let str = this.btnType;
    if (this.dropdown)
      str += ' dropdown';
    // Common classes
    str +=
      ' flex items-center justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto hover:no-underline';
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
    // Action Button
    if (this.btnType === 'action') {
      str += ' w-full min-h-36 px-16 border rounded-3xl text-4';
    }
    // Text Button
    if (this.btnType === 'text') {
      str += ' w-full min-h-36 px-8 py-10 text-4 rounded-lg';
      str += this.dropdown ? ' font-normal' : ' font-semibold uppercase tracking-1-25';
    }
    return str;
  }
  render() {
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && h("i", { class: 'mr-8 text-3 ' + this.icon }), h("span", { class: "slot-content" }, h("slot", null)), this.dropdown && this.btnType === 'text' && h("span", { class: "separator inline-block w-1 ml-4 -my-4 h-24" }), this.dropdown && (h("span", { "data-testid": "chevron", class: this.btnType === 'text' ? 'chevron-icon ml-4' : 'ml-8', innerHTML: chevronSvg }))));
    return (h(Host, { class: 'mx-button' + (this.full ? ' flex' : ' inline-flex') }, this.href ? (h("a", { href: this.href, target: this.target, class: this.buttonClass, ref: el => (this.anchorElem = el), onClick: this.onClick.bind(this) }, buttonContent)) : (h("button", { type: this.type, value: this.value, class: this.buttonClass, ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled }, buttonContent))));
  }
};

export { MxButton as mx_button };
