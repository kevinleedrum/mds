'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f1d14aa.js');
const transitions = require('./transitions-c9a33e78.js');
require('./utils-1f7ef40d.js');

const MxBanner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hasActions = false;
    this.hasImage = false;
    this.error = false;
    /** Toggles the banner with a transition. */
    this.isOpen = false;
    /** When set, `position: sticky` will be applied to the banner. */
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
      transitions.collapse(this.element);
      await transitions.slideOut(this.bannerEl, 150);
      this.isVisible = false;
    }
    else {
      this.isVisible = true;
      await new Promise(requestAnimationFrame);
      transitions.expand(this.element);
      await transitions.slideIn(this.bannerEl, 150);
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
    let str = 'flex items-center space-x-12 mt-16 md:mt-0';
    str += this.hasActions ? ' mb-8' : ' mb-16';
    str += ' md:mb-0';
    return str;
  }
  render() {
    return (index.h(index.Host, { class: this.hostClass, role: "alert" }, index.h("div", { ref: el => (this.bannerEl = el), class: "flex flex-col md:flex-row md:items-center md:justify-between min-h-56 px-24 md:px-72 py-8 md:py-10" }, index.h("div", { "data-testid": "message", class: this.messageClass }, this.hasImage && (index.h("div", { class: "flex-shrink-0" }, index.h("slot", { name: "image" }))), index.h("p", { class: "my-0 text-4 flex-grow" }, index.h("slot", null))), index.h("div", { "data-testid": "actions", class: "text-right flex-shrink-0" }, index.h("slot", { name: "actions" })))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "isOpen": ["transitionBanner"]
  }; }
};

exports.mx_banner = MxBanner;
