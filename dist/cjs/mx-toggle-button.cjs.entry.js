'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-54a36eac.js');
const ripple = require('./ripple-93b636e3.js');
const utils = require('./utils-1f7ef40d.js');

const MxToggleButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.selected = false;
    this.disabled = false;
    this.componentWillRender = utils.propagateDataAttributes;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    ripple.ripple(e, this.btnElem);
  }
  render() {
    return (index.h(index.Host, { class: "mx-toggle-button inline-flex overflow-hidden border-l\n      first-of-type:border-l-0 first-of-type:rounded-tl first-of-type:rounded-bl\n      last-of-type:rounded-tr last-of-type:rounded-br" }, index.h("button", Object.assign({ class: 'btn-toggle inline-flex relative items-center justify-center w-48 h-48 text-1 overflow-hidden cursor-pointer' +
        (this.selected ? ' selected' : ''), ref: el => (this.btnElem = el), "aria-disabled": this.disabled ? 'true' : null, role: this.value === undefined ? 'switch' : 'radio', "aria-checked": this.selected ? 'true' : null, "aria-label": this.ariaLabel, onClick: this.onClick.bind(this) }, this.dataAttributes), index.h("i", { class: this.icon }))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_toggle_button = MxToggleButton;
