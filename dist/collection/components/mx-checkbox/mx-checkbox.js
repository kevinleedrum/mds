import { Component, Host, h, Prop } from '@stencil/core';
export class MxCheckbox {
  constructor() {
    this.name = '';
    this.value = '';
    this.labelLeft = false;
    this.labelName = '';
    this.labelClass = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-checkbox" },
      h("label", { class: [
          'relative flex-1 inline-flex flex-nowrap align-center items-center cursor-pointer text-4',
          this.labelClass,
        ].join(' ') },
        h("input", { class: "absolute h-0 w-0 opacity-0", type: "checkbox", name: this.name, value: this.value, checked: this.checked }),
        h("span", { class: 'flex h-18 w-18 cursor-pointer' + (this.labelLeft ? ' order-2 ml-16' : ' order-1') }),
        h("div", { class: 'inline-block' + (this.labelLeft ? ' order-1 flex-1' : ' order-2 ml-16'), "data-testid": "labelName" }, this.labelName))));
  }
  static get is() { return "mx-checkbox"; }
  static get properties() { return {
    "name": {
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
      "attribute": "name",
      "reflect": false,
      "defaultValue": "''"
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
      "reflect": false,
      "defaultValue": "''"
    },
    "labelLeft": {
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
      "attribute": "label-left",
      "reflect": false,
      "defaultValue": "false"
    },
    "labelName": {
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
      "attribute": "label-name",
      "reflect": false,
      "defaultValue": "''"
    },
    "labelClass": {
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
      "attribute": "label-class",
      "reflect": false,
      "defaultValue": "''"
    },
    "checked": {
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
      "attribute": "checked",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
}
