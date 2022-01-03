'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-54a36eac.js');

const MxBadge = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.isStandalone = true;
    /** Make the corners a little more square (best for standalone text) */
    this.squared = false;
    /** Offset badge inward by this many pixels (e.g. 10 for icon buttons) */
    this.offset = 0;
    /** Anchor the badge to the bottom of the wrapped content */
    this.bottom = false;
    /** Anchor the badge to the left of the wrapped content */
    this.left = false;
  }
  componentWillLoad() {
    this.isStandalone = !this.element.firstElementChild;
  }
  get isIconOnly() {
    return this.icon && this.value === undefined;
  }
  get indicatorIcon() {
    if ([false, undefined].includes(this.indicator))
      return null;
    if (this.indicator.length)
      return this.indicator;
    return 'circle';
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
    return (index.h(index.Host, { class: "mx-badge inline-flex relative" }, index.h("slot", null), this.indicatorIcon ? (index.h("span", { class: this.badgeClassNames, "data-testid": 'indicator-' + this.indicatorIcon }, index.h("i", { class: 'mds-badge-' + this.indicatorIcon }))) : (index.h("span", { class: this.badgeClassNames }, this.icon && index.h("i", { class: this.icon + (this.isIconOnly ? '' : ' mr-4') }), this.value))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_badge = MxBadge;
