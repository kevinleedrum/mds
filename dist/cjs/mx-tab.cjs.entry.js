'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-62cba631.js');
const ripple = require('./ripple-b35647b1.js');

const MxTab = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** Label text to display */
    this.label = '';
    /** If you are not providing a `label`, this should be provided instead for accessibility */
    this.ariaLabel = '';
    /** Class name of icon to display */
    this.icon = '';
    /** Only set this if you are not using the `mx-tabs` `value` prop */
    this.selected = false;
    /** Display a dot badge */
    this.badge = false;
    /** Additional classes for the badge */
    this.badgeClass = '';
  }
  onClick(e) {
    ripple.ripple(e, this.btnElem);
  }
  get tabClass() {
    let str = 'mx-tab relative inline-flex items-center justify-center min-w-full';
    str += this.label && this.icon ? ' h-72' : ' h-48';
    if (this.badge && this.label)
      str += ' wider';
    return str;
  }
  get badgeEl() {
    return index.h("mx-badge", { dot: true, badgeClass: ['w-8 h-8', this.badgeClass].join(' ') });
  }
  render() {
    return (index.h(index.Host, { class: this.tabClass }, index.h("button", { ref: el => (this.btnElem = el), role: "tab", type: "button", "aria-selected": this.selected, "aria-label": this.label || this.ariaLabel, class: "relative overflow-hidden w-full h-full border border-transparent", onClick: this.onClick.bind(this) }, index.h("div", { class: "relative flex flex-col items-center justify-center space-y-6 pointer-events-none" }, index.h("span", { class: "flex items-center space-x-6" }, !this.label && this.badge && this.badgeEl, this.icon && index.h("i", { class: this.icon + ' text-xl' + (!this.label ? ' icon-only' : '') })), this.label && (index.h("span", { class: "flex items-center uppercase text-sm font-semibold leading-4 tracking-1-25 space-x-6" }, this.badge && this.badgeEl, index.h("span", null, this.label))))), index.h("span", { class: 'active-tab-indicator absolute bottom-0 left-0 w-full h-2 pointer-events-none' +
        (this.selected ? '' : ' opacity-0') })));
  }
};

exports.mx_tab = MxTab;
