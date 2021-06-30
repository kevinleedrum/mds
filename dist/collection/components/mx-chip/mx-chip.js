import { Component, Host, h, Prop, Event } from '@stencil/core';
import ripple from '../ripple';
import removeSvg from '../../assets/svg/remove.svg';
import checkSvg from '../../assets/svg/check.svg';
export class MxChip {
  constructor() {
    this.outlined = false;
    this.disabled = false;
    /** Display a checkmark on the left side of the chip */
    this.selected = false;
    /** Use the pointer cursor and show a ripple animation.
     * This does not need to be explicitly set for `choice` or `filter` chips. */
    this.clickable = false;
    /** Show the remove icon on the right */
    this.removable = false;
    /** Style as a choice chip when selected.
     * This is set internally when the chip is wrapped with an `mx-chip-group`. */
    this.choice = false;
    /** Style as a filter chip when selected */
    this.filter = false;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (this.isClickable)
      ripple(e, this.chipElem);
  }
  onKeyDown(e) {
    if (!this.isClickable)
      return;
    // Treat pressing Enter or spacebar as a click (like a button)
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      this.chipElem.click();
    }
  }
  onRemove(e) {
    e.stopPropagation(); // Do not trigger the chip's onClick
    if (this.disabled)
      return;
    this.mxRemove.emit(e);
  }
  get hasLeftIcon() {
    return this.icon || this.avatarUrl || (this.selected && !this.choice);
  }
  get isClickable() {
    return this.clickable || this.choice || this.filter;
  }
  get chipClass() {
    let str = 'h-32 inline-grid items-center outline-none leading-none gap-8 grid-flow-col relative rounded-full text-4 overflow-hidden';
    if (this.choice)
      str += ' choice';
    if (this.filter)
      str += ' filter';
    if (this.outlined)
      str += ' outlined border';
    if (this.isClickable)
      str += ' clickable transform cursor-pointer disabled:cursor-auto';
    str += this.hasLeftIcon ? ' pl-6' : ' pl-12';
    if (!this.removable)
      str += ' pr-12';
    else
      str += this.hasLeftIcon ? ' pr-2' : ' pr-8';
    return str;
  }
  get ariaRole() {
    if (this.choice)
      return 'radio';
    if (this.filter)
      return 'checkbox';
    if (this.clickable)
      return 'button';
    return null;
  }
  get avatarStyle() {
    if (!this.avatarUrl)
      return null;
    const background = `url(${this.avatarUrl}) no-repeat center center`;
    return { background, backgroundSize: 'cover' };
  }
  render() {
    return (h(Host, { class: "mx-chip inline-block" },
      h("div", { ref: el => (this.chipElem = el), class: this.chipClass, "aria-checked": this.selected, "aria-disabled": this.disabled, role: this.ariaRole, tabindex: this.isClickable ? '0' : '-1', onClick: this.onClick.bind(this), onKeyDown: this.onKeyDown.bind(this) },
        this.hasLeftIcon && (h("div", { style: this.avatarStyle, role: "presentation", "data-testid": "left-icon", class: "left-icon flex items-center justify-center w-24 h-24 rounded-full relative overflow-hidden" },
          this.icon && h("i", { class: this.icon + ' text-1' }),
          this.selected && (h("div", { "data-testid": "check", class: "check flex absolute inset-0 items-center justify-center" },
            h("span", { innerHTML: checkSvg }))))),
        h("span", null,
          h("slot", null)),
        this.removable && (h("button", { type: "button", "data-testid": "remove", "aria-label": "Remove", class: "remove inline-flex items-center justify-center w-24 h-24 cursor-pointer", innerHTML: removeSvg, onClick: this.onRemove.bind(this) })))));
  }
  static get is() { return "mx-chip"; }
  static get properties() { return {
    "outlined": {
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
        "text": ""
      },
      "attribute": "outlined",
      "reflect": false,
      "defaultValue": "false"
    },
    "disabled": {
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
        "text": ""
      },
      "attribute": "disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "selected": {
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
        "text": "Display a checkmark on the left side of the chip"
      },
      "attribute": "selected",
      "reflect": true,
      "defaultValue": "false"
    },
    "clickable": {
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
        "text": "Use the pointer cursor and show a ripple animation.\nThis does not need to be explicitly set for `choice` or `filter` chips."
      },
      "attribute": "clickable",
      "reflect": false,
      "defaultValue": "false"
    },
    "removable": {
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
        "text": "Show the remove icon on the right"
      },
      "attribute": "removable",
      "reflect": false,
      "defaultValue": "false"
    },
    "avatarUrl": {
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
        "text": "URL of image to show on the left"
      },
      "attribute": "avatar-url",
      "reflect": false
    },
    "icon": {
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
        "text": "Class name of icon to show on the left"
      },
      "attribute": "icon",
      "reflect": false
    },
    "value": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The value associated with a choice chip (used with `mx-chip-group`)"
      },
      "attribute": "value",
      "reflect": false
    },
    "choice": {
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
        "text": "Style as a choice chip when selected.\nThis is set internally when the chip is wrapped with an `mx-chip-group`."
      },
      "attribute": "choice",
      "reflect": false,
      "defaultValue": "false"
    },
    "filter": {
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
        "text": "Style as a filter chip when selected"
      },
      "attribute": "filter",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get events() { return [{
      "method": "mxRemove",
      "name": "mxRemove",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the remove icon is clicked"
      },
      "complexType": {
        "original": "MouseEvent",
        "resolved": "MouseEvent",
        "references": {
          "MouseEvent": {
            "location": "global"
          }
        }
      }
    }]; }
}
