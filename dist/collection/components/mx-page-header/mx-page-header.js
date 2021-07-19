var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';
import { ResizeObserver } from '@juggle/resize-observer';
import dotsSvg from '../../assets/svg/dots-vertical.svg';
import arrowSvg from '../../assets/svg/arrow-left.svg';
export class MxPageHeader {
  constructor() {
    this.hasTabs = false;
    /** An array of prop objects for each button.  Use the `label` property to specify the button's inner text. */
    this.buttons = [];
    /** The URL for the previous page link */
    this.previousPageUrl = '';
    /** The text to display for the previous page link */
    this.previousPageTitle = 'Back';
    /** When set to true, the Page Header will use the themed background pattern. */
    this.pattern = false;
    this.minWidths = new MinWidths();
    this.renderTertiaryButtonAsMenu = false;
  }
  componentWillLoad() {
    this.hasTabs = !!this.element.querySelector('[slot="tabs"]');
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
    this.resizeObserver.disconnect();
  }
  updateRenderTertiaryButtonAsMenu() {
    // Only move tertiary button to menu, and only for small screens
    if (this.minWidths.md || this.buttons.length < 3) {
      this.renderTertiaryButtonAsMenu = false;
      return;
    }
    if (!this.tertiaryButtonWrapper)
      return;
    const { left } = this.tertiaryButtonWrapper.getBoundingClientRect();
    const buttonRight = Math.floor(left + this.tertiaryButtonWrapper.offsetWidth);
    const { right: containerRight } = this.buttonRow.getBoundingClientRect();
    const isOverflowing = buttonRight > containerRight;
    this.renderTertiaryButtonAsMenu = isOverflowing;
    if (isOverflowing) {
      requestAnimationFrame(() => {
        if (this.tertiaryMenu)
          this.tertiaryMenu.anchorEl = this.menuButton;
      });
    }
  }
  componentDidLoad() {
    this.resizeObserver = new ResizeObserver(() => this.updateRenderTertiaryButtonAsMenu());
    this.resizeObserver.observe(this.element);
    // Wait one tick for layout shifts in order to detect overflow correctly.
    requestAnimationFrame(this.updateRenderTertiaryButtonAsMenu.bind(this));
  }
  get hostClass() {
    let str = 'mx-page-header flex flex-col px-24 lg:px-72';
    if (this.pattern)
      str += ' bg-pattern';
    if (this.hasTabs)
      str += ' pb-12 md:pb-0';
    if (this.buttons.length && this.hasTabs)
      str += ' min-h-176 md:min-h-164';
    else if (this.buttons.length)
      str += ' min-h-128';
    else
      str += ' min-h-80 md:min-h-128';
    return str;
  }
  get headingClass() {
    let str = 'my-0 pr-20 emphasis ';
    if (!this.minWidths.md)
      str += this.previousPageUrl ? 'text-h6' : 'text-h5';
    else
      str += this.previousPageUrl ? 'text-h5' : 'text-h3';
    return str;
  }
  get buttonsJsx() {
    return (h("div", { ref: el => (this.buttonRow = el), class: "flex py-1 space-x-8 md:space-x-24 md:justify-end md:flex-row-reverse md:space-x-reverse items-center max-w-full" }, this.buttons.map((button, index) => {
      // If not specified, set btnType automatically for primary, secondary, and tertiary buttons
      let { btnType } = button;
      if (!btnType)
        btnType = index === 0 ? 'contained' : index === 1 ? 'outlined' : 'text';
      const isTertiary = index === 2;
      const { label } = button, menuItemProps = __rest(button, ["label"]); // Do not use button label as menu item label (use in slot instead)
      return (h("div", { ref: el => isTertiary && (this.tertiaryButtonWrapper = el), class: isTertiary ? 'relative !ml-auto md:!ml-0' : '' },
        isTertiary && this.renderTertiaryButtonAsMenu && (h("div", { class: "absolute !ml-auto -top-6" },
          h("mx-icon-button", { ref: el => (this.menuButton = el), innerHTML: dotsSvg }),
          h("mx-menu", { ref: el => (this.tertiaryMenu = el), "anchor-el": this.menuButton },
            h("mx-menu-item", Object.assign({}, menuItemProps), button.label)))),
        h("mx-button", Object.assign({}, button, { xl: this.minWidths.lg, "btn-type": btnType, "aria-hidden": isTertiary && this.renderTertiaryButtonAsMenu, class: isTertiary && this.renderTertiaryButtonAsMenu ? 'opacity-0 pointer-events-none' : '' }), button.label)));
    })));
  }
  render() {
    return (h(Host, { class: this.hostClass },
      h("slot", { name: "previous-page" }, this.previousPageUrl && (h("a", { href: this.previousPageUrl, class: "flex items-center pt-16 md:pt-20 uppercase caption1 font-semibold tracking-1-25" },
        h("span", { class: "mr-10", innerHTML: arrowSvg }),
        this.previousPageTitle))),
      h("div", { class: "flex flex-col py-10 space-y-14 md:space-y-0 md:flex-row flex-grow md:items-center justify-center md:justify-between flex-wrap" },
        h("h1", { class: this.headingClass },
          h("slot", null)),
        this.buttons.length > 0 && this.buttonsJsx,
        h("slot", { name: "buttons" })),
      h("slot", { name: "tabs" })));
  }
  static get is() { return "mx-page-header"; }
  static get properties() { return {
    "buttons": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IPageHeaderButton[]",
        "resolved": "IPageHeaderButton[]",
        "references": {
          "IPageHeaderButton": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "An array of prop objects for each button.  Use the `label` property to specify the button's inner text."
      },
      "defaultValue": "[]"
    },
    "previousPageUrl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The URL for the previous page link"
      },
      "attribute": "previous-page-url",
      "reflect": false,
      "defaultValue": "''"
    },
    "previousPageTitle": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The text to display for the previous page link"
      },
      "attribute": "previous-page-title",
      "reflect": false,
      "defaultValue": "'Back'"
    },
    "pattern": {
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
        "text": "When set to true, the Page Header will use the themed background pattern."
      },
      "attribute": "pattern",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "minWidths": {},
    "renderTertiaryButtonAsMenu": {}
  }; }
  static get elementRef() { return "element"; }
}
