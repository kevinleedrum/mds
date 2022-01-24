'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7252b109.js');
const utils = require('./utils-33993629.js');
const minWidthSync = require('./minWidthSync-93e92215.js');

const MxTabs = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxChange = index.createEvent(this, "mxChange", 7);
    /** Stretch tabs to fill the entire width */
    this.fill = false;
    /** The index of the selected tab */
    this.value = null;
    this.minWidths = new minWidthSync.MinWidths();
  }
  connectedCallback() {
    minWidthSync.minWidthSync.subscribeComponent(this);
  }
  animateIndicator(tabIndex, previousTabIndex) {
    if (utils.queryPrefersReducedMotion())
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
    const scaleX = previousSelectedTab.offsetWidth / newSelectedTab.offsetWidth;
    const indicator = newSelectedTab.querySelector('.active-tab-indicator');
    if (!indicator)
      return;
    // Position clicked tab's indicator under the tab that is being deselected
    indicator.style.transform = `translateX(${distance}px) scale3d(${scaleX}, 1, 1)`;
    indicator.style.transformOrigin = 'left';
    indicator.style.transition = `none`;
    // Transition the indicator back to the clicked tab
    setTimeout(() => {
      indicator.style.transform = `translateX(0) scale3d(1, 1, 1)`;
      indicator.style.transition = `transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)`;
    }, 0);
  }
  disconnectedCallback() {
    minWidthSync.minWidthSync.unsubscribeComponent(this);
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
    str += ' grid-flow-col auto-cols-auto';
    return str;
  }
  render() {
    return (index.h(index.Host, { class: "mx-tabs relative block", role: "tablist" }, this.renderAsSelect ? (index.h("mx-select", { value: this.value, onInput: this.onInput.bind(this), dense: true }, this.tabs.map((tab, index$1) => (index.h("option", { value: index$1 }, tab.label || tab.elAriaLabel))))) : (this.tabs && (index.h("div", { class: this.gridClass }, this.tabs.map((tab, index$1) => (index.h("mx-tab", Object.assign({ selected: this.value === index$1 }, tab)))))))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["animateIndicator"]
  }; }
};

exports.mx_tabs = MxTabs;
