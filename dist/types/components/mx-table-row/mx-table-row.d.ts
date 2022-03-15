import { EventEmitter } from '../../stencil-public-runtime';
import { MinWidths } from '../../utils/minWidthSync';
import { ITableRowAction } from '../mx-table/mx-table';
import DragScroller from '../../utils/DragScroller';
export declare class MxTableRow {
  actionMenuButton: HTMLMxIconButtonElement;
  actionMenu: HTMLMxMenuElement;
  checkbox: HTMLMxCheckboxElement;
  dragOrigin: {
    x: number;
    y: number;
  };
  dragShadowEl: HTMLElement;
  firstCellTarget: HTMLElement;
  childRowWrapper: HTMLElement;
  keyboardDragHandle: HTMLElement;
  dragScroller: DragScroller;
  indentLevel: number;
  columnCount: number;
  isHidden: boolean;
  /** This is required for checkable rows in order to persist the checked state through sorting and pagination. */
  rowId: string;
  /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
  actions: ITableRowAction[];
  /** Do not collapse this row if the parent row's `collapseNestedRows` prop is set to `true`. */
  doNotCollapse: boolean;
  /** Do not allow dragging of this row even if the parent table's `draggableRows` prop is set to `true`. */
  doNotDrag: boolean;
  /** This row's index in the `HTMLMxTableElement.rows` array.  This is set internally by the table component. */
  rowIndex: number;
  checked: boolean;
  /** Toggles the visibility of all nested rows (except those set to `doNotCollapse`) */
  collapseNestedRows: boolean;
  /** Style the row as a subheader. */
  subheader: boolean;
  element: HTMLMxTableRowElement;
  minWidths: MinWidths;
  checkable: boolean;
  checkOnRowClick: boolean;
  isDraggable: boolean;
  isDragging: boolean;
  isMobileExpanded: boolean;
  isMobileCollapsing: boolean;
  /** Emits the `rowId` and `checked` state (via `Event.detail`) of the row whenever it is (un)checked */
  mxCheck: EventEmitter<{
    rowId: string;
    checked: boolean;
  }>;
  /** Emitted when dragging starts.  Handled by the parent table. */
  mxRowDragStart: EventEmitter<{
    isKeyboard: boolean;
  }>;
  /** Emitted when dragging ends.  Handled by the parent table. */
  mxRowDragEnd: EventEmitter<{
    isKeyboard: boolean;
    isCancel: boolean;
  }>;
  /** Emits the `KeyboardEvent.key` when a key is pressed while keyboard dragging.  Handled by the parent table. */
  mxDragKeyDown: EventEmitter<string>;
  /** Emitted when a row is collapsed or expanded.  Handled by the parent table. */
  mxRowAccordion: EventEmitter<void>;
  onCollapseNestedRowsChange(): void;
  onMinWidthsChange(): Promise<void>;
  /** Apply a CSS transform to translate the row by `x` and `y` pixels */
  translateRow(x: number, y: number): Promise<void>;
  /** Show/hide the row (with an optional accordion transition) */
  toggle(hideRow: boolean, skipTransition: boolean): Promise<void>;
  connectedCallback(): void;
  componentDidLoad(): void;
  componentWillRender(): void;
  componentDidRender(): void;
  disconnectedCallback(): void;
  setIndentLevel(): void;
  toggleNestedRows(skipTransition?: boolean): void;
  /** Move first cell into same container as checkbox and drag handle. */
  wrapFirstColumn(): void;
  /** Move nested rows from the default slot to a container outside the collapsible row. */
  moveNestedRows(): void;
  onClick(e: MouseEvent): void;
  /** Add hover styling to this row, but not the parent row(s) */
  onMouseOver(e: MouseEvent): void;
  onMouseOut(e: MouseEvent): void;
  onKeyboardHandleKeyDown(e: KeyboardEvent): void;
  startDragging(e: MouseEvent | TouchEvent | KeyboardEvent): Promise<void>;
  addDragListeners(startEvent: MouseEvent | TouchEvent | KeyboardEvent): void;
  /** Clear transforms and remove dragShadowEl */
  stopDragging(isKeyboard?: boolean, isCancel?: boolean): Promise<void>;
  /** When dragging, add an element behind the row children that has a box shadow.
   * This is simpler than trying to change the row to `display: flex` to add a box shadow to it. */
  createDragShadowEl(): Promise<void>;
  accordion(): void;
  collapse(skipTransition?: boolean): Promise<void>;
  expand(): Promise<void>;
  focusDragHandle(): Promise<void>;
  /** Returns the immediate children of the row, as well as the immediate children of all nested
   * rows.  If a child is `display: contents` (i.e. the first column wrapper), then its children
   * are added. */
  getChildren(): Promise<HTMLElement[]>;
  /** Get an array of row IDs for rows nested directly inside this row */
  getNestedRowIndexes(): Promise<number[]>;
  /** Calculate the height of the row, including the height of nested rows */
  getHeight(): Promise<number>;
  onTransitionEnd(e: any): void;
  onCheckboxInput(e: InputEvent): void;
  getExposedCell(): HTMLMxTableCellElement;
  getCollapsedHeight(): string;
  get rowEl(): HTMLElement;
  get rowClass(): string;
  get rowStyle(): any;
  get indentClass(): string;
  get indentStyle(): {
    width: string;
    minWidth: string;
  };
  render(): any;
}
