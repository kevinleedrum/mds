import { Component, Host, h, Prop, Element } from '@stencil/core';
import ripple from '../../utils/ripple';
import { propagateDataAttributes } from '../../utils/utils';
export class MxToggleButton {
  constructor() {
    this.dataAttributes = {};
    this.selected = false;
    this.disabled = false;
    this.componentWillRender = propagateDataAttributes;
  }
  onClick(e) {
    ripple(e, this.btnElem);
  }
  render() {
    return (h(Host, { class: "mx-toggle-button inline-flex overflow-hidden border-l\n      first-of-type:border-l-0 first-of-type:rounded-tl first-of-type:rounded-bl\n      last-of-type:rounded-tr last-of-type:rounded-br" },
      h("button", Object.assign({ type: "button", class: 'btn-toggle inline-flex relative items-center justify-center w-48 h-48 text-1 overflow-hidden cursor-pointer disabled:cursor-auto disabled:pointer-events-none' +
          (this.selected ? ' selected' : ''), ref: el => (this.btnElem = el), disabled: this.disabled, role: this.value === undefined ? 'switch' : 'radio', "aria-checked": this.selected ? 'true' : 'false', "aria-label": this.elAriaLabel, onClick: this.onClick.bind(this) }, this.dataAttributes),
        h("i", { class: this.icon }))));
  }
  static get is() { return "mx-toggle-button"; }
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
        "text": ""
      },
      "attribute": "icon",
      "reflect": false
    },
    "selected": {
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
      "attribute": "selected",
      "reflect": true,
      "defaultValue": "false"
    },
    "disabled": {
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
      "attribute": "disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "elAriaLabel": {
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
        "text": "The aria-label attribute for the inner button element."
      },
      "attribute": "el-aria-label",
      "reflect": false
    },
    "value": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Only used inside a toggle button group"
      },
      "attribute": "value",
      "reflect": false
    }
  }; }
  static get elementRef() { return "element"; }
}
