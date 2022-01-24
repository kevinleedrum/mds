'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7252b109.js');
const popover = require('./popover-8846ea88.js');
const transitions = require('./transitions-ae6c7348.js');
const utils = require('./utils-33993629.js');

const MxTooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.uuid = utils.uuidv4();
    /** Delay showing the tooltip for this many milliseconds */
    this.appearDelay = 0;
    /** Increase the padding, add a shadow, and make the corners less rounded (typically for multi-line text) */
    this.extended = false;
    /** Invert the default colors (i.e. dark text on a light background) */
    this.inverted = false;
    /** The maximum width of the tooltip (e.g. '20rem') */
    this.maxWidth = '10rem';
    /** This is typically updated automatically based on events, but may be changed programmatically if necessary. */
    this.isOpen = false;
    /** The preferred placement of the tooltip, relative to the anchor element. */
    this.placement = 'bottom';
  }
  onIsOpenChange() {
    this.isOpen ? this.show() : this.hide();
  }
  componentDidLoad() {
    let anchorEl = this.element.firstElementChild;
    // For custom elements that wrap buttons, inputs, attach event listeners to the native element
    anchorEl = this.element.firstElementChild.querySelector('button, input, [role="button"]') || anchorEl;
    anchorEl.setAttribute('aria-describedby', this.uuid);
    anchorEl.addEventListener('mouseenter', this.show.bind(this));
    anchorEl.addEventListener('mouseleave', this.hide.bind(this));
    if (anchorEl.tabIndex === -1)
      anchorEl.tabIndex = 0;
    anchorEl.addEventListener('focus', this.show.bind(this));
    anchorEl.addEventListener('blur', this.hide.bind(this));
  }
  async show() {
    clearTimeout(this.openTimeout);
    if (this.isOpen)
      return;
    this.openTimeout = setTimeout(async () => {
      this.isOpen = true;
      this.popoverInstance = await popover.createPopover(this.element.firstElementChild, this.tooltipElem, this.placement, [0, 4]);
      transitions.fadeIn(this.tooltipElem);
    }, this.appearDelay);
  }
  async hide() {
    clearTimeout(this.openTimeout);
    if (!this.isOpen)
      return;
    await transitions.fadeOut(this.tooltipElem);
    this.isOpen = false;
    if (!this.popoverInstance)
      return;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
  }
  get tooltipClasses() {
    let str = 'mx-tooltip caption1 absolute pointer-events-none z-50';
    if (!this.isOpen)
      str += ' hidden';
    if (this.inverted)
      str += ' inverted';
    if (this.extended) {
      str += ' p-16 rounded-lg shadow-4';
    }
    else {
      str += ' px-12 py-4 rounded-2xl';
    }
    if (this.tooltipClass)
      str += ' ' + this.tooltipClass;
    return str;
  }
  render() {
    return (index.h(index.Host, { class: "inline-flex" }, index.h("slot", null), index.h("div", { ref: el => (this.tooltipElem = el), id: this.uuid, role: "tooltip", class: this.tooltipClasses, style: { maxWidth: this.maxWidth }, "data-testid": "tooltip" }, index.h("slot", { name: "tooltip" }, this.value))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "isOpen": ["onIsOpenChange"]
  }; }
};

exports.mx_tooltip = MxTooltip;
