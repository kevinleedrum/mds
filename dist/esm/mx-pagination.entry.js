import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-62f53352.js';
import { R as ResizeObserver } from './ResizeObserver-f193871f.js';
import { a as arrowSvg } from './arrow-triangle-down-6c587423.js';

const chevronLeftSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 7.41L10.42 12L15 16.59L13.59 18L7.59 12L13.59 6L15 7.41Z" fill="currentColor"/>
</svg>
`;

const chevronRightSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.58997 16.59L13.17 12L8.58997 7.41L9.99997 6L16 12L9.99997 18L8.58997 16.59Z" fill="currentColor"/>
</svg>
`;

const pageFirstSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.41 16.59L13.82 12L18.41 7.41L17 6L11 12L17 18L18.41 16.59ZM6 6H8V18H6V6Z" fill="currentColor" />
</svg>
`;

const pageLastSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.58997 7.41L10.18 12L5.58997 16.59L6.99997 18L13 12L6.99997 6L5.58997 7.41ZM16 6H18V18H16V6Z" fill="currentColor"/>
</svg>
`;

const MxPagination = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxPageChange = createEvent(this, "mxPageChange", 7);
    this.hasStatus = false;
    this.page = 0;
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
  onClickFirstPage() {
    this.mxPageChange.emit({ page: 0, rowsPerPage: this.rowsPerPage });
  }
  onClickPreviousPage() {
    this.mxPageChange.emit({ page: this.page - 1, rowsPerPage: this.rowsPerPage });
  }
  onClickNextPage() {
    this.mxPageChange.emit({ page: this.page + 1, rowsPerPage: this.rowsPerPage });
  }
  onClickLastPage() {
    this.mxPageChange.emit({ page: this.lastPage, rowsPerPage: this.rowsPerPage });
  }
  onChangeRowsPerPage(rowsPerPage) {
    // Return to first page whenever the results-per-page changes
    this.mxPageChange.emit({ page: 0, rowsPerPage });
  }
  get lastPage() {
    if (this.totalRows === 0)
      return 0;
    if (this.totalRows == null)
      return null;
    return Math.ceil(this.totalRows / this.rowsPerPage) - 1;
  }
  get currentRange() {
    let start = this.rowsPerPage * this.page + 1;
    let end = Math.min(this.totalRows, start + this.rowsPerPage - 1);
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
    h("div", { class: "simple flex items-center justify-center h-48" }, h("mx-icon-button", { "aria-label": "Previous page", "chevron-left": true, disabled: this.page === 0 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }), this.lastPage !== null ? this.page + 1 + ' of ' + (this.lastPage + 1) : '', h("mx-icon-button", { "aria-label": "Next page", "chevron-right": true, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }))) : (
    // Standard pagination
    h("div", { ref: el => (this.paginationWrapper = el), class: this.paginationWrapperClass }, this.hasStatus && (h("div", { "data-testid": "status", class: "px-24 py-10 flex relative items-center justify-self-start" }, h("slot", { name: "status" }))), h("div", { class: 'flex flex-grow-0 items-center justify-end h-56 pr-4' + (this.hideRowsPerPage ? ' relative' : '') }, this.rowsPerPageOptions && this.rowsPerPageOptions.length > 1 && (h("div", { ref: el => (this.rowsPerPageWrapper = el), "aria-hidden": this.hideRowsPerPage, class: 'flex items-center px-24' + (this.hideRowsPerPage ? ' absolute opacity-0 pointer-events-none' : '') }, "Rows per page: \u00A0", h("div", { "data-testid": "rows-per-page", ref: el => (this.rowsMenuAnchor = el), class: "flex items-center cursor-pointer" }, this.rowsPerPage, h("span", { class: "ml-12", innerHTML: arrowSvg })), h("mx-menu", { ref: el => (this.rowsMenu = el) }, this.rowsPerPageOptions.map(option => (h("mx-menu-item", { disabled: this.disabled, onClick: this.onChangeRowsPerPage.bind(this, option) }, option)))))), this.totalRows > 0 && (h("div", { "data-testid": "row-range", class: this.rowRangeClass }, this.currentRange, " of ", this.totalRows)), h("div", { class: "flex items-center sm:space-x-8" }, h("mx-icon-button", { "aria-label": "First page", innerHTML: pageFirstSvg, disabled: this.page === 0 || this.disabled, onClick: this.onClickFirstPage.bind(this) }), h("mx-icon-button", { "aria-label": "Previous page", innerHTML: chevronLeftSvg, disabled: this.page === 0 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }), h("mx-icon-button", { "aria-label": "Next page", innerHTML: chevronRightSvg, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }), this.lastPage !== null && (h("mx-icon-button", { "aria-label": "Last page", innerHTML: pageLastSvg, disabled: this.page === this.lastPage || this.disabled, onClick: this.onClickLastPage.bind(this) }))))))));
  }
  get element() { return getElement(this); }
};

export { MxPagination as mx_pagination };
