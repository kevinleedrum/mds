import { r as registerInstance, h, e as Host, g as getElement } from './index-7d7e62d7.js';
import { p as propagateDataAttributes } from './utils-eee50014.js';

const MxIconButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.componentWillRender = propagateDataAttributes;
    this.type = 'button';
    this.form = undefined;
    this.formaction = undefined;
    this.value = undefined;
    this.href = undefined;
    this.target = undefined;
    this.disabled = false;
    this.elAriaLabel = undefined;
    this.chevronDown = false;
    this.chevronLeft = false;
    this.chevronRight = false;
    this.chevronUp = false;
    this.icon = undefined;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
  }
  get isChevron() {
    return this.chevronDown || this.chevronLeft || this.chevronRight || this.chevronUp;
  }
  render() {
    const Tag = this.href ? 'a' : 'button';
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && h("i", { class: ['text-icon', this.icon].join(' ') }), h("span", { class: "slot-content" }, h("slot", null)), this.isChevron && (h("span", { class: "chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center text-icon shadow-1" }, h("i", { "data-testid": "chevron", class: this.chevronLeft
        ? 'mds-chevron-left'
        : this.chevronRight
          ? 'mds-chevron-right'
          : this.chevronUp
            ? 'mds-chevron-up'
            : 'mds-chevron-down' })))));
    return (h(Host, { class: "mx-icon-button inline-block appearance-none" }, h(Tag, Object.assign({ type: this.href ? null : this.type, form: this.form, formaction: this.formaction, value: this.value, href: this.href, target: this.href ? this.target : null, class: "flex text-current appearance-none items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer disabled:pointer-events-none disabled:cursor-auto", ref: el => (this.btnElem = el), disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : null, "aria-label": this.elAriaLabel, tabindex: this.disabled ? '-1' : '0' }, this.dataAttributes, { onClick: this.onClick.bind(this) }), buttonContent)));
  }
  get element() { return getElement(this); }
};

export { MxIconButton as mx_icon_button };
