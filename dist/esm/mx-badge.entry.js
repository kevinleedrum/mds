import { r as registerInstance, h, H as Host, g as getElement } from './index-51a85981.js';

const MxBadge = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** Make the corners a little more square (best for standalone text) */
    this.squared = false;
    /** Display as a small dot (no value) */
    this.dot = false;
    /** Offset badge inward by this many pixels (e.g. 10 for icon buttons) */
    this.offset = 0;
    /** Anchor the badge to the bottom of the wrapped content */
    this.bottom = false;
    /** Anchor the badge to the left of the wrapped content */
    this.left = false;
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
    if (this.dot || this.isIconOnly) {
      str += ' rounded-full';
    }
    else if (this.squared) {
      str += ' rounded';
    }
    else {
      str += ' rounded-xl';
    }
    // Width & Height
    if (this.dot) {
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
    return (h(Host, { class: "mx-badge inline-flex relative" }, h("slot", null), h("span", { class: this.badgeClassNames }, this.icon && h("i", { class: this.icon + (this.isIconOnly ? '' : ' mr-4') }), this.value)));
  }
  get element() { return getElement(this); }
};

export { MxBadge as mx_badge };
