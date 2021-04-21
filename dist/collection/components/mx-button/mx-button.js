import { Component, Host, h, Prop } from '@stencil/core';
export class MxInput {
  constructor() {
    this.type = 'contained';
    this.disabled = false;
    this.xl = false;
  }
  ripple(e) {
    // Create span element
    let ripple = document.createElement('span');
    // Add ripple class to span
    ripple.classList.add('ripple');
    // Add span to the button
    this.btnElem.appendChild(ripple);
    // Get position of X
    let x = e.clientX - e.target.offsetLeft;
    // Get position of Y
    let y = e.clientY - e.target.offsetTop;
    // Position the span element
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }
  returnBaseClass() {
    let str = `btn ${this.type}`;
    if (this.xl)
      str = `${str} xl`;
    return str;
  }
  render() {
    return (h(Host, { class: "mx-button" }, this.href ? (h("a", { href: this.href, target: this.target, class: this.returnBaseClass(), ref: el => (this.anchorElem = el), onClick: e => {
        this.ripple(e);
      } }, this.value)) : (h("button", { class: this.returnBaseClass(), ref: el => (this.btnElem = el), onClick: e => {
        this.ripple(e);
      }, disabled: this.disabled }, this.value))));
  }
  static get is() { return "mx-button"; }
  static get properties() { return {
    "type": {
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
      "attribute": "type",
      "reflect": false,
      "defaultValue": "'contained'"
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
    "xl": {
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
      "attribute": "xl",
      "reflect": false,
      "defaultValue": "false"
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
        "text": ""
      },
      "attribute": "href",
      "reflect": false
    },
    "target": {
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
      "attribute": "target",
      "reflect": false
    }
  }; }
}
