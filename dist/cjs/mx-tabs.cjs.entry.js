'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-62cba631.js');

function queryPrefersReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery || mediaQuery.matches;
}

const MxTabs = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxChange = index.createEvent(this, "mxChange", 7);
    /** Stretch tabs to fill the entire width */
    this.fill = false;
    /** The index of the selected tab (not needed if manually setting the `selected` prop on each tab) */
    this.value = null;
  }
  // Listen to keyup and mouseup so we can get the selected tab before the click event changes it
  onKeyUp(e) {
    if (e.key === 'Enter' || e.key === ' ')
      this.animateIndicator(e);
  }
  onMouseUp(e) {
    this.animateIndicator(e);
  }
  // Get the clicked tab's index and emit it via the mxChange event
  onClick(e) {
    const tab = e.target.closest('mx-tab');
    if (!tab)
      return;
    const tabs = this.element.querySelectorAll('mx-tab');
    const tabIndex = Array.prototype.indexOf.call(tabs, tab);
    if (tabIndex >= 0)
      this.mxChange.emit(tabIndex);
  }
  onValueChange() {
    this.animateIndicator(null, this.value);
    this.setSelectedTab();
  }
  connectedCallback() {
    if (this.value !== null)
      this.setSelectedTab();
  }
  setSelectedTab() {
    const tabs = this.element.querySelectorAll('mx-tab');
    tabs.forEach((tab, index) => {
      tab.selected = index === this.value;
    });
  }
  animateIndicator(e, newSelectedTabIndex) {
    if (queryPrefersReducedMotion())
      return;
    if (this.value !== null && this.value === newSelectedTabIndex)
      return; // no need to animate
    // Find the distance between the clicked tab and the soon-to-be-deselected tab
    const currentSelectedTab = this.element.querySelector('mx-tab[selected]');
    let clickedTab;
    if (e) {
      clickedTab = e.target.closest('mx-tab');
    }
    else if (newSelectedTabIndex >= 0) {
      const tabs = this.element.querySelectorAll('mx-tab');
      clickedTab = tabs[newSelectedTabIndex];
    }
    if (!currentSelectedTab || !clickedTab || clickedTab.tagName !== 'MX-TAB')
      return;
    const distance = currentSelectedTab.offsetLeft - clickedTab.offsetLeft;
    const indicator = clickedTab.querySelector('.active-tab-indicator');
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
  get gridClass() {
    let str = this.fill ? 'grid' : 'inline-grid';
    str += ' grid-flow-col auto-cols-fr';
    return str;
  }
  render() {
    return (index.h(index.Host, { class: "mx-tabs relative block", role: "tablist" }, index.h("div", { class: this.gridClass }, index.h("slot", null))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

exports.mx_tabs = MxTabs;
