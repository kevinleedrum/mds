import { r as registerInstance, h, e as Host } from './index-d7718e8b.js';

const mxButtonCss = "mx-button button.btn{position:relative;overflow:hidden;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center;text-transform:uppercase}mx-button button.btn span{position:absolute;border-radius:50%;background-color:rgba(255, 255, 255, 0.3);width:100px;height:100px;margin-top:-50px;margin-left:-50px;animation:ripple 1s;opacity:0}@keyframes ripple{from{opacity:1;transform:scale(0)}to{opacity:0;transform:scale(10)}}mx-button button.outlined{background-color:var(--primary-bg-color);color:var(--primary-bg-text-color);font-size:14px;border-radius:8px;padding:10px 16px;font-weight:600}mx-button button.outlined.xl{padding:16px 32px;font-size:16px}mx-button button.outlined:hover{background:linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), var(--primary-bg-color)}mx-button button.outlined:disabled{background:rgba(51, 51, 51, 0.38);color:rgba(51, 51, 51, 0.38)}";

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'outlined';
    this.disabled = false;
    this.xl = false;
  }
  ripple(e) {
    // Create span element
    let ripple = document.createElement('span');
    // Add ripple class to span
    ripple.classList.add('ripple');
    // Add span to the button
    this.btnElem.appendChild(ripple);
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
    return str;
  }
  render() {
    return (h(Host, null, h("button", { class: this.returnBaseClass(), ref: el => (this.btnElem = el), onClick: e => {
        this.ripple(e);
      }, disabled: this.disabled }, this.value)));
  }
};
MxInput.style = mxButtonCss;

export { MxInput as mx_button };
