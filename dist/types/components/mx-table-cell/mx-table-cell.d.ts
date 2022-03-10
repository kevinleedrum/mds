import { MinWidths } from '../../utils/minWidthSync';
export declare class MxTableCell {
  /** This is automatically set by the parent `mx-table`. */
  isExposedMobileColumn: boolean;
  /** This is automatically set by the parent `mx-table`.  For subheaders, this will be null. */
  columnIndex: number;
  /** This is automatically set by the parent `mx-table`. */
  heading: string;
  minWidths: MinWidths;
  element: HTMLMxTableCellElement;
  connectedCallback(): void;
  disconnectedCallback(): void;
  get cellClass(): string;
  render(): any;
}
