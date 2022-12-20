import { r as registerInstance, h, e as Host, g as getElement } from './index-7d7e62d7.js';
import { c as collapse, s as slideOut, e as expand, a as slideIn } from './transitions-29f7f3e5.js';
import './utils-eee50014.js';

const MxBanner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hasActions = false;
    this.hasImage = false;
    this.error = false;
    this.isOpen = false;
    this.sticky = false;
    this.isVisible = false;
  }
  connectedCallback() {
    this.isVisible = this.isOpen;
  }
  componentWillRender() {
    this.hasActions = !!this.element.querySelector('[slot="actions"]');
    this.hasImage = !!this.element.querySelector('[slot="image"]');
  }
  async transitionBanner() {
    // Collapse/expand host element's max-height while sliding the inner element up/down
    if (!this.isOpen) {
      collapse(this.element);
      await slideOut(this.bannerEl, 150);
      this.isVisible = false;
    }
    else {
      this.isVisible = true;
      await new Promise(requestAnimationFrame);
      expand(this.element);
      await slideIn(this.bannerEl, 150);
    }
  }
  get hostClass() {
    let str = 'mx-banner overflow-hidden';
    str += this.isVisible ? ' block' : ' hidden';
    if (this.sticky)
      str += ' sticky z-10';
    if (this.error)
      str += ' is-error';
    return str;
  }
  get messageClass() {
    let str = 'flex items-center max-w-full overflow-hidden space-x-12 mt-16 md:mt-0';
    str += this.hasActions ? ' mb-8' : ' mb-16';
    str += ' md:mb-0';
    return str;
  }
  render() {
    return (h(Host, { class: this.hostClass, role: "alert" }, h("div", { ref: el => (this.bannerEl = el), class: "flex flex-col max-w-full md:flex-row md:items-center md:justify-between min-h-56 px-24 md:px-72 py-8 md:py-10" }, h("div", { "data-testid": "message", class: this.messageClass }, this.hasImage && (h("div", { class: "flex-shrink-0" }, h("slot", { name: "image" }))), h("p", { class: "min-w-0 my-0 text-4 flex-grow" }, h("slot", null))), h("div", { "data-testid": "actions", class: "text-right flex-shrink-0" }, h("slot", { name: "actions" })))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "isOpen": ["transitionBanner"]
  }; }
};

export { MxBanner as mx_banner };
