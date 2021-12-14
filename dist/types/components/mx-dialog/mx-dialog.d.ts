import { EventEmitter } from '../../stencil-public-runtime';
export declare type DialogOptions = {
  /** The label for the cancel button.  If `null`, the button is not shown. */
  cancelLabel?: string;
  /** The label for the confirm buttion.  If `null`, the button is not shown. */
  confirmLabel?: string;
  /** Optional heading text */
  heading?: string;
};
export declare class MxDialog {
  backdrop: HTMLElement;
  modal: HTMLElement;
  focusElements: HTMLElement[];
  firstFocusElement: HTMLElement;
  lastFocusElement: HTMLElement;
  ancestorFocusedElement: HTMLElement;
  deferredResolve: Function;
  isSimple: boolean;
  hasButtons: boolean;
  hasHeading: boolean;
  heading: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  /** Toggles the visibility of the dialog (when using the slots for content). */
  isOpen: boolean;
  /** Additional classes to apply to the inner modal element. */
  modalClass: string;
  isVisible: boolean;
  element: HTMLMxModalElement;
  mxClose: EventEmitter<void>;
  onIsOpenChange(): void;
  onKeyDown(e: KeyboardEvent): void;
  /** A Promise-based replacement for `Window.alert()` with some additional options */
  alert(message: string, { confirmLabel, cancelLabel, heading }?: DialogOptions): Promise<void>;
  /** A Promise-based replacement for `Window.confirm()` that resolves to a boolean */
  confirm(message: string, { confirmLabel, cancelLabel, heading }?: DialogOptions): Promise<boolean>;
  componentWillRender(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /** Opens a dialog using the provided parameters.
   * If/when we implement confirmation dialogs with inputs, radio groups, etc. this method can be
   * exposed with additional parameters needed to create those dialogs. */
  open(message: string, { cancelLabel, confirmLabel, heading }?: DialogOptions): Promise<any>;
  showDialog(): Promise<void>;
  closeDialog(isConfirmed?: boolean): Promise<void>;
  getFocusElements(): void;
  get hostClass(): string;
  get modalClassNames(): string;
  render(): any;
}
