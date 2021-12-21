import { EventEmitter } from '../../stencil-public-runtime';
import { MinWidths } from '../../utils/minWidthSync';
import { IMxMenuItemProps } from '../mx-menu-item/mx-menu-item';
import { PageChangeEventDetail } from '../mx-pagination/mx-pagination';
export interface ITableRowAction extends IMxMenuItemProps {
  /** The menu item text for the row action */
  value: string;
}
export declare type SortChangeEventDetail = {
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
  /** If set to `true`, this column will be excluded from the mobile column navigation just like the
   * actions column that is generated from `getRowActions`. */
  isActionColumn?: boolean;
}
export declare class MxTable {
  actionMenu: HTMLMxMenuElement;
  actionMenuButton: HTMLMxButtonElement;
  hasDefaultSlot: boolean;
  hasSearch: boolean;
  hasFilter: boolean;
  showOperationsBar: boolean;
  dragRowEl: HTMLMxTableRowElement;
  dragRowElSiblings: HTMLMxTableRowElement[];
  dragOverRowEl: HTMLMxTableRowElement;
  dragRowElIndex: number;
  dragOverRowElIndex: number;
  dragRowElHeight: number;
  dragMoveHandler: (e: MouseEvent) => any;
  /** An array of objects that defines the table's dataset. */
  rows: Object[];
  /** An array of column definitions.  If not specified, a column will be generated for each property on the row object. */
  columns: ITableColumn[];
  /** A function that returns the `rowId` prop for each generated `mx-table-row`.
   * This is only required if the table is `checkable` and is auto-generating rows (not using the default slot). */
  getRowId: (row: Object) => string;
  /** Make rows checkable.  You must either provide a `getRowId` getter (for generated rows), or
   * provide a `rowId` for every `mx-table-row` if creating the rows manually in the table's slot. */
  checkable: boolean;
  /** Set to `false` to prevent checking rows by clicking on them (outside the checkboxes). */
  checkOnRowClick: boolean;
  /** Set to `false` to hide the (un)check all checkbox at the top of the table. */
  showCheckAll: boolean;
  /** Enables reordering of rows via drag and drop. */
  draggableRows: boolean;
  /** Set to `false` to not mutate the `rows` prop when rows are reordered via drag and drop. */
  mutateOnDrag: boolean;
  /** The row property to use for grouping rows.  The `rows` prop must be provided as well. */
  groupBy: string;
  /** A function that returns the subheader text for a `groupBy` value.  If not provided, the `row[groupBy]` value will be shown in the subheader rows. */
  getGroupByHeading: (row: Object) => string;
  hoverable: boolean;
  /** Set to `true` to allow smaller tables to shrink to less than 100% width on larger screens */
  autoWidth: boolean;
  /** The property on the row objects that will be used for sorting */
  sortBy: string;
  sortAscending: boolean;
  /** Show the pagination component.  Setting this to `false` will show all rows. */
  paginate: boolean;
  /** The page to display */
  page: number;
  rowsPerPage: number;
  /** The total number of unpaginated rows.  This is ignored for client-side pagination.
   * For server-side pagination, omitting this prop will remove the last-page button.
   */
  totalRows: number;
  /** Disable the next-page button.  Useful when using server-side pagination and the total number of rows is unknown. */
  disableNextPage: boolean;
  rowsPerPageOptions: number[];
  /** Do not sort or paginate client-side. Use events to send server requests instead. */
  serverPaginate: boolean;
  getRowActions: (row: Object) => ITableRowAction[];
  getMultiRowActions: (rows: string[]) => ITableRowAction[];
  /** Show a progress bar below the header row */
  showProgressBar: boolean;
  /** Disable the pagination buttons (i.e. while loading results) */
  disablePagination: boolean;
  /** The progress bar percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress bar will be displayed. */
  progressValue: number;
  /** Delay the appearance of the progress bar for this many milliseconds */
  progressAppearDelay: number;
  minWidths: MinWidths;
  checkedRowIds: string[];
  exposedMobileColumnIndex: number;
  element: HTMLMxTableElement;
  /** Emitted when a sortable column's header is clicked. */
  mxSortChange: EventEmitter<SortChangeEventDetail>;
  /** Emitted when a row is (un)checked.  The `Event.detail` will be the array of checked `rowId`s. */
  mxRowCheck: EventEmitter<string[]>;
  /** Emitted when the sorting, pagination, or rows data changes.
   * The `Event.detail` will contain the sorted, paginated array of visible rows.  This is useful
   * for building a custom row layout via the default slot. */
  mxVisibleRowsChange: EventEmitter<Object[]>;
  /** Emitted when a row is dragged to a new position.
   * The `Event.detail` object will contain the `rowId` (if set), `oldIndex`, and `newIndex`. */
  mxRowMove: EventEmitter<any>;
  onMxCheck(e: CustomEvent): void;
  onMxRowDragStart(e: CustomEvent): Promise<void>;
  onDragKeyDown(e: CustomEvent): Promise<void>;
  onMxRowDragEnd(e: CustomEvent): Promise<void>;
  onVisibleRowsChange(): void;
  onPageChange(): void;
  resetPage(): void;
  getCheckedRowIds(): Promise<string[]>;
  setCheckedRowIds(checkedRowIds?: string[]): Promise<void>;
  checkAll(): Promise<void>;
  checkNone(): Promise<void>;
  hasActionsColumnFromSlot: boolean;
  getTableRows(): HTMLMxTableRowElement[];
  onCheckAllClick(e: InputEvent): void;
  /** Animate table rows while dragging a row */
  onDragMove(e?: MouseEvent): void;
  reorderRowsArray(): Promise<void>;
  setCellProps(): void;
  getRowGroup(row: any): string;
  setRowsChecked(): void;
  connectedCallback(): void;
  componentWillLoad(): void;
  componentWillRender(): void;
  componentDidRender(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  get cols(): ITableColumn[];
  get exposedMobileColumn(): ITableColumn;
  get uniqueGroups(): string[];
  get groupedRows(): Object[];
  get visibleRows(): Object[];
  get visibleGroups(): string[];
  get allRowsChecked(): boolean;
  get someRowsChecked(): boolean;
  get multiRowActions(): ITableRowAction[];
  get hasActionsColumn(): boolean;
  get operationsBarStyle(): any;
  get searchStyle(): any;
  get gridStyle(): any;
  get emptyStateClass(): string;
  get navigableColumnIndexes(): number[];
  get isPreviousColumnDisabled(): boolean;
  get isNextColumnDisabled(): boolean;
  sortRows(rows: Object[]): void;
  getCellSortableValue(row: Object, col: ITableColumn): string | number;
  getCellValue(row: Object, col: ITableColumn, rowIndex: number): any;
  getHeaderClass(col: ITableColumn, colIndex: number): string;
  getHeaderArrowClass(col: ITableColumn): string;
  getAlignClasses(col: ITableColumn): string[];
  getRowJsx(row: any, rowIndex: number): any;
  onHeaderClick(col: ITableColumn): void;
  changeExposedColumnIndex(delta: number): Promise<void>;
  onMxPageChange(e: {
    detail: PageChangeEventDetail;
  }): void;
  render(): any;
}
