import { Component, Host, h, Element, Watch, Prop, Event, State } from '@stencil/core';
import { fadeOut, fadeScaleIn } from '../../utils/transitions';
const snackbarQueue = []; // Deferred promises
export class MxSnackbar {
  constructor() {
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
    return (h(Host, { class: 'flex fixed w-full z-50 left-0 bottom-40 px-16 justify-center' + (this.isVisible ? '' : ' hidden') },
      h("div", { ref: el => (this.alertEl = el), role: "alert", class: this.alertClass },
        h("p", { class: "my-0" },
          h("slot", null)),
        h("div", { class: "ml-auto", onClick: this.close.bind(this) },
          h("slot", { name: "action" })))));
  }
  static get is() { return "mx-snackbar"; }
  static get properties() { return {
    "duration": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "duration",
      "reflect": false,
      "defaultValue": "6000"
    },
    "isOpen": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "is-open",
      "reflect": true,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "isVisible": {}
  }; }
  static get events() { return [{
      "method": "mxClose",
      "name": "mxClose",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "isOpen",
      "methodName": "toggleSnackbar"
    }]; }
}
