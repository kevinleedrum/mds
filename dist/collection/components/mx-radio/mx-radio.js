import { Component, Host, h, Prop } from '@stencil/core';
export class MxRadio {
  constructor() {
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-radio" },
      h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm" },
        h("input", { class: "absolute h-0 w-0 opacity-0", type: "radio", name: this.name, value: this.value, checked: this.checked }),
        h("span", { class: "flex h-20 w-20 cursor-pointer rounded-full" }),
        h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
  static get is() { return "mx-radio"; }
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
