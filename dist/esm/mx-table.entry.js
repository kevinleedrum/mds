import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-d7d68a6b.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';
import { c as capitalize, i as isDateObject } from './utils-98c5c01c.js';
import { a as arrowSvg } from './arrow-triangle-down-6c587423.js';

const MxTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxSortChange = createEvent(this, "mxSortChange", 7);
    this.mxRowCheck = createEvent(this, "mxRowCheck", 7);
    this.mxVisibleRowsChange = createEvent(this, "mxVisibleRowsChange", 7);
    this.hasDefaultSlot = false;
    this.hasSearch = false;
    this.hasFilter = false;
    this.showOperationsBar = false;
    /** An array of objects that defines the table's dataset. */
    this.rows = [];
    /** An array of column definitions.  If not specified, a column will be generated for each property on the row object. */
    this.columns = [];
    /** Make rows checkable.  You must either provide a `getRowId` getter (for generated rows), or
     * provide a `rowId` for every `mx-table-row` if creating the rows manually in the table's slot. */
    this.checkable = false;
    /** Set to `false` to prevent checking rows by clicking on them (outside the checkboxes). */
    this.checkOnRowClick = true;
    /** Set to `false` to hide the (un)check all checkbox at the top of the table. */
    this.showCheckAll = true;
    this.hoverable = true;
    /** Set to `true` to allow smaller tables to shrink to less than 100% width on larger screens */
    this.autoWidth = false;
    this.sortAscending = true;
    /** Show the pagination component.  Setting this to `false` will show all rows. */
    this.paginate = true;
    /** The zero-based index of the page to display */
    this.page = 0;
    this.rowsPerPage = 10;
    /** Disable the next-page button.  Useful when using server-side pagination and the total number of rows is unknown. */
    this.disableNextPage = false;
    /** Do not sort or paginate client-side. Use events to send server requests instead. */
    this.serverPaginate = false;
    /** Show a progress bar below the header row */
    this.showProgressBar = false;
    /** Disable the pagination buttons (i.e. while loading results) */
    this.disablePagination = false;
    /** The progress bar percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress bar will be displayed. */
    this.progressValue = null;
    /** Delay the appearance of the progress bar for this many milliseconds */
    this.progressAppearDelay = 0;
    this.minWidths = new MinWidths();
    this.checkedRowIds = [];
    this.exposedMobileColumnIndex = 0;
    this.hasActionsColumnFromSlot = false;
  }
  onMxCheck(e) {
    const { rowId, checked } = e.detail;
    if (!checked && this.checkedRowIds.includes(rowId)) {
      this.checkedRowIds = this.checkedRowIds.filter(id => id !== rowId);
    }
    else if (checked && !this.checkedRowIds.includes(rowId)) {
      this.checkedRowIds = [...this.checkedRowIds, rowId];
    }
    this.mxRowCheck.emit(this.checkedRowIds);
  }
  onVisibleRowsChange() {
    this.getTableRows().forEach(row => row.collapse());
    this.mxVisibleRowsChange.emit(this.visibleRows);
  }
  onPageChange() {
    // Scroll back to the top of the table on page change (if necessary)
    if (this.element.getBoundingClientRect().top < 0)
      this.element.scrollIntoView();
  }
  resetPage() {
    if (!this.serverPaginate)
      this.page = 0;
  }
  async getCheckedRowIds() {
    return this.checkedRowIds;
  }
  async setCheckedRowIds(checkedRowIds = []) {
    this.checkedRowIds = checkedRowIds;
  }
  async checkAll() {
    if (this.getRowId) {
      this.checkedRowIds = this.rows.map(this.getRowId).map(id => id.toString());
    }
    else {
      this.checkedRowIds = this.getTableRows().map(row => row.rowId);
    }
  }
  async checkNone() {
    this.checkedRowIds = [];
  }
  getTableRows() {
    return Array.from(this.element.querySelectorAll('mx-table-row'));
  }
  onCheckAllClick(e) {
    e.preventDefault();
    if (this.checkedRowIds.length === 0) {
      this.checkAll();
    }
    else {
      this.checkNone();
    }
  }
  setCellProps() {
    const cells = this.element.querySelectorAll('mx-table-cell');
    let colIndex = 0;
    cells.forEach((cell) => {
      cell.columnIndex = colIndex;
      cell.isExposedMobileColumn = colIndex === this.exposedMobileColumnIndex;
      cell.heading = this.cols[colIndex].heading;
      if (colIndex === this.cols.length - 1)
        colIndex = 0;
      else
        colIndex++;
    });
  }
  setRowsChecked() {
    this.getTableRows().forEach(row => (row.checked = this.checkedRowIds.includes(row.rowId)));
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  componentWillLoad() {
    this.hasDefaultSlot = Array.from(this.element.children).some(el => !el.getAttribute('slot'));
  }
  componentWillRender() {
    this.hasFilter = !!this.element.querySelector('[slot="filter"]');
    this.hasSearch = !!this.element.querySelector('[slot="search"]');
    this.showOperationsBar = !!this.getMultiRowActions || this.hasFilter || this.hasSearch;
    this.hasActionsColumnFromSlot =
      this.hasDefaultSlot && this.getTableRows().some(row => row.actions && row.actions.length);
    requestAnimationFrame(this.setCellProps.bind(this));
  }
  componentDidRender() {
    if (this.actionMenu && !this.actionMenu.anchorEl) {
      this.actionMenu.anchorEl = this.actionMenuButton;
    }
    if (this.checkable)
      this.setRowsChecked();
  }
  componentDidLoad() {
    // Emit paginated rows right away.
    this.onVisibleRowsChange();
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  get cols() {
    // If `columns` prop is not provided, create a column for each row object property
    if (!this.columns.length && this.rows.length) {
      return Object.keys(this.rows[0]).map(property => ({ property, heading: capitalize(property), sortable: true }));
    }
    return this.columns.map(col => (Object.assign(Object.assign({}, col), { sortable: col.sortable === false ? false : true })));
  }
  get exposedMobileColumn() {
    return this.cols[this.exposedMobileColumnIndex] || {};
  }
  get visibleRows() {
    if (this.serverPaginate || (!this.paginate && !this.sortBy))
      return this.rows;
    const offset = this.page * this.rowsPerPage;
    let rows = this.rows.slice();
    if (this.sortBy)
      this.sortRows(rows);
    rows = rows.slice(offset, offset + this.rowsPerPage);
    return rows;
  }
  get allRowsChecked() {
    return this.rows.length && this.rows.length === this.checkedRowIds.length;
  }
  get someRowsChecked() {
    return this.checkedRowIds.length > 0 && this.checkedRowIds.length < this.rows.length;
  }
  get multiRowActions() {
    if (!this.getMultiRowActions)
      return [];
    return this.getMultiRowActions(this.checkedRowIds);
  }
  get hasActionsColumn() {
    return !!this.getRowActions || this.hasActionsColumnFromSlot;
  }
  get operationsBarStyle() {
    if (this.minWidths.sm) {
      // On larger screens, use a three-column grid
      return {
        gridTemplateColumns: 'max-content 1fr max-content',
      };
    }
    else if (this.checkable && this.showCheckAll) {
      // If checkbox on mobile, use a two-column grid
      return {
        gridTemplateColumns: 'minmax(0, max-content) 1fr',
      };
    }
    else {
      // If no checkbox on mobile, use a single column
      return {
        gridTemplateColumns: '1fr',
      };
    }
  }
  get searchStyle() {
    if (this.minWidths.sm) {
      // On larger screens, place in last column of first grid row
      return { width: '240px', gridColumnStart: '-1' };
    }
    else if (!(this.checkable && this.showCheckAll)) {
      // If no checkbox on mobile, span the entire first grid row
      return { width: '100%', gridColumnStart: '1' };
    }
    else {
      // If checkbox on mobile, span remaining space in first grid row (up to 240px)
      return { width: '100%', maxWidth: '240px', gridColumnStart: '2' };
    }
  }
  get gridStyle() {
    if (!this.minWidths.sm)
      return { display: 'flex', flexDirection: 'column' };
    const display = this.autoWidth ? 'inline-grid' : 'grid';
    let gridTemplateColumns = this.checkable ? 'minmax(0, min-content) ' : '';
    const autoColumnCount = this.cols.length + (this.hasActionsColumn ? 1 : 0);
    gridTemplateColumns += `repeat(${autoColumnCount}, minmax(0, auto))`;
    return { display, gridTemplateColumns };
  }
  sortRows(rows) {
    const sortByColumn = this.cols.find(c => c.property === this.sortBy);
    if (!sortByColumn)
      return;
    let sortCompare = sortByColumn.sortCompare;
    if (!sortCompare) {
      sortCompare = (a, b) => {
        const valueA = this.getCellSortableValue(a, sortByColumn);
        const valueB = this.getCellSortableValue(b, sortByColumn);
        if (typeof valueA === 'number' && typeof valueB === 'number')
          return valueA - valueB;
        return valueA.localeCompare(valueB);
      };
    }
    rows.sort(sortCompare);
    if (!this.sortAscending)
      rows.reverse();
  }
  getCellSortableValue(row, col) {
    if (col.getValue)
      return col.getValue(row);
    const val = row[col.property];
    if (['date', 'dateTime'].includes(col.type) || isDateObject(val))
      return -new Date(val).getTime();
    if (col.type === 'boolean')
      return val ? 1 : 0;
    return val;
  }
  getCellValue(row, col, rowIndex) {
    if (col.getValue)
      return col.getValue(row, rowIndex);
    const val = row[col.property];
    if (col.type === 'date' || isDateObject(val))
      return new Date(val).toLocaleDateString();
    if (col.type === 'dateTime' || isDateObject(val))
      return new Date(val).toLocaleString();
    if (col.type === 'boolean')
      return val ? 'Yes' : '';
    return val;
  }
  getHeaderClass(col, colIndex) {
    if (!col)
      return '';
    let str = 'flex items-center subtitle2 py-18 ' + this.getAlignClass(col);
    str += this.minWidths.sm ? ' px-16' : ' flex-1';
    const isCheckAllInHeader = this.showCheckAll && !this.showOperationsBar;
    if (this.minWidths.sm && colIndex === 0 && this.checkable && !isCheckAllInHeader)
      str += ' col-span-2';
    if (!this.minWidths.sm && colIndex === this.exposedMobileColumnIndex && this.checkable && isCheckAllInHeader)
      str += ' px-16';
    if (col.sortable && col.property)
      str += ' group cursor-pointer';
    if (col.headerClass)
      str += col.headerClass;
    return str;
  }
  getHeaderArrowClass(col) {
    let str = 'ml-12 transform scale-75';
    if (col.property !== this.sortBy)
      str += ' opacity-30 sm:opacity-0 sm:group-hover:opacity-30 rotate-180';
    else if (this.sortAscending)
      str += ' rotate-180';
    return str;
  }
  getAlignClass(col) {
    if (!this.minWidths.sm)
      return 'justify-start';
    let alignment = col.align || (col.type === 'number' ? 'right' : 'left');
    return alignment === 'right' ? 'justify-end' : alignment === 'center' ? 'justify-center' : 'justify-start';
  }
  onHeaderClick(col) {
    if (!col || !col.sortable || !col.property)
      return;
    if (this.sortBy !== col.property) {
      this.sortBy = col.property;
      this.sortAscending = true;
    }
    else {
      if (this.sortAscending)
        this.sortAscending = false;
      else {
        this.sortBy = null;
        this.sortAscending = true;
      }
    }
    this.mxSortChange.emit({ sortBy: this.sortBy, sortAscending: this.sortAscending });
  }
  changeExposedColumnIndex(delta) {
    const newColumnIndex = this.exposedMobileColumnIndex + delta;
    if (newColumnIndex < 0 || newColumnIndex >= this.cols.length)
      return;
    this.exposedMobileColumnIndex = newColumnIndex;
  }
  onMxPageChange(e) {
    if (this.serverPaginate)
      return;
    this.page = e.detail.page;
    this.rowsPerPage = e.detail.rowsPerPage;
  }
  render() {
    const checkAllCheckbox = this.checkable && this.showCheckAll && (h("mx-checkbox", { checked: this.allRowsChecked, class: this.showOperationsBar ? 'ml-24' : 'pr-4', indeterminate: this.someRowsChecked, onClick: this.onCheckAllClick.bind(this), "label-name": "Select all rows", "hide-label": true }));
    let multiRowActionUI;
    if (this.checkable) {
      multiRowActionUI =
        this.multiRowActions.length === 1 ? (
        // Multi-Row Action Button
        h("mx-button", Object.assign({ "data-testid": "multi-action-button", "btn-type": "outlined" }, this.multiRowActions[0], { class: 'whitespace-nowrap' + (!this.checkedRowIds.length ? ' hidden' : '') }), this.multiRowActions[0].value)) : (
        // Multi-Row Action Menu
        h("span", { class: !this.checkedRowIds.length ? 'hidden' : null }, h("mx-button", { ref: el => (this.actionMenuButton = el), "btn-type": "text", dropdown: true }, h("span", { class: "h-full flex items-center" }, h("i", { class: "ph-gear text-1" }))), h("mx-menu", { "data-testid": "multi-action-menu", ref: el => (this.actionMenu = el) }, this.multiRowActions.map(action => (h("mx-menu-item", Object.assign({}, action), action.value))))));
    }
    const operationsBar = (h("div", { class: "grid gap-x-16 gap-y-12 pb-12", style: this.operationsBarStyle }, this.checkable && this.showCheckAll && (h("div", { class: "col-start-1 flex items-center min-h-36 space-x-16" }, checkAllCheckbox, multiRowActionUI)), this.hasFilter && (h("div", { class: "flex items-center flex-wrap row-start-2 col-span-full sm:row-start-auto sm:col-span-1" }, h("slot", { name: "filter" }))), this.hasSearch && (h("div", { class: "justify-self-end", style: this.searchStyle }, h("slot", { name: "search" })))));
    return (h(Host, { class: 'mx-table block' + (this.hoverable ? ' hoverable' : '') + (this.paginate ? ' paginated' : '') }, this.showOperationsBar && operationsBar, h("div", { "data-testid": "grid", class: "table-grid", style: this.gridStyle }, h("div", { class: "header-row" }, this.minWidths.sm && !this.showOperationsBar && checkAllCheckbox, this.minWidths.sm ? (
    // Non-Mobile Column Headers
    this.cols.map((col, colIndex) => {
      return (h("div", { id: `column-header-${colIndex}`, role: "columnheader", class: this.getHeaderClass(col, colIndex), onClick: this.onHeaderClick.bind(this, col) }, h("div", { class: "inline-flex items-center overflow-hidden whitespace-nowrap select-none" }, h("span", { class: "truncate flex-shrink", innerHTML: col.heading }), col.sortable && col.property && (h("div", { class: this.getHeaderArrowClass(col), "data-testid": "arrow", innerHTML: arrowSvg })))));
    })) : (
    // Mobile Column Header Navigation
    h("div", { class: "flex items-stretch" }, !this.showOperationsBar && checkAllCheckbox, h("div", { id: `column-header-${this.exposedMobileColumnIndex}`, role: "columnheader", class: this.getHeaderClass(this.exposedMobileColumn, this.exposedMobileColumnIndex), onClick: this.onHeaderClick.bind(this, this.exposedMobileColumn) }, h("div", { class: "inline-flex items-center overflow-hidden whitespace-nowrap select-none" }, h("span", { class: "truncate flex-shrink", innerHTML: this.exposedMobileColumn.heading }), this.exposedMobileColumn.sortable && this.exposedMobileColumn.property && (h("div", { class: this.getHeaderArrowClass(this.exposedMobileColumn), "data-testid": "arrow", innerHTML: arrowSvg })))), h("div", { class: "flex items-center" }, h("mx-icon-button", { "data-testid": "previous-column-button", chevronLeft: true, disabled: this.exposedMobileColumnIndex === 0, onClick: this.changeExposedColumnIndex.bind(this, -1) }), h("mx-icon-button", { "data-testid": "next-column-button", chevronRight: true, disabled: this.exposedMobileColumnIndex === this.cols.length - 1, onClick: this.changeExposedColumnIndex.bind(this, 1) })))), this.minWidths.sm && this.hasActionsColumn && h("div", null)), this.showProgressBar && (h("div", null, h("div", { class: "block h-0 col-span-full" }, h("mx-linear-progress", { class: "transform -translate-y-1/2", value: this.progressValue, "appear-delay": this.progressAppearDelay })))), h("slot", null), !this.hasDefaultSlot && (h("div", null, this.visibleRows.map((row, rowIndex) => (
    // Generated Body Rows
    h("mx-table-row", { "row-id": this.getRowId ? this.getRowId(row) : null, actions: this.getRowActions ? this.getRowActions(row) : undefined }, this.cols.map((col) => (h("mx-table-cell", { class: [this.getAlignClass(col), col.cellClass].join(' ') }, h("div", { innerHTML: this.getCellValue(row, col, rowIndex) }))))))))), this.visibleRows && this.visibleRows.length === 0 && (h("div", { class: "empty-state" }, h("div", { class: "col-span-full p-16 text-4" }, h("slot", { name: "empty-state" }, h("span", null, "No results found."))))), this.paginate && (
    // Pagination Row
    h("div", { class: "pagination-row" }, h("mx-pagination", { page: this.page, "rows-per-page": this.rowsPerPage, rowsPerPageOptions: this.rowsPerPageOptions, "total-rows": this.serverPaginate ? this.totalRows : this.rows.length, class: "col-span-full p-0 rounded-b-2xl", onMxPageChange: this.onMxPageChange.bind(this), disabled: this.disablePagination, disableNextPage: this.disableNextPage }))))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "sortBy": ["onVisibleRowsChange", "resetPage"],
    "sortAscending": ["onVisibleRowsChange", "resetPage"],
    "page": ["onVisibleRowsChange", "onPageChange"],
    "rowsPerPage": ["onVisibleRowsChange", "resetPage"],
    "rows": ["onVisibleRowsChange", "resetPage"]
  }; }
};

export { MxTable as mx_table };
