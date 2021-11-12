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
  heading: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  isVisible: boolean;
  element: HTMLMxModalElement;
  onKeyDown(e: KeyboardEvent): void;
  /** A Promise-based replacement for `Window.alert()` with some additional options */
  alert(message: string, { confirmLabel, cancelLabel, heading }?: DialogOptions): Promise<void>;
  /** A Promise-based replacement for `Window.confirm()` that resolves to a boolean */
  confirm(message: string, { confirmLabel, cancelLabel, heading }?: DialogOptions): Promise<boolean>;
  disconnectedCallback(): void;
  /** Opens a dialog using the provided parameters.
   * If/when we implement confirmation dialogs with inputs, radio groups, etc. this method can be
   * exposed with additional parameters needed to create those dialogs. */
  open(message: string, { cancelLabel, confirmLabel, heading }?: DialogOptions): Promise<any>;
  showDialog(): Promise<void>;
  closeDialog(isConfirmed?: boolean): Promise<void>;
  getFocusElements(): void;
  get hostClass(): string;
  render(): any;
}
