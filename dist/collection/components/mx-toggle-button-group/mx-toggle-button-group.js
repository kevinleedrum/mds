import { Component, Host, h, Prop, Listen, Element, Event, Watch } from '@stencil/core';
export class MxToggleButtonGroup {
  constructor() {
    /** Set to `true` to prevent deselecting once a selection has been made. */
    this.required = false;
  }
  onValueChange() {
    this.updateChildButtons();
  }
  connectedCallback() {
    this.updateChildButtons();
  }
  onToggleButtonClick(e) {
    const toggleButton = e.target.closest('mx-toggle-button');
    if (!toggleButton)
      return;
    this.toggleValue(toggleButton.value);
    this.mxInput.emit(this.value);
  }
  toggleValue(value) {
    if (this.value !== value)
      this.value = value;
    else if (!this.required)
      this.value = null;
  }
  updateChildButtons() {
    const buttons = this.element.querySelectorAll('mx-toggle-button');
    buttons.forEach(button => (button.selected = button.value === this.value));
  }
  render() {
    return (h(Host, { class: "inline-flex", role: "radiogroup" },
      h("slot", null)));
  }
  static get is() { return "mx-toggle-button-group"; }
  static get properties() { return {
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
    },
    "required": {
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
        "text": "Set to `true` to prevent deselecting once a selection has been made."
      },
      "attribute": "required",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get events() { return [{
      "method": "mxInput",
      "name": "mxInput",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emits the updated value as event.detail"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "onValueChange"
    }]; }
  static get listeners() { return [{
      "name": "click",
      "method": "onToggleButtonClick",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
