import { r as registerInstance, h, H as Host } from './index-5e389dc2.js';
import { r as ripple } from './ripple-a99cb795.js';

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
    return (h(Host, { class: "mx-toggle-button inline-flex overflow-hidden border-l\n      first-of-type:border-l-0 first-of-type:rounded-tl first-of-type:rounded-bl\n      last-of-type:rounded-tr last-of-type:rounded-br" }, h("button", { class: 'btn-toggle inline-flex relative items-center justify-center w-48 h-48 text-xl overflow-hidden cursor-pointer' +
        (this.selected ? ' selected' : ''), ref: el => (this.btnElem = el), "aria-disabled": this.disabled, role: this.value === undefined ? 'switch' : 'radio', "aria-checked": this.selected, onClick: this.onClick.bind(this) }, h("i", { class: this.icon }))));
  }
};

export { MxToggleButton as mx_toggle_button };
