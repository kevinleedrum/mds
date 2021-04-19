import { r as registerInstance, h, e as Host } from './index-d7718e8b.js';

const mxButtonCss = "mx-button button.btn{background-color:var(--primary-bg-color);color:var(--primary-bg-text-color);text-transform:uppercase;font-size:14px;border-radius:8px;padding:10px 16px;font-weight:600;position:relative;overflow:hidden;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;align-items:center;align-content:center}mx-button button.btn span{position:absolute;border-radius:50%;background-color:rgba(255, 255, 255, 0.3);width:100px;height:100px;margin-top:-50px;margin-left:-50px;animation:ripple 1s;opacity:0}@keyframes ripple{from{opacity:1;transform:scale(0)}to{opacity:0;transform:scale(10)}}";

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'outlined';
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
  render() {
    return (h(Host, null, h("button", { class: "btn", ref: el => (this.btnElem = el), onClick: e => {
        this.ripple(e);
      } }, this.value)));
  }
};
MxInput.style = mxButtonCss;

export { MxInput as mx_button };
