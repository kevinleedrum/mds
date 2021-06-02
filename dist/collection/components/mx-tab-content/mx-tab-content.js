import { Component, Host, h, Prop } from '@stencil/core';
export class MxTabContent {
  get isActiveTab() {
    return this.value >= 0 && this.index === this.value;
  }
  render() {
    return (h(Host, { class: !this.isActiveTab ? 'hidden' : '' },
      h("slot", null)));
  }
  static get is() { return "mx-tab-content"; }
  static get properties() { return {
    "index": {
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
        "text": "The index of the tab that corresponds to this content"
      },
      "attribute": "index",
      "reflect": false
    },
    "value": {
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
        "text": "The index of the selected tab"
      },
      "attribute": "value",
      "reflect": false
    }
  }; }
}
