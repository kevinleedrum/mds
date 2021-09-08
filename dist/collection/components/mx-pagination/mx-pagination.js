import { Component, Host, h, Prop, Event, Element, State } from '@stencil/core';
import { ResizeObserver } from '@juggle/resize-observer';
import chevronLeftSvg from '../../assets/svg/chevron-left.svg';
import chevronRightSvg from '../../assets/svg/chevron-right.svg';
import pageFirstSvg from '../../assets/svg/page-first.svg';
import pageLastSvg from '../../assets/svg/page-last.svg';
import arrowSvg from '../../assets/svg/arrow-triangle-down.svg';
export class MxPagination {
  constructor() {
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
    return (h(Host, { class: "mx-pagination relative block text-4 whitespace-nowrap select-none" },
      !this.simple && h("div", { class: "pagination-bg absolute top-0 left-0 w-full h-56 rounded-b-2xl" }),
      this.simple ? (
      // Simple pagination
      h("div", { class: "simple flex items-center justify-center h-48" },
        h("mx-icon-button", { "aria-label": "Previous page", "chevron-left": true, disabled: this.page === 0 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }),
        this.lastPage !== null ? this.page + 1 + ' of ' + (this.lastPage + 1) : '',
        h("mx-icon-button", { "aria-label": "Next page", "chevron-right": true, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }))) : (
      // Standard pagination
      h("div", { ref: el => (this.paginationWrapper = el), class: this.paginationWrapperClass },
        this.hasStatus && (h("div", { "data-testid": "status", class: "px-24 py-10 flex relative items-center justify-self-start" },
          h("slot", { name: "status" }))),
        h("div", { class: 'flex flex-grow-0 items-center justify-end h-56 pr-4' + (this.hideRowsPerPage ? ' relative' : '') },
          this.rowsPerPageOptions && this.rowsPerPageOptions.length > 1 && (h("div", { ref: el => (this.rowsPerPageWrapper = el), "aria-hidden": this.hideRowsPerPage, class: 'flex items-center px-24' + (this.hideRowsPerPage ? ' absolute opacity-0 pointer-events-none' : '') },
            "Rows per page: \u00A0",
            h("div", { "data-testid": "rows-per-page", ref: el => (this.rowsMenuAnchor = el), class: "flex items-center cursor-pointer" },
              this.rowsPerPage,
              h("span", { class: "ml-12", innerHTML: arrowSvg })),
            h("mx-menu", { ref: el => (this.rowsMenu = el) }, this.rowsPerPageOptions.map(option => (h("mx-menu-item", { disabled: this.disabled, onClick: this.onChangeRowsPerPage.bind(this, option) }, option)))))),
          this.totalRows > 0 && (h("div", { "data-testid": "row-range", class: this.rowRangeClass },
            this.currentRange,
            " of ",
            this.totalRows)),
          h("div", { class: "flex items-center sm:space-x-8" },
            h("mx-icon-button", { "aria-label": "First page", innerHTML: pageFirstSvg, disabled: this.page === 0 || this.disabled, onClick: this.onClickFirstPage.bind(this) }),
            h("mx-icon-button", { "aria-label": "Previous page", innerHTML: chevronLeftSvg, disabled: this.page === 0 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }),
            h("mx-icon-button", { "aria-label": "Next page", innerHTML: chevronRightSvg, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }),
            this.lastPage !== null && (h("mx-icon-button", { "aria-label": "Last page", innerHTML: pageLastSvg, disabled: this.page === this.lastPage || this.disabled, onClick: this.onClickLastPage.bind(this) }))))))));
  }
  static get is() { return "mx-pagination"; }
  static get properties() { return {
    "page": {
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
      "attribute": "page",
      "reflect": false,
      "defaultValue": "0"
    },
    "rowsPerPageOptions": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "number[]",
        "resolved": "number[]",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "defaultValue": "[10, 25, 50, 100]"
    },
    "rowsPerPage": {
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
      "attribute": "rows-per-page",
      "reflect": false,
      "defaultValue": "100"
    },
    "simple": {
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
        "text": "Reduce the UI to only a page"
      },
      "attribute": "simple",
      "reflect": false,
      "defaultValue": "false"
    },
    "totalRows": {
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
      "attribute": "total-rows",
      "reflect": false
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
        "text": "Disable the page buttons (i.e. when loading results)"
      },
      "attribute": "disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "disableNextPage": {
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
        "text": "Disable the next page button (i.e. when the last page was loaded from an API)"
      },
      "attribute": "disable-next-page",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "hideRowsPerPage": {},
    "moveStatusToBottom": {},
    "isXSmallMinWidth": {},
    "isSmallMinWidth": {}
  }; }
  static get events() { return [{
      "method": "mxPageChange",
      "name": "mxPageChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "PageChangeEventDetail",
        "resolved": "{ rowsPerPage: number; page: number; }",
        "references": {
          "PageChangeEventDetail": {
            "location": "local"
          }
        }
      }
    }]; }
  static get elementRef() { return "element"; }
}