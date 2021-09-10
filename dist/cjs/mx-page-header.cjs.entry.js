'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-447342ec.js');
const minWidthSync = require('./minWidthSync-93e92215.js');
const ResizeObserver = require('./ResizeObserver-6bb15032.js');

const dotsSvg = `<svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M2 12C3.10457 12 4 11.1046 4 10C4 8.89543 3.10457 8 2 8C0.89543 8 0 8.89543 0 10C0 11.1046 0.89543 12 2 12Z"
    fill="currentColor"
  />
  <path
    d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
    fill="currentColor"
  />
  <path
    d="M2 20C3.10457 20 4 19.1046 4 18C4 16.8954 3.10457 16 2 16C0.89543 16 0 16.8954 0 18C0 19.1046 0.89543 20 2 20Z"
    fill="currentColor"
  />
</svg>
`;

const arrowSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M11.3327 5.33317H3.21935L6.94602 1.6065L5.99935 0.666504L0.666016 5.99984L5.99935 11.3332L6.93935 10.3932L3.21935 6.6665H11.3327V5.33317Z"
    fill="currentColor"
  />
</svg>
`;

var __rest = (undefined && undefined.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const MxPageHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hasTabs = false;
    /** An array of prop objects for each button.  Use the `label` property to specify the button's inner text. */
    this.buttons = [];
    /** The URL for the previous page link */
    this.previousPageUrl = '';
    /** The text to display for the previous page link */
    this.previousPageTitle = 'Back';
    /** When set to true, the Page Header will use the themed background pattern. */
    this.pattern = false;
    this.minWidths = new minWidthSync.MinWidths();
    this.renderTertiaryButtonAsMenu = false;
  }
  componentWillLoad() {
    this.hasTabs = !!this.element.querySelector('[slot="tabs"]');
  }
  connectedCallback() {
    minWidthSync.minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.minWidthSync.unsubscribeComponent(this);
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
    this.resizeObserver = new ResizeObserver.ResizeObserver(() => this.updateRenderTertiaryButtonAsMenu());
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
    return (index.h("div", { ref: el => (this.buttonRow = el), class: "flex py-1 space-x-8 md:space-x-24 md:justify-end md:flex-row-reverse md:space-x-reverse items-center max-w-full" }, this.buttons.map((button, index$1) => {
      // If not specified, set btnType automatically for primary, secondary, and tertiary buttons
      let { btnType } = button;
      if (!btnType)
        btnType = index$1 === 0 ? 'contained' : index$1 === 1 ? 'outlined' : 'text';
      const isTertiary = index$1 === 2;
      const menuItemProps = __rest(button, ["label"]); // Do not use button label as menu item label (use in slot instead)
      return (index.h("div", { ref: el => isTertiary && (this.tertiaryButtonWrapper = el), class: isTertiary ? 'relative !ml-auto md:!ml-0' : '' }, isTertiary && this.renderTertiaryButtonAsMenu && (index.h("div", { class: "absolute !ml-auto -top-6" }, index.h("mx-icon-button", { ref: el => (this.menuButton = el), innerHTML: dotsSvg }), index.h("mx-menu", { ref: el => (this.tertiaryMenu = el), "anchor-el": this.menuButton }, index.h("mx-menu-item", Object.assign({}, menuItemProps), button.label)))), index.h("mx-button", Object.assign({}, button, { xl: this.minWidths.lg, "btn-type": btnType, "aria-hidden": isTertiary && this.renderTertiaryButtonAsMenu, class: isTertiary && this.renderTertiaryButtonAsMenu ? 'opacity-0 pointer-events-none' : '' }), button.label)));
    })));
  }
  render() {
    return (index.h(index.Host, { class: this.hostClass }, index.h("slot", { name: "previous-page" }, this.previousPageUrl && (index.h("a", { href: this.previousPageUrl, class: "flex items-center pt-16 md:pt-20 uppercase caption1 font-semibold tracking-1-25" }, index.h("span", { class: "mr-10", innerHTML: arrowSvg }), this.previousPageTitle))), index.h("div", { class: "flex flex-col py-10 space-y-14 md:space-y-0 md:flex-row flex-grow md:items-center justify-center md:justify-between flex-wrap" }, index.h("h1", { class: this.headingClass }, index.h("slot", null)), this.buttons.length > 0 && this.buttonsJsx, index.h("slot", { name: "buttons" })), index.h("slot", { name: "tabs" })));
  }
  get element() { return index.getElement(this); }
};

exports.mx_page_header = MxPageHeader;
