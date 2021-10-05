import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-935f3e8d.js';
import { q as queryPrefersReducedMotion } from './utils-0f21db35.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';

const MxTabs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxChange = createEvent(this, "mxChange", 7);
    /** Stretch tabs to fill the entire width */
    this.fill = false;
    /** The index of the selected tab */
    this.value = null;
    this.minWidths = new MinWidths();
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  animateIndicator(tabIndex, previousTabIndex) {
    if (queryPrefersReducedMotion())
      return;
    if (tabIndex == null || previousTabIndex == null)
      return;
    // Find the distance between the clicked tab and the soon-to-be-deselected tab
    const tabEls = this.element.querySelectorAll('.mx-tab');
    const previousSelectedTab = tabEls[previousTabIndex];
    const newSelectedTab = tabEls[tabIndex];
    if (!previousSelectedTab || !newSelectedTab)
      return;
    const distance = previousSelectedTab.offsetLeft - newSelectedTab.offsetLeft;
    const indicator = newSelectedTab.querySelector('.active-tab-indicator');
    if (!indicator)
      return;
    // Position clicked tab's indicator under the tab that is being deselected
    indicator.style.transform = `translateX(${distance}px)`;
    indicator.style.transition = `none`;
    // Transition the indicator back to the clicked tab
    setTimeout(() => {
      indicator.style.transform = `translateX(0)`;
      indicator.style.transition = `transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)`;
    }, 0);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  // Get the clicked tab's index and emit it via the mxChange event
  onClick(e) {
    const tab = e.target.closest('.mx-tab');
    if (!tab)
      return;
    const tabs = this.element.querySelectorAll('.mx-tab');
    const tabIndex = Array.prototype.indexOf.call(tabs, tab);
    if (tabIndex >= 0)
      this.mxChange.emit(tabIndex);
  }
  // When rendered as an mx-select, emit the select element's value via the mxChange event
  onInput(e) {
    this.mxChange.emit(+e.target.value);
  }
  // When true, render the tabs as an mx-select
  get renderAsSelect() {
    return !this.minWidths.md && this.tabs && this.tabs.length > 2;
  }
  get gridClass() {
    let str = this.fill ? 'grid' : 'inline-grid';
    str += ' grid-flow-col auto-cols-fr';
    return str;
  }
  render() {
    return (h(Host, { class: "mx-tabs relative block", role: "tablist" }, this.renderAsSelect ? (h("mx-select", { value: this.value, onInput: this.onInput.bind(this), dense: true }, this.tabs.map((tab, index) => (h("option", { value: index }, tab.label || tab.ariaLabel))))) : (this.tabs && (h("div", { class: this.gridClass }, this.tabs.map((tab, index) => (h("mx-tab", Object.assign({ selected: this.value === index }, tab)))))))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["animateIndicator"]
  }; }
};

export { MxTabs as mx_tabs };
