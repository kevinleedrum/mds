import { Component, Host, h, Element, Prop, Watch, State } from '@stencil/core';
import { collapse, expand, slideIn, slideOut } from '../../utils/transitions';
export class MxBanner {
  constructor() {
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
    let str = 'flex items-center space-x-12 mt-16 md:mt-0';
    str += this.hasActions ? ' mb-8' : ' mb-16';
    str += ' md:mb-0';
    return str;
  }
  render() {
    return (h(Host, { class: this.hostClass, role: "alert" },
      h("div", { ref: el => (this.bannerEl = el), class: "flex flex-col md:flex-row md:items-center md:justify-between min-h-56 px-24 md:px-72 py-8 md:py-10" },
        h("div", { "data-testid": "message", class: this.messageClass },
          this.hasImage && (h("div", { class: "flex-shrink-0" },
            h("slot", { name: "image" }))),
          h("p", { class: "my-0 text-4 flex-grow" },
            h("slot", null))),
        h("div", { "data-testid": "actions", class: "text-right flex-shrink-0" },
          h("slot", { name: "actions" })))));
  }
  static get is() { return "mx-banner"; }
  static get properties() { return {
    "error": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "error",
      "reflect": false,
      "defaultValue": "false"
    },
    "isOpen": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Toggles the banner with a transition."
      },
      "attribute": "is-open",
      "reflect": false,
      "defaultValue": "false"
    },
    "sticky": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "When set, `position: sticky` will be applied to the banner."
      },
      "attribute": "sticky",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "isVisible": {}
  }; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "isOpen",
      "methodName": "transitionBanner"
    }]; }
}
