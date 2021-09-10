import { EventEmitter } from '../../stencil-public-runtime';
import { MinWidths } from '../../utils/minWidthSync';
import { ITableRowAction } from '../mx-table/mx-table';
export declare class MxTableRow {
  actionMenuButton: HTMLMxIconButtonElement;
  actionMenu: HTMLMxMenuElement;
  checkbox: HTMLMxCheckboxElement;
  /** This is required for checkable rows in order to persist the checked state through sorting and pagination. */
  rowId: string;
  /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
  actions: ITableRowAction[];
  checked: boolean;
  element: HTMLMxTableRowElement;
  minWidths: MinWidths;
  checkable: boolean;
  checkOnRowClick: boolean;
  isMobileExpanded: boolean;
  isMobileCollapsing: boolean;
  /** Emits the `rowId` and `checked` state (via `Event.detail`) of the row whenever it is (un)checked */
  mxCheck: EventEmitter<{
    rowId: string | number;
    checked: boolean;
  }>;
  connectedCallback(): void;
  componentWillRender(): void;
  componentDidRender(): void;
  disconnectedCallback(): void;
  onClick(e: MouseEvent): void;
  accordion(): void;
  collapse(): Promise<void>;
  expand(): Promise<void>;
  onTransitionEnd(): void;
  onCheckboxInput(e: InputEvent): void;
  getExposedCell(): HTMLMxTableCellElement;
  getCollapsedHeight(): string;
  get rowClass(): string;
  get rowStyle(): any;
  render(): any;
}
