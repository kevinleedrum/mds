import { Component, Host, h, Prop } from '@stencil/core';
import chevronSvg from '../../assets/svg/chevron-down.svg';
export class MxIconButton {
  constructor() {
    this.type = 'button';
    this.disabled = false;
    /** Show downward chevron icon */
    this.chevronDown = false;
    /** Show left-pointing chevron icon */
    this.chevronLeft = false;
    /** Show right-pointing chevron icon */
    this.chevronRight = false;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
  }
  get isChevron() {
    return this.chevronDown || this.chevronLeft || this.chevronRight;
  }
  render() {
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" },
      this.icon && h("i", { class: ['text-1', this.icon].join(' ') }),
      h("span", { class: "slot-content" },
        h("slot", null)),
      this.isChevron && (h("span", { class: "chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center shadow-1" },
        h("span", { "data-testid": "chevron", class: this.chevronLeft ? 'transform rotate-90' : this.chevronRight ? 'transform -rotate-90' : '', innerHTML: chevronSvg })))));
    return (h(Host, { class: "mx-icon-button" },
      h("button", { type: this.type, value: this.value, class: "flex items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer", ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled, "aria-label": this.ariaLabel }, buttonContent)));
  }
  static get is() { return "mx-icon-button"; }
  static get properties() { return {
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'button' | 'submit' | 'reset'",
        "resolved": "\"button\" | \"reset\" | \"submit\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "type",
      "reflect": false,
      "defaultValue": "'button'"
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
        "text": "An aria-label is highly recommended"
      },
      "attribute": "aria-label",
      "reflect": false
    },
    "chevronDown": {
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
        "text": "Show downward chevron icon"
      },
      "attribute": "chevron-down",
      "reflect": false,
      "defaultValue": "false"
    },
    "chevronLeft": {
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
        "text": "Show left-pointing chevron icon"
      },
      "attribute": "chevron-left",
      "reflect": false,
      "defaultValue": "false"
    },
    "chevronRight": {
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
        "text": "Show right-pointing chevron icon"
      },
      "attribute": "chevron-right",
      "reflect": false,
      "defaultValue": "false"
    },
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
        "text": "Class name of icon (for icon font)"
      },
      "attribute": "icon",
      "reflect": false
    }
  }; }
}
