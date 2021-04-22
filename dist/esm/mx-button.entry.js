import { r as registerInstance, h, H as Host } from './index-62ff7c7d.js';

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, { class: "mx-button" }, this.href ? (h("a", { href: this.href, target: this.target, class: this.returnBaseClass(), ref: el => (this.anchorElem = el), onClick: e => {
        this.ripple(e);
      } }, h("div", { class: "flex justify-center items-center content-center" }, this.iconLeft && h("i", { class: this.iconLeft }), this.value))) : (h("button", { class: this.returnBaseClass(), ref: el => (this.btnElem = el), onClick: e => {
        this.ripple(e);
      }, disabled: this.disabled }, h("div", { class: "flex justify-center items-center content-center" }, this.iconLeft && h("i", { class: this.iconLeft }), this.value)))));
  }
};

export { MxInput as mx_button };
