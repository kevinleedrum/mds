import { Component, Host, h, Prop, Element, Watch, Event, Listen, State } from '@stencil/core';
import { queryPrefersReducedMotion } from '../../utils/utils';
const mql = window.matchMedia('(max-width: 720px)');
let mqlListener;
export class MxTabs {
  constructor() {
    /** Stretch tabs to fill the entire width */
    this.fill = false;
    /** The index of the selected tab */
    this.value = null;
    /** When true, render the tabs as an mx-select */
    this.renderAsSelect = false;
  }
  connectedCallback() {
    mqlListener = this.updateRenderAsSelect.bind(this);
    mql.addListener(mqlListener); // addListener is deprecated, but is more widely supported
    this.updateRenderAsSelect();
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
  onTabsPropChange(tabs, previousTabs) {
    if (previousTabs && tabs.length !== previousTabs.length)
      this.updateRenderAsSelect();
  }
  disconnectedCallback() {
    mql.removeListener(mqlListener); // removeListener is deprecated, but is more widely supported
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
  updateRenderAsSelect() {
    const isMobileScreenSize = !mql || mql.matches;
    this.renderAsSelect = isMobileScreenSize && this.tabs && this.tabs.length > 2;
  }
  get gridClass() {
    let str = this.fill ? 'grid' : 'inline-grid';
    str += ' grid-flow-col auto-cols-fr';
    return str;
  }
  render() {
    return (h(Host, { class: "mx-tabs relative block", role: "tablist" }, this.renderAsSelect ? (h("mx-select", { value: this.value, onInput: this.onInput.bind(this) }, this.tabs.map((tab, index) => (h("option", { value: index }, tab.label || tab.ariaLabel))))) : (this.tabs && (h("div", { class: this.gridClass }, this.tabs.map((tab, index) => (h("mx-tab", Object.assign({ selected: this.value === index }, tab)))))))));
  }
  static get is() { return "mx-tabs"; }
  static get properties() { return {
    "fill": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Stretch tabs to fill the entire width"
      },
      "attribute": "fill",
      "reflect": false,
      "defaultValue": "false"
    },
    "value": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The index of the selected tab"
      },
      "attribute": "value",
      "reflect": false,
      "defaultValue": "null"
    },
    "tabs": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IMxTabProps[]",
        "resolved": "IMxTabProps[]",
        "references": {
          "IMxTabProps": {
            "location": "import",
            "path": "../mx-tab/mx-tab"
          }
        }
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "An array of objects for each tab (see Tab Properties)"
      }
    }
  }; }
  static get states() { return {
    "renderAsSelect": {}
  }; }
  static get events() { return [{
      "method": "mxChange",
      "name": "mxChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emits the newly selected tab's index as `Event.detail`"
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }]; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "animateIndicator"
    }, {
      "propName": "tabs",
      "methodName": "onTabsPropChange"
    }]; }
  static get listeners() { return [{
      "name": "click",
      "method": "onClick",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
