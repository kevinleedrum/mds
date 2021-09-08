import { r as registerInstance, h, H as Host, g as getElement } from './index-62f53352.js';

const circleSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
  <circle cx="6" cy="6" r="6" fill="currentColor"/>
</svg>`;

const hexagonSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M6 0L11.1962 3V9L6 12L0.803848 9V3L6 0Z" fill="currentColor"/>
</svg>`;

const squareSvg = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
  <rect width="10" height="10" fill="currentColor"/>
</svg>`;

const starSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M6 0.5L7.76336 4.07295L11.7063 4.6459L8.85317 7.42705L9.52671 11.3541L6 9.5L2.47329 11.3541L3.14683 7.42705L0.293661 4.6459L4.23664 4.07295L6 0.5Z" fill="currentColor"/>
</svg>`;

const triangleDownSvg = `<svg width="12" height="10" viewBox="0 0 12 10" fill="none">
  <path d="M6.00011 10L12 0H0L6.00011 10Z" fill="currentColor"/>
</svg>`;

const triangleUpSvg = `<svg width="12" height="10" viewBox="0 0 12 10" fill="none">
  <path d="M6.00011 0L12 10H0L6.00011 0Z" fill="currentColor"/>
</svg>`;

const MxBadge = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** Make the corners a little more square (best for standalone text) */
    this.squared = false;
    /** Offset badge inward by this many pixels (e.g. 10 for icon buttons) */
    this.offset = 0;
    /** Anchor the badge to the bottom of the wrapped content */
    this.bottom = false;
    /** Anchor the badge to the left of the wrapped content */
    this.left = false;
  }
  get indicatorSvg() {
    if (this.indicator === 'star')
      return starSvg;
    if (this.indicator === 'triangle-down')
      return triangleDownSvg;
    if (this.indicator === 'hexagon')
      return hexagonSvg;
    if (this.indicator === 'triangle-up')
      return triangleUpSvg;
    if (this.indicator === 'square')
      return squareSvg;
    return circleSvg;
  }
  get isStandalone() {
    return !this.element.firstElementChild;
  }
  get isIconOnly() {
    return this.icon && this.value === undefined;
  }
  get badgeClassNames() {
    let str = 'badge inline-flex items-center justify-center text-4 font-semibold pointer-events-none';
    // Border-Radius
    if (this.isIconOnly) {
      str += ' rounded-full';
    }
    else if (this.squared) {
      str += ' rounded';
    }
    else {
      str += ' rounded-xl';
    }
    // Width & Height
    if (this.indicator != null) {
      str += ' w-12 h-12';
    }
    else if (this.isStandalone) {
      str += ' h-24';
      str += this.isIconOnly ? ' w-24' : ' px-8';
    }
    else {
      str += ' h-20';
      str += this.isIconOnly ? ' w-20' : ' px-6';
    }
    // Position Anchored Badge
    if (!this.isStandalone) {
      str += ' absolute transform';
      if (this.bottom) {
        str += ` bottom-${this.offset} translate-y-1/2`;
        str += this.left ? ' origin-bottom-left' : ' origin-bottom-right';
      }
      else {
        str += ` top-${this.offset} -translate-y-1/2`;
        str += this.left ? ' origin-top-left' : ' origin-top-right';
      }
      str += this.left ? ` left-${this.offset} -translate-x-1/2` : ` right-${this.offset} translate-x-1/2`;
    }
    return [str, this.badgeClass].join(' ');
  }
  render() {
    return (h(Host, { class: "mx-badge inline-flex relative" }, h("slot", null), this.indicator != null ? (h("span", { class: this.badgeClassNames, "data-testid": 'indicator-' + (this.indicator || 'circle'), innerHTML: this.indicatorSvg })) : (h("span", { class: this.badgeClassNames }, this.icon && h("i", { class: this.icon + (this.isIconOnly ? '' : ' mr-4') }), this.value))));
  }
  get element() { return getElement(this); }
};

export { MxBadge as mx_badge };
