import { r as registerInstance, h, e as Host, g as getElement } from './index-7d7e62d7.js';
import { r as ripple } from './ripple-140c6d57.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';

const MxFab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.icon = undefined;
    this.secondary = false;
    this.elAriaLabel = undefined;
    this.value = undefined;
    this.minWidths = new MinWidths();
    this.isExtended = false;
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  componentWillLoad() {
    this.isExtended = !!this.element.textContent;
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  onClick(e) {
    ripple(e, this.buttonElem);
  }
  get buttonClass() {
    let str = 'flex min-w-full items-center justify-center rounded-full shadow-4 relative overflow-hidden';
    if (this.secondary)
      str += ' secondary';
    if (this.isExtended)
      str += ' h-48 py-16 px-24';
    else
      str += this.minWidths.md ? ' h-56' : ' h-40';
    return str;
  }
  get slotWrapperClass() {
    let str = 'flex items-center text-4 tracking-1-25 leading-4 uppercase font-semibold';
    if (this.isExtended && this.icon)
      str += ' ml-12';
    return str;
  }
  render() {
    return (h(Host, { class: 'mx-fab inline-block min-w-max' + (this.minWidths.md ? ' w-56' : ' w-40') }, h("button", { ref: el => (this.buttonElem = el), type: "button", value: this.value, class: this.buttonClass, "aria-label": this.elAriaLabel, onClick: this.onClick.bind(this) }, this.icon && h("i", { class: this.icon + ' text-1' }), h("div", { class: this.slotWrapperClass }, h("slot", null)))));
  }
  get element() { return getElement(this); }
};

export { MxFab as mx_fab };
