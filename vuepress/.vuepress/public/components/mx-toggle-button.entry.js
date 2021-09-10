import { r as registerInstance, h, f as Host } from './index-a4e4d6b0.js';
import { r as ripple } from './ripple-54ef50dc.js';

const MxToggleButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selected = false;
    this.disabled = false;
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
    return (h(Host, { class: "mx-toggle-button inline-flex overflow-hidden border-l\n      first-of-type:border-l-0 first-of-type:rounded-tl first-of-type:rounded-bl\n      last-of-type:rounded-tr last-of-type:rounded-br" }, h("button", { class: 'btn-toggle inline-flex relative items-center justify-center w-48 h-48 text-1 overflow-hidden cursor-pointer' +
        (this.selected ? ' selected' : ''), ref: el => (this.btnElem = el), "aria-disabled": this.disabled, role: this.value === undefined ? 'switch' : 'radio', "aria-checked": this.selected, "aria-label": this.ariaLabel, onClick: this.onClick.bind(this) }, h("i", { class: this.icon }))));
  }
};

export { MxToggleButton as mx_toggle_button };
