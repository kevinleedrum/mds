import { Component, Host, h, Prop, Element, Event, Watch, Listen, State, Method } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';
import { capitalize, getCursorCoords, getPageRect, isDateObject } from '../../utils/utils';
import arrowSvg from '../../assets/svg/arrow-triangle-down.svg';
import gearSvg from '../../assets/svg/gear.svg';
export class MxTable {
  constructor() {
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
    /** Enables reordering of rows via drag and drop. */
    this.draggableRows = false;
    this.hoverable = true;
    /** Set to `true` to allow smaller tables to shrink to less than 100% width on larger screens */
    this.autoWidth = false;
    this.sortAscending = true;
    /** Show the pagination component.  Setting this to `false` will show all rows. */
    this.paginate = true;
    /** The page to display */
    this.page = 1;
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
  async onMxRowDragStart(e) {
    this.dragRow = e.target.closest('mx-table-row');
    // Cache height of row (including any nested rows)
    this.dragRowHeight = await this.dragRow.getHeight();
    // Get all rows that are affected by dragging this one (i.e. the same parent node)
    this.dragRowSiblings = Array.from(this.dragRow.parentNode.children).filter(c => c.tagName === 'MX-TABLE-ROW');
    this.dragRowIndex = this.dragRowSiblings.indexOf(this.dragRow);
    this.dragOverRowIndex = this.dragRowIndex;
    this.dragMoveHandler = this.onDragMove.bind(this);
    // Add transitions to the rows
    this.dragRowSiblings.forEach(async (row) => {
      if (!e.detail.isKeyboard && row === this.dragRow)
        return; // Do not transition a row dragged with a mouse
      (await row.getChildren()).forEach((rowChild) => {
        rowChild.classList.add('transition-transform', 'pointer-events-none');
      });
    });
    if (!e.detail.isKeyboard) {
      document.addEventListener('touchmove', this.dragMoveHandler);
      document.addEventListener('mousemove', this.dragMoveHandler);
    }
  }
  async onDragKeyDown(e) {
    let direction;
    const key = e.detail;
    if (['ArrowUp', 'ArrowLeft'].includes(key))
      direction = -1;
    if (['ArrowDown', 'ArrowRight'].includes(key))
      direction = 1;
    if (!direction)
      return;
    if (direction === -1 && this.dragOverRowIndex === 0)
      return; // Row is at the top
    if (direction === 1 && this.dragOverRowIndex === this.dragRowSiblings.length - 1)
      return; // Row is at the bottom
    this.dragOverRowIndex += direction;
    // Determine the translate distance based on sibling row heights
    let translateY = 0;
    let rowIndex = this.dragOverRowIndex;
    while (rowIndex !== this.dragRowIndex) {
      const translateDir = this.dragOverRowIndex > this.dragRowIndex ? 1 : -1;
      translateY += (await this.dragRowSiblings[rowIndex].getHeight()) * translateDir;
      rowIndex -= translateDir;
    }
    this.dragRow.translateRow(0, translateY);
    this.onDragMove();
  }
  onMxRowDragEnd(e) {
    document.removeEventListener('mousemove', this.dragMoveHandler);
    document.removeEventListener('touchmove', this.dragMoveHandler);
    if (!e.detail.isCancel && this.dragOverRowIndex !== this.dragRowIndex) {
      // If row was dragged to a new position AND dragging wasn't cancelled, emit the mxRowMove event
      this.mxRowMove.emit({
        rowId: e.target.rowId,
        oldIndex: this.dragRowIndex,
        newIndex: this.dragOverRowIndex,
      });
      if (e.detail.isKeyboard)
        this.dragRowSiblings[this.dragOverRowIndex].focusDragHandle(); // Focus the handle at the new index
    }
    this.dragRowIndex = null;
    // Remove transitions and transforms from rows
    requestAnimationFrame(() => {
      this.dragRowSiblings.forEach(async (row) => {
        (await row.getChildren()).forEach((rowChild) => {
          rowChild.classList.remove('transition-transform', 'pointer-events-none');
          rowChild.style.transform = '';
        });
      });
    });
    document.body.style.cursor = '';
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
      this.page = 1;
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
    e.stopPropagation(); // Prevent triggering a sort when checkbox is in first column header
    if (this.checkedRowIds.length === 0) {
      this.checkAll();
    }
    else {
      this.checkNone();
    }
  }
  /** Animate table rows while dragging a row */
  onDragMove(e) {
    requestAnimationFrame(() => {
      if (this.dragRow == null)
        return;
      this.dragRowSiblings.forEach(async (row, rowIndex) => {
        const rowChildren = await row.getChildren();
        const { top } = getPageRect(rowChildren[0]);
        const { bottom } = getPageRect(rowChildren[rowChildren.length - 1]);
        if (e) {
          const { pageY } = getCursorCoords(e);
          if (pageY >= top && pageY <= bottom)
            this.dragOverRowIndex = rowIndex;
        }
        if (row === this.dragRow)
          return; // Do not shift row that is being dragged
        if (rowIndex <= this.dragOverRowIndex && rowIndex > this.dragRowIndex) {
          // Shift rows that are below the dragged row UP
          rowChildren.forEach(child => (child.style.transform = `translateY(-${this.dragRowHeight}px)`));
        }
        else if (rowIndex >= this.dragOverRowIndex && rowIndex < this.dragRowIndex) {
          // Shift rows that are above the dragged row DOWN
          rowChildren.forEach(child => (child.style.transform = `translateY(${this.dragRowHeight}px)`));
        }
        else {
          rowChildren.forEach(child => (child.style.transform = ''));
        }
      });
    });
  }
  setCellProps() {
    const cells = this.element.querySelectorAll('mx-table-cell');
    let colIndex = 0;
    cells.forEach((cell) => {
      cell.columnIndex = colIndex;
      cell.isExposedMobileColumn = colIndex === this.exposedMobileColumnIndex;
      cell.heading = this.cols[colIndex].heading;
      cell.classList.add(...this.getAlignClass(this.cols[colIndex]).split(' '));
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
    const offset = (this.page - 1) * this.rowsPerPage;
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
    const autoColumnCount = this.cols.length + (this.hasActionsColumn ? 1 : 0);
    const gridTemplateColumns = `repeat(${autoColumnCount}, minmax(0, auto))`;
    return { display, gridTemplateColumns };
  }
  get emptyStateClass() {
    let str = 'empty-state';
    if (this.rows.length > 0 || this.getTableRows().length > 0)
      str += ' hidden';
    return str;
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
    if (this.minWidths.sm && colIndex === 0)
      str += ' space-x-16';
    if (!this.minWidths.sm && colIndex === this.exposedMobileColumnIndex && this.checkable && isCheckAllInHeader)
      str += ' px-16';
    if (!this.draggableRows && col.sortable && col.property)
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
    let str = 'justify-start';
    let alignment = col.align || (col.type === 'number' ? 'right' : 'left');
    str += alignment === 'right' ? ' sm:justify-end' : alignment === 'center' ? ' sm:justify-center' : '';
    return str;
  }
  onHeaderClick(col) {
    if (this.draggableRows || !col || !col.sortable || !col.property)
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
        h("span", { class: !this.checkedRowIds.length ? 'hidden' : null },
          h("mx-button", { ref: el => (this.actionMenuButton = el), "btn-type": "text", dropdown: true },
            h("span", { class: "h-full flex items-center px-2" },
              h("span", { innerHTML: gearSvg }))),
          h("mx-menu", { "data-testid": "multi-action-menu", ref: el => (this.actionMenu = el) }, this.multiRowActions.map(action => (h("mx-menu-item", Object.assign({}, action), action.value))))));
    }
    const operationsBar = (h("div", { class: "grid gap-x-16 gap-y-12 pb-12", style: this.operationsBarStyle },
      this.checkable && this.showCheckAll && (h("div", { class: "col-start-1 flex items-center min-h-36 space-x-16" },
        checkAllCheckbox,
        multiRowActionUI)),
      this.hasFilter && (h("div", { class: "flex items-center flex-wrap row-start-2 col-span-full sm:row-start-auto sm:col-span-1" },
        h("slot", { name: "filter" }))),
      this.hasSearch && (h("div", { class: "justify-self-end", style: this.searchStyle },
        h("slot", { name: "search" })))));
    return (h(Host, { class: 'mx-table block' + (this.hoverable ? ' hoverable' : '') + (this.paginate ? ' paginated' : '') },
      this.showOperationsBar && operationsBar,
      h("div", { "data-testid": "grid", class: "table-grid relative", style: this.gridStyle },
        h("div", { class: "header-row" },
          this.minWidths.sm ? (
          // Non-Mobile Column Headers
          this.cols.map((col, colIndex) => {
            return (h("div", { id: `column-header-${colIndex}`, role: "columnheader", class: this.getHeaderClass(col, colIndex), onClick: this.onHeaderClick.bind(this, col) },
              colIndex === 0 && this.minWidths.sm && !this.showOperationsBar && checkAllCheckbox,
              h("div", { class: "inline-flex items-center overflow-hidden whitespace-nowrap select-none" },
                h("span", { class: "truncate flex-shrink", innerHTML: col.heading }),
                !this.draggableRows && col.sortable && col.property && (h("div", { class: this.getHeaderArrowClass(col), "data-testid": "arrow", innerHTML: arrowSvg })))));
          })) : (
          // Mobile Column Header Navigation
          h("div", { class: "flex items-stretch" },
            !this.showOperationsBar && checkAllCheckbox,
            h("div", { id: `column-header-${this.exposedMobileColumnIndex}`, role: "columnheader", class: this.getHeaderClass(this.exposedMobileColumn, this.exposedMobileColumnIndex), onClick: this.onHeaderClick.bind(this, this.exposedMobileColumn) },
              h("div", { class: "inline-flex items-center overflow-hidden whitespace-nowrap select-none" },
                h("span", { class: "truncate flex-shrink", innerHTML: this.exposedMobileColumn.heading }),
                !this.draggableRows && this.exposedMobileColumn.sortable && this.exposedMobileColumn.property && (h("div", { class: this.getHeaderArrowClass(this.exposedMobileColumn), "data-testid": "arrow", innerHTML: arrowSvg })))),
            h("div", { class: "flex items-center" },
              h("mx-icon-button", { "data-testid": "previous-column-button", chevronLeft: true, disabled: this.exposedMobileColumnIndex === 0, onClick: this.changeExposedColumnIndex.bind(this, -1) }),
              h("mx-icon-button", { "data-testid": "next-column-button", chevronRight: true, disabled: this.exposedMobileColumnIndex === this.cols.length - 1, onClick: this.changeExposedColumnIndex.bind(this, 1) })))),
          this.minWidths.sm && this.hasActionsColumn && h("div", null)),
        this.showProgressBar && (h("div", null,
          h("div", { class: "block h-0 col-span-full" },
            h("mx-linear-progress", { class: "transform -translate-y-1/2", value: this.progressValue, "appear-delay": this.progressAppearDelay })))),
        h("slot", null),
        !this.hasDefaultSlot && (h("div", null, this.visibleRows.map((row, rowIndex) => (
        // Generated Body Rows
        h("mx-table-row", { "row-id": this.getRowId ? this.getRowId(row) : null, actions: this.getRowActions ? this.getRowActions(row) : undefined }, this.cols.map((col) => (h("mx-table-cell", { class: col.cellClass },
          h("div", { innerHTML: this.getCellValue(row, col, rowIndex) }))))))))),
        h("div", { "data-testid": "empty-state", class: this.emptyStateClass },
          h("div", { class: "col-span-full p-16 text-4" },
            h("slot", { name: "empty-state" },
              h("span", null, "No results found.")))),
        this.paginate && (
        // Pagination Row
        h("div", { class: "pagination-row" },
          h("mx-pagination", { page: this.page, "rows-per-page": this.rowsPerPage, rowsPerPageOptions: this.rowsPerPageOptions, "total-rows": this.serverPaginate ? this.totalRows : this.rows.length, class: "col-span-full p-0 rounded-b-2xl", onMxPageChange: this.onMxPageChange.bind(this), disabled: this.disablePagination, disableNextPage: this.disableNextPage }))))));
  }
  static get is() { return "mx-table"; }
  static get properties() { return {
    "rows": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "Object[]",
        "resolved": "Object[]",
        "references": {
          "Object": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "An array of objects that defines the table's dataset."
      },
      "defaultValue": "[]"
    },
    "columns": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ITableColumn[]",
        "resolved": "ITableColumn[]",
        "references": {
          "ITableColumn": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "An array of column definitions.  If not specified, a column will be generated for each property on the row object."
      },
      "defaultValue": "[]"
    },
    "getRowId": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "(row: Object) => string",
        "resolved": "(row: Object) => string",
        "references": {
          "Object": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "A function that returns the `rowId` prop for each generated `mx-table-row`.\nThis is only required if the table is `checkable` and is auto-generating rows (not using the default slot)."
      }
    },
    "checkable": {
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
        "text": "Make rows checkable.  You must either provide a `getRowId` getter (for generated rows), or\nprovide a `rowId` for every `mx-table-row` if creating the rows manually in the table's slot."
      },
      "attribute": "checkable",
      "reflect": false,
      "defaultValue": "false"
    },
    "checkOnRowClick": {
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
        "text": "Set to `false` to prevent checking rows by clicking on them (outside the checkboxes)."
      },
      "attribute": "check-on-row-click",
      "reflect": false,
      "defaultValue": "true"
    },
    "showCheckAll": {
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
        "text": "Set to `false` to hide the (un)check all checkbox at the top of the table."
      },
      "attribute": "show-check-all",
      "reflect": false,
      "defaultValue": "true"
    },
    "draggableRows": {
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
        "text": "Enables reordering of rows via drag and drop."
      },
      "attribute": "draggable-rows",
      "reflect": false,
      "defaultValue": "false"
    },
    "hoverable": {
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
        "text": ""
      },
      "attribute": "hoverable",
      "reflect": false,
      "defaultValue": "true"
    },
    "autoWidth": {
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
        "text": "Set to `true` to allow smaller tables to shrink to less than 100% width on larger screens"
      },
      "attribute": "auto-width",
      "reflect": false,
      "defaultValue": "false"
    },
    "sortBy": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The property on the row objects that will be used for sorting"
      },
      "attribute": "sort-by",
      "reflect": false
    },
    "sortAscending": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "sort-ascending",
      "reflect": false,
      "defaultValue": "true"
    },
    "paginate": {
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
        "text": "Show the pagination component.  Setting this to `false` will show all rows."
      },
      "attribute": "paginate",
      "reflect": false,
      "defaultValue": "true"
    },
    "page": {
      "type": "number",
      "mutable": true,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The page to display"
      },
      "attribute": "page",
      "reflect": false,
      "defaultValue": "1"
    },
    "rowsPerPage": {
      "type": "number",
      "mutable": true,
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
      "defaultValue": "10"
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
        "text": "The total number of unpaginated rows.  This is ignored for client-side pagination.\nFor server-side pagination, omitting this prop will remove the last-page button."
      },
      "attribute": "total-rows",
      "reflect": false
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
        "text": "Disable the next-page button.  Useful when using server-side pagination and the total number of rows is unknown."
      },
      "attribute": "disable-next-page",
      "reflect": false,
      "defaultValue": "false"
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
      }
    },
    "serverPaginate": {
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
        "text": "Do not sort or paginate client-side. Use events to send server requests instead."
      },
      "attribute": "server-paginate",
      "reflect": false,
      "defaultValue": "false"
    },
    "getRowActions": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "(row: Object) => ITableRowAction[]",
        "resolved": "(row: Object) => ITableRowAction[]",
        "references": {
          "Object": {
            "location": "global"
          },
          "ITableRowAction": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "getMultiRowActions": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "(rows: string[]) => ITableRowAction[]",
        "resolved": "(rows: string[]) => ITableRowAction[]",
        "references": {
          "ITableRowAction": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "showProgressBar": {
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
        "text": "Show a progress bar below the header row"
      },
      "attribute": "show-progress-bar",
      "reflect": false,
      "defaultValue": "false"
    },
    "disablePagination": {
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
        "text": "Disable the pagination buttons (i.e. while loading results)"
      },
      "attribute": "disable-pagination",
      "reflect": false,
      "defaultValue": "false"
    },
    "progressValue": {
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
        "text": "The progress bar percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress bar will be displayed."
      },
      "attribute": "progress-value",
      "reflect": false,
      "defaultValue": "null"
    },
    "progressAppearDelay": {
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
        "text": "Delay the appearance of the progress bar for this many milliseconds"
      },
      "attribute": "progress-appear-delay",
      "reflect": false,
      "defaultValue": "0"
    }
  }; }
  static get states() { return {
    "minWidths": {},
    "checkedRowIds": {},
    "exposedMobileColumnIndex": {},
    "hasActionsColumnFromSlot": {}
  }; }
  static get events() { return [{
      "method": "mxSortChange",
      "name": "mxSortChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when a sortable column's header is clicked."
      },
      "complexType": {
        "original": "SortChangeEventDetail",
        "resolved": "{ sortBy: string; sortAscending: boolean; }",
        "references": {
          "SortChangeEventDetail": {
            "location": "local"
          }
        }
      }
    }, {
      "method": "mxRowCheck",
      "name": "mxRowCheck",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when a row is (un)checked.  The `Event.detail` will be the array of checked `rowId`s."
      },
      "complexType": {
        "original": "string[]",
        "resolved": "string[]",
        "references": {}
      }
    }, {
      "method": "mxVisibleRowsChange",
      "name": "mxVisibleRowsChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the sorting, pagination, or rows data changes.\nThe `Event.detail` will contain the sorted, paginated array of visible rows.  This is useful\nfor building a custom row layout via the default slot."
      },
      "complexType": {
        "original": "Object[]",
        "resolved": "Object[]",
        "references": {
          "Object": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "mxRowMove",
      "name": "mxRowMove",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when a row is dragged to a new position.\nThe `Event.detail` object will contain the `rowId` (if set), `oldIndex`, and `newIndex`."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "getCheckedRowIds": {
      "complexType": {
        "signature": "() => Promise<string[]>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<string[]>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "setCheckedRowIds": {
      "complexType": {
        "signature": "(checkedRowIds?: string[]) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "checkAll": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "checkNone": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "sortBy",
      "methodName": "onVisibleRowsChange"
    }, {
      "propName": "sortAscending",
      "methodName": "onVisibleRowsChange"
    }, {
      "propName": "page",
      "methodName": "onVisibleRowsChange"
    }, {
      "propName": "rowsPerPage",
      "methodName": "onVisibleRowsChange"
    }, {
      "propName": "rows",
      "methodName": "onVisibleRowsChange"
    }, {
      "propName": "page",
      "methodName": "onPageChange"
    }, {
      "propName": "sortBy",
      "methodName": "resetPage"
    }, {
      "propName": "sortAscending",
      "methodName": "resetPage"
    }, {
      "propName": "rowsPerPage",
      "methodName": "resetPage"
    }, {
      "propName": "rows",
      "methodName": "resetPage"
    }]; }
  static get listeners() { return [{
      "name": "mxCheck",
      "method": "onMxCheck",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "mxRowDragStart",
      "method": "onMxRowDragStart",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "mxDragKeyDown",
      "method": "onDragKeyDown",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "mxRowDragEnd",
      "method": "onMxRowDragEnd",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
