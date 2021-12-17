import { Component, Host, h, Prop, Element } from '@stencil/core';
import ripple from '../../utils/ripple';
import { propagateDataAttributes } from '../../utils/utils';
export class MxButton {
  constructor() {
    this.dataAttributes = {};
    this.btnType = 'contained';
    this.type = 'button';
    this.disabled = false;
    this.xl = false;
    /** Sets display to flex instead of inline-flex */
    this.full = false;
    /** Show chevron icon */
    this.dropdown = false;
    this.componentWillRender = propagateDataAttributes;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    ripple(e, this.href ? this.anchorElem : this.btnElem);
  }
  get buttonClass() {
    // The btnType and dropdown classes are only used for colors
    let str = this.btnType;
    if (this.dropdown)
      str += ' dropdown';
    // Common classes
    str +=
      ' flex items-center justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto hover:no-underline';
    // Contained & Outlined Buttons
    if (['contained', 'outlined'].includes(this.btnType)) {
      str += ' w-full rounded-lg font-semibold uppercase';
      if (this.btnType === 'outlined')
        str += ' border';
      if (this.xl)
        str += ' min-h-48 px-32 text-3 tracking-1-5';
      else
        str += ' min-h-36 px-16 text-4 tracking tracking-1-25';
    }
    // Action Button
    if (this.btnType === 'action') {
      str += ' w-full min-h-36 px-16 border rounded-3xl text-4';
    }
    // Text Button
    if (this.btnType === 'text') {
      str += ' w-full min-h-36 px-8 py-10 text-4 rounded-lg';
      str += this.dropdown ? ' font-normal' : ' font-semibold uppercase tracking-1-25';
    }
    return str;
  }
  render() {
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" },
      this.icon && h("i", { class: 'mr-8 text-3 ' + this.icon }),
      h("span", { class: "slot-content" },
        h("slot", null)),
      this.dropdown && this.btnType === 'text' && h("span", { class: "separator inline-block w-1 ml-4 -my-4 h-24" }),
      this.dropdown && (h("i", { "data-testid": "chevron", class: 'mds-chevron-down text-icon ' + (this.btnType === 'text' ? 'chevron-icon' : 'ml-4') }))));
    return (h(Host, { class: 'mx-button' + (this.full ? ' flex' : ' inline-flex') }, this.href ? (h("a", { href: this.href, target: this.target, class: this.buttonClass, ref: el => (this.anchorElem = el), onClick: this.onClick.bind(this) }, buttonContent)) : (h("button", Object.assign({ type: this.type, formaction: this.formaction, value: this.value, class: this.buttonClass, ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled ? 'true' : null }, this.dataAttributes), buttonContent))));
  }
  static get is() { return "mx-button"; }
  static get properties() { return {
    "btnType": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "BtnType",
        "resolved": "\"action\" | \"contained\" | \"outlined\" | \"text\"",
        "references": {
          "BtnType": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "btn-type",
      "reflect": false,
      "defaultValue": "'contained'"
    },
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ButtonTypeAttribute",
        "resolved": "\"button\" | \"reset\" | \"submit\"",
        "references": {
          "ButtonTypeAttribute": {
            "location": "local"
          }
        }
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
        "text": "Create button as link"
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
        "text": "Only for link buttons"
      },
      "attribute": "target",
      "reflect": false
    },
    "full": {
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
        "text": "Sets display to flex instead of inline-flex"
      },
      "attribute": "full",
      "reflect": false,
      "defaultValue": "false"
    },
    "dropdown": {
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
        "text": "Show chevron icon"
      },
      "attribute": "dropdown",
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
        "text": "Class name of icon"
      },
      "attribute": "icon",
      "reflect": false
    }
  }; }
  static get elementRef() { return "element"; }
}
