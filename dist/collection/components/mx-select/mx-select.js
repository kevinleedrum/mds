import { Component, Host, h, Prop, Element, Watch, State } from '@stencil/core';
export class MxSelect {
  constructor() {
    this.dense = false;
    this.disabled = false;
    /** Style with a 1dp elevation */
    this.elevated = false;
    /** Style with a "flat" border color */
    this.flat = false;
    this.error = false;
    /** Additional classes for the label */
    this.labelClass = '';
    this.isFocused = false;
  }
  componentDidLoad() {
    this.updateSelectValue();
  }
  onValueChange() {
    this.updateSelectValue();
  }
  updateSelectValue() {
    this.selectElem.value = this.value;
  }
  onFocus() {
    this.isFocused = true;
    this.error = false;
  }
  onBlur() {
    this.isFocused = false;
  }
  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }
  get selectWrapperClass() {
    let str = 'mx-select-wrapper flex items-center relative border rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    if (this.elevated)
      str += ' elevated shadow-1';
    if (this.flat)
      str += ' flat';
    if (this.error || this.isFocused)
      str += ' border-2';
    if (this.error)
      str += ' error';
    if (this.disabled)
      str += ' disabled';
    return str;
  }
  get selectClass() {
    let str = 'absolute inset-0 w-full pl-16 overflow-hidden outline-none appearance-none bg-transparent cursor-pointer disabled:cursor-auto';
    if (this.isFocused)
      str += ' -m-1'; // prevent shifting due to border-width change
    return str;
  }
  get labelClassNames() {
    let str = 'absolute block pointer-events-none mt-0 left-12 px-4';
    if (this.dense)
      str += ' dense text-sm';
    if (this.isFocused || this.hasValue)
      str += ' floating';
    if (this.isFocused)
      str += ' -ml-1'; // prevent shifting due to border-width change
    return (str += ' ' + this.labelClass);
  }
  get iconSuffixClass() {
    let str = 'icon-suffix absolute flex items-center h-full right-16 space-x-8 pointer-events-none';
    if (this.isFocused)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  get iconEl() {
    let icon = (h("svg", { "data-testid": "arrow", width: "10", height: "6", viewBox: "0 0 10 6", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      h("path", { d: "M9.9654 0.757212C9.93099 0.681077 9.87273 0.616004 9.79798 0.57022C9.72323 0.524437 9.63535 0.5 9.54545 0.5H0.454547C0.364646 0.5 0.276763 0.524437 0.202012 0.570222C0.127262 0.616007 0.0690015 0.681082 0.0345985 0.757219C0.000195557 0.833357 -0.00880479 0.917136 0.00873577 0.997962C0.0262763 1.07879 0.0695701 1.15303 0.133142 1.2113L4.67859 5.37795C4.7208 5.41665 4.77091 5.44734 4.82605 5.46828C4.8812 5.48922 4.94031 5.5 5 5.5C5.05969 5.5 5.1188 5.48922 5.17394 5.46828C5.22909 5.44734 5.2792 5.41665 5.3214 5.37795L9.86686 1.2113C9.93043 1.15303 9.97372 1.07879 9.99126 0.997958C10.0088 0.917131 9.9998 0.833351 9.9654 0.757212Z", fill: "currentColor" })));
    if (this.error)
      icon = h("i", { "data-testid": "error-icon", class: "ph-warning-circle -mr-4" });
    return icon;
  }
  render() {
    return (h(Host, { class: "mx-select" },
      h("div", { class: this.selectWrapperClass },
        h("select", { "aria-label": this.label || this.ariaLabel, class: this.selectClass, disabled: this.disabled, id: this.selectId, name: this.name, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), ref: el => (this.selectElem = el) },
          h("slot", null)),
        this.label && h("label", { class: this.labelClassNames }, this.label),
        h("span", { class: this.iconSuffixClass },
          this.suffix && h("span", { class: "suffix flex items-center h-full px-4" }, this.suffix),
          this.iconEl)),
      this.assistiveText && h("div", { class: "assistive-text text-xs mt-4 ml-16" }, this.assistiveText)));
  }
  static get is() { return "mx-select"; }
  static get properties() { return {
    "assistiveText": {
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
        "text": "Helpful text to show below the select"
      },
      "attribute": "assistive-text",
      "reflect": false
    },
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
    "elevated": {
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
        "text": "Style with a 1dp elevation"
      },
      "attribute": "elevated",
      "reflect": false,
      "defaultValue": "false"
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
        "text": "Style with a \"flat\" border color"
      },
      "attribute": "flat",
      "reflect": false,
      "defaultValue": "false"
    },
    "label": {
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
      "attribute": "label",
      "reflect": false
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
        "text": ""
      },
      "attribute": "aria-label",
      "reflect": false
    },
    "selectId": {
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
        "text": "The `id` attribute for the select element"
      },
      "attribute": "select-id",
      "reflect": false
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
    "suffix": {
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
        "text": "Text shown to the left of the arrow"
      },
      "attribute": "suffix",
      "reflect": false
    },
    "error": {
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
      "attribute": "error",
      "reflect": false,
      "defaultValue": "false"
    },
    "labelClass": {
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
        "text": "Additional classes for the label"
      },
      "attribute": "label-class",
      "reflect": false,
      "defaultValue": "''"
    },
    "value": {
      "type": "any",
      "mutable": true,
      "complexType": {
        "original": "any",
        "resolved": "any",
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
  static get states() { return {
    "isFocused": {}
  }; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "onValueChange"
    }]; }
}
