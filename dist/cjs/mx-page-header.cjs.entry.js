'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c246f020.js');
const minWidthSync = require('./minWidthSync-93e92215.js');
const dotsVertical = require('./dots-vertical-8fe5a309.js');
const arrowLeft = require('./arrow-left-a3a34f65.js');

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
  /** Attach a new ResizeObserver that calls `updateRenderTertiaryButtonAsMenu` */
  async resetResizeObserver() {
    if (this.resizeObserver)
      this.resizeObserver.disconnect();
    this.resizeObserver = new dotsVertical.ResizeObserver(() => this.updateRenderTertiaryButtonAsMenu());
    this.resizeObserver.observe(this.element);
    // Wait one tick for layout shifts in order to detect overflow correctly.
    requestAnimationFrame(this.updateRenderTertiaryButtonAsMenu.bind(this));
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
    this.resetResizeObserver();
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
    let str = '!my-0 pr-20 emphasis ';
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
      return (index.h("div", { ref: el => isTertiary && (this.tertiaryButtonWrapper = el), class: isTertiary ? 'relative !ml-auto md:!ml-0' : '' }, isTertiary && this.renderTertiaryButtonAsMenu && (index.h("div", { class: "absolute !ml-auto -top-6" }, index.h("mx-icon-button", { ref: el => (this.menuButton = el), innerHTML: dotsVertical.dotsSvg }), index.h("mx-menu", { ref: el => (this.tertiaryMenu = el), "anchor-el": this.menuButton }, index.h("mx-menu-item", Object.assign({}, menuItemProps), button.label)))), index.h("mx-button", Object.assign({}, button, { xl: this.minWidths.lg, "btn-type": btnType, "aria-hidden": isTertiary && this.renderTertiaryButtonAsMenu, class: isTertiary && this.renderTertiaryButtonAsMenu ? 'opacity-0 pointer-events-none' : '' }), button.label)));
    })));
  }
  render() {
    return (index.h(index.Host, { class: this.hostClass }, index.h("slot", { name: "previous-page" }, this.previousPageUrl && (index.h("a", { href: this.previousPageUrl, class: "flex items-center pt-16 md:pt-20 uppercase caption1 font-semibold tracking-1-25" }, index.h("span", { class: "mr-10", innerHTML: arrowLeft.arrowSvg }), this.previousPageTitle))), index.h("div", { class: "flex flex-col py-10 space-y-14 md:space-y-0 md:flex-row flex-grow md:items-center justify-center md:justify-between flex-wrap" }, index.h("h1", { class: this.headingClass }, index.h("slot", null)), this.buttons.length > 0 && this.buttonsJsx, index.h("slot", { name: "buttons" })), index.h("slot", { name: "tabs" })));
  }
  get element() { return index.getElement(this); }
};

exports.mx_page_header = MxPageHeader;
