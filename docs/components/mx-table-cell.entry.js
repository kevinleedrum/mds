import { r as registerInstance, h, e as Host, g as getElement } from './index-f6edd80d.js';
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
    let str = 'mx-table-cell flex flex-1 items-center overflow-hidden';
    if (!this.minWidths.sm && this.isExposedMobileColumn)
      str += ' row-start-1 exposed-cell';
    else if (!this.minWidths.sm)
      str += ' col-start-2 col-span-4';
    return str;
  }
  render() {
    return (h(Host, { role: "gridcell", "aria-describedby": this.columnIndex != null ? `column-header-${this.columnIndex}` : null, class: this.cellClass }, h("div", { class: !this.isExposedMobileColumn && !this.minWidths.sm ? 'py-0 pb-12' : 'overflow-hidden' }, h("div", { class: "min-h-16 max-w-full overflow-hidden overflow-ellipsis whitespace-normal", role: this.columnIndex == null ? 'heading' : null, "aria-level": this.columnIndex == null ? '1' : null }, !this.minWidths.sm && !this.isExposedMobileColumn && this.heading != null && (h("p", { class: "subtitle5 my-0 mb-4", innerHTML: this.heading })), h("slot", null)))));
  }
  get element() { return getElement(this); }
};

export { MxTableCell as mx_table_cell };
