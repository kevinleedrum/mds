'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2d451529.js');
const ripple = require('./ripple-b35647b1.js');
const minWidthSync = require('./minWidthSync-93e92215.js');

const MxFab = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** Style as a secondary action */
    this.secondary = false;
    this.minWidths = new minWidthSync.MinWidths();
    this.isExtended = false;
  }
  connectedCallback() {
    minWidthSync.minWidthSync.subscribeComponent(this);
  }
  componentWillLoad() {
    this.isExtended = !!this.element.textContent;
  }
  disconnectedCallback() {
    minWidthSync.minWidthSync.unsubscribeComponent(this);
  }
  onClick(e) {
    ripple.ripple(e, this.buttonElem);
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
    return (index.h(index.Host, { class: 'mx-fab inline-block min-w-max' + (this.minWidths.md ? ' w-56' : ' w-40') }, index.h("button", { ref: el => (this.buttonElem = el), type: "button", value: this.value, class: this.buttonClass, "aria-label": this.ariaLabel, onClick: this.onClick.bind(this) }, this.icon && index.h("i", { class: this.icon + ' text-1' }), index.h("div", { class: this.slotWrapperClass }, index.h("slot", null)))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_fab = MxFab;
