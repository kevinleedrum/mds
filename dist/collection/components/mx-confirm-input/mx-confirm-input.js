import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
export class MxConfirmInput {
  constructor() {
    this.isEmittingEventAfterConfirm = false;
    this.type = 'text';
    this.dense = false;
    this.disabled = false;
    this.readonly = false;
    this.outerContainerClass = '';
    this.labelClass = '';
    this.error = false;
    this.floatLabel = false;
    this.textarea = false;
    this.textareaHeight = '250px';
    this.isFocused = false;
    this.isHovered = false;
  }
  onValueChange() {
    this.previousValue = this.value;
    this.mxInput.value = this.value;
  }
  connectedCallback() {
    this.previousValue = this.value;
  }
  get rightIcons() {
    if (this.isFocused) {
      return [
        { icon: 'mds-x', ariaLabel: 'Cancel', onClick: this.onCancel.bind(this) },
        { icon: 'mds-check', ariaLabel: 'Okay', onClick: this.onConfirm.bind(this) },
      ];
    }
    const canEdit = this.value != null && this.value !== '' && !this.readonly && !this.disabled;
    const canHover = window.matchMedia('(hover: hover)');
    if ((this.isHovered || !canHover.matches) && canEdit)
      return 'mds-edit';
  }
  onCancel(e) {
    if (e)
      e.stopPropagation(); // Do not focus input when clicking cancel button
    if (!this.mxInput)
      return;
    this.mxInput.value = this.previousValue;
    if (document.activeElement && this.mxInput.contains(document.activeElement))
      document.activeElement.blur();
  }
  onConfirm(e) {
    if (e)
      e.stopPropagation(); // Do not focus input when clicking confirm button
    this.value = this.mxInput.value;
    if (this.mxInput) {
      const input = this.mxInput.querySelector('input');
      this.isEmittingEventAfterConfirm = true; // Stop blocking input events temporarily
      input && input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    }
    if (document.activeElement)
      document.activeElement.blur();
  }
  onFocusin() {
    this.isFocused = true;
  }
  async onFocusout() {
    await new Promise(requestAnimationFrame); // Wait a tick in case confirm button was clicked
    if (document.activeElement && this.mxInput.contains(document.activeElement))
      return;
    this.isFocused = false;
    this.onCancel();
  }
  onMouseEnter() {
    this.isHovered = true;
  }
  onMouseLeave() {
    this.isHovered = false;
  }
  onInput(e) {
    if (!this.isEmittingEventAfterConfirm) {
      e.stopPropagation(); // Only emit input event after confirmation
    }
    else {
      this.isEmittingEventAfterConfirm = false;
    }
  }
  onKeyDown(e) {
    if (e.key === 'Escape')
      this.onCancel();
    if (e.target.closest('button'))
      return; // Pressing Enter while Cancel button is focused should not confirm
    if (e.key === 'Enter')
      this.onConfirm();
  }
  render() {
    return (h(Host, { class: 'mx-confirm-input block' + (this.value != null && this.value !== '' ? ' has-value' : '') },
      h("mx-input", { ref: el => (this.mxInput = el), name: this.name, inputId: this.inputId, label: this.label, placeholder: this.placeholder, value: this.value, type: this.type, dense: this.dense, disabled: this.disabled, readonly: this.readonly, maxlength: this.maxlength, leftIcon: this.leftIcon, suffix: this.suffix, outerContainerClass: this.outerContainerClass, labelClass: this.labelClass, error: this.error, assistiveText: this.assistiveText, floatLabel: this.floatLabel, rightIcon: this.rightIcons, elAriaLabel: this.elAriaLabel, onFocusin: this.onFocusin.bind(this), onFocusout: this.onFocusout.bind(this), onInput: this.onInput.bind(this), onKeyDown: this.onKeyDown.bind(this), onMouseEnter: this.onMouseEnter.bind(this), onMouseLeave: this.onMouseLeave.bind(this) })));
  }
  static get is() { return "mx-confirm-input"; }
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
        "text": ""
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
        "text": ""
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
        "text": ""
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
            "location": "import",
            "path": "../mx-input/mx-input"
          }
        }
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
      "mutable": true,
      "complexType": {
        "original": "string | MxInputIcon[]",
        "resolved": "MxInputIcon[] | string",
        "references": {
          "MxInputIcon": {
            "location": "import",
            "path": "../mx-input/mx-input"
          }
        }
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
        "text": ""
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
        "text": ""
      },
      "attribute": "el-aria-label",
      "reflect": false
    }
  }; }
  static get states() { return {
    "isFocused": {},
    "isHovered": {}
  }; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "onValueChange"
    }]; }
}
