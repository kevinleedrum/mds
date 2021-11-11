import { r as registerInstance, h, H as Host, g as getElement } from './index-540e1634.js';

const DIAMETER = 44;
const THICKNESS = 3.6;
const RADIUS = (DIAMETER - THICKNESS) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const MxCircularProgress = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. */
    this.value = null;
    /** The value to use for the width and height */
    this.size = '3rem';
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
  get hostStyle() {
    const style = { width: this.size, height: this.size };
    // Determinate
    if (this.value != null)
      style.transform = 'rotate(-90deg)';
    // Indeterminate
    else
      style.animation = 'spin 1.4s linear infinite';
    return style;
  }
  get circleStyle() {
    const style = { stroke: 'currentColor' };
    if (this.value != null) {
      // Determinate
      style.transition = 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      style.strokeDasharray = CIRCUMFERENCE.toFixed(3);
      style.strokeDashoffset = (((100 - this.value) / 100) * CIRCUMFERENCE).toFixed(3) + 'px';
    }
    else {
      // Indeterminate
      style.strokeDasharray = '80px, 200px';
      style.strokeDashoffset = '0';
      style.animation = 'indeterminate 1.4s ease-in-out infinite';
    }
    return style;
  }
  render() {
    return (h(Host, { style: this.hostStyle, class: "mx-circular-progress inline-block pointer-events-none", role: "progressbar", "aria-valuenow": this.value != null ? Math.round(this.value) : null, "aria-valuemin": this.value != null ? 0 : null, "aria-valuemax": this.value != null ? 100 : null }, h("div", { class: "flex items-center justify-center relative h-full p-2" }, h("svg", { class: "absolute", viewBox: [DIAMETER / 2, DIAMETER / 2, DIAMETER, DIAMETER].join(' ') }, h("circle", { style: this.circleStyle, cx: DIAMETER, cy: DIAMETER, r: RADIUS, "stroke-width": THICKNESS, fill: "none" })))));
  }
  get element() { return getElement(this); }
};

export { MxCircularProgress as mx_circular_progress };
