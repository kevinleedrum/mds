import { Component, Element, Host, h, Prop, State } from '@stencil/core';
import ripple from '../ripple';
import { MinWidths, minWidthSync } from '../../utils/minWidthSync';
export class MxFab {
  constructor() {
    /** Style as a secondary action */
    this.secondary = false;
    this.minWidths = new MinWidths();
    this.isExtended = false;
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  componentWillLoad() {
    this.isExtended = !!this.element.textContent;
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  onClick(e) {
    ripple(e, this.buttonElem);
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
    return (h(Host, { class: 'mx-fab inline-block min-w-max' + (this.minWidths.md ? ' w-56' : ' w-40') },
      h("button", { ref: el => (this.buttonElem = el), type: "button", value: this.value, class: this.buttonClass, "aria-label": this.ariaLabel, onClick: this.onClick.bind(this) },
        this.icon && h("i", { class: this.icon + ' text-1' }),
        h("div", { class: this.slotWrapperClass },
          h("slot", null)))));
  }
  static get is() { return "mx-fab"; }
  static get properties() { return {
    "icon": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Class name of icon"
      },
      "attribute": "icon",
      "reflect": false
    },
    "secondary": {
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
        "text": "Style as a secondary action"
      },
      "attribute": "secondary",
      "reflect": false,
      "defaultValue": "false"
    },
    "ariaLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "aria-label",
      "reflect": false
    },
    "value": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "value",
      "reflect": false
    }
  }; }
  static get states() { return {
    "minWidths": {},
    "isExtended": {}
  }; }
  static get elementRef() { return "element"; }
}
