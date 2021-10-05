import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-935f3e8d.js';
import { f as fadeScaleIn, a as fadeOut } from './transitions-1b14863d.js';
import './utils-bad68038.js';

const snackbarQueue = []; // Deferred promises
const MxSnackbar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxClose = createEvent(this, "mxClose", 7);
    this.duration = 6000;
    this.isOpen = false;
    this.isVisible = false;
  }
  async toggleSnackbar() {
    clearTimeout(this.durationTimer);
    if (this.isOpen) {
      try {
        await this.waitForOtherSnackbars();
        this.durationTimer = setTimeout(this.close.bind(this), this.duration);
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
  componentWillLoad() {
    this.createSnackbarPortal();
    this.portal.append(this.element);
  }
  createSnackbarPortal() {
    this.portal = document.querySelector('.snackbar-portal');
    if (this.portal)
      return;
    this.portal = document.createElement('div');
    this.portal.classList.add('snackbar-portal', 'mds');
    document.body.append(this.portal);
  }
  async close() {
    if (!this.isOpen)
      return;
    await fadeOut(this.alertEl);
    this.isOpen = false;
  }
  get alertClass() {
    let str = 'mx-snackbar-alert flex flex-wrap items-center justify-between rounded-lg text-4 max-w-360 sm:w-360 shadow-6 px-16 py-14';
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