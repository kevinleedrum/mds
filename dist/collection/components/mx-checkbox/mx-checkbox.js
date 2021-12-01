import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';
export class MxCheckbox {
  constructor() {
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelLeft = false;
    this.labelName = '';
    this.labelClass = '';
    /** Hide the label text visually, but still make it accessible for screen readers */
    this.hideLabel = false;
    this.checked = false;
    this.disabled = false;
    this.indeterminate = false;
    this.componentWillRender = propagateDataAttributes;
  }
  get checkClass() {
    let str = 'flex h-18 w-18 flex-shrink-0';
    str += this.labelLeft ? ' order-2' : ' order-1';
    if (this.labelLeft && !this.hideLabel)
      str += ' ml-16';
    return str;
  }
  get checkLabelClass() {
    let str = 'checkbox-label inline-block';
    if (this.hideLabel)
      str += ' sr-only';
    str += this.labelLeft ? ' order-1 flex-1' : ' order-2';
    if (!this.labelLeft && !this.hideLabel)
      str += ' ml-16';
    return str;
  }
  /** Keep checked prop in sync with input element attribute */
  onInput(e) {
    this.checked = e.target.checked;
  }
  render() {
    return (h(Host, { class: "mx-checkbox inline-flex items-center" },
      h("label", { class: [
          'relative flex-1 inline-flex flex-nowrap align-center items-center text-4' +
            (this.disabled ? '' : ' cursor-pointer'),
          this.labelClass,
        ].join(' ') },
        h("input", Object.assign({ class: 'absolute h-0 w-0 opacity-0' + (this.indeterminate ? ' indeterminate' : ''), type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, indeterminate: this.indeterminate }, this.dataAttributes, { onInput: this.onInput.bind(this) })),
        h("span", { class: this.checkClass }),
        h("div", { class: this.checkLabelClass, "data-testid": "labelName" }, this.labelName))));
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
    "hideLabel": {
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
        "text": "Hide the label text visually, but still make it accessible for screen readers"
      },
      "attribute": "hide-label",
      "reflect": false,
      "defaultValue": "false"
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
    },
    "indeterminate": {
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
      "attribute": "indeterminate",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get elementRef() { return "element"; }
}
