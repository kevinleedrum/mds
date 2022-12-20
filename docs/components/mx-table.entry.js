import { r as registerInstance, f as createEvent, h, i as forceUpdate, e as Host, g as getElement } from './index-7d7e62d7.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';
import { g as getPageRect, a as getCursorCoords, c as capitalize, i as isDateObject } from './utils-eee50014.js';

const MxTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxSortChange = createEvent(this, "mxSortChange", 7);
    this.mxRowCheck = createEvent(this, "mxRowCheck", 7);
    this.mxCheckAll = createEvent(this, "mxCheckAll", 7);
    this.mxVisibleRowsChange = createEvent(this, "mxVisibleRowsChange", 7);
    this.mxRowMove = createEvent(this, "mxRowMove", 7);
    this.hasDefaultSlot = false;
    this.hasSearch = false;
    this.hasFilter = false;
    this.hasFooter = false;
    this.showOperationsBar = false;
    this.autoWidth = false;
    this.checkable = false;
    this.checkOnRowClick = false;
    this.columns = [];
    this.disableNextPage = false;
    this.disablePagination = false;
    this.draggableRows = false;
    this.getGroupByHeading = undefined;
    this.getMultiRowActions = undefined;
    this.getRowActions = undefined;
    this.getRowId = undefined;
    this.groupBy = null;
    this.hoverable = true;
    this.mobileSearchOnTop = false;
    this.mutateOnDrag = true;
    this.operationsBarClass = '';
    this.page = 1;
    this.paginate = true;
    this.progressAppearDelay = 0;
    this.progressValue = null;
    this.rows = [];
    this.rowsPerPage = 10;
    this.rowsPerPageOptions = undefined;
    this.serverPaginate = false;
    this.showCheckAll = true;
    this.showProgressBar = false;
    this.sortAscending = true;
    this.sortBy = undefined;
    this.totalRows = undefined;
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
    this.dragRowEl = e.target.closest('mx-table-row');
    // Cache height of row (including any nested rows)
    this.dragRowElHeight = await this.dragRowEl.getHeight();
    // Get all rows that are affected by dragging this one (i.e. the same parent node)
    this.dragRowElSiblings = Array.from(this.dragRowEl.parentNode.children).filter(c => c.tagName === 'MX-TABLE-ROW');
    this.dragRowElIndex = this.dragRowElSiblings.indexOf(this.dragRowEl);
    this.dragOverRowElIndex = this.dragRowElIndex;
    this.dragMoveHandler = this.onDragMove.bind(this);
    // Add transitions to the rows
    this.dragRowElSiblings.forEach(async (row) => {
      if (!e.detail.isKeyboard && row === this.dragRowEl)
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
    if (direction === -1 && this.dragOverRowElIndex === 0)
      return; // Row is at the top
    if (direction === 1 && this.dragOverRowElIndex === this.dragRowElSiblings.length - 1)
      return; // Row is at the bottom
    this.dragOverRowElIndex += direction;
    // Determine the translate distance based on sibling row heights
    let translateY = 0;
    let rowIndex = this.dragOverRowElIndex;
    while (rowIndex !== this.dragRowElIndex) {
      const translateDir = this.dragOverRowElIndex > this.dragRowElIndex ? 1 : -1;
      translateY += (await this.dragRowElSiblings[rowIndex].getHeight()) * translateDir;
      rowIndex -= translateDir;
    }
    this.dragRowEl.translateRow(0, translateY);
    this.dragOverRowEl = this.dragRowElSiblings[this.dragOverRowElIndex];
    this.onDragMove();
  }
  async onMxRowDragEnd(e) {
    document.removeEventListener('mousemove', this.dragMoveHandler);
    document.removeEventListener('touchmove', this.dragMoveHandler);
    if (!e.detail.isCancel && this.dragOverRowElIndex !== this.dragRowElIndex) {
      // If row was dragged to a new position AND dragging wasn't cancelled,
      // mutate the rows array (if applicable) and emit the mxRowMove event
      if (this.rows && this.mutateOnDrag)
        this.reorderRowsArray();
      if (e.detail.isKeyboard) {
        // Focus the handle at the element's new index
        requestAnimationFrame(() => {
          const reorderedDragRowSiblings = Array.from(this.dragRowEl.parentNode.children).filter(c => c.tagName === 'MX-TABLE-ROW');
          reorderedDragRowSiblings[this.dragOverRowElIndex].focusDragHandle();
        });
      }
    }
    // Remove transitions and transforms from rows
    requestAnimationFrame(() => {
      this.dragRowElSiblings.forEach(async (row) => {
        (await row.getChildren()).forEach((rowChild) => {
          rowChild.classList.remove('transition-transform', 'pointer-events-none');
          rowChild.style.transform = '';
        });
      });
    });
    document.body.style.cursor = '';
    // If mutating the rows prop, wait a frame for Stencil to update the property on the element
    if (this.rows && this.mutateOnDrag)
      await new Promise(requestAnimationFrame);
    this.mxRowMove.emit({
      rowId: this.dragRowEl.rowId,
      parentRowId: (this.dragRowEl.parentElement.closest('mx-table-row') || {}).rowId,
      oldIndex: this.dragRowEl.rowIndex == null ? this.dragRowElIndex : this.dragRowEl.rowIndex,
      newIndex: this.dragOverRowEl.rowIndex == null ? this.dragOverRowElIndex : this.dragOverRowEl.rowIndex,
    });
    this.dragRowElIndex = null;
  }
  onVisibleRowsChange() {
    this.getTableRows().forEach(row => row.collapse(true));
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
    const willCheckAll = this.checkedRowIds.length === 0;
    if (willCheckAll) {
      this.checkAll();
    }
    else {
      this.checkNone();
    }
    this.mxRowCheck.emit(this.checkedRowIds);
    this.mxCheckAll.emit(willCheckAll);
  }
  /** Animate table rows while dragging a row */
  onDragMove(e) {
    requestAnimationFrame(() => {
      if (this.dragRowEl == null)
        return;
      this.dragRowElSiblings.forEach(async (row, rowIndex) => {
        const rowChildren = await row.getChildren();
        const { top } = getPageRect(rowChildren[0]);
        const { bottom } = getPageRect(rowChildren[rowChildren.length - 1]);
        if (e) {
          const { pageY } = getCursorCoords(e);
          if (pageY >= top && pageY <= bottom) {
            this.dragOverRowEl = row;
            this.dragOverRowElIndex = rowIndex;
          }
        }
        if (row === this.dragRowEl)
          return; // Do not shift row that is being dragged
        if (rowIndex <= this.dragOverRowElIndex && rowIndex > this.dragRowElIndex) {
          // Shift rows that are below the dragged row UP
          rowChildren.forEach(child => (child.style.transform = `translateY(-${this.dragRowElHeight}px)`));
        }
        else if (rowIndex >= this.dragOverRowElIndex && rowIndex < this.dragRowElIndex) {
          // Shift rows that are above the dragged row DOWN
          rowChildren.forEach(child => (child.style.transform = `translateY(${this.dragRowElHeight}px)`));
        }
        else {
          rowChildren.forEach(child => (child.style.transform = ''));
        }
      });
    });
  }
  async reorderRowsArray() {
    const draggedRowIndexes = [];
    if (this.dragRowEl.rowIndex != null)
      draggedRowIndexes.push(this.dragRowEl.rowIndex);
    draggedRowIndexes.push(...(await this.dragRowEl.getNestedRowIndexes()));
    if (draggedRowIndexes.length) {
      const reorderedRows = this.groupedRows.slice();
      draggedRowIndexes.reverse();
      let spliceIndex = this.dragOverRowEl.rowIndex;
      if (spliceIndex == null) {
        const targetNestedRowIndexes = await this.dragOverRowEl.getNestedRowIndexes();
        // Splice above top row in group OR below last row depending on drag direction
        const draggedDownward = draggedRowIndexes[0] < targetNestedRowIndexes[0];
        spliceIndex = draggedDownward
          ? targetNestedRowIndexes[targetNestedRowIndexes.length - 1]
          : targetNestedRowIndexes[0];
        if (draggedDownward)
          draggedRowIndexes.reverse();
      }
      const draggedRows = draggedRowIndexes.map(index => this.groupedRows[index]);
      draggedRows.forEach(draggedRow => {
        reorderedRows.splice(reorderedRows.indexOf(draggedRow), 1)[0];
        reorderedRows.splice(spliceIndex, 0, draggedRow);
      });
      this.rows = reorderedRows;
    }
  }
  setCellProps() {
    const rows = this.getTableRows();
    rows.forEach((row) => {
      if (row.subheader)
        return;
      const cells = row.querySelectorAll('mx-table-cell:not(mx-table-row mx-table-row mx-table-cell)');
      let colIndex = 0;
      cells.forEach((cell) => {
        cell.columnIndex = colIndex;
        cell.isExposedMobileColumn = colIndex === this.exposedMobileColumnIndex;
        if (this.cols[colIndex]) {
          cell.heading = this.cols[colIndex].heading;
          cell.classList.add(...this.getAlignClasses(this.cols[colIndex]));
          if (this.cols[colIndex].cellClass)
            cell.classList.add(this.cols[colIndex].cellClass);
        }
        else {
          console.error(`Column definition not found for column index ${colIndex}. Check that all rows have the same number of columns.`);
        }
        if (colIndex === this.cols.length - 1)
          colIndex = 0;
        else
          colIndex++;
      });
    });
  }
  getRowGroup(row) {
    if (row[this.groupBy] == null)
      return null; // one group for both `undefined` and `null`
    return row[this.groupBy];
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
    this.hasFooter = !!this.element.querySelector('[slot="footer"]');
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
    this.setLastRowClass();
  }
  componentDidLoad() {
    // Emit paginated rows right away.
    this.onVisibleRowsChange();
    if (!this.columns.length)
      console.warn('No "columns" prop was provided.');
    else if (this.columns.length !== this.cols.length)
      console.warn(`The number of columns in the "columns" prop does not match the number of columns in the table.`);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  get cols() {
    // If `columns` prop is not provided, but `rows` prop is provided, create a column for each row object property
    let cols = this.columns;
    if (!cols.length && this.rows.length && !this.hasDefaultSlot) {
      return Object.keys(this.rows[0]).map(property => ({ property, heading: capitalize(property), sortable: true }));
    }
    else if (this.hasDefaultSlot) {
      // If `columns` prop is missing or does not have enough defintions for all columns, add default columns
      const rows = this.getTableRows().filter(row => !row.subheader);
      if (rows.length) {
        const cellCount = rows[0].querySelectorAll('mx-table-cell:not(mx-table-row mx-table-row mx-table-cell)').length;
        if (cellCount !== cols.length) {
          cols = cols.concat(new Array(cellCount).fill({})).slice(0, cellCount);
        }
      }
    }
    return cols.map(col => (Object.assign(Object.assign({}, col), { sortable: col.sortable === false ? false : true })));
  }
  get exposedMobileColumn() {
    return this.cols[this.exposedMobileColumnIndex] || {};
  }
  get uniqueGroups() {
    if (!this.groupBy || !this.rows.length)
      return [];
    const groups = this.rows.map(row => this.getRowGroup(row));
    return [...new Set(groups)]; // remove duplicates
  }
  get groupedRows() {
    if (!this.groupBy)
      return this.rows;
    const groupedRows = [];
    // Group rows based on the order of `uniqueGroups` (the order in which the groups first appear)
    this.uniqueGroups.forEach(group => {
      const rowsInGroup = this.rows.filter(row => {
        if (row[this.groupBy] == null && group === null)
          return true;
        return row[this.groupBy] === group;
      });
      groupedRows.push(...rowsInGroup);
    });
    return groupedRows;
  }
  get visibleRows() {
    if (this.serverPaginate || (!this.paginate && !this.sortBy))
      return this.groupedRows;
    const offset = (this.page - 1) * this.rowsPerPage;
    let rows = this.groupedRows.slice();
    if (this.sortBy)
      this.sortRows(rows);
    rows = rows.slice(offset, offset + this.rowsPerPage);
    return rows;
  }
  get visibleGroups() {
    return [...new Set(this.visibleRows.map(row => this.getRowGroup(row)))];
  }
  get allRowsChecked() {
    if (this.checkedRowIds.length === 0)
      return false;
    if (this.rows && this.rows.length) {
      return this.rows.length === this.checkedRowIds.length;
    }
    else if (this.hasDefaultSlot) {
      return this.getTableRows().length === this.checkedRowIds.length;
    }
    return false;
  }
  get someRowsChecked() {
    if (this.checkedRowIds.length === 0)
      return false;
    if (this.rows && this.rows.length) {
      return this.checkedRowIds.length < this.rows.length;
    }
    else if (this.hasDefaultSlot) {
      return this.checkedRowIds.length < this.getTableRows().length;
    }
    return false;
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
        gridTemplateColumns: 'auto 1fr auto',
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
      return { minWidth: '240px', gridColumnStart: '-1' };
    }
    else if (!(this.checkable && this.showCheckAll) || this.mobileSearchOnTop) {
      // If no checkbox on mobile OR using search-on-top layout, span the entire first grid row
      return { width: '100%', gridColumnStart: '1', gridColumnEnd: '-1' };
    }
    else {
      // If checkbox on mobile, span remaining space in first grid row
      return { width: '100%', gridColumnStart: '2' };
    }
  }
  get checkAllClass() {
    let str = 'col-start-1 flex items-center min-h-36 space-x-16';
    // Move to second row for search-on-top layout
    if (this.mobileSearchOnTop && this.hasSearch)
      str += ' row-start-2 sm:row-start-auto';
    return str;
  }
  get filterClass() {
    let str = 'flex items-center overflow-hidden flex-wrap row-start-2 sm:row-start-auto sm:col-span-1 ';
    // Move to second column if using search-on-top layout and check-all checkbox is in first column
    str += this.mobileSearchOnTop && this.checkable && this.showCheckAll ? 'col-start-2' : 'col-span-full';
    return str;
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
  get navigableColumnIndexes() {
    // Exclude indexes for columns marked as action columns
    return this.cols.map((col, i) => (!col.isActionColumn ? i : null)).filter(i => i !== null);
  }
  get isPreviousColumnDisabled() {
    return this.navigableColumnIndexes[0] === this.exposedMobileColumnIndex;
  }
  get isNextColumnDisabled() {
    return this.navigableColumnIndexes[this.navigableColumnIndexes.length - 1] === this.exposedMobileColumnIndex;
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
    let str = 'flex items-center subtitle2 py-18 ' + this.getAlignClasses(col).join(' ');
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
    let str = 'inline-flex items-center ml-8 transform scale-75';
    if (col.property !== this.sortBy)
      str += ' opacity-30 sm:opacity-0 sm:group-hover:opacity-30 rotate-180';
    else if (this.sortAscending)
      str += ' rotate-180';
    return str;
  }
  getAlignClasses(col) {
    const classes = [];
    // Non-action columns should always be left-aligned on mobile
    if (!col.isActionColumn)
      classes.push('justify-start');
    const alignment = col.align || (col.type === 'number' ? 'right' : 'left');
    let desktopClass;
    if (alignment === 'right')
      desktopClass = 'justify-end';
    else if (alignment === 'center')
      desktopClass = 'justify-center';
    // For non-action columns, only apply alignment class on larger screens
    if (desktopClass && !col.isActionColumn)
      desktopClass = 'sm:' + desktopClass;
    if (desktopClass)
      classes.push(desktopClass);
    return classes;
  }
  getRowJsx(row, rowIndex) {
    return (h("mx-table-row", { "row-id": this.getRowId ? this.getRowId(row) : null, "row-index": rowIndex, actions: this.getRowActions ? this.getRowActions(row) : undefined }, this.cols.map((col) => (h("mx-table-cell", null, h("span", { innerHTML: this.getCellValue(row, col, rowIndex) }))))));
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
  async changeExposedColumnIndex(delta) {
    if (this.isPreviousColumnDisabled && delta === -1)
      return;
    if (this.isNextColumnDisabled && delta === 1)
      return;
    const navigableColumnIndex = this.navigableColumnIndexes.indexOf(this.exposedMobileColumnIndex);
    this.exposedMobileColumnIndex = this.navigableColumnIndexes[navigableColumnIndex + delta];
    await new Promise(requestAnimationFrame);
    const rows = this.element.querySelectorAll('mx-table-row');
    // Force update rows since the collapsed height may have changed.
    rows.forEach(forceUpdate);
  }
  onMxPageChange(e) {
    if (this.serverPaginate)
      return;
    this.page = e.detail.page;
    this.rowsPerPage = e.detail.rowsPerPage;
  }
  setLastRowClass() {
    if (this.paginate || this.hasFooter)
      return;
    const rows = this.getTableRows().filter(row => row.getAttribute('aria-hidden') !== 'true');
    rows.forEach((row, i) => {
      const addOrRemove = i === rows.length - 1 ? 'add' : 'remove';
      row.classList[addOrRemove]('last-row');
    });
  }
  render() {
    const checkAllCheckbox = this.checkable && this.showCheckAll && (h("mx-checkbox", { checked: this.allRowsChecked, class: this.showOperationsBar ? 'ml-24' : 'pr-4', indeterminate: this.someRowsChecked, onClick: this.onCheckAllClick.bind(this), "label-name": "Select all rows", "data-testid": "check-all-checkbox", "hide-label": true }));
    let multiRowActionUI;
    if (this.checkable && this.multiRowActions.length) {
      multiRowActionUI =
        this.multiRowActions.length === 1 ? (
        // Multi-Row Action Button
        h("mx-button", Object.assign({ "data-testid": "multi-action-button", "btn-type": "outlined" }, this.multiRowActions[0], { class: 'whitespace-nowrap' + (!this.checkedRowIds.length ? ' invisible' : ''), "aria-hidden": this.checkedRowIds.length === 0 ? 'true' : null }), this.multiRowActions[0].value)) : (
        // Multi-Row Action Menu
        h("span", { class: !this.checkedRowIds.length ? 'invisible' : null, "aria-hidden": this.checkedRowIds.length === 0 ? 'true' : null }, h("mx-button", { ref: el => (this.actionMenuButton = el), "btn-type": "text", dropdown: true }, h("span", { class: "h-full flex items-center px-2" }, h("i", { class: "mds-gear text-icon" }), h("span", { class: "sr-only" }, "Action Menu"))), h("mx-menu", { "data-testid": "multi-action-menu", ref: el => (this.actionMenu = el), onMxClose: e => e.stopPropagation() }, this.multiRowActions.map(action => (h("mx-menu-item", Object.assign({}, action), action.value))))));
    }
    const operationsBar = (h("div", { class: ['grid gap-x-16 gap-y-12 pb-12', this.operationsBarClass].join(' '), style: this.operationsBarStyle }, this.checkable && this.showCheckAll && (h("div", { class: this.checkAllClass, "data-testid": "check-all-grid-item" }, checkAllCheckbox, multiRowActionUI)), this.hasFilter && (h("div", { class: this.filterClass, "data-testid": "filter-grid-item" }, h("slot", { name: "filter" }))), this.hasSearch && (h("div", { class: "justify-self-end", style: this.searchStyle, "data-testid": "search-grid-item" }, h("slot", { name: "search" })))));
    let generatedRows = [];
    if (!this.hasDefaultSlot && !this.groupBy && this.groupedRows.length) {
      generatedRows = this.visibleRows.map(row => {
        const index = this.rows.indexOf(row);
        return this.getRowJsx(row, index);
      });
    }
    else if (!this.hasDefaultSlot && this.groupBy) {
      generatedRows = this.visibleGroups.map(group => {
        const heading = this.getGroupByHeading ? this.getGroupByHeading(group) : group;
        return (h("mx-table-row", { subheader: true, key: group }, h("mx-table-cell", null, heading), this.visibleRows
          .filter(row => this.getRowGroup(row) === group)
          .map(row => {
          const index = this.groupedRows.indexOf(row);
          return this.getRowJsx(row, index);
        })));
      });
    }
    return (h(Host, { class: 'mx-table block text-4' + (this.hoverable ? ' hoverable' : '') }, this.showOperationsBar && operationsBar, h("div", { "data-testid": "grid", role: "grid", class: "table-grid relative", style: this.gridStyle }, h("div", { class: "header-row", role: "row" }, this.minWidths.sm ? (
    // Non-Mobile Column Headers
    this.cols.map((col, colIndex) => {
      return (h("div", { id: `column-header-${colIndex}`, role: "columnheader", class: this.getHeaderClass(col, colIndex), onClick: this.onHeaderClick.bind(this, col) }, colIndex === 0 && this.minWidths.sm && !this.showOperationsBar && checkAllCheckbox, h("div", { class: "inline-flex items-center overflow-hidden whitespace-nowrap select-none" }, col.heading && h("span", { class: "truncate flex-shrink", innerHTML: col.heading }), !col.heading && h("span", { class: "sr-only" }, col.isActionColumn ? 'Action' : col.property), !this.draggableRows && col.sortable && col.property && (h("div", { class: this.getHeaderArrowClass(col), "data-testid": "arrow" }, h("i", { class: "mds-arrow-triangle-down text-icon" }))))));
    })) : (
    // Mobile Column Header Navigation
    h("div", { class: "flex items-stretch" }, !this.showOperationsBar && checkAllCheckbox, h("div", { id: `column-header-${this.exposedMobileColumnIndex}`, role: "columnheader", class: this.getHeaderClass(this.exposedMobileColumn, this.exposedMobileColumnIndex), onClick: this.onHeaderClick.bind(this, this.exposedMobileColumn) }, h("div", { class: "inline-flex items-center overflow-hidden whitespace-nowrap select-none" }, h("span", { class: "truncate flex-shrink", innerHTML: this.exposedMobileColumn.heading }), !this.draggableRows && this.exposedMobileColumn.sortable && this.exposedMobileColumn.property && (h("div", { class: this.getHeaderArrowClass(this.exposedMobileColumn), "data-testid": "arrow" }, h("i", { class: "mds-arrow-triangle-down text-icon" }))))), this.columns.length >= 2 && (h("div", { class: "flex items-center" }, h("mx-icon-button", { "data-testid": "previous-column-button", chevronLeft: true, disabled: this.isPreviousColumnDisabled, onClick: this.changeExposedColumnIndex.bind(this, -1) }), h("mx-icon-button", { "data-testid": "next-column-button", chevronRight: true, disabled: this.isNextColumnDisabled, onClick: this.changeExposedColumnIndex.bind(this, 1) }))))), this.minWidths.sm && this.hasActionsColumn && h("div", null)), this.showProgressBar && (h("div", null, h("div", { class: "block h-0 col-span-full" }, h("mx-linear-progress", { class: "transform -translate-y-1/2", value: this.progressValue, "appear-delay": this.progressAppearDelay })))), h("slot", null), !this.hasDefaultSlot && h("div", null, generatedRows), h("div", { "data-testid": "empty-state", class: this.emptyStateClass }, h("div", { class: "col-span-full p-16 text-4" }, h("slot", { name: "empty-state" }, h("span", null, "No results found.")))), this.hasFooter && (h("div", { "data-testid": "table-footer", class: "table-footer" }, h("div", { class: "col-span-full px-24 py-16 text-4" }, h("slot", { name: "footer" })))), this.paginate && (
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
