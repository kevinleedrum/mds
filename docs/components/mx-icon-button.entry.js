import { r as registerInstance, h, f as Host } from './index-a4e4d6b0.js';
import { c as chevronSvg } from './chevron-down-6a7bb36b.js';

const MxIconButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'button';
    this.disabled = false;
    /** Show downward chevron icon */
    this.chevronDown = false;
    /** Show left-pointing chevron icon */
    this.chevronLeft = false;
    /** Show right-pointing chevron icon */
    this.chevronRight = false;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
  }
  get isChevron() {
    return this.chevronDown || this.chevronLeft || this.chevronRight;
  }
  render() {
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && h("i", { class: ['text-1', this.icon].join(' ') }), h("span", { class: "slot-content" }, h("slot", null)), this.isChevron && (h("span", { class: "chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center shadow-1" }, h("span", { "data-testid": "chevron", class: this.chevronLeft ? 'transform rotate-90' : this.chevronRight ? 'transform -rotate-90' : '', innerHTML: chevronSvg })))));
    return (h(Host, { class: "mx-icon-button inline-block" }, h("button", { type: this.type, value: this.value, class: "flex items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto", ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled, "aria-label": this.ariaLabel }, buttonContent)));
  }
};

export { MxIconButton as mx_icon_button };
