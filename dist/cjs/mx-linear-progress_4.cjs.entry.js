'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c246f020.js');
const dotsVertical = require('./dots-vertical-8fe5a309.js');
const arrowTriangleDown = require('./arrow-triangle-down-a4cc75c3.js');
const minWidthSync = require('./minWidthSync-93e92215.js');
const chevronDown = require('./chevron-down-696a796a.js');

const MxLinearProgress = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. */
    this.value = null;
    /** Delay the appearance of the indicator for this many milliseconds */
    this.appearDelay = 0;
  }
  connectedCallback() {
    if (!this.appearDelay)
      return;
    // Hide indicator until appearDelay duration has passed
    this.element.classList.remove('block');
    this.element.classList.add('hidden');
    this.delayTimeout = setTimeout(() => {
      this.element.classList.remove('hidden');
      this.element.classList.add('block');
    }, this.appearDelay);
  }
  disconnectedCallback() {
    clearTimeout(this.delayTimeout);
  }
  get determinateBarStyle() {
    return {
      transform: `translateX(${this.value - 100}%)`,
      transition: 'transform 0.4s linear',
    };
  }
  render() {
    return (index.h(index.Host, { class: "mx-linear-progress block h-4 w-full rounded-sm overflow-hidden pointer-events-none", role: "progressbar", "aria-valuenow": this.value != null ? Math.round(this.value) : null, "aria-valuemin": this.value != null ? 0 : null, "aria-valuemax": this.value != null ? 100 : null }, index.h("div", { class: "relative h-full" }, this.value != null ? (
    // Determinate
    index.h("div", { "data-testid": "determinate", class: "fill h-4 absolute inset-0 rounded-sm", style: this.determinateBarStyle })) : (
    // Indeterminate has two animated bars with nested animations
    [
      index.h("div", { "data-testid": "indeterminate1", class: "indeterminate1 absolute h-full w-full" }, index.h("div", { class: "fill absolute w-full h-full rounded-sm" })),
      index.h("div", { "data-testid": "indeterminate2", class: "indeterminate2 absolute h-full w-full" }, index.h("div", { class: "fill absolute w-full h-full rounded-sm" })),
    ]))));
  }
  get element() { return index.getElement(this); }
};

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
    index.registerInstance(this, hostRef);
    this.mxPageChange = index.createEvent(this, "mxPageChange", 7);
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
    this.resizeObserver = new dotsVertical.ResizeObserver(() => this.updateResponsiveElements());
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
    return (index.h(index.Host, { class: "mx-pagination relative block text-4 whitespace-nowrap select-none" }, !this.simple && index.h("div", { class: "pagination-bg absolute top-0 left-0 w-full h-56 rounded-b-2xl" }), this.simple ? (
    // Simple pagination
    index.h("div", { class: "simple flex items-center justify-center h-48" }, index.h("mx-icon-button", { "aria-label": "Previous page", "chevron-left": true, disabled: this.page === 0 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }), this.lastPage !== null ? this.page + 1 + ' of ' + (this.lastPage + 1) : '', index.h("mx-icon-button", { "aria-label": "Next page", "chevron-right": true, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }))) : (
    // Standard pagination
    index.h("div", { ref: el => (this.paginationWrapper = el), class: this.paginationWrapperClass }, this.hasStatus && (index.h("div", { "data-testid": "status", class: "px-24 py-10 flex relative items-center justify-self-start" }, index.h("slot", { name: "status" }))), index.h("div", { class: 'flex flex-grow-0 items-center justify-end h-56 pr-4' + (this.hideRowsPerPage ? ' relative' : '') }, this.rowsPerPageOptions && this.rowsPerPageOptions.length > 1 && (index.h("div", { ref: el => (this.rowsPerPageWrapper = el), "aria-hidden": this.hideRowsPerPage, class: 'flex items-center px-24' + (this.hideRowsPerPage ? ' absolute opacity-0 pointer-events-none' : '') }, "Rows per page: \u00A0", index.h("div", { "data-testid": "rows-per-page", ref: el => (this.rowsMenuAnchor = el), class: "flex items-center cursor-pointer" }, this.rowsPerPage, index.h("span", { class: "ml-12", innerHTML: arrowTriangleDown.arrowSvg })), index.h("mx-menu", { ref: el => (this.rowsMenu = el) }, this.rowsPerPageOptions.map(option => (index.h("mx-menu-item", { disabled: this.disabled, onClick: this.onChangeRowsPerPage.bind(this, option) }, option)))))), this.totalRows > 0 && (index.h("div", { "data-testid": "row-range", class: this.rowRangeClass }, this.currentRange, " of ", this.totalRows)), index.h("div", { class: "flex items-center sm:space-x-8" }, index.h("mx-icon-button", { "aria-label": "First page", innerHTML: pageFirstSvg, disabled: this.page === 0 || this.disabled, onClick: this.onClickFirstPage.bind(this) }), index.h("mx-icon-button", { "aria-label": "Previous page", innerHTML: chevronLeftSvg, disabled: this.page === 0 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }), index.h("mx-icon-button", { "aria-label": "Next page", innerHTML: chevronRightSvg, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }), this.lastPage !== null && (index.h("mx-icon-button", { "aria-label": "Last page", innerHTML: pageLastSvg, disabled: this.page === this.lastPage || this.disabled, onClick: this.onClickLastPage.bind(this) }))))))));
  }
  get element() { return index.getElement(this); }
};

const MxTableCell = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** This is automatically set by the parent `mx-table`. */
    this.isExposedMobileColumn = true;
    this.minWidths = new minWidthSync.MinWidths();
  }
  connectedCallback() {
    minWidthSync.minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.minWidthSync.unsubscribeComponent(this);
  }
  get cellClass() {
    let str = 'mx-table-cell flex items-center text-4';
    if (!this.minWidths.sm && this.isExposedMobileColumn)
      str += ' row-start-1 exposed-cell';
    else if (!this.minWidths.sm)
      str += ' py-0 pb-12 col-span-3';
    return str;
  }
  render() {
    return (index.h(index.Host, { role: "gridcell", "aria-describedby": `column-header-${this.columnIndex}`, class: this.cellClass }, index.h("div", { class: "min-h-20 max-w-full break-words" }, !this.minWidths.sm && !this.isExposedMobileColumn && this.heading != null && (index.h("p", { class: "subtitle5 my-0 mb-4", innerHTML: this.heading })), index.h("slot", null))));
  }
  get element() { return index.getElement(this); }
};

const DEFAULT_MAX_HEIGHT = 'calc(3.25rem + 1px)'; // 52px + 1px bottom border
const MxTableRow = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxCheck = index.createEvent(this, "mxCheck", 7);
    /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
    this.actions = [];
    this.checked = false;
    this.minWidths = new minWidthSync.MinWidths();
    this.checkable = false;
    this.checkOnRowClick = false;
    this.isMobileExpanded = false;
    this.isMobileCollapsing = false;
  }
  connectedCallback() {
    minWidthSync.minWidthSync.subscribeComponent(this);
    if (this.actions.some(action => !action.value))
      throw new Error('Table row actions must have a value property!');
  }
  componentWillRender() {
    // Render collapsed mobile row
    if (!this.minWidths.sm && !this.isMobileExpanded)
      this.element.style.maxHeight = this.getCollapsedHeight();
    // Determine `checkable` and `checked` by pulling props from parent table.
    // This avoids having to manually pass these as props when using mx-table-row inside the table's
    // default slot.
    const table = this.element.closest('mx-table');
    this.checkable = table && table.checkable;
    if (this.checkable && this.rowId == null)
      throw new Error('Checkable rows require either a getRowId prop on the table, or a rowId on the row!');
    if (this.checkable)
      this.checkOnRowClick = table.checkOnRowClick;
  }
  componentDidRender() {
    // Anchor the action menu to the action menu button.
    // We cannot use `componentDidLoad` for this because these elements sometimes get destroyed
    // during render when the viewport is resized across breakpoints.
    if (this.actions.length > 1 && this.actionMenu && this.actionMenuButton)
      this.actionMenu.anchorEl = this.actionMenuButton;
  }
  disconnectedCallback() {
    minWidthSync.minWidthSync.unsubscribeComponent(this);
  }
  onClick(e) {
    if (!!e.target.closest('button, input, mx-menu'))
      return; // Ignore clicks on buttons, etc.
    if (!this.minWidths.sm) {
      // Collapse/expand row when the exposed column cell is clicked
      const exposedCell = this.getExposedCell();
      if (!exposedCell)
        return;
      if (e.target.closest('mx-table-cell') === exposedCell)
        this.accordion();
    }
    else if (this.checkable && this.checkOnRowClick) {
      // (Un)check row
      this.checked = !this.checked;
      this.mxCheck.emit({ rowId: this.rowId, checked: this.checked });
    }
  }
  accordion() {
    if (this.minWidths.sm)
      return;
    this.isMobileExpanded ? this.collapse() : this.expand();
  }
  async collapse() {
    if (!this.isMobileExpanded)
      return;
    this.isMobileCollapsing = true;
    this.element.style.maxHeight = this.element.scrollHeight + 'px';
    requestAnimationFrame(() => {
      this.element.style.maxHeight = this.getCollapsedHeight();
    });
  }
  async expand() {
    if (this.isMobileExpanded)
      return;
    this.element.style.maxHeight = this.element.scrollHeight + 'px';
    this.isMobileExpanded = true;
    requestAnimationFrame(() => {
      this.element.style.maxHeight = this.element.scrollHeight + 'px';
    });
  }
  onTransitionEnd() {
    if (this.isMobileCollapsing) {
      this.isMobileExpanded = false;
      this.isMobileCollapsing = false;
    }
    // Remove explicit max-height after expanding to avoid issues with window resizing, etc.
    this.element.style.maxHeight = '';
  }
  onCheckboxInput(e) {
    this.mxCheck.emit({ rowId: this.rowId, checked: e.target.checked });
  }
  getExposedCell() {
    const cells = Array.from(this.element.querySelectorAll('mx-table-cell')) || [];
    return cells.find((cell) => cell.isExposedMobileColumn);
  }
  getCollapsedHeight() {
    const exposedCell = this.getExposedCell();
    if (!exposedCell)
      return DEFAULT_MAX_HEIGHT;
    return exposedCell.offsetHeight + 1 + 'px';
  }
  get rowClass() {
    let str = 'mx-table-row';
    str += this.minWidths.sm ? ' contents' : ' grid overflow-hidden';
    if (this.checkable)
      str += ' checkable-row';
    if (this.checkable && this.checkOnRowClick)
      str += ' cursor-pointer';
    if (!this.minWidths.sm && !this.isMobileExpanded)
      str += ' mobile-collapsed';
    return str;
  }
  get rowStyle() {
    if (this.minWidths.sm)
      return {};
    return {
      gridTemplateColumns: 'minmax(0, min-content) minmax(0, auto) minmax(0, min-content)',
      maxHeight: '',
    };
  }
  render() {
    return (index.h(index.Host, { role: "row", class: this.rowClass, style: this.rowStyle, onClick: this.onClick.bind(this), onTransitionEnd: this.onTransitionEnd.bind(this) }, this.checkable && (index.h("div", { class: "flex items-center pr-4 col-start-1 row-start-1 sm:row-start-auto sm:col-start-auto", onClick: this.accordion.bind(this) }, index.h("mx-checkbox", { ref: el => (this.checkbox = el), checked: this.checked, onInput: this.onCheckboxInput.bind(this), onClick: e => e.stopPropagation(), "label-name": "Select row", "hide-label": true }))), index.h("slot", null), !this.checkable && !this.minWidths.sm && index.h("div", { class: "row-start-1 col-start-1 w-0" }), !this.minWidths.sm && (index.h("div", { class: "flex items-center justify-end px-16 row-start-1", onClick: this.accordion.bind(this) }, index.h("span", { class: 'mobile-row-chevron text-1 transform' +
        (this.isMobileExpanded && !this.isMobileCollapsing ? ' rotate-180' : ''), innerHTML: chevronDown.chevronSvg }))), this.actions.length === 1 && (index.h("div", { class: "action-cell flex items-center p-16 sm:p-0 justify-end col-span-3 sm:col-span-1" }, index.h("mx-button", Object.assign({ "data-testid": "action-button", "btn-type": "text" }, this.actions[0]), this.actions[0].value))), this.actions.length > 1 && (index.h("div", { class: "action-cell flex items-center p-0 justify-end col-span-3 sm:col-span-1" }, index.h("mx-icon-button", { ref: el => (this.actionMenuButton = el), innerHTML: dotsVertical.dotsSvg }), index.h("mx-menu", { "data-testid": "action-menu", ref: el => (this.actionMenu = el) }, this.actions.map(action => (index.h("mx-menu-item", Object.assign({}, action), action.value))))))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_linear_progress = MxLinearProgress;
exports.mx_pagination = MxPagination;
exports.mx_table_cell = MxTableCell;
exports.mx_table_row = MxTableRow;
