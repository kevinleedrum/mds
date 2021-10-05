import { r as registerInstance, h, f as Host, g as getElement } from './index-935f3e8d.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';

const MxTableCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    let str = 'mx-table-cell flex items-center text-4';
    if (!this.minWidths.sm && this.isExposedMobileColumn)
      str += ' row-start-1 exposed-cell';
    else if (!this.minWidths.sm)
      str += ' py-0 pb-12 col-span-4';
    return str;
  }
  render() {
    return (h(Host, { role: "gridcell", "aria-describedby": `column-header-${this.columnIndex}`, class: this.cellClass }, h("div", { class: "min-h-20 max-w-full break-words" }, !this.minWidths.sm && !this.isExposedMobileColumn && this.heading != null && (h("p", { class: "subtitle5 my-0 mb-4", innerHTML: this.heading })), h("slot", null))));
  }
  get element() { return getElement(this); }
};

export { MxTableCell as mx_table_cell };
