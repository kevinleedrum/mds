import { r as registerInstance, h, e as Host } from './index-56b2a4c3.js';
import { r as ripple } from './ripple-a99cb795.js';

const MxTab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    ripple(e, this.btnElem);
  }
  get tabClass() {
    let str = 'mx-tab relative inline-flex items-center justify-center min-w-full';
    str += this.label && this.icon ? ' h-72' : ' h-48';
    if (this.badge && this.label)
      str += ' wider';
    return str;
  }
  get badgeEl() {
    return h("mx-badge", { dot: true, badgeClass: ['w-8 h-8', this.badgeClass].join(' ') });
  }
  render() {
    return (h(Host, { class: this.tabClass }, h("button", { ref: el => (this.btnElem = el), role: "tab", type: "button", "aria-selected": this.selected, "aria-label": this.label || this.ariaLabel, class: "relative overflow-hidden w-full h-full border border-transparent", onClick: this.onClick.bind(this) }, h("div", { class: "relative flex flex-col items-center justify-center space-y-6 pointer-events-none" }, h("span", { class: "flex items-center space-x-6" }, !this.label && this.badge && this.badgeEl, this.icon && h("i", { class: this.icon + ' text-xl' + (!this.label ? ' icon-only' : '') })), this.label && (h("span", { class: "flex items-center uppercase text-sm font-semibold leading-4 tracking-1-25 space-x-6" }, this.badge && this.badgeEl, h("span", null, this.label))))), h("span", { class: 'active-tab-indicator absolute bottom-0 left-0 w-full h-2 pointer-events-none' +
        (this.selected ? '' : ' opacity-0') })));
  }
};

export { MxTab as mx_tab };
