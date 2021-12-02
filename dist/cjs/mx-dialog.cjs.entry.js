'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f1d14aa.js');
const bodyScroll = require('./bodyScroll-0692b749.js');
const portal = require('./portal-0b4649d0.js');
const transitions = require('./transitions-4e1f18be.js');
require('./utils-1f7ef40d.js');

const MxDialog = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.isVisible = false;
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
  disconnectedCallback() {
    bodyScroll.unlockBodyScroll(this.element);
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
    this.ancestorFocusedElement = document.activeElement;
    portal.moveToPortal(this.element);
    bodyScroll.lockBodyScroll(this.element);
    this.isVisible = true;
    await new Promise(resolve => requestAnimationFrame(resolve));
    await Promise.all([transitions.fadeIn(this.backdrop), transitions.fadeScaleIn(this.modal)]);
  }
  async closeDialog(isConfirmed = false) {
    await Promise.all([transitions.fadeOut(this.backdrop), transitions.fadeOut(this.modal)]);
    this.isVisible = false;
    bodyScroll.unlockBodyScroll(this.element);
    // Restore focus to the element that was focused before the modal was opened
    this.ancestorFocusedElement && this.ancestorFocusedElement.focus();
    this.deferredResolve(isConfirmed);
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
  render() {
    return (index.h(index.Host, { class: this.hostClass }, index.h("div", { ref: el => (this.backdrop = el), class: "bg-dialog-backdrop absolute inset-0 z-0" }), index.h("div", { ref: el => (this.modal = el), role: "alertdialog", "aria-labelledby": this.heading ? 'dialog-heading' : null, "aria-describedby": this.message ? 'dialog-message' : null, "aria-modal": "true", "data-testid": "modal", class: "modal w-320 flex flex-col rounded-lg shadow-4 relative overflow-hidden" }, index.h("div", { class: "p-24 flex-grow" }, this.heading && (index.h("h1", { id: "dialog-heading", class: "text-h6 emphasis !my-0 pb-16" }, this.heading)), this.message && (index.h("p", { id: "dialog-message", class: "text-4 my-0" }, this.message))), (this.confirmLabel || this.cancelLabel) && (index.h("div", { class: "flex flex-wrap items-center justify-end p-4" }, this.confirmLabel && (index.h("mx-button", { class: "m-4 order-2", btnType: "text", onClick: () => this.closeDialog(true) }, this.confirmLabel)), this.cancelLabel && (index.h("mx-button", { class: "m-4 order-1", btnType: "text", onClick: () => this.closeDialog() }, this.cancelLabel)))))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_dialog = MxDialog;
