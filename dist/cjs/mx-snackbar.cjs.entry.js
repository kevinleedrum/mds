'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f1d14aa.js');
const transitions = require('./transitions-4e1f18be.js');
const portal = require('./portal-0b4649d0.js');
require('./utils-1f7ef40d.js');

const snackbarQueue = []; // Deferred promises
const MxSnackbar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxClose = index.createEvent(this, "mxClose", 7);
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
        portal.moveToPortal(this.element);
        this.isVisible = true;
        transitions.fadeScaleIn(this.alertEl, undefined, 'center');
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
    await transitions.fadeOut(this.alertEl);
    this.isOpen = false;
  }
  get alertClass() {
    let str = 'mx-snackbar-alert flex flex-wrap items-center justify-between rounded-lg text-4 max-w-360 sm:w-360 shadow-6 px-16 py-14';
    return str;
  }
  render() {
    return (index.h(index.Host, { class: 'flex fixed w-full z-50 left-0 bottom-40 px-16 justify-center' + (this.isVisible ? '' : ' hidden') }, index.h("div", { ref: el => (this.alertEl = el), role: "alert", class: this.alertClass }, index.h("p", { class: "my-0" }, index.h("slot", null)), index.h("div", { class: "ml-auto", onClick: this.close.bind(this) }, index.h("slot", { name: "action" })))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "isOpen": ["toggleSnackbar"]
  }; }
};

exports.mx_snackbar = MxSnackbar;
