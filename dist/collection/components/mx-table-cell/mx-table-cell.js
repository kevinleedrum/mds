import { Component, Host, h, Element, State, Prop } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';
export class MxTableCell {
  constructor() {
    /** This is automatically set by the parent `mx-table`. */
    this.isExposedMobileColumn = true;
    this.minWidths = new MinWidths();
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  get cellClass() {
    let str = 'mx-table-cell flex flex-1 items-center overflow-hidden';
    if (!this.minWidths.sm && this.isExposedMobileColumn)
      str += ' row-start-1 exposed-cell';
    else if (!this.minWidths.sm)
      str += ' col-start-2 col-span-4';
    return str;
  }
  render() {
    return (h(Host, { role: "gridcell", "aria-describedby": this.columnIndex != null ? `column-header-${this.columnIndex}` : null, class: this.cellClass },
      h("div", { class: !this.isExposedMobileColumn && !this.minWidths.sm ? 'py-0 pb-12' : '' },
        h("div", { class: "min-h-16 max-w-full break-words", role: this.columnIndex == null ? 'heading' : null },
          !this.minWidths.sm && !this.isExposedMobileColumn && this.heading != null && (h("p", { class: "subtitle5 my-0 mb-4", innerHTML: this.heading })),
          h("slot", null)))));
  }
  static get is() { return "mx-table-cell"; }
  static get properties() { return {
    "isExposedMobileColumn": {
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
        "text": "This is automatically set by the parent `mx-table`."
      },
      "attribute": "is-exposed-mobile-column",
      "reflect": true,
      "defaultValue": "true"
    },
    "columnIndex": {
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
        "text": "This is automatically set by the parent `mx-table`.  For subheaders, this will be null."
      },
      "attribute": "column-index",
      "reflect": true
    },
    "heading": {
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
        "text": "This is automatically set by the parent `mx-table`."
      },
      "attribute": "heading",
      "reflect": false
    }
  }; }
  static get states() { return {
    "minWidths": {}
  }; }
  static get elementRef() { return "element"; }
}
