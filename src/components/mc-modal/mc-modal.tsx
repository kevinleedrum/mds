import { Component, Host, h, Prop, Watch, Element, Event, EventEmitter, State, Listen } from '@stencil/core';
import { moveToPortal } from '../../utils/portal';
import { fadeIn, fadeOut, fadeScaleIn } from '../../utils/transitions';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/bodyScroll';
import { uuidv4 } from '../../utils/utils';

@Component({
  tag: 'mc-modal',
  shadow: false,
})
export class McModal {
  backdrop: HTMLElement;
  focusElements: HTMLElement[];
  firstFocusElement: HTMLElement;
  lastFocusElement: HTMLElement;
  hasHeader = false;
  hasNav = false;
  modal: HTMLElement;
  ancestorFocusedElement: HTMLElement;
  uuid: string = uuidv4();

  /** If set to false, pressing Escape will not close the modal. */
  @Prop() closeOnEscape = true;
  /** If set to false, clicking the backdrop will not close the modal. */
  @Prop() closeOnOutsideClick = true;
  /** An optional description to display above the modal content */
  @Prop() description: string;
  /** Heading text. Use the `heading` slot instead if markup is needed. */
  @Prop() heading: string;
  @Prop() hideCloseButton = false;
  /** Toggle the modal */
  @Prop() isOpen = false;
  /** The nav menu heading (if using the nav slot) */
  @Prop() navHeading: string;

  @State() isVisible = false;

  @Element() element: HTMLMcModalElement;

  @Event() mcClose: EventEmitter<any>;

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
      const modals = document.querySelectorAll('mc-modal[is-open]');
      const isTopModal = this.element === modals[modals.length - 1];
      if (isTopModal) this.mcClose.emit();
    }
  }

  componentWillRender() {
    this.hasHeader = !!this.heading || !!this.element.querySelector('[slot="heading"]');
    this.hasNav = !!this.element.querySelector('[slot="nav"]');
  }

  disconnectedCallback() {
    unlockBodyScroll(this.element);
  }

  async openModal() {
    moveToPortal(this.element);
    lockBodyScroll(this.element);
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
    unlockBodyScroll(this.element);
    // Restore focus to the element that was focused before the modal was opened
    this.ancestorFocusedElement && this.ancestorFocusedElement.focus();
  }

  onOutsideClick() {
    if (this.closeOnOutsideClick) this.mcClose.emit();
  }

  get hostClass(): string {
    let str = 'mc-modal fixed inset-0 flex p-10 items-center justify-center';
    if (!this.isVisible) str += ' hidden';
    return str;
  }

  get hasFooter() {
    return !!this.element.querySelector('[slot="footer"]');
  }

  get modalContentClasses(): string {
    const str = 'bg-modal-content order-2 flex-1 px-24 sm:px-40 py-16 sm:py-24 overflow-auto overscroll-none border-b';
    return str;
  }

  render() {
    return (
      <Host
        class={this.hostClass}
        aria-labelledby={this.hasHeader ? this.uuid + '-header-text' : null}
        aria-modal="true"
        role="dialog"
      >
        <div
          ref={el => (this.backdrop = el)}
          class={'modal-overlay absolute inset-0 z-0' + (this.closeOnOutsideClick ? ' cursor-pointer' : '')}
          data-testid="overlay"
          onClick={this.onOutsideClick.bind(this)}
        ></div>
        <div
          ref={el => (this.modal = el)}
          class={`modal flex relative overflow-hidden rounded max-w-full h-full max-h-full ${
            this.hasNav ? 'sm:h-600' : 'sm:h-auto'
          }`}
          style={{ width: this.hasNav ? '50rem' : '36.25rem' }}
        >
          {this.hasNav && (
            <mc-modal-nav heading={this.navHeading}>
              <slot name="nav"></slot>
            </mc-modal-nav>
          )}
          <div class="flex flex-col pb-20 sm:pb-40 text-body1 max-w-full">
            <div class="mt-20 px-20 sm:mt-40 sm:px-40 flex-1 overflow-auto" tabindex="0" data-testid="modal-content">
              {this.hasHeader && (
                <header class="mb-20 sm:mb-30 pr-20 sm:pr-0">
                  <h1 class="text-h2 font-normal">
                    <slot name="heading"></slot>
                    {this.heading}
                  </h1>
                  {this.description && <div class="my-0 mt-4 text-body1">{this.description}</div>}
                </header>
              )}
              <slot></slot>
            </div>
            <footer
              class={
                'flex items-center justify-between flex-shrink-0 px-20 sm:px-40 mt-20 sm:mt-30' +
                (this.hasFooter ? '' : ' hidden')
              }
            >
              <div>{/* Placeholder in case we eventually need a footer-left slot */}</div>
              <div class="flex flex-1 xs:justify-end items-center max-w-full" data-testid="buttons">
                <slot name="footer"></slot>
              </div>
            </footer>
          </div>
          {!this.hideCloseButton && (
            <mc-icon-button
              class="absolute top-20 right-20"
              btn-type="close"
              onClick={() => this.mcClose.emit()}
            ></mc-icon-button>
          )}
        </div>
      </Host>
    );
  }
}
