'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c246f020.js');
const minWidthSync = require('./minWidthSync-93e92215.js');
const portal = require('./portal-0dd8e89e.js');
const transitions = require('./transitions-0aeffc5e.js');
const arrowLeft = require('./arrow-left-a3a34f65.js');
require('./utils-1f7ef40d.js');

const MxModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxClose = index.createEvent(this, "mxClose", 7);
    this.hasCard = false;
    this.hasHeader = false;
    /** An array of prop objects for buttons to display in the button tray.  Use the `label` property to specify the button's inner text. */
    this.buttons = [];
    /** If set to false, pressing Escape will not close the modal. */
    this.closeOnEscape = true;
    /** If set to false, clicking the backdrop will not close the modal. */
    this.closeOnOutsideClick = true;
    /** Additional classes for the inner scrolling container. */
    this.contentClass = '';
    /** Toggle the modal */
    this.isOpen = false;
    /** The text to display for the previous page link */
    this.previousPageTitle = 'Back';
    /** The URL for the previous page link */
    this.previousPageUrl = '';
    /** Set to true to stretch the modal to nearly fill the width and height of the page
     * (on desktop-sized screens).  Otherwise, the maximum dimensions are 800x600px. */
    this.large = false;
    this.minWidths = new minWidthSync.MinWidths();
    this.isVisible = false;
  }
  toggleModal() {
    this.isOpen ? this.openModal() : this.closeModal();
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
    minWidthSync.minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.minWidthSync.unsubscribeComponent(this);
  }
  async openModal() {
    portal.moveToPortal(this.element);
    this.isVisible = true;
    requestAnimationFrame(async () => {
      this.getFocusElements();
      await Promise.all([transitions.fadeIn(this.backdrop, 250), transitions.fadeScaleIn(this.modal, 250)]);
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
    await Promise.all([transitions.fadeOut(this.backdrop), transitions.fadeOut(this.modal)]);
    this.isVisible = false;
    // Restore focus to the element that was focused before the modal was opened
    this.ancestorFocusedElement && this.ancestorFocusedElement.focus();
  }
  onBackdropClick() {
    if (this.closeOnOutsideClick)
      this.mxClose.emit();
  }
  get hostClass() {
    let str = 'mx-modal fixed inset-0 flex pt-24 sm:pt-0 items-stretch sm:items-center justify-center';
    if (!this.isVisible)
      str += ' hidden';
    if (this.minWidths.sm) {
      str += this.large ? ' modal-large' : ' modal-medium';
    }
    return str;
  }
  get hasFooter() {
    return ((this.minWidths.md && (!!this.previousPageUrl || this.buttons.length > 0)) ||
      !!this.element.querySelector('[slot="footer-left"]') ||
      !!this.element.querySelector('[slot="footer-right"]'));
  }
  get buttonsJsx() {
    return (index.h("div", { class: "flex py-1 space-x-24 justify-end flex-row-reverse space-x-reverse items-center max-w-full", "data-testid": "buttons" }, this.buttons.map((button, index$1) => {
      // If not specified, set btnType automatically for primary, secondary, and tertiary buttons
      let { btnType } = button;
      if (!btnType)
        btnType = index$1 === 0 ? 'contained' : index$1 === 1 ? 'outlined' : 'text';
      return (index.h("mx-button", Object.assign({}, button, { xl: true, "btn-type": btnType }), button.label));
    })));
  }
  get modalContentClasses() {
    let str = 'bg-modal-content order-2 flex-1 px-24 sm:px-40 py-16 sm:py-24 overflow-auto overscroll-none border-b';
    if (this.contentClass)
      str += ' ' + this.contentClass;
    return str;
  }
  render() {
    const headerLeftSlotContent = this.element.querySelector('[slot="header-left"]');
    return (index.h(index.Host, { class: this.hostClass, "aria-labelledby": this.hasHeader ? 'headerText' : null, "aria-modal": "true", role: "dialog" }, index.h("div", { ref: el => (this.backdrop = el), class: 'bg-modal-backdrop absolute inset-0 z-0' + (this.closeOnOutsideClick ? ' cursor-pointer' : ''), "data-testid": "backdrop", onClick: this.onBackdropClick.bind(this) }), index.h("div", { ref: el => (this.modal = el), class: "modal flex flex-col rounded-lg shadow-9 relative overflow-hidden" }, index.h("div", { class: this.modalContentClasses, "data-testid": "modal-content" }, this.description && (index.h("p", { class: "text-4 my-0 mb-16 sm:mb-24", "data-testid": "modal-description" }, this.description)), index.h("slot", null), this.hasCard && (index.h("div", null, index.h("div", { class: "bg-modal-card min-h-full px-24 sm:px-40 py-16 sm:py-24 rounded-2xl", "data-testid": "modal-card" }, index.h("slot", { name: "card" }))))), index.h("footer", { class: 'bg-modal-footer order-3 flex items-center justify-between h-80 py-20 px-40' +
        (this.hasFooter ? '' : ' hidden') }, index.h("div", null, index.h("slot", { name: "footer-left" }, this.previousPageUrl && (index.h("a", { href: this.previousPageUrl, class: "flex items-center uppercase text-4 font-semibold tracking-1-25", "data-testid": "previous-page" }, index.h("span", { class: "mr-10", innerHTML: arrowLeft.arrowSvg }), this.previousPageTitle)))), index.h("div", { class: "ml-16" }, index.h("slot", { name: "footer-right" }, this.buttons.length > 0 && this.buttonsJsx))), index.h("mx-page-header", { ref: el => (this.mobilePageHeader = el), class: "md:hidden order-1", buttons: this.buttons, "previous-page-title": this.previousPageTitle, "previous-page-url": this.previousPageUrl }, headerLeftSlotContent && headerLeftSlotContent.innerHTML), index.h("header", { class: "hidden md:block bg-modal-header order-1 px-40" }, index.h("div", { class: "flex items-center justify-between min-h-80" }, index.h("div", { id: "headerText", class: "text-h5 emphasis !my-0", "data-testid": "header-text" }, index.h("slot", { name: "header-left" })), index.h("div", null, index.h("slot", { name: "header-right" }, index.h("mx-button", { "btn-type": "text", "data-testid": "close-button", onClick: this.mxClose.emit }, "Close")))), index.h("div", { ref: el => (this.headerBottomSlotWrapper = el) }, index.h("slot", { name: "header-bottom" }))))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "isOpen": ["toggleModal"]
  }; }
};

exports.mx_modal = MxModal;