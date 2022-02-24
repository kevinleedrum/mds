import { Component, Host, h, Prop, State, Watch, Element } from '@stencil/core';
import { uuidv4, propagateDataAttributes } from '../../utils/utils';
export class MxInput {
  constructor() {
    this.dataAttributes = {};
    this.uuid = uuidv4();
    /** The `type` attribute for the text input */
    this.type = 'text';
    this.dense = false;
    this.disabled = false;
    this.readonly = false;
    this.outerContainerClass = '';
    this.labelClass = '';
    this.error = false;
    this.floatLabel = false;
    /** Display a multi-line `textarea` instead of an `input` */
    this.textarea = false;
    this.textareaHeight = '250px';
    this.isFocused = false;
    this.characterCount = 0;
    this.componentWillRender = propagateDataAttributes;
  }
  connectedCallback() {
    this.characterCount = this.hasValue ? this.value.length : 0;
  }
  componentDidLoad() {
    this.updateValue();
  }
  onValueChange() {
    this.updateValue();
    this.characterCount = this.hasValue ? this.value.length : 0;
  }
  updateValue() {
    this.workingElem.value = this.hasValue ? this.value : '';
  }
  onFocus() {
    this.isFocused = true;
    this.error = false;
  }
  onBlur() {
    this.isFocused = false;
  }
  onContainerClick() {
    if (!this.disabled && !this.readonly)
      this.workingElem.focus();
  }
  onInput(e) {
    this.characterCount = e.target.value.length;
    this.value = e.target.value;
  }
  getIconJsx(icon) {
    return icon.onClick ? (h("button", { type: "button", class: "inline-flex items-center justify-center cursor-pointer", "aria-label": icon.ariaLabel, onClick: icon.onClick },
      h("i", { class: icon.icon }))) : (h("i", { class: icon.icon + ' pointer-events-none' }));
  }
  get workingElem() {
    return this.textarea ? this.textArea : this.textInput;
  }
  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }
  get containerClass() {
    let str = 'mx-input-wrapper flex items-center relative rounded-lg';
    if (!this.textarea) {
      str += this.dense ? ' h-36' : ' h-48';
    }
    str += this.error || this.isFocused ? ' border-2' : ' border';
    if (this.error)
      str += ' error';
    if (this.disabled)
      str += ' disabled';
    if (this.readonly)
      str += ' readonly';
    return str;
  }
  get inputClass() {
    let str = 'flex-1 outline-none appearance-none bg-transparent';
    if (!this.textarea) {
      str += ' px-16 overflow-hidden';
    }
    else {
      str += ' p-16 overflow-y-auto resize-none';
    }
    if (this.isFocused || this.error)
      str += this.leftIcon ? ' -mr-1' : ' -m-1'; // prevent shifting due to border-width change
    return str;
  }
  get labelClassNames() {
    let str = 'block pointer-events-none';
    if (this.floatLabel) {
      str += ' absolute mt-0 px-4';
      if (this.textarea)
        str += ' top-12';
      str += this.leftIcon && !this.textarea ? ' left-48 has-left-icon' : ' left-12';
      if (this.dense && !this.textarea)
        str += ' dense text-4';
      if (this.isFocused || this.characterCount > 0)
        str += ' floating';
      if (this.isFocused || this.error)
        str += ' -ml-1'; // prevent shifting due to border-width change
      if ((this.isFocused || this.error) && this.textarea)
        str += ' -mt-1';
    }
    else {
      str += ' subtitle2 mb-4';
    }
    if (this.labelClass)
      str += this.labelClass;
    return str;
  }
  get leftIconWrapperClass() {
    let str = 'flex items-center h-full pl-16 space-x-16';
    if (this.isFocused || this.error)
      str += ' -ml-1'; // prevent shifting due to border-width change
    return str;
  }
  get rightContentClass() {
    let str = 'icon-suffix flex items-center h-full pr-16 space-x-8';
    if (this.isFocused || this.error)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  get textareaClass() {
    return this.textarea ? ' textarea items-start' : '';
  }
  get leftIcons() {
    if (typeof this.leftIcon === 'string')
      return [{ icon: this.leftIcon }];
    return this.leftIcon;
  }
  get rightIcons() {
    if (typeof this.rightIcon === 'string')
      return [{ icon: this.rightIcon }];
    return this.rightIcon;
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.inputId || this.uuid, class: this.labelClassNames }, this.label));
    return (h(Host, { class: 'mx-input block' + (this.disabled ? ' disabled' : '') },
      this.label && !this.floatLabel && labelJsx,
      h("div", { class: this.containerClass, onClick: this.onContainerClick.bind(this) },
        this.leftIcon && h("div", { class: this.leftIconWrapperClass }, this.leftIcons.map(this.getIconJsx)),
        this.label && this.floatLabel && labelJsx,
        !this.textarea ? (h("input", Object.assign({ type: this.type, class: this.inputClass, name: this.name, id: this.inputId || this.uuid, value: this.value, placeholder: this.floatLabel ? null : this.placeholder, "aria-label": this.elAriaLabel || this.placeholder, maxlength: this.maxlength, disabled: this.disabled, readonly: this.readonly, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.textInput = el) }, this.dataAttributes))) : (h("textarea", Object.assign({ class: this.inputClass, style: { height: this.textareaHeight }, name: this.name, id: this.inputId || this.uuid, placeholder: this.floatLabel ? null : this.placeholder, maxlength: this.maxlength, disabled: this.disabled, readonly: this.readonly, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.textArea = el) }, this.dataAttributes), this.value)),
        !this.textarea && (this.maxlength || this.suffix || this.error || this.rightIcon) && (h("span", { class: this.rightContentClass },
          this.maxlength && (h("span", { "data-testid": "character-count", class: "character-count pointer-events-none" },
            this.characterCount,
            "/",
            this.maxlength)),
          this.suffix && (h("span", { "data-testid": "suffix", class: "suffix flex items-center h-full px-4 pointer-events-none" }, this.suffix)),
          this.error && h("i", { class: "mds-warning-circle text-icon pointer-events-none" }),
          this.rightIcon && !this.error && (h("span", { class: "flex items-center space-x-16" }, this.rightIcons.map(this.getIconJsx)))))),
      (this.assistiveText || (this.textarea && this.maxlength)) && (h("div", { class: "flex justify-between caption1 mt-4 ml-16 space-x-32" },
        h("span", { "data-testid": "assistive-text", class: "assistive-text" }, this.assistiveText),
        this.textarea && this.maxlength && (h("span", { "data-testid": "character-count", class: "character-count" },
          this.characterCount,
          "/",
          this.maxlength))))));
  }
  static get is() { return "mx-input"; }
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
        "text": "The `name` attribute for the text input"
      },
      "attribute": "name",
      "reflect": false
    },
    "inputId": {
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
        "text": "The `id` attribute for the text input"
      },
      "attribute": "input-id",
      "reflect": false
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
        "text": "Text for the label element"
      },
      "attribute": "label",
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
        "text": "Placeholder text for the input.  This will be ignored if `floatLabel` is `true`."
      },
      "attribute": "placeholder",
      "reflect": false
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
    },
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
        "text": "The `type` attribute for the text input"
      },
      "attribute": "type",
      "reflect": false,
      "defaultValue": "'text'"
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
    "readonly": {
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
      "attribute": "readonly",
      "reflect": false,
      "defaultValue": "false"
    },
    "maxlength": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "maxlength",
      "reflect": false
    },
    "leftIcon": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string | MxInputIcon[]",
        "resolved": "MxInputIcon[] | string",
        "references": {
          "MxInputIcon": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The class name of the icon to show on the left side of the input, _or_ an array of objects specifying an `icon`, `ariaLabel`, and `onClick` handler"
      },
      "attribute": "left-icon",
      "reflect": false
    },
    "rightIcon": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string | MxInputIcon[]",
        "resolved": "MxInputIcon[] | string",
        "references": {
          "MxInputIcon": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The class name of the icon to show on the right side of the input, _or_ an array of objects specifying an `icon`, `ariaLabel`, and `onClick` handler"
      },
      "attribute": "right-icon",
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
        "text": "Text shown to the right of the input value"
      },
      "attribute": "suffix",
      "reflect": false
    },
    "outerContainerClass": {
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
      "attribute": "outer-container-class",
      "reflect": false,
      "defaultValue": "''"
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
        "text": ""
      },
      "attribute": "label-class",
      "reflect": false,
      "defaultValue": "''"
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
        "text": ""
      },
      "attribute": "assistive-text",
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
    "textarea": {
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
        "text": "Display a multi-line `textarea` instead of an `input`"
      },
      "attribute": "textarea",
      "reflect": false,
      "defaultValue": "false"
    },
    "textareaHeight": {
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
      "attribute": "textarea-height",
      "reflect": false,
      "defaultValue": "'250px'"
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
        "text": "The aria-label attribute for the inner input element."
      },
      "attribute": "el-aria-label",
      "reflect": false
    }
  }; }
  static get states() { return {
    "isFocused": {},
    "characterCount": {}
  }; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "onValueChange"
    }]; }
}
