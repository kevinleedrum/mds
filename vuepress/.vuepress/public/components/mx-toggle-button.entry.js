import { r as registerInstance, h, e as Host, g as getElement } from './index-a5350afa.js';
import { r as ripple } from './ripple-54ef50dc.js';
import { p as propagateDataAttributes } from './utils-18e3dfde.js';

const MxToggleButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.selected = false;
    this.disabled = false;
    this.componentWillRender = propagateDataAttributes;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    ripple(e, this.btnElem);
  }
  render() {
    return (h(Host, { class: "mx-toggle-button inline-flex overflow-hidden border-l\n      first-of-type:border-l-0 first-of-type:rounded-tl first-of-type:rounded-bl\n      last-of-type:rounded-tr last-of-type:rounded-br" }, h("button", Object.assign({ class: 'btn-toggle inline-flex relative items-center justify-center w-48 h-48 text-1 overflow-hidden cursor-pointer' +
        (this.selected ? ' selected' : ''), ref: el => (this.btnElem = el), "aria-disabled": this.disabled ? 'true' : null, role: this.value === undefined ? 'switch' : 'radio', "aria-checked": this.selected ? 'true' : 'false', "aria-label": this.elAriaLabel, onClick: this.onClick.bind(this) }, this.dataAttributes), h("i", { class: this.icon }))));
  }
  get element() { return getElement(this); }
};

export { MxToggleButton as mx_toggle_button };
