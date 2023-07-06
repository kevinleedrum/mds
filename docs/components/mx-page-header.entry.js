import { r as registerInstance, h, e as Host, g as getElement } from './index-20e785a9.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';
import { R as ResizeObserver } from './resize-observer-731c02df.js';

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
    registerInstance(this, hostRef);
    this.hasTabs = false;
    this.hasModalHeaderCenter = false;
    this.hasModalHeaderRight = false;
    /** An array of prop objects for each button.  Use the `label` property to specify the button's inner text. */
    this.buttons = [];
    /** This flag is set by the Modal component to adjust the page header styling when used internally. */
    this.modal = false;
    /** The URL for the previous page link */
    this.previousPageUrl = '';
    /** The text to display for the previous page link */
    this.previousPageTitle = 'Back';
    /** When set to true, the Page Header will use the themed background pattern. */
    this.pattern = false;
    this.minWidths = new MinWidths();
    this.renderTertiaryButtonAsMenu = false;
  }
  /** Attach a new ResizeObserver that calls `updateRenderTertiaryButtonAsMenu` */
  async resetResizeObserver() {
    if (this.resizeObserver)
      this.resizeObserver.disconnect();
    this.resizeObserver = new ResizeObserver(() => this.updateRenderTertiaryButtonAsMenu());
    this.resizeObserver.observe(this.element);
    // Wait one tick for layout shifts in order to detect overflow correctly.
    requestAnimationFrame(this.updateRenderTertiaryButtonAsMenu.bind(this));
  }
  updateSlottedButtonSize() {
    const slottedButtons = this.element.querySelectorAll('[slot="buttons"] mx-button');
    slottedButtons.forEach((button) => (button.xl = this.minWidths.lg));
  }
  componentWillLoad() {
    this.hasTabs = !!this.element.querySelector('[slot="tabs"]');
    this.hasModalHeaderCenter = !!this.element.querySelector('[slot="modal-header-center"]');
    const modalHeaderRight = this.element.querySelector('[slot="modal-header-right"]');
    this.hasModalHeaderRight =
      modalHeaderRight &&
        modalHeaderRight.firstElementChild &&
        !!modalHeaderRight.firstElementChild.offsetParent; // Slot wrapper is not hidden
    this.updateSlottedButtonSize();
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
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
    let str = 'mx-page-header flex flex-col';
    if (this.pattern)
      str += ' bg-pattern';
    if (this.minWidths.md && this.modal) {
      str += ' px-40';
      str += this.hasTabs ? ' min-h-128' : ' min-h-80';
      return str;
    }
    else {
      str += ' px-24 lg:px-72';
    }
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
      str += this.previousPageUrl || this.modal ? 'text-h5' : 'text-h3';
    if (this.hasModalHeaderRight)
      str += ' pr-80';
    return str;
  }
  get previousPageClass() {
    let str = 'flex items-center pt-16 md:pt-20 uppercase caption1 font-semibold tracking-1-25';
    if (this.modal)
      str += ' md:hidden';
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
      return (h("div", { ref: el => isTertiary && (this.tertiaryButtonWrapper = el), class: isTertiary ? 'relative flex flex-1 justify-end' : '' }, isTertiary && this.renderTertiaryButtonAsMenu && (h("div", { class: "absolute -top-6" }, h("mx-icon-button", { ref: el => (this.menuButton = el), icon: "mds-dots-vertical" }), h("mx-menu", { ref: el => (this.tertiaryMenu = el), "anchor-el": this.menuButton, onMxClose: e => e.stopPropagation() }, h("mx-menu-item", Object.assign({}, menuItemProps), label)))), h("mx-button", Object.assign({}, button, { xl: this.minWidths.lg, "btn-type": btnType, "aria-hidden": isTertiary && this.renderTertiaryButtonAsMenu ? 'true' : null, class: isTertiary && this.renderTertiaryButtonAsMenu ? 'opacity-0 pointer-events-none' : '' }), button.label)));
    })));
  }
  render() {
    return (h(Host, { class: this.hostClass }, h("div", { class: "absolute top-16 md:top-20 md:mt-2 right-24 md:right-40" }, h("slot", { name: "modal-header-right" })), h("slot", { name: "previous-page" }, this.previousPageUrl && (h("a", { href: this.previousPageUrl, class: this.previousPageClass }, h("i", { class: "mds-arrow-left mr-10" }), this.previousPageTitle))), h("div", { class: "flex flex-col py-10 space-y-14 md:space-y-0 md:flex-row flex-grow md:items-center justify-center md:justify-between flex-wrap" }, h("div", { class: 'flex-1 items-center' + (this.hasModalHeaderCenter ? ' grid grid-cols-1 sm:grid-cols-3 h-full' : ' flex') // HACK: Safari needs the `h-full` to constrain the grid to its parent
    }, h("h1", { class: this.headingClass }, h("slot", null)), h("slot", { name: "modal-header-center" })), !(this.modal && this.minWidths.md) && this.buttons.length > 0 && this.buttonsJsx, h("slot", { name: "buttons" })), h("slot", { name: "tabs" })));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "minWidths": ["updateSlottedButtonSize"]
  }; }
};

export { MxPageHeader as mx_page_header };
