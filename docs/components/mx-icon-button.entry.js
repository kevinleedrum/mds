import { r as registerInstance, h, e as Host, g as getElement } from './index-a5350afa.js';
import { p as propagateDataAttributes } from './utils-18e3dfde.js';

const MxIconButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.type = 'button';
    this.disabled = false;
    /** Show downward chevron icon */
    this.chevronDown = false;
    /** Show left-pointing chevron icon */
    this.chevronLeft = false;
    /** Show right-pointing chevron icon */
    this.chevronRight = false;
    this.componentWillRender = propagateDataAttributes;
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
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && h("i", { class: ['text-icon', this.icon].join(' ') }), h("span", { class: "slot-content" }, h("slot", null)), this.isChevron && (h("span", { class: "chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center text-icon shadow-1" }, h("i", { "data-testid": "chevron", class: this.chevronLeft ? 'mds-chevron-left' : this.chevronRight ? 'mds-chevron-right' : 'mds-chevron-down' })))));
    return (h(Host, { class: "mx-icon-button inline-block appearance-none" }, h("button", Object.assign({ type: this.type, formaction: this.formaction, value: this.value, class: "flex appearance-none items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto", ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled ? 'true' : null, "aria-label": this.elAriaLabel }, this.dataAttributes), buttonContent)));
  }
  get element() { return getElement(this); }
};

export { MxIconButton as mx_icon_button };
