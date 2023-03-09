import { r as registerInstance, h, e as Host } from './index-7d7e62d7.js';
import { r as ripple } from './ripple-140c6d57.js';

const MxTab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = '';
    this.elAriaLabel = '';
    this.icon = '';
    this.selected = false;
    this.badge = false;
    this.badgeClass = '';
  }
  componentDidLoad() {
    if (!this.label && !this.elAriaLabel) {
      throw new Error('Please provide either a label or an aria-label for each tab.');
    }
  }
  onClick(e) {
    ripple(e, this.btnElem);
  }
  get tabClass() {
    let str = 'mx-tab relative inline-flex items-center justify-center min-w-full';
    str += this.label && this.icon ? ' h-72' : ' h-48';
    return str;
  }
  get badgeEl() {
    return h("mx-badge", { indicator: true, badgeClass: ['w-8 h-8', this.badgeClass].join(' ') });
  }
  get isTextOnly() {
    return this.label && !this.icon;
  }
  render() {
    return (h(Host, { class: this.tabClass }, h("button", { ref: el => (this.btnElem = el), role: "tab", type: "button", "aria-selected": this.selected ? 'true' : null, "aria-label": this.elAriaLabel || this.label, class: "relative overflow-hidden w-full h-full border border-transparent px-44", onClick: this.onClick.bind(this) }, h("div", { class: "relative flex flex-col items-center justify-center space-y-6 pointer-events-none" }, !this.isTextOnly && (h("span", { class: "flex items-center space-x-6" }, !this.label && this.badge && this.badgeEl, this.icon && h("i", { class: this.icon + ' text-1' + (!this.label ? ' icon-only' : '') }))), this.label && (h("span", { class: "flex items-center uppercase text-4 font-semibold leading-4 tracking-1-25 space-x-6" }, this.badge && this.badgeEl, h("span", null, this.label))))), h("span", { class: 'active-tab-indicator absolute bottom-0 left-0 w-full h-2 pointer-events-none' +
        (this.selected ? '' : ' opacity-0') })));
  }
};

export { MxTab as mx_tab };
