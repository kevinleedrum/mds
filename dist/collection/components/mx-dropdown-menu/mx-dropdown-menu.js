import { Component, Host, h, Prop, State, Watch, Listen } from '@stencil/core';
export class MxDropdownMenu {
  constructor() {
    this.disabled = false;
    this.readonly = false;
    this.dense = false;
    /** Style as a filter dropdown with a 1dp elevation */
    this.elevated = false;
    /** Style as a filter dropdown with a "flat" border color */
    this.flat = false;
    this.isFocused = false;
  }
  async onClick(e) {
    // Resize the menu width to match the input.  This is done every click in case the input is resized after initial load.
    this.menu.style.width = this.dropdownWrapper.getBoundingClientRect().width + 'px';
    const clickedMenuItem = e.target.closest('mx-menu-item');
    if (!clickedMenuItem)
      return;
    this.value = await clickedMenuItem.getValue();
    // Fire native input event for consistency with mx-select
    this.inputElem.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }
  componentDidLoad() {
    this.updateInputValue();
    this.attachMenu();
  }
  onValueChange() {
    this.updateInputValue();
  }
  attachMenu() {
    if (!this.disabled && !this.readonly)
      this.menu.anchorEl = this.dropdownWrapper;
    else
      this.menu.anchorEl = undefined;
  }
  onBlur() {
    if (this.menu && this.menu.isOpen)
      return; // Style as focused/active while menu is open
    this.isFocused = false;
  }
  onFocus() {
    this.isFocused = true;
  }
  onMenuClose(e) {
    e.stopPropagation();
    if (!this.inputElem.contains(document.activeElement))
      this.isFocused = false;
  }
  updateInputValue() {
    this.inputElem.value = this.value;
  }
  get dropdownWrapperClass() {
    let str = 'dropdown-wrapper flex items-center relative rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    if (this.elevated)
      str += ' elevated shadow-1';
    if (this.flat)
      str += ' flat';
    str += this.isFocused ? ' focused border-2' : ' border';
    if (this.disabled || this.readonly)
      str += ' disabled';
    if (this.dropdownClass)
      str += ' ' + this.dropdownClass;
    return str;
  }
  get inputClass() {
    let str = 'absolute inset-0 w-full h-full pl-16 overflow-hidden outline-none appearance-none select-none bg-transparent cursor-pointer disabled:cursor-auto';
    if (this.isFocused)
      str += ' -ml-1'; // prevent shifting due to border-width change
    return str;
  }
  get suffixClass() {
    let str = 'icon-suffix absolute flex items-center h-full right-12 space-x-8 pointer-events-none';
    if (this.isFocused)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  render() {
    return (h(Host, { class: "mx-dropdown-menu block" },
      h("div", { ref: el => (this.dropdownWrapper = el), class: this.dropdownWrapperClass },
        h("input", { "aria-label": this.elAriaLabel || this.label, class: this.inputClass, id: this.dropdownId, name: this.name, onBlur: this.onBlur.bind(this), onFocus: this.onFocus.bind(this), placeholder: this.label, disabled: this.disabled, readonly: !this.disabled, ref: el => (this.inputElem = el), tabindex: "0", type: "text" }),
        h("span", { class: this.suffixClass },
          this.suffix && h("span", { class: "suffix flex items-center h-full px-4" }, this.suffix),
          h("i", { "data-testid": "arrow", class: "mds-arrow-triangle-down text-icon" }))),
      h("mx-menu", { ref: el => (this.menu = el), placement: "bottom", offset: [0, 1], onMxClose: this.onMenuClose.bind(this) },
        h("slot", null))));
  }
  static get is() { return "mx-dropdown-menu"; }
  static get properties() { return {
    "elAriaLabel": {
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
        "text": "The aria-label attribute for the inner input element."
      },
      "attribute": "el-aria-label",
      "reflect": false
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
    "readonly": {
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
      "attribute": "readonly",
      "reflect": false,
      "defaultValue": "false"
    },
    "dense": {
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
      "attribute": "dense",
      "reflect": false,
      "defaultValue": "false"
    },
    "elevated": {
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
        "text": "Style as a filter dropdown with a 1dp elevation"
      },
      "attribute": "elevated",
      "reflect": false,
      "defaultValue": "false"
    },
    "flat": {
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
        "text": "Style as a filter dropdown with a \"flat\" border color"
      },
      "attribute": "flat",
      "reflect": false,
      "defaultValue": "false"
    },
    "label": {
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
        "text": ""
      },
      "attribute": "label",
      "reflect": false
    },
    "dropdownClass": {
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
        "text": "Additional classes for the dropdown wrapper (e.g. `min-w-0` to override the default `min-width`)"
      },
      "attribute": "dropdown-class",
      "reflect": false
    },
    "dropdownId": {
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
        "text": "The `id` attribute for the internal input element"
      },
      "attribute": "dropdown-id",
      "reflect": false
    },
    "name": {
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
        "text": ""
      },
      "attribute": "name",
      "reflect": false
    },
    "suffix": {
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
        "text": "Text shown to the left of the arrow"
      },
      "attribute": "suffix",
      "reflect": false
    },
    "value": {
      "type": "any",
      "mutable": true,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "value",
      "reflect": false
    }
  }; }
  static get states() { return {
    "isFocused": {}
  }; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "onValueChange"
    }, {
      "propName": "disabled",
      "methodName": "attachMenu"
    }, {
      "propName": "readonly",
      "methodName": "attachMenu"
    }]; }
  static get listeners() { return [{
      "name": "click",
      "method": "onClick",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
