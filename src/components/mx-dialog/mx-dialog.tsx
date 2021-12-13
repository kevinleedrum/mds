import { Component, Host, h, Element, State, Listen, Method, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/bodyScroll';
import { moveToPortal } from '../../utils/portal';
import { fadeIn, fadeOut, fadeScaleIn } from '../../utils/transitions';

export type DialogOptions = {
  /** The label for the cancel button.  If `null`, the button is not shown. */
  cancelLabel?: string;
  /** The label for the confirm buttion.  If `null`, the button is not shown. */
  confirmLabel?: string;
  /** Optional heading text */
  heading?: string;
};

@Component({
  tag: 'mx-dialog',
  shadow: false,
})
export class MxDialog {
  backdrop: HTMLElement;
  modal: HTMLElement;
  focusElements: HTMLElement[];
  firstFocusElement: HTMLElement;
  lastFocusElement: HTMLElement;
  ancestorFocusedElement: HTMLElement;
  deferredResolve: Function;
  isSimple: boolean = true;
  hasButtons: boolean = false;
  hasHeading: boolean = false;

  heading: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;

  /** Toggles the visibility of the dialog (when using the slots for content). */
  @Prop() isOpen: boolean = false;
  /** Additional classes to apply to the inner modal element. */
  @Prop() modalClass: string;

  @State() isVisible = false;

  @Element() element: HTMLMxModalElement;

  @Event() mxClose: EventEmitter<void>;

  @Watch('isOpen')
  onIsOpenChange() {
    this.isOpen ? this.showDialog() : this.closeDialog();
  }

  @Listen('keydown', { target: 'body' })
  onKeyDown(e: KeyboardEvent) {
    if (!this.isVisible) return;
    const isFocusOutside = () =>
      !document.activeElement || !this.focusElements.includes(document.activeElement as HTMLElement);
    if (e.key === 'Tab') {
      this.getFocusElements();
      // Trap focus inside dialog
      if (e.shiftKey && document.activeElement === this.firstFocusElement) {
        this.lastFocusElement.focus();
        e.preventDefault();
      } else if (isFocusOutside() || document.activeElement === this.lastFocusElement) {
        this.firstFocusElement && this.firstFocusElement.focus();
        e.preventDefault();
      }
    } else if (e.key === 'Enter') {
      // Confirm on Enter (if not already focused on a dialog focusable element)
      this.getFocusElements();
      if (isFocusOutside()) {
        e.preventDefault();
        this.firstFocusElement && this.firstFocusElement.focus();
        this.closeDialog(true);
      }
    } else if (e.key === 'Escape') {
      // Cancel on Escape
      this.closeDialog();
      e.preventDefault();
    }
  }

  /** A Promise-based replacement for `Window.alert()` with some additional options */
  @Method()
  async alert(message: string, { confirmLabel = 'Okay', cancelLabel, heading }: DialogOptions = {}): Promise<void> {
    return this.open(message, { heading, confirmLabel, cancelLabel });
  }

  /** A Promise-based replacement for `Window.confirm()` that resolves to a boolean */
  @Method()
  async confirm(
    message: string,
    { confirmLabel = 'Okay', cancelLabel = 'Cancel', heading }: DialogOptions = {},
  ): Promise<boolean> {
    return this.open(message, { heading, confirmLabel, cancelLabel });
  }

  componentWillRender() {
    this.hasHeading = !!this.heading || !!this.element.querySelector('[slot="heading"]');
    this.hasButtons = !!this.confirmLabel || !!this.cancelLabel || !!this.element.querySelector('[slot="buttons"]');
    this.isSimple = !this.element.innerText;
  }

  componentDidLoad() {
    if (this.isOpen) this.showDialog();
  }

  disconnectedCallback() {
    unlockBodyScroll(this.element);
  }

  /** Opens a dialog using the provided parameters.
   * If/when we implement confirmation dialogs with inputs, radio groups, etc. this method can be
   * exposed with additional parameters needed to create those dialogs. */
  async open(message: string, { cancelLabel, confirmLabel, heading }: DialogOptions = {}): Promise<any> {
    this.heading = heading;
    this.message = message;
    this.cancelLabel = cancelLabel;
    this.confirmLabel = confirmLabel;
    this.showDialog();
    return new Promise(resolve => {
      this.deferredResolve = resolve;
    });
  }

  async showDialog() {
    if (this.isVisible) return;
    this.ancestorFocusedElement = document.activeElement as HTMLElement;
    moveToPortal(this.element);
    lockBodyScroll(this.element);
    this.isVisible = true;
    await new Promise(resolve => requestAnimationFrame(resolve));
    await Promise.all([fadeIn(this.backdrop), fadeScaleIn(this.modal)]);
  }

  async closeDialog(isConfirmed = false) {
    if (!this.isVisible) return;
    await Promise.all([fadeOut(this.backdrop), fadeOut(this.modal)]);
    this.isVisible = false;
    unlockBodyScroll(this.element);
    // Restore focus to the element that was focused before the modal was opened
    this.ancestorFocusedElement && this.ancestorFocusedElement.focus();
    if (this.deferredResolve) this.deferredResolve(isConfirmed);
    this.mxClose.emit();
  }

  getFocusElements() {
    const isVisible = (el: HTMLElement) => !!el.offsetParent;
    this.focusElements = Array.from(
      this.element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
    ).filter(isVisible) as HTMLElement[];
    if (this.focusElements.length) {
      this.firstFocusElement = this.focusElements[0];
      this.lastFocusElement = this.focusElements[this.focusElements.length - 1];
    }
  }

  get hostClass(): string {
    let str = 'mx-dialog fixed inset-0 flex items-center justify-center';
    if (!this.isVisible) str += ' hidden';
    return str;
  }

  get modalClassNames(): string {
    let str = 'modal w-320 m-16 flex flex-col rounded-lg shadow-4 relative overflow-hidden';
    if (this.isSimple) str += ' w-320';
    if (this.modalClass) str += ' ' + this.modalClass;
    return str;
  }

  render() {
    return (
      <Host class={this.hostClass}>
        <div ref={el => (this.backdrop = el)} class="bg-dialog-backdrop absolute inset-0 z-0"></div>

        <div
          ref={el => (this.modal = el)}
          role="alertdialog"
          aria-labelledby={this.heading ? 'dialog-heading' : null}
          aria-describedby={this.message ? 'dialog-message' : null}
          aria-modal="true"
          data-testid="modal"
          class={this.modalClassNames}
        >
          <div class="p-24 text-4 flex-grow overflow-auto" data-testid="modal-content">
            {this.hasHeading && (
              <h1 id="dialog-heading" class="text-h6 emphasis !my-0 pb-16" data-testid="heading">
                {this.heading}
                <slot name="heading"></slot>
              </h1>
            )}
            {this.message && (
              <p id="dialog-message" class="my-0">
                {this.message}
              </p>
            )}
            <slot></slot>
          </div>
          {this.hasButtons && (
            <div class="flex flex-wrap items-center justify-end p-4" data-testid="button-tray">
              {this.confirmLabel && (
                <mx-button class="m-4 order-2" btnType="text" onClick={() => this.closeDialog(true)}>
                  {this.confirmLabel}
                </mx-button>
              )}
              {this.cancelLabel && (
                <mx-button class="m-4 order-1" btnType="text" onClick={() => this.closeDialog()}>
                  {this.cancelLabel}
                </mx-button>
              )}
              <slot name="buttons"></slot>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
