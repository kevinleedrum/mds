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
  keyboardDragHandle: HTMLElement;
  dragScroller: DragScroller;
  /** This is required for checkable rows in order to persist the checked state through sorting and pagination. */
  rowId: string;
  /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
  actions: ITableRowAction[];
  checked: boolean;
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
  /** Apply a CSS transform to translate the row by `x` and `y` pixels */
  translateRow(x: number, y: number): Promise<void>;
  connectedCallback(): void;
  componentWillRender(): void;
  componentDidRender(): void;
  disconnectedCallback(): void;
  onClick(e: MouseEvent): void;
  onKeyboardHandleKeyDown(e: KeyboardEvent): void;
  startDragging(e: MouseEvent | TouchEvent | KeyboardEvent): void;
  addDragListeners(startEvent: MouseEvent | TouchEvent | KeyboardEvent): void;
  /** Clear transforms and remove dragShadowEl */
  stopDragging(isKeyboard?: boolean, isCancel?: boolean): void;
  /** When dragging, add an element behind the row children that has a box shadow.
   * This is simpler than trying to change the row to `display: flex` to add a box shadow to it. */
  createDragShadowEl(): void;
  accordion(): void;
  collapse(): Promise<void>;
  expand(): Promise<void>;
  focusDragHandle(): Promise<void>;
  onTransitionEnd(e: any): void;
  onCheckboxInput(e: InputEvent): void;
  getExposedCell(): HTMLMxTableCellElement;
  getCollapsedHeight(): string;
  get rowClass(): string;
  get rowStyle(): any;
  render(): any;
}
