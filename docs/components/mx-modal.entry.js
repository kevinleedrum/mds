import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-20e785a9.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';
import { m as moveToPortal } from './portal-9203402a.js';
import { f as fadeIn, b as fadeOut, d as fadeScaleIn, g as fadeSlideIn, D as Direction, h as fadeSlideOut } from './transitions-2b2d27da.js';
import { u as unlockBodyScroll, l as lockBodyScroll } from './bodyScroll-166c2095.js';
import { u as uuidv4 } from './utils-a3c69dbe.js';

const MxModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxClose = createEvent(this, "mxClose", 7);
    this.hasCard = false;
    this.hasHeader = false;
    this.hasHeaderBottom = false;
    this.hasHeaderCenter = false;
    this.uuid = uuidv4();
    /** An array of prop objects for buttons to display in the button tray.  Use the `label` property to specify the button's inner text. */
    this.buttons = [];
    /** If set to false, pressing Escape will not close the modal. */
    this.closeOnEscape = true;
    /** If set to false, clicking the backdrop will not close the modal. */
    this.closeOnOutsideClick = true;
    /** Additional classes for the inner scrolling container. */
    this.contentClass = '';
    /** Instead of centering, attach the modal to the left side of the window */
    this.fromLeft = false;
    /** Instead of centering, attach the modal to the right side of the window */
    this.fromRight = false;
    /** Toggle the modal */
    this.isOpen = false;
    /** The text to display for the previous page link */
    this.previousPageTitle = 'Back';
    /** The URL for the previous page link */
    this.previousPageUrl = '';
    /** Set to true to stretch the modal to nearly fill the width and height of the page
     * (on desktop-sized screens).  Otherwise, the maximum dimensions are 800x600px. */
    this.large = false;
    this.minWidths = new MinWidths();
    this.isVisible = false;
  }
  toggleModal() {
    this.isOpen ? this.openModal() : this.closeModal();
  }
  updateSlottedButtonSize() {
    const slottedButtons = this.element.querySelectorAll('[slot*="footer-"] mx-button');
    slottedButtons.forEach((button) => (button.xl = this.minWidths.lg));
  }
  onKeyDown(e) {
    if (!this.isOpen)
      return;
    if (e.key === 'Tab') {
      // // Trap focus inside modal
      if (e.shiftKey && document.activeElement === this.firstFocusElement) {
        this.lastFocusElement.focus();
        e.preventDefault();
      }
      else if (document.activeElement === this.lastFocusElement) {
        this.firstFocusElement.focus();
        e.preventDefault();
      }
    }
  }
  onDocumentKeyDown(e) {
    if (this.isOpen && this.closeOnEscape && e.key === 'Escape') {
      const modals = document.querySelectorAll('mx-modal[is-open]');
      const isTopModal = this.element === modals[modals.length - 1];
      if (isTopModal)
        this.mxClose.emit();
    }
  }
  componentWillRender() {
    this.hasHeader =
      !!this.element.querySelector('[slot="header-left"]') || !!this.element.querySelector('[slot="header-right"]');
    this.hasCard = !!this.element.querySelector('[slot="card"]');
    this.hasHeaderBottom = !!this.element.querySelector('[slot="header-bottom"]');
    this.hasHeaderCenter = !!this.element.querySelector('[slot="header-center"]');
    const tabs = this.element.querySelector('mx-tabs');
    // Place mx-tabs in either the header-bottom slot OR the mobile mx-page-header tabs slot
    if (tabs && this.headerBottomSlotWrapper && this.mobilePageHeader) {
      if (this.minWidths.md)
        this.headerBottomSlotWrapper.appendChild(tabs);
      else
        this.mobilePageHeader.appendChild(tabs);
    }
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
    unlockBodyScroll(this.element);
  }
  async openModal() {
    moveToPortal(this.element);
    lockBodyScroll(this.element);
    this.isVisible = true;
    requestAnimationFrame(async () => {
      this.getFocusElements();
      await Promise.all([fadeIn(this.backdrop, 250), this.openTransition(this.modal)]);
      this.mobilePageHeader.resetResizeObserver();
    });
  }
  getFocusElements() {
    this.ancestorFocusedElement = document.activeElement;
    const isVisible = (el) => !!el.offsetParent;
    this.focusElements = Array.from(this.element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(isVisible);
    if (this.focusElements.length) {
      this.firstFocusElement = this.focusElements[0];
      this.lastFocusElement = this.focusElements[this.focusElements.length - 1];
      this.focusElements[0].focus();
    }
  }
  async closeModal() {
    await Promise.all([fadeOut(this.backdrop), this.closeTransition(this.modal)]);
    this.isVisible = false;
    unlockBodyScroll(this.element);
    // Restore focus to the element that was focused before the modal was opened
    this.ancestorFocusedElement && this.ancestorFocusedElement.focus();
  }
  onBackdropClick() {
    if (this.closeOnOutsideClick)
      this.mxClose.emit();
  }
  get hostClass() {
    let str = 'mx-modal fixed inset-0 flex items-stretch text-3';
    if (!this.isVisible)
      str += ' hidden';
    if (this.fromLeft)
      str += ' justify-start pr-24 sm:pr-40';
    else if (this.fromRight)
      str += ' justify-end pl-24 sm:pl-40';
    else {
      str += ' pt-24 md:pt-0 md:items-center justify-center';
      if (this.minWidths.md) {
        str += this.large ? ' modal-large' : ' modal-medium';
      }
    }
    return str;
  }
  get modalClass() {
    let str = 'modal flex flex-col shadow-9 relative overflow-hidden';
    if (this.fromLeft)
      str += ' rounded-r-xl';
    else if (this.fromRight)
      str += ' rounded-l-xl';
    else
      str += ' sm:rounded-t-xl md:rounded-xl w-full md:w-auto';
    return str;
  }
  get openTransition() {
    let transition = (el) => fadeScaleIn(el, 250);
    if (this.fromRight)
      transition = fadeSlideIn;
    else if (this.fromLeft)
      transition = (el) => fadeSlideIn(el, undefined, Direction.left);
    return transition;
  }
  get closeTransition() {
    let transition = fadeOut;
    if (this.fromRight)
      transition = fadeSlideOut;
    else if (this.fromLeft)
      transition = (el) => fadeSlideOut(el, undefined, Direction.left);
    return transition;
  }
  get hasFooter() {
    return ((this.minWidths.md && (!!this.previousPageUrl || this.buttons.length > 0)) ||
      !!this.element.querySelector('[slot="footer-left"]') ||
      !!this.element.querySelector('[slot="footer-right"]'));
  }
  get buttonsJsx() {
    return (h("div", { class: "flex py-1 space-x-24 justify-end flex-row-reverse space-x-reverse items-center max-w-full", "data-testid": "buttons" }, this.buttons.map((button, index) => {
      // If not specified, set btnType automatically for primary, secondary, and tertiary buttons
      let { btnType } = button;
      if (!btnType)
        btnType = index === 0 ? 'contained' : index === 1 ? 'outlined' : 'text';
      return (h("mx-button", Object.assign({}, button, { xl: true, "btn-type": btnType }), button.label));
    })));
  }
  get modalContentClasses() {
    let str = 'bg-modal-content order-2 flex-1 px-24 sm:px-40 py-16 sm:py-24 overflow-auto overscroll-none border-b';
    if (this.contentClass)
      str += ' ' + this.contentClass;
    return str;
  }
  render() {
    return (h(Host, { class: this.hostClass, "aria-labelledby": this.hasHeader ? this.uuid + '-header-text' : null, "aria-modal": "true", role: "dialog" }, h("div", { ref: el => (this.backdrop = el), class: 'bg-modal-backdrop absolute inset-0 z-0' + (this.closeOnOutsideClick ? ' cursor-pointer' : ''), "data-testid": "backdrop", onClick: this.onBackdropClick.bind(this) }), h("div", { ref: el => (this.modal = el), class: this.modalClass, style: { maxWidth: this.minWidths.md && (this.fromRight || this.fromLeft) ? '37.5rem' : '' } }, h("div", { tabindex: "0", class: this.modalContentClasses, "data-testid": "modal-content" }, this.description && (h("p", { class: "text-4 my-0 mb-16 sm:mb-24", "data-testid": "modal-description" }, this.description)), h("slot", null), this.hasCard && (h("div", null, h("div", { class: "bg-modal-card min-h-full px-24 sm:px-40 py-16 sm:py-24 rounded-2xl", "data-testid": "modal-card" }, h("slot", { name: "card" }))))), h("footer", { class: 'bg-modal-footer order-3 flex items-center justify-between h-80 py-20 px-40' +
        (this.hasFooter ? '' : ' hidden') }, h("div", null, h("slot", { name: "footer-left" }, this.previousPageUrl && (h("a", { href: this.previousPageUrl, class: "flex items-center uppercase text-4 font-semibold tracking-1-25", "data-testid": "previous-page" }, h("i", { class: "mds-arrow-left mr-10" }), this.previousPageTitle)))), h("div", { class: "ml-16" }, h("slot", { name: "footer-right" }, this.buttons.length > 0 && this.buttonsJsx))), h("mx-page-header", { ref: el => (this.mobilePageHeader = el), class: "order-1 flex-shrink-0", buttons: this.buttons, modal: true, "previous-page-title": this.previousPageTitle, "previous-page-url": this.previousPageUrl }, h("span", { id: this.uuid + '-header-text', "data-testid": "header-text" }, h("slot", { name: "header-left" })), this.hasHeaderBottom && (h("div", { slot: "tabs" }, h("slot", { name: "header-bottom" }))), this.hasHeaderCenter && (h("div", { slot: "modal-header-center", class: "flex items-center justify-center" }, h("slot", { name: "header-center" }))), h("div", { slot: "modal-header-right" }, h("slot", { name: "header-right" }, h("mx-button", { "btn-type": "text", "data-testid": "close-button", onClick: this.mxClose.emit }, "Close")))))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "isOpen": ["toggleModal"],
    "minWidths": ["updateSlottedButtonSize"]
  }; }
};

export { MxModal as mx_modal };
