'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c246f020.js');
const transitions = require('./transitions-a862826f.js');
require('./utils-04d102b7.js');

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