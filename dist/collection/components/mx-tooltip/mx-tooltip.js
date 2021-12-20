import { Component, Host, h, Element, Prop, Watch } from '@stencil/core';
import { createPopover } from '../../utils/popover';
import { fadeIn, fadeOut } from '../../utils/transitions';
import { uuidv4 } from '../../utils/utils';
export class MxTooltip {
  constructor() {
    this.uuid = uuidv4();
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
      this.popoverInstance = await createPopover(this.element.firstElementChild, this.tooltipElem, this.placement, [0, 4]);
      fadeIn(this.tooltipElem);
    }, this.appearDelay);
  }
  async hide() {
    clearTimeout(this.openTimeout);
    if (!this.isOpen)
      return;
    await fadeOut(this.tooltipElem);
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
    return (h(Host, { class: "inline-block" },
      h("slot", null),
      h("div", { ref: el => (this.tooltipElem = el), id: this.uuid, role: "tooltip", class: this.tooltipClasses, style: { maxWidth: this.maxWidth }, "data-testid": "tooltip" },
        h("slot", { name: "tooltip" }, this.value))));
  }
  static get is() { return "mx-tooltip"; }
  static get properties() { return {
    "appearDelay": {
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
        "text": "Delay showing the tooltip for this many milliseconds"
      },
      "attribute": "appear-delay",
      "reflect": false,
      "defaultValue": "0"
    },
    "extended": {
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
        "text": "Increase the padding, add a shadow, and make the corners less rounded (typically for multi-line text)"
      },
      "attribute": "extended",
      "reflect": false,
      "defaultValue": "false"
    },
    "inverted": {
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
        "text": "Invert the default colors (i.e. dark text on a light background)"
      },
      "attribute": "inverted",
      "reflect": false,
      "defaultValue": "false"
    },
    "maxWidth": {
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
        "text": "The maximum width of the tooltip (e.g. '20rem')"
      },
      "attribute": "max-width",
      "reflect": false,
      "defaultValue": "'10rem'"
    },
    "isOpen": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "This is typically updated automatically based on events, but may be changed programmatically if necessary."
      },
      "attribute": "is-open",
      "reflect": true,
      "defaultValue": "false"
    },
    "placement": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "PopoverPlacement",
        "resolved": "\"auto\" | \"auto-end\" | \"auto-start\" | \"bottom\" | \"bottom-end\" | \"bottom-start\" | \"left\" | \"left-end\" | \"left-start\" | \"right\" | \"right-end\" | \"right-start\" | \"top\" | \"top-end\" | \"top-start\"",
        "references": {
          "PopoverPlacement": {
            "location": "import",
            "path": "../../utils/popover"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The preferred placement of the tooltip, relative to the anchor element."
      },
      "attribute": "placement",
      "reflect": false,
      "defaultValue": "'bottom'"
    },
    "tooltipClass": {
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
        "text": "Additional classes to add to the tooltip."
      },
      "attribute": "tooltip-class",
      "reflect": false
    },
    "value": {
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
        "text": "The text to show inside the tooltip.  Alternatively, use the `tooltip` slot."
      },
      "attribute": "value",
      "reflect": false
    }
  }; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "isOpen",
      "methodName": "onIsOpenChange"
    }]; }
}
