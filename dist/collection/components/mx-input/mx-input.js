import { Component, Host, h, Prop } from '@stencil/core';
export class MxInput {
  constructor() {
    this.type = 'text';
    this.dense = false;
    this.isActive = false;
    this.isFocused = false;
    this.outerContainerClass = '';
    this.labelClass = '';
    this.error = false;
    this.textarea = false;
    this.textareaHeight = '250px';
  }
  connectedCallback() {
    if (this.error) {
      this.isActive = true;
      this.labelClass += ' active error';
    }
    else {
      this.setLabelClass();
    }
  }
  setLabelClass(target = undefined) {
    this.labelClass = '';
    if ((this.leftIcon && !this.isActive) || (this.leftIcon && target && target.value === '')) {
      this.setIndentedLabel();
    }
    if (target && target.value !== '') {
      this.labelClass += ' active';
    }
  }
  setIndentedLabel() {
    this.labelClass += ' indented';
  }
  makeTypeClass() {
    const type = this.dense ? 'dense' : 'standard';
    return `mx-input-wrapper ${type}`;
  }
  handleFocus() {
    this.isActive = true;
    this.isFocused = true;
    this.labelClass = ' active focus';
    this.removeError();
  }
  handleBlur() {
    const workingElem = this.textarea ? this.textArea : this.textInput;
    this.isFocused = false;
    this.setLabelClass(workingElem);
  }
  focusOnInput() {
    const workingElem = this.textarea ? this.textArea : this.textInput;
    workingElem.focus();
  }
  removeError() {
    this.error = false;
    this.containerElem.classList.remove('error');
  }
  returnTaHeight() {
    return { height: this.textareaHeight };
  }
  overrideTextArea() {
    if (!this.textarea)
      return {};
    return { alignItems: 'start', marginTop: '11px' };
  }
  render() {
    return (h(Host, { class: "mx-input" },
      h("div", { class: `${this.makeTypeClass()} ${this.isFocused ? 'focused' : ''} ${this.error ? 'error' : ''}`, ref: el => (this.containerElem = el) },
        h("div", { class: "mx-input-inner-wrapper", style: this.overrideTextArea() },
          this.leftIcon && (h("div", { class: "mds-input-left-content" },
            h("i", { class: this.leftIcon }))),
          this.label && (h("label", { class: this.labelClass, onClick: () => this.focusOnInput() }, this.label)),
          !this.textarea ? (h("div", { class: "mds-input" },
            h("input", { type: this.type, name: this.name, value: this.value, onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), ref: el => (this.textInput = el) }))) : (h("textarea", { style: this.returnTaHeight(), name: this.name, onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), ref: el => (this.textArea = el) }, this.value)),
          (this.rightIcon || this.error) && (h("div", { class: "mds-input-right-content" }, this.error ? h("i", { class: "ph-warning-circle" }) : h("i", { class: this.rightIcon }))))),
      this.assistiveText && h("div", { class: "assistive-text" }, this.assistiveText)));
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
        "text": ""
      },
      "attribute": "name",
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
        "text": ""
      },
      "attribute": "label",
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
    "leftIcon": {
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
      "attribute": "left-icon",
      "reflect": false
    },
    "rightIcon": {
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
      "attribute": "right-icon",
      "reflect": false
    },
    "isActive": {
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
      "attribute": "is-active",
      "reflect": false,
      "defaultValue": "false"
    },
    "isFocused": {
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
      "attribute": "is-focused",
      "reflect": false,
      "defaultValue": "false"
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
        "text": ""
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
    }
  }; }
}
