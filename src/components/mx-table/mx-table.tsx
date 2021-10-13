import { Component, Host, h, Prop, Element, Event, EventEmitter, Watch, Listen, State, Method } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';
import { capitalize, getCursorCoords, getPageRect, isDateObject } from '../../utils/utils';
import arrowSvg from '../../assets/svg/arrow-triangle-down.svg';
import gearSvg from '../../assets/svg/gear.svg';
import { IMxMenuItemProps } from '../mx-menu-item/mx-menu-item';
import { PageChangeEventDetail } from '../mx-pagination/mx-pagination';

export interface ITableRowAction extends IMxMenuItemProps {
  /** The menu item text for the row action */
  value: string;
}

export type SortChangeEventDetail = {
  sortBy: string;
  sortAscending: boolean;
};

/** Defines a data table column */
export interface ITableColumn {
  /** The property on each row object that will supply the column's cell values (as HTML).
   * You may also supply a `getValue` function for the value.  If both are provided,
   * the `property` will only be used for sorting.
   */
  property?: string;
  /** The displayed column heading */
  heading?: string;
  /** The value type, which may affect sorting and how the value is displayed
   * @default 'string'
   */
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean';
  align?: 'left' | 'center' | 'right';
  /** Whether the column may be sorted by clicking the header.  The column must specify a `property`
   * to be sortable.
   * @default true
   */
  sortable?: boolean;
  /** A getter function for the column cells' inner HTML.
   *
   * Note that a `property` is required to make a column with a value getter sortable.  If sorting
   * client-side, the property does not necessarily have to exist on the row objects; it is simply a
   * unique identifier for the table's `sortBy` prop.
   */
  getValue?: (row: Object, rowIndex?: number) => any;
  /** A custom compare function for sorting by this column (if sorting client-side) */
  sortCompare?: (rowA: Object, rowB: Object) => number;
  /** Additional classes to add to the header cell for this column */
  headerClass?: string;
  /** Additional classes to add to the body cells in this column */
  cellClass?: string;
}

@Component({
  tag: 'mx-table',
  shadow: false,
})
export class MxTable {
  actionMenu: HTMLMxMenuElement;
  actionMenuButton: HTMLMxButtonElement;
  hasDefaultSlot: boolean = false;
  hasSearch: boolean = false;
  hasFilter: boolean = false;
  showOperationsBar: boolean = false;
  dragRowIndex: number;
  dragOverRowIndex: number;
  dragMoveHandler: (e: MouseEvent) => any;

  /** An array of objects that defines the table's dataset. */
  @Prop() rows: Object[] = [];
  /** An array of column definitions.  If not specified, a column will be generated for each property on the row object. */
  @Prop() columns: ITableColumn[] = [];
  /** A function that returns the `rowId` prop for each generated `mx-table-row`.
   * This is only required if the table is `checkable` and is auto-generating rows (not using the default slot). */
  @Prop() getRowId: (row: Object) => string;
  /** Make rows checkable.  You must either provide a `getRowId` getter (for generated rows), or
   * provide a `rowId` for every `mx-table-row` if creating the rows manually in the table's slot. */
  @Prop() checkable: boolean = false;
  /** Set to `false` to prevent checking rows by clicking on them (outside the checkboxes). */
  @Prop() checkOnRowClick: boolean = true;
  /** Set to `false` to hide the (un)check all checkbox at the top of the table. */
  @Prop() showCheckAll: boolean = true;
  /** Enables reordering of rows via drag and drop. */
  @Prop() draggableRows: boolean = false;
  @Prop() hoverable: boolean = true;
  /** Set to `true` to allow smaller tables to shrink to less than 100% width on larger screens */
  @Prop() autoWidth: boolean = false;
  /** The property on the row objects that will be used for sorting */
  @Prop({ mutable: true }) sortBy: string;
  @Prop({ mutable: true }) sortAscending: boolean = true;
  /** Show the pagination component.  Setting this to `false` will show all rows. */
  @Prop() paginate: boolean = true;
  /** The page to display */
  @Prop({ mutable: true }) page: number = 1;
  @Prop({ mutable: true }) rowsPerPage: number = 10;
  /** The total number of unpaginated rows.  This is ignored for client-side pagination.
   * For server-side pagination, omitting this prop will remove the last-page button.
   */
  @Prop() totalRows: number;
  /** Disable the next-page button.  Useful when using server-side pagination and the total number of rows is unknown. */
  @Prop() disableNextPage: boolean = false;
  @Prop() rowsPerPageOptions: number[];
  /** Do not sort or paginate client-side. Use events to send server requests instead. */
  @Prop() serverPaginate: boolean = false;
  @Prop() getRowActions: (row: Object) => ITableRowAction[];
  @Prop() getMultiRowActions: (rows: string[]) => ITableRowAction[];
  /** Show a progress bar below the header row */
  @Prop() showProgressBar: boolean = false;
  /** Disable the pagination buttons (i.e. while loading results) */
  @Prop() disablePagination: boolean = false;
  /** The progress bar percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress bar will be displayed. */
  @Prop() progressValue: number = null;
  /** Delay the appearance of the progress bar for this many milliseconds */
  @Prop() progressAppearDelay: number = 0;

  @State() minWidths = new MinWidths();
  @State() checkedRowIds: string[] = [];
  @State() exposedMobileColumnIndex: number = 0;

  @Element() element: HTMLMxTableElement;

  /** Emitted when a sortable column's header is clicked. */
  @Event() mxSortChange: EventEmitter<SortChangeEventDetail>;
  /** Emitted when a row is (un)checked.  The `Event.detail` will be the array of checked `rowId`s. */
  @Event() mxRowCheck: EventEmitter<string[]>;
  /** Emitted when the sorting, pagination, or rows data changes.
   * The `Event.detail` will contain the sorted, paginated array of visible rows.  This is useful
   * for building a custom row layout via the default slot. */
  @Event() mxVisibleRowsChange: EventEmitter<Object[]>;
  /** Emitted when a row is dragged to a new position.
   * The `Event.detail` object will contain the `rowId` (if set), `oldIndex`, and `newIndex`. */
  @Event() mxRowMove: EventEmitter<any>;

  @Listen('mxCheck')
  onMxCheck(e: CustomEvent) {
    const { rowId, checked } = e.detail;
    if (!checked && this.checkedRowIds.includes(rowId)) {
      this.checkedRowIds = this.checkedRowIds.filter(id => id !== rowId);
    } else if (checked && !this.checkedRowIds.includes(rowId)) {
      this.checkedRowIds = [...this.checkedRowIds, rowId];
    }
    this.mxRowCheck.emit(this.checkedRowIds);
  }

  @Listen('mxRowDragStart')
  onMxRowDragStart(e: CustomEvent) {
    const dragRow = (e.target as HTMLElement).closest('mx-table-row');
    const rows = this.getTableRows();
    this.dragRowIndex = rows.indexOf(dragRow);
    this.dragOverRowIndex = this.dragRowIndex;
    this.dragMoveHandler = this.onDragMove.bind(this);
    // Add transitions to the rows
    rows.forEach(row => {
      if (!e.detail.isKeyboard && row === dragRow) return; // Do not transition a row dragged with a mouse
      Array.from(row.children).forEach((rowChild: HTMLElement) => {
        rowChild.classList.add('transition-transform', 'pointer-events-none');
      });
    });
    if (!e.detail.isKeyboard) {
      document.addEventListener('touchmove', this.dragMoveHandler);
      document.addEventListener('mousemove', this.dragMoveHandler);
    }
  }

  @Listen('mxDragKeyDown')
  onDragKeyDown(e: CustomEvent) {
    let direction: -1 | 1;
    const key = e.detail;
    if (['ArrowUp', 'ArrowLeft'].includes(key)) direction = -1;
    if (['ArrowDown', 'ArrowRight'].includes(key)) direction = 1;
    if (!direction) return;
    if (direction === -1 && this.dragOverRowIndex === 0) return; // Row is at the top
    const rows = this.getTableRows();
    if (direction === 1 && this.dragOverRowIndex === rows.length - 1) return; // Row is at the bottom
    this.dragOverRowIndex += direction;
    const dragRow = rows[this.dragRowIndex];
    const indexDelta = this.dragOverRowIndex - this.dragRowIndex;
    const translateY = (dragRow.children[0] as HTMLElement).offsetHeight * indexDelta;
    dragRow.translateRow(0, translateY);
    this.onDragMove();
  }

  @Listen('mxRowDragEnd')
  onMxRowDragEnd(e: CustomEvent) {
    document.removeEventListener('mousemove', this.dragMoveHandler);
    document.removeEventListener('touchmove', this.dragMoveHandler);
    const rows = this.getTableRows();
    if (!e.detail.isCancel && this.dragOverRowIndex !== this.dragRowIndex) {
      // If row was dragged to a new position AND dragging wasn't cancelled, emit the mxRowMove event
      this.mxRowMove.emit({ rowId: e.detail, oldIndex: this.dragRowIndex, newIndex: this.dragOverRowIndex });
      if (e.detail.isKeyboard) rows[this.dragOverRowIndex].focusDragHandle(); // Focus the handle at the new index
    }
    this.dragRowIndex = null;
    // Remove transitions and transforms from rows
    rows.forEach(row => {
      Array.from(row.children).forEach((rowChild: HTMLElement) => {
        rowChild.classList.remove('transition-transform', 'pointer-events-none');
        rowChild.style.transform = '';
      });
    });
    document.body.style.cursor = '';
  }

  @Watch('sortBy')
  @Watch('sortAscending')
  @Watch('page')
  @Watch('rowsPerPage')
  @Watch('rows')
  onVisibleRowsChange() {
    this.getTableRows().forEach(row => row.collapse());
    this.mxVisibleRowsChange.emit(this.visibleRows);
  }

  @Watch('page')
  onPageChange() {
    // Scroll back to the top of the table on page change (if necessary)
    if (this.element.getBoundingClientRect().top < 0) this.element.scrollIntoView();
  }

  @Watch('sortBy')
  @Watch('sortAscending')
  @Watch('rowsPerPage')
  @Watch('rows')
  resetPage() {
    if (!this.serverPaginate) this.page = 1;
  }

  @Method()
  async getCheckedRowIds(): Promise<string[]> {
    return this.checkedRowIds;
  }

  @Method()
  async setCheckedRowIds(checkedRowIds: string[] = []) {
    this.checkedRowIds = checkedRowIds;
  }

  @Method()
  async checkAll() {
    if (this.getRowId) {
      this.checkedRowIds = this.rows.map(this.getRowId).map(id => id.toString());
    } else {
      this.checkedRowIds = this.getTableRows().map(row => row.rowId);
    }
  }

  @Method()
  async checkNone() {
    this.checkedRowIds = [];
  }

  @State() hasActionsColumnFromSlot: boolean = false;

  getTableRows(): HTMLMxTableRowElement[] {
    return Array.from(this.element.querySelectorAll('mx-table-row') as NodeListOf<HTMLMxTableRowElement>);
  }

  onCheckAllClick(e: InputEvent) {
    e.preventDefault();
    if (this.checkedRowIds.length === 0) {
      this.checkAll();
    } else {
      this.checkNone();
    }
  }

  /** Animate table rows while dragging a row */
  onDragMove(e?: MouseEvent) {
    requestAnimationFrame(() => {
      if (this.dragRowIndex == null) return;
      const rows = this.getTableRows();
      const dragRowHeight = (rows[this.dragRowIndex].children[0] as HTMLElement).offsetHeight;
      rows.forEach((row, rowIndex) => {
        let { top, bottom } = getPageRect(row.children[0] as HTMLElement);
        const rowChildren = Array.from(row.children) as HTMLElement[];
        if (e) {
          const { pageY } = getCursorCoords(e);
          if (pageY >= top && pageY <= bottom) this.dragOverRowIndex = rowIndex;
        }
        if (rowIndex === this.dragRowIndex) return; // Do not shift row that is being dragged
        if (rowIndex <= this.dragOverRowIndex && rowIndex > this.dragRowIndex) {
          // Shift rows that are below the dragged row UP
          rowChildren.forEach(child => (child.style.transform = `translateY(-${dragRowHeight}px)`));
        } else if (rowIndex >= this.dragOverRowIndex && rowIndex < this.dragRowIndex) {
          // Shift rows that are above the dragged row DOWN
          rowChildren.forEach(child => (child.style.transform = `translateY(${dragRowHeight}px)`));
        } else {
          rowChildren.forEach(child => (child.style.transform = ''));
        }
      });
    });
  }

  setCellProps() {
    const cells = this.element.querySelectorAll('mx-table-cell');
    let colIndex = 0;
    cells.forEach((cell: HTMLMxTableCellElement) => {
      cell.columnIndex = colIndex;
      cell.isExposedMobileColumn = colIndex === this.exposedMobileColumnIndex;
      cell.heading = this.cols[colIndex].heading;
      if (colIndex === this.cols.length - 1) colIndex = 0;
      else colIndex++;
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
    if (this.checkable) this.setRowsChecked();
  }

  componentDidLoad() {
    // Emit paginated rows right away.
    this.onVisibleRowsChange();
  }

  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }

  get cols(): ITableColumn[] {
    // If `columns` prop is not provided, create a column for each row object property
    if (!this.columns.length && this.rows.length) {
      return Object.keys(this.rows[0]).map(property => ({ property, heading: capitalize(property), sortable: true }));
    }
    return this.columns.map(col => ({
      ...col,
      sortable: col.sortable === false ? false : true, // Default sortable to true if not specified
    }));
  }

  get exposedMobileColumn(): ITableColumn {
    return this.cols[this.exposedMobileColumnIndex] || {};
  }

  get visibleRows(): Object[] {
    if (this.serverPaginate || (!this.paginate && !this.sortBy)) return this.rows;
    const offset = (this.page - 1) * this.rowsPerPage;
    let rows = this.rows.slice();
    if (this.sortBy) this.sortRows(rows);
    rows = rows.slice(offset, offset + this.rowsPerPage);
    return rows;
  }

  get allRowsChecked(): boolean {
    return this.rows.length && this.rows.length === this.checkedRowIds.length;
  }

  get someRowsChecked(): boolean {
    return this.checkedRowIds.length > 0 && this.checkedRowIds.length < this.rows.length;
  }

  get multiRowActions(): ITableRowAction[] {
    if (!this.getMultiRowActions) return [];
    return this.getMultiRowActions(this.checkedRowIds);
  }

  get hasActionsColumn(): boolean {
    return !!this.getRowActions || this.hasActionsColumnFromSlot;
  }

  get operationsBarStyle(): any {
    if (this.minWidths.sm) {
      // On larger screens, use a three-column grid
      return {
        gridTemplateColumns: 'max-content 1fr max-content',
      };
    } else if (this.checkable && this.showCheckAll) {
      // If checkbox on mobile, use a two-column grid
      return {
        gridTemplateColumns: 'minmax(0, max-content) 1fr',
      };
    } else {
      // If no checkbox on mobile, use a single column
      return {
        gridTemplateColumns: '1fr',
      };
    }
  }

  get searchStyle(): any {
    if (this.minWidths.sm) {
      // On larger screens, place in last column of first grid row
      return { width: '240px', gridColumnStart: '-1' };
    } else if (!(this.checkable && this.showCheckAll)) {
      // If no checkbox on mobile, span the entire first grid row
      return { width: '100%', gridColumnStart: '1' };
    } else {
      // If checkbox on mobile, span remaining space in first grid row (up to 240px)
      return { width: '100%', maxWidth: '240px', gridColumnStart: '2' };
    }
  }

  get gridStyle(): any {
    if (!this.minWidths.sm) return { display: 'flex', flexDirection: 'column' };
    const display = this.autoWidth ? 'inline-grid' : 'grid';
    let gridTemplateColumns = this.checkable ? 'minmax(0, 48px) ' : '';
    if (this.draggableRows) gridTemplateColumns += 'minmax(0, 48px) ';
    const autoColumnCount = this.cols.length + (this.hasActionsColumn ? 1 : 0);
    gridTemplateColumns += `repeat(${autoColumnCount}, minmax(0, auto))`;
    return { display, gridTemplateColumns };
  }

  sortRows(rows: Object[]) {
    const sortByColumn = this.cols.find(c => c.property === this.sortBy);
    if (!sortByColumn) return;
    let sortCompare = sortByColumn.sortCompare;
    if (!sortCompare) {
      sortCompare = (a, b) => {
        const valueA = this.getCellSortableValue(a, sortByColumn);
        const valueB = this.getCellSortableValue(b, sortByColumn);
        if (typeof valueA === 'number' && typeof valueB === 'number') return valueA - valueB;
        return (valueA as string).localeCompare(valueB as string);
      };
    }
    rows.sort(sortCompare);
    if (!this.sortAscending) rows.reverse();
  }

  getCellSortableValue(row: Object, col: ITableColumn): string | number {
    if (col.getValue) return col.getValue(row);
    const val = row[col.property];
    if (['date', 'dateTime'].includes(col.type) || isDateObject(val)) return -new Date(val).getTime();
    if (col.type === 'boolean') return val ? 1 : 0;
    return val;
  }

  getCellValue(row: Object, col: ITableColumn, rowIndex: number) {
    if (col.getValue) return col.getValue(row, rowIndex);
    const val = row[col.property];
    if (col.type === 'date' || isDateObject(val)) return new Date(val).toLocaleDateString();
    if (col.type === 'dateTime' || isDateObject(val)) return new Date(val).toLocaleString();
    if (col.type === 'boolean') return val ? 'Yes' : '';
    return val;
  }

  getHeaderClass(col: ITableColumn, colIndex: number) {
    if (!col) return '';
    let str = 'flex items-center subtitle2 py-18 ' + this.getAlignClass(col);
    str += this.minWidths.sm ? ' px-16' : ' flex-1';
    const isCheckAllInHeader = this.showCheckAll && !this.showOperationsBar;
    let firstColSpan = 1;
    if (this.minWidths.sm && colIndex === 0 && this.draggableRows) firstColSpan++;
    if (this.minWidths.sm && colIndex === 0 && this.checkable && !isCheckAllInHeader) firstColSpan++;
    str += ' col-span-' + firstColSpan;
    if (!this.minWidths.sm && colIndex === this.exposedMobileColumnIndex && this.checkable && isCheckAllInHeader)
      str += ' px-16';
    if (!this.draggableRows && col.sortable && col.property) str += ' group cursor-pointer';
    if (col.headerClass) str += col.headerClass;
    return str;
  }

  getHeaderArrowClass(col: ITableColumn) {
    let str = 'ml-12 transform scale-75';
    if (col.property !== this.sortBy) str += ' opacity-30 sm:opacity-0 sm:group-hover:opacity-30 rotate-180';
    else if (this.sortAscending) str += ' rotate-180';
    return str;
  }

  getAlignClass(col: ITableColumn) {
    if (!this.minWidths.sm) return 'justify-start';
    let alignment = col.align || (col.type === 'number' ? 'right' : 'left');
    return alignment === 'right' ? 'justify-end' : alignment === 'center' ? 'justify-center' : 'justify-start';
  }

  onHeaderClick(col: ITableColumn) {
    if (this.draggableRows || !col || !col.sortable || !col.property) return;
    if (this.sortBy !== col.property) {
      this.sortBy = col.property;
      this.sortAscending = true;
    } else {
      if (this.sortAscending) this.sortAscending = false;
      else {
        this.sortBy = null;
        this.sortAscending = true;
      }
    }
    this.mxSortChange.emit({ sortBy: this.sortBy, sortAscending: this.sortAscending });
  }

  changeExposedColumnIndex(delta: number) {
    const newColumnIndex = this.exposedMobileColumnIndex + delta;
    if (newColumnIndex < 0 || newColumnIndex >= this.cols.length) return;
    this.exposedMobileColumnIndex = newColumnIndex;
  }

  onMxPageChange(e: { detail: PageChangeEventDetail }) {
    if (this.serverPaginate) return;
    this.page = e.detail.page;
    this.rowsPerPage = e.detail.rowsPerPage;
  }

  render() {
    const checkAllCheckbox = this.checkable && this.showCheckAll && (
      <mx-checkbox
        checked={this.allRowsChecked}
        class={this.showOperationsBar ? 'ml-24' : 'pr-4'}
        indeterminate={this.someRowsChecked}
        onClick={this.onCheckAllClick.bind(this)}
        label-name="Select all rows"
        hide-label
      />
    );

    let multiRowActionUI;
    if (this.checkable) {
      multiRowActionUI =
        this.multiRowActions.length === 1 ? (
          // Multi-Row Action Button
          <mx-button
            data-testid="multi-action-button"
            btn-type="outlined"
            {...this.multiRowActions[0]}
            class={'whitespace-nowrap' + (!this.checkedRowIds.length ? ' hidden' : '')}
          >
            {this.multiRowActions[0].value}
          </mx-button>
        ) : (
          // Multi-Row Action Menu
          <span class={!this.checkedRowIds.length ? 'hidden' : null}>
            <mx-button ref={el => (this.actionMenuButton = el)} btn-type="text" dropdown>
              <span class="h-full flex items-center px-2">
                <span innerHTML={gearSvg}></span>
              </span>
            </mx-button>
            <mx-menu data-testid="multi-action-menu" ref={el => (this.actionMenu = el)}>
              {this.multiRowActions.map(action => (
                <mx-menu-item {...action}>{action.value}</mx-menu-item>
              ))}
            </mx-menu>
          </span>
        );
    }

    const operationsBar = (
      <div class="grid gap-x-16 gap-y-12 pb-12" style={this.operationsBarStyle}>
        {this.checkable && this.showCheckAll && (
          <div class="col-start-1 flex items-center min-h-36 space-x-16">
            {checkAllCheckbox}
            {multiRowActionUI}
          </div>
        )}
        {this.hasFilter && (
          <div class="flex items-center flex-wrap row-start-2 col-span-full sm:row-start-auto sm:col-span-1">
            <slot name="filter"></slot>
          </div>
        )}
        {this.hasSearch && (
          <div class="justify-self-end" style={this.searchStyle}>
            <slot name="search"></slot>
          </div>
        )}
      </div>
    );

    return (
      <Host class={'mx-table block' + (this.hoverable ? ' hoverable' : '') + (this.paginate ? ' paginated' : '')}>
        {/* Operations Bar */}
        {this.showOperationsBar && operationsBar}

        <div data-testid="grid" class="table-grid relative" style={this.gridStyle}>
          {/* Header Row */}
          <div class="header-row">
            {this.minWidths.sm && !this.showOperationsBar && checkAllCheckbox}
            {this.minWidths.sm ? (
              // Non-Mobile Column Headers
              this.cols.map((col: ITableColumn, colIndex: number) => {
                return (
                  <div
                    id={`column-header-${colIndex}`}
                    role="columnheader"
                    class={this.getHeaderClass(col, colIndex)}
                    onClick={this.onHeaderClick.bind(this, col)}
                  >
                    <div class="inline-flex items-center overflow-hidden whitespace-nowrap select-none">
                      <span class="truncate flex-shrink" innerHTML={col.heading}></span>
                      {!this.draggableRows && col.sortable && col.property && (
                        <div class={this.getHeaderArrowClass(col)} data-testid="arrow" innerHTML={arrowSvg}></div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              // Mobile Column Header Navigation
              <div class="flex items-stretch">
                {!this.showOperationsBar && checkAllCheckbox}
                <div
                  id={`column-header-${this.exposedMobileColumnIndex}`}
                  role="columnheader"
                  class={this.getHeaderClass(this.exposedMobileColumn, this.exposedMobileColumnIndex)}
                  onClick={this.onHeaderClick.bind(this, this.exposedMobileColumn)}
                >
                  <div class="inline-flex items-center overflow-hidden whitespace-nowrap select-none">
                    <span class="truncate flex-shrink" innerHTML={this.exposedMobileColumn.heading}></span>
                    {!this.draggableRows && this.exposedMobileColumn.sortable && this.exposedMobileColumn.property && (
                      <div
                        class={this.getHeaderArrowClass(this.exposedMobileColumn)}
                        data-testid="arrow"
                        innerHTML={arrowSvg}
                      ></div>
                    )}
                  </div>
                </div>
                <div class="flex items-center">
                  <mx-icon-button
                    data-testid="previous-column-button"
                    chevronLeft
                    disabled={this.exposedMobileColumnIndex === 0}
                    onClick={this.changeExposedColumnIndex.bind(this, -1)}
                  />
                  <mx-icon-button
                    data-testid="next-column-button"
                    chevronRight
                    disabled={this.exposedMobileColumnIndex === this.cols.length - 1}
                    onClick={this.changeExposedColumnIndex.bind(this, 1)}
                  />
                </div>
              </div>
            )}
            {this.minWidths.sm && this.hasActionsColumn && <div></div>}
          </div>

          {/* Progress Bar */}
          {this.showProgressBar && (
            <div>
              <div class="block h-0 col-span-full">
                <mx-linear-progress
                  class="transform -translate-y-1/2"
                  value={this.progressValue}
                  appear-delay={this.progressAppearDelay}
                />
              </div>
            </div>
          )}

          <slot></slot>
          {/* HACK: Stencil refuses to render this as default slot content. :( */}
          {!this.hasDefaultSlot && (
            <div>
              {this.visibleRows.map((row, rowIndex) => (
                // Generated Body Rows
                <mx-table-row
                  row-id={this.getRowId ? this.getRowId(row) : null}
                  actions={this.getRowActions ? this.getRowActions(row) : undefined}
                >
                  {this.cols.map((col: ITableColumn) => (
                    <mx-table-cell class={[this.getAlignClass(col), col.cellClass].join(' ')}>
                      <div innerHTML={this.getCellValue(row, col, rowIndex)}></div>
                    </mx-table-cell>
                  ))}
                </mx-table-row>
              ))}
            </div>
          )}
          {/* Empty State */}
          {this.visibleRows && this.visibleRows.length === 0 && (
            <div class="empty-state">
              <div class="col-span-full p-16 text-4">
                <slot name="empty-state">
                  <span>No results found.</span>
                </slot>
              </div>
            </div>
          )}
          {this.paginate && (
            // Pagination Row
            <div class="pagination-row">
              <mx-pagination
                page={this.page}
                rows-per-page={this.rowsPerPage}
                rowsPerPageOptions={this.rowsPerPageOptions}
                total-rows={this.serverPaginate ? this.totalRows : this.rows.length}
                class="col-span-full p-0 rounded-b-2xl"
                onMxPageChange={this.onMxPageChange.bind(this)}
                disabled={this.disablePagination}
                disableNextPage={this.disableNextPage}
              />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
