import { Component, Host, h, Prop, Listen, Element, Event, Watch } from '@stencil/core';
export class MxChipGroup {
  onValueChange() {
    this.updateChildChips();
  }
  connectedCallback() {
    this.updateChildChips();
  }
  onChipClick(e) {
    const chip = e.target.closest('mx-chip');
    if (!chip || chip.disabled)
      return;
    this.toggleValue(chip.value);
    this.mxInput.emit(this.value);
  }
  toggleValue(value) {
    if (this.value !== value)
      this.value = value;
    else
      this.value = null;
  }
  updateChildChips() {
    const chips = this.element.querySelectorAll('mx-chip');
    chips.forEach(chip => {
      chip.choice = true;
      chip.clickable = true;
      chip.selected = chip.value === this.value;
    });
  }
  render() {
    return (h(Host, { class: "inline-flex", role: "radiogroup" },
      h("slot", null)));
  }
  static get is() { return "mx-chip-group"; }
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
      "method": "onChipClick",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
