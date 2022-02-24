import { Component, Host, h, Prop, Element, Event } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';
export class MxSearch {
  constructor() {
    this.dataAttributes = {};
    this.dense = false;
    this.flat = false;
    /** Set to `false` to hide the clear button. */
    this.showClear = true;
    this.componentWillRender = propagateDataAttributes;
  }
  onInput(e) {
    this.value = e.target.value;
  }
  onClear() {
    this.inputEl.value = '';
    this.inputEl.dispatchEvent(new window.Event('input', { bubbles: true }));
    this.mxClear.emit();
    if (typeof jest === 'undefined')
      this.inputEl.focus();
  }
  get inputClass() {
    let str = 'w-full pl-56 pr-16 rounded-lg outline-none border focus:border-2';
    str += this.flat ? ' flat' : ' shadow-1';
    str += this.dense ? ' h-36 py-8 text-4' : ' h-48 py-12';
    return str;
  }
  get clearButtonClass() {
    let str = 'clear-button absolute right-8 inline-flex items-center justify-center w-24 h-24 cursor-pointer';
    if (!this.value)
      str += ' hidden';
    return str;
  }
  render() {
    return (h(Host, { class: "mx-search flex items-center relative" },
      h("input", Object.assign({ ref: el => (this.inputEl = el), type: "search", "aria-label": this.elAriaLabel || this.placeholder || 'Search', name: this.name, placeholder: this.placeholder, value: this.value, class: this.inputClass }, this.dataAttributes, { onInput: this.onInput.bind(this) })),
      h("i", { class: "absolute mds-search text-icon left-16 pointer-events-none" }),
      this.showClear && (h("button", { type: "button", "aria-label": "Clear search", class: this.clearButtonClass, "data-testid": "clear-button", onClick: this.onClear.bind(this) },
        h("i", { class: "mds-x text-icon" })))));
  }
  static get is() { return "mx-search"; }
  static get properties() { return {
    "dense": {
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
      "attribute": "dense",
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
        "text": "The `aria-label` attribute for the `<input>` element. If not provided, the `aria-label` will fallback to either the `placeholder` value or simply \"Search\"."
      },
      "attribute": "el-aria-label",
      "reflect": false
    },
    "flat": {
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
      "attribute": "flat",
      "reflect": false,
      "defaultValue": "false"
    },
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
      "reflect": false
    },
    "placeholder": {
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
      "attribute": "placeholder",
      "reflect": false
    },
    "showClear": {
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
        "text": "Set to `false` to hide the clear button."
      },
      "attribute": "show-clear",
      "reflect": false,
      "defaultValue": "true"
    },
    "value": {
      "type": "string",
      "mutable": true,
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
  static get events() { return [{
      "method": "mxClear",
      "name": "mxClear",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the clear button is clicked."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get elementRef() { return "element"; }
}
