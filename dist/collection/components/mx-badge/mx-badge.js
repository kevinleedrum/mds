import { Component, Host, h, Prop, Element } from '@stencil/core';
import circleSvg from '../../assets/svg/badge-circle.svg';
import hexagonSvg from '../../assets/svg/badge-hexagon.svg';
import squareSvg from '../../assets/svg/badge-square.svg';
import starSvg from '../../assets/svg/badge-star.svg';
import triangleDownSvg from '../../assets/svg/badge-triangle-down.svg';
import triangleUpSvg from '../../assets/svg/badge-triangle-up.svg';
export class MxBadge {
  constructor() {
    /** Make the corners a little more square (best for standalone text) */
    this.squared = false;
    /** Offset badge inward by this many pixels (e.g. 10 for icon buttons) */
    this.offset = 0;
    /** Anchor the badge to the bottom of the wrapped content */
    this.bottom = false;
    /** Anchor the badge to the left of the wrapped content */
    this.left = false;
  }
  get indicatorSvg() {
    if (this.indicator === 'star')
      return starSvg;
    if (this.indicator === 'triangle-down')
      return triangleDownSvg;
    if (this.indicator === 'hexagon')
      return hexagonSvg;
    if (this.indicator === 'triangle-up')
      return triangleUpSvg;
    if (this.indicator === 'square')
      return squareSvg;
    return circleSvg;
  }
  get isStandalone() {
    return !this.element.firstElementChild;
  }
  get isIconOnly() {
    return this.icon && this.value === undefined;
  }
  get badgeClassNames() {
    let str = 'badge inline-flex items-center justify-center text-4 font-semibold pointer-events-none';
    // Border-Radius
    if (this.isIconOnly) {
      str += ' rounded-full';
    }
    else if (this.squared) {
      str += ' rounded';
    }
    else {
      str += ' rounded-xl';
    }
    // Width & Height
    if (this.indicator != null) {
      str += ' w-12 h-12';
    }
    else if (this.isStandalone) {
      str += ' h-24';
      str += this.isIconOnly ? ' w-24' : ' px-8';
    }
    else {
      str += ' h-20';
      str += this.isIconOnly ? ' w-20' : ' px-6';
    }
    // Position Anchored Badge
    if (!this.isStandalone) {
      str += ' absolute transform';
      if (this.bottom) {
        str += ` bottom-${this.offset} translate-y-1/2`;
        str += this.left ? ' origin-bottom-left' : ' origin-bottom-right';
      }
      else {
        str += ` top-${this.offset} -translate-y-1/2`;
        str += this.left ? ' origin-top-left' : ' origin-top-right';
      }
      str += this.left ? ` left-${this.offset} -translate-x-1/2` : ` right-${this.offset} translate-x-1/2`;
    }
    return [str, this.badgeClass].join(' ');
  }
  render() {
    return (h(Host, { class: "mx-badge inline-flex relative" },
      h("slot", null),
      this.indicator != null ? (h("span", { class: this.badgeClassNames, "data-testid": 'indicator-' + (this.indicator || 'circle'), innerHTML: this.indicatorSvg })) : (h("span", { class: this.badgeClassNames },
        this.icon && h("i", { class: this.icon + (this.isIconOnly ? '' : ' mr-4') }),
        this.value))));
  }
  static get is() { return "mx-badge"; }
  static get properties() { return {
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
        "text": "The value to display inside the badge"
      },
      "attribute": "value",
      "reflect": false
    },
    "squared": {
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
        "text": "Make the corners a little more square (best for standalone text)"
      },
      "attribute": "squared",
      "reflect": false,
      "defaultValue": "false"
    },
    "indicator": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "boolean | 'square' | 'triangle-up' | 'hexagon' | 'triangle-down' | 'star'",
        "resolved": "\"hexagon\" | \"square\" | \"star\" | \"triangle-down\" | \"triangle-up\" | boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Render as a small indicator shape with no inner text.  If the prop is present, but no string value is passed, the shape will default to `circle`."
      },
      "attribute": "indicator",
      "reflect": false
    },
    "badgeClass": {
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
        "text": "Additional classes to add to the badge itself"
      },
      "attribute": "badge-class",
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
        "text": "Class name of icon"
      },
      "attribute": "icon",
      "reflect": false
    },
    "offset": {
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
        "text": "Offset badge inward by this many pixels (e.g. 10 for icon buttons)"
      },
      "attribute": "offset",
      "reflect": false,
      "defaultValue": "0"
    },
    "bottom": {
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
        "text": "Anchor the badge to the bottom of the wrapped content"
      },
      "attribute": "bottom",
      "reflect": false,
      "defaultValue": "false"
    },
    "left": {
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
        "text": "Anchor the badge to the left of the wrapped content"
      },
      "attribute": "left",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get elementRef() { return "element"; }
}
