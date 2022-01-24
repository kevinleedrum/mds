import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';
export class MxIconButton {
  constructor() {
    this.dataAttributes = {};
    this.type = 'button';
    this.disabled = false;
    /** Show downward chevron icon */
    this.chevronDown = false;
    /** Show left-pointing chevron icon */
    this.chevronLeft = false;
    /** Show right-pointing chevron icon */
    this.chevronRight = false;
    this.componentWillRender = propagateDataAttributes;
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
    const Tag = this.href ? 'a' : 'button';
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" },
      this.icon && h("i", { class: ['text-icon', this.icon].join(' ') }),
      h("span", { class: "slot-content" },
        h("slot", null)),
      this.isChevron && (h("span", { class: "chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center text-icon shadow-1" },
        h("i", { "data-testid": "chevron", class: this.chevronLeft ? 'mds-chevron-left' : this.chevronRight ? 'mds-chevron-right' : 'mds-chevron-down' })))));
    return (h(Host, { class: "mx-icon-button inline-block appearance-none" },
      h(Tag, Object.assign({ type: this.href ? null : this.type, formaction: this.formaction, value: this.value, href: this.href, class: "flex appearance-none items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto", ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled ? 'true' : null, "aria-label": this.elAriaLabel }, this.dataAttributes), buttonContent)));
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
    "formaction": {
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
      "attribute": "formaction",
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
    },
    "href": {
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
        "text": "Create button as link"
      },
      "attribute": "href",
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
      "reflect": true,
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
  static get elementRef() { return "element"; }
}
