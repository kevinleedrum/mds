'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7a6d2fc8.js');

const MxInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.type = 'contained';
    this.disabled = false;
    this.xl = false;
    this.full = false;
  }
  ripple(e) {
    const elem = this.href ? this.anchorElem : this.btnElem;
    // Create span element
    let ripple = document.createElement('span');
    // Add ripple class to span
    ripple.classList.add('ripple');
    // Add span to the button
    elem.appendChild(ripple);
    // Get position of X
    let x = e.clientX - e.target.offsetLeft;
    // Get position of Y
    let y = e.clientY - e.target.offsetTop;
    // Position the span element
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }
  returnBaseClass() {
    let str = `btn ${this.type}`;
    if (this.xl)
      str = `${str} xl`;
    if (this.full)
      str = `${str} full`;
    return str;
  }
  render() {
    return (index.h(index.Host, { class: "mx-button" }, this.href ? (index.h("a", { href: this.href, target: this.target, class: this.returnBaseClass(), ref: el => (this.anchorElem = el), onClick: e => {
        this.ripple(e);
      } }, index.h("div", { class: "flex justify-center items-center content-center" }, this.iconLeft && index.h("i", { class: this.iconLeft }), this.value))) : (index.h("button", { class: this.returnBaseClass(), ref: el => (this.btnElem = el), onClick: e => {
        this.ripple(e);
      }, disabled: this.disabled }, index.h("div", { class: "flex justify-center items-center content-center" }, this.iconLeft && index.h("i", { class: this.iconLeft }), this.value)))));
  }
};

exports.mx_button = MxInput;
