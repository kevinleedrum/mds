import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-23d59bdf.js';
import { d as fadeScaleIn, b as fadeOut } from './transitions-29f7f3e5.js';
import { m as moveToPortal } from './portal-9203402a.js';
import './utils-eee50014.js';

const snackbarQueue = []; // Deferred promises
const MxSnackbar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxClose = createEvent(this, "mxClose", 7);
    /** The duration in milliseconds to show the snackbar before automatically closing. */
    this.duration = 6000;
    /** Toggles the visibility of the snackbar. */
    this.isOpen = false;
    this.isVisible = false;
  }
  async toggleSnackbar() {
    clearTimeout(this.durationTimer);
    if (this.isOpen) {
      try {
        await this.waitForOtherSnackbars();
        this.durationTimer = setTimeout(this.close.bind(this), this.duration);
        moveToPortal(this.element);
        this.isVisible = true;
        fadeScaleIn(this.alertEl, undefined, 'center');
      }
      catch (err) {
        // Snackbar was closed programmatically before leaving the queue; do nothing.
      }
    }
    else {
      this.removeFromQueue();
      this.isVisible = false;
      this.mxClose.emit();
    }
  }
  waitForOtherSnackbars() {
    return new Promise((resolve, reject) => {
      this.queueItem = { resolve, reject };
      snackbarQueue.push(this.queueItem);
      if (snackbarQueue.length === 1)
        return resolve();
    });
  }
  removeFromQueue() {
    if (!this.queueItem)
      return;
    const queueIndex = snackbarQueue.indexOf(this.queueItem);
    snackbarQueue.splice(snackbarQueue.indexOf(this.queueItem), 1);
    if (queueIndex === 0 && snackbarQueue.length > 0)
      snackbarQueue[0].resolve(); // Show next snackbar in queue
  }
  async close() {
    if (!this.isOpen)
      return;
    await fadeOut(this.alertEl);
    this.isOpen = false;
  }
  get alertClass() {
    const str = 'mx-snackbar-alert flex flex-wrap items-center justify-between rounded-lg text-4 max-w-360 sm:w-360 shadow-6 px-16 py-14';
    return str;
  }
  render() {
    return (h(Host, { class: 'flex fixed w-full z-50 left-0 bottom-40 px-16 justify-center' + (this.isVisible ? '' : ' hidden') }, h("div", { ref: el => (this.alertEl = el), role: "alert", class: this.alertClass }, h("p", { class: "my-0" }, h("slot", null)), h("div", { class: "ml-auto", onClick: this.close.bind(this) }, h("slot", { name: "action" })))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "isOpen": ["toggleSnackbar"]
  }; }
};

export { MxSnackbar as mx_snackbar };
