'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-e17b5fa1.js');

const MxButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.btnType = 'contained';
    this.type = 'button'; // reset | submit
    this.disabled = false;
    this.xl = false;
    this.full = false;
  }
  ripple() {
    const elem = this.href ? this.anchorElem : this.btnElem;
    // Create span element
    let ripple = document.createElement('span');
    // Add ripple class to span
    ripple.classList.add('ripple');
    // Add span to the button
    elem.appendChild(ripple);
    // Position the span element
    ripple.style.left = '0';
    ripple.style.top = '0';
    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }
  returnBaseClass() {
    let str = `btn ${this.btnType}`;
    if (this.xl)
      str = `${str} xl`;
    if (this.full)
      str = `${str} full`;
    return str;
  }
  render() {
    return (index.h(index.Host, { class: "mx-button" }, this.href ? (index.h("a", { href: this.href, target: this.target, class: this.returnBaseClass(), ref: el => (this.anchorElem = el), onClick: () => {
        this.ripple();
      } }, index.h("div", { class: "flex justify-center items-center content-center", onClick: () => {
        this.ripple();
      } }, this.iconLeft && index.h("i", { class: this.iconLeft }), index.h("slot", null)))) : (index.h("button", { type: this.type, value: this.value, class: this.returnBaseClass(), ref: el => (this.btnElem = el), onClick: () => {
        this.ripple();
      }, disabled: this.disabled }, index.h("div", { class: "flex justify-center items-center content-center relative", onClick: () => {
        this.ripple();
      } }, this.iconLeft && index.h("i", { class: this.iconLeft }), index.h("slot", null))))));
  }
};

exports.mx_button = MxButton;
