import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1ef0feab.js';
import { R as ResizeObserver } from './resize-observer-9111af2a.js';

const MxPagination = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxPageChange = createEvent(this, "mxPageChange", 7);
    this.hasStatus = false;
    this.page = 1;
    this.rowsPerPageOptions = [10, 25, 50, 100];
    this.rowsPerPage = 100;
    /** Reduce the UI to only a page */
    this.simple = false;
    /** Disable the page buttons (i.e. when loading results) */
    this.disabled = false;
    /** Disable the next page button (i.e. when the last page was loaded from an API) */
    this.disableNextPage = false;
    this.hideRowsPerPage = false;
    this.moveStatusToBottom = false;
    /** Whether the component width (not viewport width) is >= 320px */
    this.isXSmallMinWidth = false;
    /** Whether the component width (not viewport width) is >= 640px */
    this.isSmallMinWidth = false;
  }
  componentWillRender() {
    this.hasStatus = !!this.element.querySelector('[slot="status"]');
  }
  componentDidLoad() {
    if (this.rowsMenu && this.rowsMenuAnchor)
      this.rowsMenu.anchorEl = this.rowsMenuAnchor;
    this.resizeObserver = new ResizeObserver(() => this.updateResponsiveElements());
    this.resizeObserver.observe(this.element);
    // Wait one tick for layout shifts in order to detect overflow correctly.
    requestAnimationFrame(this.updateResponsiveElements.bind(this));
  }
  updateResponsiveElements() {
    if (!this.paginationWrapper)
      return;
    let totalNeededWidth = Array.from(this.paginationWrapper.children).reduce((total, child) => {
      return total + child.scrollWidth;
    }, 0);
    if (this.hideRowsPerPage && this.rowsPerPageWrapper)
      totalNeededWidth += this.rowsPerPageWrapper.scrollWidth;
    const excessWidth = totalNeededWidth - this.element.offsetWidth;
    this.hideRowsPerPage = excessWidth > 0;
    this.moveStatusToBottom = excessWidth > this.rowsPerPageWrapper.scrollWidth;
    this.isXSmallMinWidth = this.element.offsetWidth >= 320;
    this.isSmallMinWidth = this.element.offsetWidth >= 640;
  }
  get isPreviousPageDisabled() {
    return this.page === 1 || this.disabled;
  }
  get isNextPageDisabled() {
    return this.page === this.lastPage || this.disabled || this.disableNextPage;
  }
  get isLastPageDisabled() {
    return this.page === this.lastPage || this.disabled;
  }
  onClickFirstPage() {
    if (this.isPreviousPageDisabled)
      return;
    this.mxPageChange.emit({ page: 1, rowsPerPage: this.rowsPerPage });
  }
  onClickPreviousPage() {
    if (this.isPreviousPageDisabled)
      return;
    this.mxPageChange.emit({ page: this.page - 1, rowsPerPage: this.rowsPerPage });
  }
  onClickNextPage() {
    if (this.isNextPageDisabled)
      return;
    this.mxPageChange.emit({ page: this.page + 1, rowsPerPage: this.rowsPerPage });
  }
  onClickLastPage() {
    if (this.isLastPageDisabled)
      return;
    this.mxPageChange.emit({ page: this.lastPage, rowsPerPage: this.rowsPerPage });
  }
  onChangeRowsPerPage(rowsPerPage) {
    // Return to first page whenever the results-per-page changes
    this.mxPageChange.emit({ page: 1, rowsPerPage });
  }
  get lastPage() {
    if (this.totalRows === 0)
      return 1;
    if (this.totalRows == null)
      return null;
    return Math.ceil(this.totalRows / this.rowsPerPage);
  }
  get currentRange() {
    const start = this.rowsPerPage * (this.page - 1) + 1;
    const end = Math.min(this.totalRows, start + this.rowsPerPage - 1);
    return start + '–' + end;
  }
  get rowRangeClass() {
    let str = 'text-center flex-shrink min-w-0';
    str += this.isSmallMinWidth ? ' px-24' : ' px-16';
    if (!this.isXSmallMinWidth)
      str += ' whitespace-normal';
    return str;
  }
  get paginationWrapperClass() {
    let str = 'flex relative';
    if (this.moveStatusToBottom) {
      str += ' flex-col-reverse items-end';
    }
    else {
      str += ' items-center';
      str += this.hasStatus ? ' justify-between' : ' justify-end';
    }
    return str;
  }
  render() {
    return (h(Host, { class: "mx-pagination relative block text-4 whitespace-nowrap select-none" }, !this.simple && h("div", { class: "pagination-bg absolute top-0 left-0 w-full h-56 rounded-b-2xl" }), this.simple ? (
    // Simple pagination
    h("div", { class: "simple flex items-center justify-center h-48" }, h("mx-icon-button", { "el-aria-label": "Previous page", "chevron-left": true, disabled: this.page === 1 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }), this.lastPage !== null ? this.page + ' of ' + this.lastPage : '', h("mx-icon-button", { "el-aria-label": "Next page", "chevron-right": true, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }))) : (
    // Standard pagination
    h("div", { ref: el => (this.paginationWrapper = el), class: this.paginationWrapperClass }, this.hasStatus && (h("div", { "data-testid": "status", class: "px-24 py-10 flex relative items-center justify-self-start" }, h("slot", { name: "status" }))), h("div", { class: 'flex flex-grow-0 items-center justify-end h-56 pr-4' + (this.hideRowsPerPage ? ' relative' : '') }, this.rowsPerPageOptions && this.rowsPerPageOptions.length > 1 && (h("div", { ref: el => (this.rowsPerPageWrapper = el), "aria-hidden": this.hideRowsPerPage, class: 'flex items-center px-24' + (this.hideRowsPerPage ? ' absolute opacity-0 pointer-events-none' : '') }, "Rows per page: \u00A0", h("div", { "data-testid": "rows-per-page", ref: el => (this.rowsMenuAnchor = el), class: "flex items-center cursor-pointer" }, this.rowsPerPage, h("i", { class: "mds-arrow-triangle-down ml-12 text-icon" })), h("mx-menu", { ref: el => (this.rowsMenu = el), onMxClose: e => e.stopPropagation() }, this.rowsPerPageOptions.map(option => (h("mx-menu-item", { disabled: this.disabled, onClick: this.onChangeRowsPerPage.bind(this, option) }, option)))))), this.totalRows > 0 && (h("div", { "data-testid": "row-range", class: this.rowRangeClass }, this.currentRange, " of ", this.totalRows)), h("div", { class: "flex items-center sm:space-x-8" }, h("mx-icon-button", { "el-aria-label": "First page", icon: "mds-page-first", disabled: this.isPreviousPageDisabled, onClick: this.onClickFirstPage.bind(this) }), h("mx-icon-button", { "el-aria-label": "Previous page", icon: "mds-chevron-left", disabled: this.isPreviousPageDisabled, onClick: this.onClickPreviousPage.bind(this) }), h("mx-icon-button", { "el-aria-label": "Next page", icon: "mds-chevron-right", disabled: this.isNextPageDisabled, onClick: this.onClickNextPage.bind(this) }), this.lastPage !== null && (h("mx-icon-button", { "el-aria-label": "Last page", icon: "mds-page-last", disabled: this.isLastPageDisabled, onClick: this.onClickLastPage.bind(this) }))))))));
  }
  get element() { return getElement(this); }
};

export { MxPagination as mx_pagination };
