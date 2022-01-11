import { Component, Host, h, Prop, Watch, State, Element } from '@stencil/core';
import { propagateDataAttributes, uuidv4 } from '../../utils/utils';
export class MxSelect {
  constructor() {
    this.uuid = uuidv4();
    this.dataAttributes = {};
    this.dense = false;
    this.disabled = false;
    /** Style with a 1dp elevation */
    this.elevated = false;
    /** Style with a "flat" border color */
    this.flat = false;
    this.floatLabel = false;
    this.error = false;
    /** Additional classes for the label */
    this.labelClass = '';
    this.isFocused = false;
    this.componentWillRender = propagateDataAttributes;
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
  onInput(e) {
    this.value = e.target.value;
  }
  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }
  get selectWrapperClass() {
    let str = 'mx-select-wrapper flex items-center relative rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    if (!this.hasValue)
      str += ' no-value';
    if (this.elevated)
      str += ' elevated shadow-1';
    if (this.flat)
      str += ' flat';
    str += this.error || this.isFocused ? ' border-2' : ' border';
    if (this.error)
      str += ' error';
    if (this.disabled)
      str += ' disabled';
    if (this.selectClass)
      str += ' ' + this.selectClass;
    return str;
  }
  get selectElClass() {
    let str = 'absolute inset-0 w-full pl-16 overflow-hidden outline-none appearance-none bg-transparent cursor-pointer disabled:cursor-auto';
    if (this.isFocused)
      str += ' -m-1'; // prevent shifting due to border-width change
    return str;
  }
  get labelClassNames() {
    let str = 'block pointer-events-none';
    if (this.floatLabel) {
      str += ' absolute mt-0 left-12 px-4';
      if (this.dense)
        str += ' dense text-4';
      if (this.isFocused || this.hasValue)
        str += ' floating';
      if (this.isFocused)
        str += ' -ml-1'; // prevent shifting due to border-width change
    }
    else {
      str += ' subtitle2 mb-4';
    }
    return (str += ' ' + this.labelClass);
  }
  get iconSuffixClass() {
    let str = 'icon-suffix absolute flex items-center h-full right-12 space-x-8 pointer-events-none';
    if (this.isFocused)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  get iconEl() {
    let icon = h("i", { "data-testid": "arrow", class: "mds-arrow-triangle-down text-icon" });
    if (this.error)
      icon = h("i", { "data-testid": "error-icon", class: "mds-warning-circle text-icon" });
    return icon;
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.selectId || this.uuid, class: this.labelClassNames }, this.label));
    return (h(Host, { class: 'mx-select block' + (this.disabled ? ' disabled' : '') },
      this.label && !this.floatLabel && labelJsx,
      h("div", { "data-testid": "select-wrapper", class: this.selectWrapperClass },
        h("select", Object.assign({ "aria-label": this.label || this.ariaLabel, class: this.selectElClass, disabled: this.disabled, id: this.selectId || this.uuid, name: this.name, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.selectElem = el) }, this.dataAttributes),
          h("slot", null)),
        this.label && this.floatLabel && labelJsx,
        h("span", { class: this.iconSuffixClass },
          this.suffix && h("span", { class: "suffix flex items-center h-full px-4" }, this.suffix),
          this.iconEl)),
      this.assistiveText && h("div", { class: "assistive-text caption1 mt-4 ml-16" }, this.assistiveText)));
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
    "floatLabel": {
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
      "attribute": "float-label",
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
        "text": ""
      },
      "attribute": "aria-label",
      "reflect": false
    },
    "selectClass": {
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
        "text": "Additional classes for the select wrapper (e.g. `min-w-0` to override the default `min-width`)"
      },
      "attribute": "select-class",
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
