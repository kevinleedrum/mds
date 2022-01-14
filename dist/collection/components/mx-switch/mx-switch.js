import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';
export class MxSwitch {
  constructor() {
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelClass = '';
    this.labelName = '';
    this.checked = false;
    this.disabled = false;
    this.componentWillRender = propagateDataAttributes;
  }
  /** Keep checked prop in sync with input element attribute */
  onInput(e) {
    this.checked = e.target.checked;
  }
  get labelClassNames() {
    let str = 'elative inline-flex flex-nowrap align-center items-center text-4';
    if (!this.disabled)
      str += ' cursor-pointer';
    if (this.labelClass)
      str += ' ' + this.labelClass;
    return str;
  }
  render() {
    return (h(Host, { class: "mx-switch" },
      h("label", { class: this.labelClassNames },
        h("input", Object.assign({ class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, value: this.value, disabled: this.disabled, checked: this.checked }, this.dataAttributes, { onInput: this.onInput.bind(this) })),
        h("div", { class: 'slider relative round w-36 h-14 flex-shrink-0' + (this.disabled ? '' : ' cursor-pointer') }),
        h("div", { class: "switch-label ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
  static get is() { return "mx-switch"; }
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
      "mutable": true,
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
    }
  }; }
  static get elementRef() { return "element"; }
}
