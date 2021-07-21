import { Component, Host, h, Prop, Watch, Element, Event, EventEmitter, State, Listen } from '@stencil/core';
import { moveToPortal } from '../../utils/portal';
import { fadeIn, fadeOut, fadeScaleIn } from '../../utils/transitions';
import { IMxButtonProps } from '../mx-button/mx-button';
import arrowSvg from '../../assets/svg/arrow-left.svg';

export interface IModalButton extends IMxButtonProps {
  label: string;
}

@Component({
  tag: 'mx-modal',
  shadow: false,
})
export class MxModal {
  backdrop: HTMLElement;
  focusElements: HTMLElement[];
  firstFocusElement: HTMLElement;
  lastFocusElement: HTMLElement;
  hasHeader: boolean = false;
  hasFooter: boolean = false;
  modal: HTMLElement;
  ancestorFocusedElement: HTMLElement;

  /** An array of prop objects for buttons to display in the button tray.  Use the `label` property to specify the button's inner text. */
  @Prop() buttons: IModalButton[] = [];
  /** If set to false, pressing Escape will not close the modal. */
  @Prop() closeOnEscape: boolean = true;
  /** If set to false, clicking the backdrop will not close the modal. */
  @Prop() closeOnOutsideClick: boolean = true;
  /** Toggle the modal */
  @Prop() isOpen: boolean = false;
  /** The text to display for the previous page link */
  @Prop() previousPageTitle: string = 'Back';
  /** The URL for the previous page link */
  @Prop() previousPageUrl: string = '';

  @State() isVisible: boolean = false;

  @Element() element: HTMLMxModalElement;

  @Event() mxClose: EventEmitter<any>;

  @Watch('isOpen')
  toggleModal() {
    this.isOpen ? this.openModal() : this.closeModal();
  }

  @Listen('keydown')
  onKeyDown(e: KeyboardEvent) {
    if (!this.isOpen) return;
    if (e.key === 'Tab') {
      // // Trap focus inside modal
      if (e.shiftKey && document.activeElement === this.firstFocusElement) {
        this.lastFocusElement.focus();
        e.preventDefault();
      } else if (document.activeElement === this.lastFocusElement) {
        this.firstFocusElement.focus();
        e.preventDefault();
      }
    }
  }

  @Listen('keydown', { target: 'document' })
  onDocumentKeyDown(e: KeyboardEvent) {
    if (this.isOpen && this.closeOnEscape && e.key === 'Escape') {
      const modals = document.querySelectorAll('mx-modal[is-open]');
      const isTopModal = this.element === modals[modals.length - 1];
      if (isTopModal) this.mxClose.emit();
    }
  }

  componentWillLoad() {
    this.hasHeader =
      !!this.element.querySelector('[slot="header-left"]') || !!this.element.querySelector('[slot="header-right"]');
    this.hasFooter =
      !!this.previousPageUrl ||
      this.buttons.length > 0 ||
      !!this.element.querySelector('[slot="footer-left"]') ||
      !!this.element.querySelector('[slot="footer-right"]');
  }

  async openModal() {
    moveToPortal(this.element);
    this.isVisible = true;
    requestAnimationFrame(async () => {
      this.getFocusElements();
      await Promise.all([fadeIn(this.backdrop, 250), fadeScaleIn(this.modal, 250)]);
    });
  }

  getFocusElements() {
    this.ancestorFocusedElement = document.activeElement as HTMLElement;
    const isVisible = (el: HTMLElement) => !!el.offsetParent;
    this.focusElements = Array.from(
      this.element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
    ).filter(isVisible) as HTMLElement[];
    if (this.focusElements.length) {
      this.firstFocusElement = this.focusElements[0];
      this.lastFocusElement = this.focusElements[this.focusElements.length - 1];
      this.focusElements[0].focus();
    }
  }

  async closeModal() {
    await Promise.all([fadeOut(this.backdrop), fadeOut(this.modal)]);
    this.isVisible = false;
    // Restore focus to the element that was focused before the modal was opened
    this.ancestorFocusedElement && this.ancestorFocusedElement.focus();
  }

  onBackdropClick() {
    if (this.closeOnOutsideClick) this.mxClose.emit();
  }

  get buttonsJsx() {
    return (
      <div
        class="flex py-1 space-x-24 justify-end flex-row-reverse space-x-reverse items-center max-w-full"
        data-testid="buttons"
      >
        {this.buttons.map((button, index) => {
          // If not specified, set btnType automatically for primary, secondary, and tertiary buttons
          let { btnType } = button;
          if (!btnType) btnType = index === 0 ? 'contained' : index === 1 ? 'outlined' : 'text';
          return (
            <mx-button {...button} xl btn-type={btnType}>
              {button.label}
            </mx-button>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <Host
        class={'mx-modal fixed inset-0 flex items-center justify-center' + (this.isVisible ? '' : ' hidden')}
        aria-labelledby={this.hasHeader ? 'headerText' : null}
        aria-modal="true"
        role="dialog"
      >
        <div
          ref={el => (this.backdrop = el)}
          class="modal-backdrop absolute inset-0 z-0 cursor-pointer"
          data-testid="backdrop"
          onClick={this.onBackdropClick.bind(this)}
        ></div>
        <div ref={el => (this.modal = el)} class="modal flex flex-col rounded-lg shadow-9 relative overflow-hidden">
          {/* Modal Content */}
          <div
            class="modal-content order-2 px-40 py-24 flex-1 overflow-auto overscroll-none border-b"
            data-testid="modal-content"
          >
            <div class="content-card min-h-full px-40 py-24 rounded-2xl">
              <slot></slot>
            </div>
          </div>
          {/* Modal Footer */}
          <footer
            class={
              'modal-footer order-3 flex items-center justify-between h-80 py-20 px-40' +
              (this.hasFooter ? '' : ' hidden')
            }
          >
            <div>
              <slot name="footer-left">
                {this.previousPageUrl && (
                  <a
                    href={this.previousPageUrl}
                    class="flex items-center uppercase text-4 font-semibold tracking-1-25"
                    data-testid="previous-page"
                  >
                    <span class="mr-10" innerHTML={arrowSvg}></span>
                    {this.previousPageTitle}
                  </a>
                )}
              </slot>
            </div>
            <div class="ml-8">
              <slot name="footer-right">{this.buttons.length > 0 && this.buttonsJsx}</slot>
            </div>
          </footer>
          {/* Modal Header - Placed last in the DOM so it is also the last in the tab focus order */}
          <header class={'modal-header order-1 px-40' + (this.hasHeader ? '' : ' hidden')}>
            <div class="flex items-center justify-between min-h-80">
              <div id="headerText" class="text-h5 emphasis !my-0" data-testid="header-text">
                <slot name="header-left"></slot>
              </div>
              <div>
                <slot name="header-right">
                  <mx-button btn-type="text" data-testid="close-button" onClick={this.mxClose.emit}>
                    Close
                  </mx-button>
                </slot>
              </div>
            </div>
            <slot name="header-bottom"></slot>
          </header>
        </div>
      </Host>
    );
  }
}
