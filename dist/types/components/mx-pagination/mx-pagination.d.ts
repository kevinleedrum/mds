import { EventEmitter } from '../../stencil-public-runtime';
import { ResizeObserver } from '@juggle/resize-observer';
export declare type PageChangeEventDetail = {
  rowsPerPage: number;
  page: number;
};
export declare class MxPagination {
  rowsMenuAnchor: HTMLElement;
  rowsMenu: HTMLMxMenuElement;
  hasStatus: boolean;
  paginationWrapper: HTMLElement;
  rowsPerPageWrapper: HTMLElement;
  resizeObserver: ResizeObserver;
  page: number;
  rowsPerPageOptions: number[];
  rowsPerPage: number;
  /** Reduce the UI to only a page */
  simple: boolean;
  totalRows: number;
  /** Disable the page buttons (i.e. when loading results) */
  disabled: boolean;
  /** Disable the next page button (i.e. when the last page was loaded from an API) */
  disableNextPage: boolean;
  hideRowsPerPage: boolean;
  moveStatusToBottom: boolean;
  /** Whether the component width (not viewport width) is >= 320px */
  isXSmallMinWidth: boolean;
  /** Whether the component width (not viewport width) is >= 640px */
  isSmallMinWidth: boolean;
  element: HTMLMxPaginationElement;
  mxPageChange: EventEmitter<PageChangeEventDetail>;
  componentWillRender(): void;
  componentDidLoad(): void;
  updateResponsiveElements(): void;
  onClickFirstPage(): void;
  onClickPreviousPage(): void;
  onClickNextPage(): void;
  onClickLastPage(): void;
  onChangeRowsPerPage(rowsPerPage: number): void;
  get lastPage(): number;
  get currentRange(): string;
  get rowRangeClass(): string;
  get paginationWrapperClass(): string;
  render(): any;
}
