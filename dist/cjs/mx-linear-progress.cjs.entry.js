'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-447342ec.js');

const MxLinearProgress = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. */
    this.value = null;
    /** Delay the appearance of the indicator for this many milliseconds */
    this.appearDelay = 0;
  }
  connectedCallback() {
    if (!this.appearDelay)
      return;
    // Hide indicator until appearDelay duration has passed
    this.element.classList.remove('block');
    this.element.classList.add('hidden');
    this.delayTimeout = setTimeout(() => {
      this.element.classList.remove('hidden');
      this.element.classList.add('block');
    }, this.appearDelay);
  }
  disconnectedCallback() {
    clearTimeout(this.delayTimeout);
  }
  get determinateBarStyle() {
    return {
      transform: `translateX(${this.value - 100}%)`,
      transition: 'transform 0.4s linear',
    };
  }
  render() {
    return (index.h(index.Host, { class: "mx-linear-progress block h-4 w-full rounded-sm overflow-hidden pointer-events-none", role: "progressbar", "aria-valuenow": this.value != null ? Math.round(this.value) : null, "aria-valuemin": this.value != null ? 0 : null, "aria-valuemax": this.value != null ? 100 : null }, index.h("div", { class: "relative h-full" }, this.value != null ? (
    // Determinate
    index.h("div", { "data-testid": "determinate", class: "fill h-4 absolute inset-0 rounded-sm", style: this.determinateBarStyle })) : (
    // Indeterminate has two animated bars with nested animations
    [
      index.h("div", { "data-testid": "indeterminate1", class: "indeterminate1 absolute h-full w-full" }, index.h("div", { class: "fill absolute w-full h-full rounded-sm" })),
      index.h("div", { "data-testid": "indeterminate2", class: "indeterminate2 absolute h-full w-full" }, index.h("div", { class: "fill absolute w-full h-full rounded-sm" })),
    ]))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_linear_progress = MxLinearProgress;
