import { Component, Host, h, Prop, Watch, Element, Event, EventEmitter, State, Listen } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';
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
  hasCard: boolean = false;
  hasHeader: boolean = false;
  modal: HTMLElement;
  ancestorFocusedElement: HTMLElement;
  headerBottomSlotWrapper: HTMLElement;
  mobilePageHeader: HTMLMxPageHeaderElement;

  /** An array of prop objects for buttons to display in the button tray.  Use the `label` property to specify the button's inner text. */
  @Prop() buttons: IModalButton[] = [];
  /** If set to false, pressing Escape will not close the modal. */
  @Prop() closeOnEscape: boolean = true;
  /** If set to false, clicking the backdrop will not close the modal. */
  @Prop() closeOnOutsideClick: boolean = true;
  /** Additional classes for the inner scrolling container. */
  @Prop() contentClass: string = '';
  /** An optional description to display above the modal content */
  @Prop() description: string;
  /** Toggle the modal */
  @Prop() isOpen: boolean = false;
  /** The text to display for the previous page link */
  @Prop() previousPageTitle: string = 'Back';
  /** The URL for the previous page link */
  @Prop() previousPageUrl: string = '';
  /** Set to true to stretch the modal to nearly fill the width and height of the page
   * (on desktop-sized screens).  Otherwise, the maximum dimensions are 800x600px. */
  @Prop() large: boolean = false;

  @State() minWidths = new MinWidths();
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

  componentWillRender() {
    this.hasHeader =
      !!this.element.querySelector('[slot="header-left"]') || !!this.element.querySelector('[slot="header-right"]');
    this.hasCard = !!this.element.querySelector('[slot="card"]');
    const tabs = this.element.querySelector('mx-tabs');
    // Place mx-tabs in either the header-bottom slot OR the mobile mx-page-header tabs slot
    if (tabs && this.headerBottomSlotWrapper && this.mobilePageHeader) {
      if (this.minWidths.md) this.headerBottomSlotWrapper.appendChild(tabs);
      else this.mobilePageHeader.appendChild(tabs);
    }
  }

  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }

  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }

  async openModal() {
    moveToPortal(this.element);
    this.isVisible = true;
    requestAnimationFrame(async () => {
      this.getFocusElements();
      await Promise.all([fadeIn(this.backdrop, 250), fadeScaleIn(this.modal, 250)]);
      this.mobilePageHeader.resetResizeObserver();
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

  get hostClass(): string {
    let str = 'mx-modal fixed inset-0 flex pt-24 sm:pt-0 items-stretch sm:items-center justify-center';
    if (!this.isVisible) str += ' hidden';
    if (this.minWidths.sm) {
      str += this.large ? ' modal-large' : ' modal-medium';
    }
    return str;
  }

  get hasFooter() {
    return (
      (this.minWidths.md && (!!this.previousPageUrl || this.buttons.length > 0)) ||
      !!this.element.querySelector('[slot="footer-left"]') ||
      !!this.element.querySelector('[slot="footer-right"]')
    );
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

  get modalContentClasses(): string {
    let str = 'bg-modal-content order-2 flex-1 px-24 sm:px-40 py-16 sm:py-24 overflow-auto overscroll-none border-b';
    if (this.contentClass) str += ' ' + this.contentClass;
    return str;
  }

  render() {
    const headerLeftSlotContent = this.element.querySelector('[slot="header-left"]');

    return (
      <Host
        class={this.hostClass}
        aria-labelledby={this.hasHeader ? 'headerText' : null}
        aria-modal="true"
        role="dialog"
      >
        <div
          ref={el => (this.backdrop = el)}
          class={'bg-modal-backdrop absolute inset-0 z-0' + (this.closeOnOutsideClick ? ' cursor-pointer' : '')}
          data-testid="backdrop"
          onClick={this.onBackdropClick.bind(this)}
        ></div>
        <div ref={el => (this.modal = el)} class="modal flex flex-col rounded-lg shadow-9 relative overflow-hidden">
          {/* Modal Content */}
          <div class={this.modalContentClasses} data-testid="modal-content">
            {this.description && (
              <p class="text-4 my-0 mb-16 sm:mb-24" data-testid="modal-description">
                {this.description}
              </p>
            )}
            <slot></slot>
            {this.hasCard && (
              <div>
                <div
                  class="bg-modal-card min-h-full px-24 sm:px-40 py-16 sm:py-24 rounded-2xl"
                  data-testid="modal-card"
                >
                  <slot name="card"></slot>
                </div>
              </div>
            )}
          </div>
          {/* Modal Footer */}
          <footer
            class={
              'bg-modal-footer order-3 flex items-center justify-between h-80 py-20 px-40' +
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
            <div class="ml-16">
              <slot name="footer-right">{this.buttons.length > 0 && this.buttonsJsx}</slot>
            </div>
          </footer>
          {/* Modal Header - Placed last in the DOM so it is also the last in the tab focus order */}
          <mx-page-header
            ref={el => (this.mobilePageHeader = el)}
            class="md:hidden order-1"
            buttons={this.buttons}
            previous-page-title={this.previousPageTitle}
            previous-page-url={this.previousPageUrl}
          >
            {/* Inject header-left slot content into mobile mx-page-header's default slot. */}
            {headerLeftSlotContent && headerLeftSlotContent.innerHTML}
          </mx-page-header>
          <header class="hidden md:block bg-modal-header order-1 px-40">
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
            <div ref={el => (this.headerBottomSlotWrapper = el)}>
              <slot name="header-bottom"></slot>
            </div>
          </header>
        </div>
      </Host>
    );
  }
}