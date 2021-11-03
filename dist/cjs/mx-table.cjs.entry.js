'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c246f020.js');
const minWidthSync = require('./minWidthSync-93e92215.js');
const utils = require('./utils-1f7ef40d.js');
const arrowTriangleDown = require('./arrow-triangle-down-a4cc75c3.js');

const gearSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" fill="#333333"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.95058 1.96137C9.16383 1.8994 9.38813 1.88522 9.6075 1.91982C9.82576 1.95425 10.0338 2.03613 10.2169 2.15968L11.4772 2.9998H12.523L13.7833 2.15968C13.9664 2.03615 14.1744 1.95428 14.3927 1.91986C14.6121 1.88527 14.8364 1.89946 15.0496 1.96144L15.0535 1.96257C16.5923 2.41876 18.0015 3.23235 19.166 4.33691L19.1689 4.33971C19.3292 4.49341 19.4537 4.68057 19.5334 4.88785C19.6127 5.09406 19.6458 5.31514 19.6304 5.5355C19.6303 5.53664 19.6302 5.53779 19.6301 5.53894L19.5329 7.04702L20.0558 7.95276L21.4104 8.62261C21.4115 8.6231 21.4125 8.62359 21.4135 8.62409C21.612 8.72093 21.787 8.86015 21.9259 9.03197C22.0656 9.20465 22.1654 9.406 22.2184 9.62167L22.2193 9.62558C22.5937 11.1864 22.5937 12.8135 22.2193 14.3743L22.2184 14.3782C22.1654 14.5939 22.0656 14.7952 21.9259 14.9679C21.787 15.1397 21.612 15.279 21.4134 15.3758C21.4124 15.3763 21.4114 15.3768 21.4104 15.3773L20.0558 16.0471L19.5329 16.9529L19.6301 18.4609C19.6301 18.4621 19.6302 18.4632 19.6303 18.4644C19.6457 18.6847 19.6126 18.9058 19.5333 19.112C19.4536 19.3193 19.3291 19.5064 19.1688 19.6601L19.1659 19.6629C18.0014 20.7675 16.5922 21.5811 15.0534 22.0373L15.0495 22.0384C14.8363 22.1004 14.612 22.1146 14.3926 22.08C14.1743 22.0455 13.9663 21.9637 13.7832 21.8401C13.7822 21.8395 13.7813 21.8388 13.7803 21.8382L12.5229 21H11.4771L10.2197 21.8382C10.2188 21.8388 10.2179 21.8394 10.217 21.84C10.0338 21.9636 9.8257 22.0455 9.6074 22.0799C9.38804 22.1145 9.16374 22.1003 8.95047 22.0383L8.94661 22.0372C7.40778 21.581 5.99861 20.7674 4.83411 19.6629L4.83117 19.6601C4.67087 19.5064 4.54643 19.3192 4.46672 19.1119C4.38741 18.9057 4.3543 18.6846 4.36972 18.4642L4.46717 16.9528L3.94424 16.047L2.58663 15.3757C2.38804 15.2789 2.21311 15.1396 2.07417 14.9678C1.93452 14.7951 1.83467 14.5938 1.78171 14.3781L1.78075 14.3742C1.40642 12.8134 1.40642 11.1863 1.78074 9.62551L1.78169 9.62155C1.83466 9.40588 1.93453 9.20454 2.07418 9.03187C2.21312 8.86007 2.38804 8.72086 2.5866 8.62402L3.9443 7.95267L4.46723 7.04693L4.3698 5.53551C4.35438 5.31512 4.38749 5.09402 4.46681 4.8878C4.54653 4.68052 4.67098 4.49336 4.83128 4.33967L4.83419 4.33688C5.99868 3.23231 7.40784 2.41873 8.94667 1.96252L8.95058 1.96137ZM9.36956 3.40168C8.05996 3.79052 6.86062 4.48298 5.86908 5.42272C5.8681 5.42374 5.86733 5.42495 5.86682 5.42627C5.86626 5.42773 5.86603 5.4293 5.86614 5.43086L5.86656 5.43663L5.97873 7.17704C5.98826 7.32479 5.95383 7.47206 5.8798 7.60028L5.1298 8.89932C5.05577 9.02755 4.94544 9.131 4.81272 9.19662L3.24415 9.97224C3.24273 9.97293 3.24148 9.9739 3.24049 9.97512C3.2396 9.97622 3.23893 9.97749 3.23854 9.97886C2.9205 11.3074 2.92049 12.6922 3.23853 14.0207C3.23892 14.0222 3.23959 14.0235 3.24051 14.0246C3.2415 14.0258 3.24274 14.0268 3.24415 14.0275L3.24935 14.03L4.81266 14.8031C4.94539 14.8687 5.05571 14.9721 5.12974 15.1004L5.87974 16.3994C5.95378 16.5276 5.9882 16.6749 5.97867 16.8227L5.86609 18.5689C5.86598 18.5705 5.86619 18.572 5.86675 18.5735C5.86726 18.5748 5.86802 18.576 5.869 18.5771C6.86059 19.5168 8.06 20.2093 9.36967 20.5981C9.37099 20.5984 9.37237 20.5984 9.37373 20.5982C9.37457 20.5981 9.37539 20.5979 9.37617 20.5975C9.37683 20.5973 9.37745 20.5969 9.37805 20.5965L9.38283 20.5933L10.834 19.6259C10.9572 19.5438 11.1019 19.5 11.25 19.5H12.75C12.8981 19.5 13.0428 19.5438 13.166 19.6259L14.622 20.5966C14.6233 20.5974 14.6248 20.598 14.6263 20.5983C14.6277 20.5985 14.6291 20.5984 14.6305 20.5981C15.9401 20.2093 17.1394 19.5169 18.1309 18.5772C18.1319 18.5761 18.1327 18.5749 18.1333 18.5735C18.1338 18.5721 18.1341 18.5705 18.1339 18.5689L18.1335 18.5632L18.0214 16.8228C18.0118 16.675 18.0463 16.5277 18.1203 16.3995L18.8703 15.1005C18.9443 14.9722 19.0546 14.8688 19.1874 14.8032L20.7559 14.0276C20.7574 14.0269 20.7586 14.0259 20.7596 14.0247C20.7602 14.024 20.7606 14.0232 20.761 14.0225M20.7616 14.0209C21.0799 12.6912 21.0796 11.3051 20.7607 9.97543L21.49 9.80051L20.7616 9.97934C20.7613 9.97782 20.7606 9.97639 20.7596 9.97518C20.7586 9.97396 20.7574 9.97297 20.7559 9.97229L20.7507 9.96977L19.1874 9.19671C19.0547 9.13108 18.9444 9.02764 18.8703 8.89941L18.1203 7.60037C18.0463 7.47214 18.0119 7.32487 18.0214 7.17712L18.134 5.43088C18.1341 5.42931 18.1339 5.42774 18.1333 5.42628C18.1328 5.42495 18.1321 5.42374 18.1311 5.42272C17.1387 4.48217 15.9381 3.78935 14.6271 3.40071L14.8403 2.68164L14.631 3.40184C14.6295 3.40141 14.6279 3.40131 14.6264 3.40155C14.6248 3.40179 14.6233 3.40238 14.622 3.40326L14.6173 3.4065L13.1661 4.37384C13.0429 4.45597 12.8982 4.4998 12.7501 4.4998H11.2501C11.102 4.4998 10.9573 4.45597 10.8341 4.37384L9.3781 3.40323C9.37679 3.40234 9.37533 3.40174 9.37378 3.4015C9.37237 3.40128 9.37094 3.40134 9.36956 3.40168" fill="currentColor"/>
</svg>
`;

const MxTable = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxSortChange = index.createEvent(this, "mxSortChange", 7);
    this.mxRowCheck = index.createEvent(this, "mxRowCheck", 7);
    this.mxVisibleRowsChange = index.createEvent(this, "mxVisibleRowsChange", 7);
    this.mxRowMove = index.createEvent(this, "mxRowMove", 7);
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
    this.minWidths = new minWidthSync.MinWidths();
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
        const { top } = utils.getPageRect(rowChildren[0]);
        const { bottom } = utils.getPageRect(rowChildren[rowChildren.length - 1]);
        if (e) {
          const { pageY } = utils.getCursorCoords(e);
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
    const rows = this.getTableRows();
    rows.forEach((row) => {
      if (row.subheader)
        return;
      const cells = row.querySelectorAll('mx-table-cell');
      let colIndex = 0;
      cells.forEach((cell) => {
        cell.columnIndex = colIndex;
        cell.isExposedMobileColumn = colIndex === this.exposedMobileColumnIndex;
        cell.heading = this.cols[colIndex].heading;
        cell.classList.add(...this.getAlignClasses(this.cols[colIndex]));
        if (this.cols[colIndex].cellClass)
          cell.classList.add(this.cols[colIndex].cellClass);
        if (colIndex === this.cols.length - 1)
          colIndex = 0;
        else
          colIndex++;
      });
    });
  }
  setRowsChecked() {
    this.getTableRows().forEach(row => (row.checked = this.checkedRowIds.includes(row.rowId)));
  }
  connectedCallback() {
    minWidthSync.minWidthSync.subscribeComponent(this);
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
    const rows = this.getTableRows();
    if (!this.paginate) {
      rows.forEach((row, i) => {
        const addOrRemove = i === rows.length - 1 ? 'add' : 'remove';
        row.classList[addOrRemove]('last-row');
      });
    }
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
    minWidthSync.minWidthSync.unsubscribeComponent(this);
  }
  get cols() {
    // If `columns` prop is not provided, create a column for each row object property
    if (!this.columns.length && this.rows.length) {
      return Object.keys(this.rows[0]).map(property => ({ property, heading: utils.capitalize(property), sortable: true }));
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
    if (['date', 'dateTime'].includes(col.type) || utils.isDateObject(val))
      return -new Date(val).getTime();
    if (col.type === 'boolean')
      return val ? 1 : 0;
    return val;
  }
  getCellValue(row, col, rowIndex) {
    if (col.getValue)
      return col.getValue(row, rowIndex);
    const val = row[col.property];
    if (col.type === 'date' || utils.isDateObject(val))
      return new Date(val).toLocaleDateString();
    if (col.type === 'dateTime' || utils.isDateObject(val))
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
    let str = 'ml-12 transform scale-75';
    if (col.property !== this.sortBy)
      str += ' opacity-30 sm:opacity-0 sm:group-hover:opacity-30 rotate-180';
    else if (this.sortAscending)
      str += ' rotate-180';
    return str;
  }
  getAlignClasses(col) {
    let classes = [];
    // Non-action columns should always be left-aligned on mobile
    if (!col.isActionColumn)
      classes.push('justify-start');
    let alignment = col.align || (col.type === 'number' ? 'right' : 'left');
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
    if (this.isPreviousColumnDisabled && delta === -1)
      return;
    if (this.isNextColumnDisabled && delta === 1)
      return;
    const navigableColumnIndex = this.navigableColumnIndexes.indexOf(this.exposedMobileColumnIndex);
    this.exposedMobileColumnIndex = this.navigableColumnIndexes[navigableColumnIndex + delta];
  }
  onMxPageChange(e) {
    if (this.serverPaginate)
      return;
    this.page = e.detail.page;
    this.rowsPerPage = e.detail.rowsPerPage;
  }
  render() {
    const checkAllCheckbox = this.checkable && this.showCheckAll && (index.h("mx-checkbox", { checked: this.allRowsChecked, class: this.showOperationsBar ? 'ml-24' : 'pr-4', indeterminate: this.someRowsChecked, onClick: this.onCheckAllClick.bind(this), "label-name": "Select all rows", "hide-label": true }));
    let multiRowActionUI;
    if (this.checkable) {
      multiRowActionUI =
        this.multiRowActions.length === 1 ? (
        // Multi-Row Action Button
        index.h("mx-button", Object.assign({ "data-testid": "multi-action-button", "btn-type": "outlined" }, this.multiRowActions[0], { class: 'whitespace-nowrap' + (!this.checkedRowIds.length ? ' hidden' : '') }), this.multiRowActions[0].value)) : (
        // Multi-Row Action Menu
        index.h("span", { class: !this.checkedRowIds.length ? 'hidden' : null }, index.h("mx-button", { ref: el => (this.actionMenuButton = el), "btn-type": "text", dropdown: true }, index.h("span", { class: "h-full flex items-center px-2" }, index.h("span", { innerHTML: gearSvg }))), index.h("mx-menu", { "data-testid": "multi-action-menu", ref: el => (this.actionMenu = el) }, this.multiRowActions.map(action => (index.h("mx-menu-item", Object.assign({}, action), action.value))))));
    }
    const operationsBar = (index.h("div", { class: "grid gap-x-16 gap-y-12 pb-12", style: this.operationsBarStyle }, this.checkable && this.showCheckAll && (index.h("div", { class: "col-start-1 flex items-center min-h-36 space-x-16" }, checkAllCheckbox, multiRowActionUI)), this.hasFilter && (index.h("div", { class: "flex items-center flex-wrap row-start-2 col-span-full sm:row-start-auto sm:col-span-1" }, index.h("slot", { name: "filter" }))), this.hasSearch && (index.h("div", { class: "justify-self-end", style: this.searchStyle }, index.h("slot", { name: "search" })))));
    return (index.h(index.Host, { class: 'mx-table block text-4' + (this.hoverable ? ' hoverable' : '') }, this.showOperationsBar && operationsBar, index.h("div", { "data-testid": "grid", class: "table-grid relative", style: this.gridStyle }, index.h("div", { class: "header-row" }, this.minWidths.sm ? (
    // Non-Mobile Column Headers
    this.cols.map((col, colIndex) => {
      return (index.h("div", { id: `column-header-${colIndex}`, role: "columnheader", class: this.getHeaderClass(col, colIndex), onClick: this.onHeaderClick.bind(this, col) }, colIndex === 0 && this.minWidths.sm && !this.showOperationsBar && checkAllCheckbox, index.h("div", { class: "inline-flex items-center overflow-hidden whitespace-nowrap select-none" }, index.h("span", { class: "truncate flex-shrink", innerHTML: col.heading }), !this.draggableRows && col.sortable && col.property && (index.h("div", { class: this.getHeaderArrowClass(col), "data-testid": "arrow", innerHTML: arrowTriangleDown.arrowSvg })))));
    })) : (
    // Mobile Column Header Navigation
    index.h("div", { class: "flex items-stretch" }, !this.showOperationsBar && checkAllCheckbox, index.h("div", { id: `column-header-${this.exposedMobileColumnIndex}`, role: "columnheader", class: this.getHeaderClass(this.exposedMobileColumn, this.exposedMobileColumnIndex), onClick: this.onHeaderClick.bind(this, this.exposedMobileColumn) }, index.h("div", { class: "inline-flex items-center overflow-hidden whitespace-nowrap select-none" }, index.h("span", { class: "truncate flex-shrink", innerHTML: this.exposedMobileColumn.heading }), !this.draggableRows && this.exposedMobileColumn.sortable && this.exposedMobileColumn.property && (index.h("div", { class: this.getHeaderArrowClass(this.exposedMobileColumn), "data-testid": "arrow", innerHTML: arrowTriangleDown.arrowSvg })))), this.columns.length >= 2 && (index.h("div", { class: "flex items-center" }, index.h("mx-icon-button", { "data-testid": "previous-column-button", chevronLeft: true, disabled: this.isPreviousColumnDisabled, onClick: this.changeExposedColumnIndex.bind(this, -1) }), index.h("mx-icon-button", { "data-testid": "next-column-button", chevronRight: true, disabled: this.isNextColumnDisabled, onClick: this.changeExposedColumnIndex.bind(this, 1) }))))), this.minWidths.sm && this.hasActionsColumn && index.h("div", null)), this.showProgressBar && (index.h("div", null, index.h("div", { class: "block h-0 col-span-full" }, index.h("mx-linear-progress", { class: "transform -translate-y-1/2", value: this.progressValue, "appear-delay": this.progressAppearDelay })))), index.h("slot", null), !this.hasDefaultSlot && (index.h("div", null, this.visibleRows.map((row, rowIndex) => (
    // Generated Body Rows
    index.h("mx-table-row", { "row-id": this.getRowId ? this.getRowId(row) : null, actions: this.getRowActions ? this.getRowActions(row) : undefined }, this.cols.map((col) => (index.h("mx-table-cell", null, index.h("div", { innerHTML: this.getCellValue(row, col, rowIndex) }))))))))), index.h("div", { "data-testid": "empty-state", class: this.emptyStateClass }, index.h("div", { class: "col-span-full p-16 text-4" }, index.h("slot", { name: "empty-state" }, index.h("span", null, "No results found.")))), this.paginate && (
    // Pagination Row
    index.h("div", { class: "pagination-row" }, index.h("mx-pagination", { page: this.page, "rows-per-page": this.rowsPerPage, rowsPerPageOptions: this.rowsPerPageOptions, "total-rows": this.serverPaginate ? this.totalRows : this.rows.length, class: "col-span-full p-0 rounded-b-2xl", onMxPageChange: this.onMxPageChange.bind(this), disabled: this.disablePagination, disableNextPage: this.disableNextPage }))))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "sortBy": ["onVisibleRowsChange", "resetPage"],
    "sortAscending": ["onVisibleRowsChange", "resetPage"],
    "page": ["onVisibleRowsChange", "onPageChange"],
    "rowsPerPage": ["onVisibleRowsChange", "resetPage"],
    "rows": ["onVisibleRowsChange", "resetPage"]
  }; }
};

exports.mx_table = MxTable;
