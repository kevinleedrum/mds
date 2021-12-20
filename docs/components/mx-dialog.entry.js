import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-b3442404.js';
import { u as unlockBodyScroll, l as lockBodyScroll } from './bodyScroll-166c2095.js';
import { m as moveToPortal } from './portal-3ca3a2a3.js';
import { f as fadeIn, d as fadeScaleIn, b as fadeOut } from './transitions-5e6f10a3.js';
import './utils-18e3dfde.js';

const MxDialog = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxClose = createEvent(this, "mxClose", 7);
    this.isSimple = true;
    this.hasButtons = false;
    this.hasHeading = false;
    /** Toggles the visibility of the dialog (when using the slots for content). */
    this.isOpen = false;
    this.isVisible = false;
  }
  onIsOpenChange() {
    this.isOpen ? this.showDialog() : this.closeDialog();
  }
  onKeyDown(e) {
    if (!this.isVisible)
      return;
    const isFocusOutside = () => !document.activeElement || !this.focusElements.includes(document.activeElement);
    if (e.key === 'Tab') {
      this.getFocusElements();
      // Trap focus inside dialog
      if (e.shiftKey && document.activeElement === this.firstFocusElement) {
        this.lastFocusElement.focus();
        e.preventDefault();
      }
      else if (isFocusOutside() || document.activeElement === this.lastFocusElement) {
        this.firstFocusElement && this.firstFocusElement.focus();
        e.preventDefault();
      }
    }
    else if (e.key === 'Enter') {
      // Confirm on Enter (if not already focused on a dialog focusable element)
      this.getFocusElements();
      if (isFocusOutside()) {
        e.preventDefault();
        this.firstFocusElement && this.firstFocusElement.focus();
        this.closeDialog(true);
      }
    }
    else if (e.key === 'Escape') {
      // Cancel on Escape
      this.closeDialog();
      e.preventDefault();
    }
  }
  /** A Promise-based replacement for `Window.alert()` with some additional options */
  async alert(message, { confirmLabel = 'Okay', cancelLabel, heading } = {}) {
    return this.open(message, { heading, confirmLabel, cancelLabel });
  }
  /** A Promise-based replacement for `Window.confirm()` that resolves to a boolean */
  async confirm(message, { confirmLabel = 'Okay', cancelLabel = 'Cancel', heading } = {}) {
    return this.open(message, { heading, confirmLabel, cancelLabel });
  }
  componentWillRender() {
    this.hasHeading = !!this.heading || !!this.element.querySelector('[slot="heading"]');
    this.hasButtons = !!this.confirmLabel || !!this.cancelLabel || !!this.element.querySelector('[slot="buttons"]');
    this.isSimple = !this.element.innerText;
  }
  componentDidLoad() {
    if (this.isOpen)
      this.showDialog();
  }
  disconnectedCallback() {
    unlockBodyScroll(this.element);
  }
  /** Opens a dialog using the provided parameters.
   * If/when we implement confirmation dialogs with inputs, radio groups, etc. this method can be
   * exposed with additional parameters needed to create those dialogs. */
  async open(message, { cancelLabel, confirmLabel, heading } = {}) {
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
    if (this.isVisible)
      return;
    this.ancestorFocusedElement = document.activeElement;
    moveToPortal(this.element);
    lockBodyScroll(this.element);
    this.isVisible = true;
    await new Promise(resolve => requestAnimationFrame(resolve));
    await Promise.all([fadeIn(this.backdrop), fadeScaleIn(this.modal)]);
  }
  async closeDialog(isConfirmed = false) {
    if (!this.isVisible)
      return;
    await Promise.all([fadeOut(this.backdrop), fadeOut(this.modal)]);
    this.isVisible = false;
    unlockBodyScroll(this.element);
    // Restore focus to the element that was focused before the modal was opened
    this.ancestorFocusedElement && this.ancestorFocusedElement.focus();
    if (this.deferredResolve)
      this.deferredResolve(isConfirmed);
    this.mxClose.emit();
  }
  getFocusElements() {
    const isVisible = (el) => !!el.offsetParent;
    this.focusElements = Array.from(this.element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(isVisible);
    if (this.focusElements.length) {
      this.firstFocusElement = this.focusElements[0];
      this.lastFocusElement = this.focusElements[this.focusElements.length - 1];
    }
  }
  get hostClass() {
    let str = 'mx-dialog fixed inset-0 flex items-center justify-center';
    if (!this.isVisible)
      str += ' hidden';
    return str;
  }
  get modalClassNames() {
    let str = 'modal w-320 m-16 flex flex-col rounded-lg shadow-4 relative overflow-hidden';
    if (this.isSimple)
      str += ' w-320';
    if (this.modalClass)
      str += ' ' + this.modalClass;
    return str;
  }
  render() {
    return (h(Host, { class: this.hostClass }, h("div", { ref: el => (this.backdrop = el), class: "bg-dialog-backdrop absolute inset-0 z-0" }), h("div", { ref: el => (this.modal = el), role: "alertdialog", "aria-labelledby": this.heading ? 'dialog-heading' : null, "aria-describedby": this.message ? 'dialog-message' : null, "aria-modal": "true", "data-testid": "modal", class: this.modalClassNames }, h("div", { class: "p-24 text-4 flex-grow overflow-auto", "data-testid": "modal-content" }, this.hasHeading && (h("h1", { id: "dialog-heading", class: "text-h6 emphasis my-0 pb-16", "data-testid": "heading" }, this.heading, h("slot", { name: "heading" }))), this.message && (h("p", { id: "dialog-message", class: "my-0" }, this.message)), h("slot", null)), this.hasButtons && (h("div", { class: "flex flex-wrap items-center justify-end p-4", "data-testid": "button-tray" }, this.confirmLabel && (h("mx-button", { class: "m-4 order-2", btnType: "text", onClick: () => this.closeDialog(true) }, this.confirmLabel)), this.cancelLabel && (h("mx-button", { class: "m-4 order-1", btnType: "text", onClick: () => this.closeDialog() }, this.cancelLabel)), h("slot", { name: "buttons" }))))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "isOpen": ["onIsOpenChange"]
  }; }
};

export { MxDialog as mx_dialog };
