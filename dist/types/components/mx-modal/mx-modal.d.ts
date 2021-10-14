import { EventEmitter } from '../../stencil-public-runtime';
import { MinWidths } from '../../utils/minWidthSync';
import { IMxButtonProps } from '../mx-button/mx-button';
export interface IModalButton extends IMxButtonProps {
  label: string;
}
export declare class MxModal {
  backdrop: HTMLElement;
  focusElements: HTMLElement[];
  firstFocusElement: HTMLElement;
  lastFocusElement: HTMLElement;
  hasCard: boolean;
  hasHeader: boolean;
  modal: HTMLElement;
  ancestorFocusedElement: HTMLElement;
  headerBottomSlotWrapper: HTMLElement;
  mobilePageHeader: HTMLMxPageHeaderElement;
  /** An array of prop objects for buttons to display in the button tray.  Use the `label` property to specify the button's inner text. */
  buttons: IModalButton[];
  /** If set to false, pressing Escape will not close the modal. */
  closeOnEscape: boolean;
  /** If set to false, clicking the backdrop will not close the modal. */
  closeOnOutsideClick: boolean;
  /** Additional classes for the inner scrolling container. */
  contentClass: string;
  /** An optional description to display above the modal content */
  description: string;
  /** Toggle the modal */
  isOpen: boolean;
  /** The text to display for the previous page link */
  previousPageTitle: string;
  /** The URL for the previous page link */
  previousPageUrl: string;
  /** Set to true to stretch the modal to nearly fill the width and height of the page
   * (on desktop-sized screens).  Otherwise, the maximum dimensions are 800x600px. */
  large: boolean;
  minWidths: MinWidths;
  isVisible: boolean;
  element: HTMLMxModalElement;
  mxClose: EventEmitter<any>;
  toggleModal(): void;
  onKeyDown(e: KeyboardEvent): void;
  onDocumentKeyDown(e: KeyboardEvent): void;
  componentWillRender(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  openModal(): Promise<void>;
  getFocusElements(): void;
  closeModal(): Promise<void>;
  onBackdropClick(): void;
  get hostClass(): string;
  get hasFooter(): boolean;
  get buttonsJsx(): any;
  get modalContentClasses(): string;
  render(): any;
}
