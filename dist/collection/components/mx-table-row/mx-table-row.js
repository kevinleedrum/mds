import { Component, Host, h, Prop, Element, Event, State, Method } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';
import dotsSvg from '../../assets/svg/dots-vertical.svg';
import chevronSvg from '../../assets/svg/chevron-down.svg';
const DEFAULT_MAX_HEIGHT = 'calc(3.25rem + 1px)'; // 52px + 1px bottom border
export class MxTableRow {
  constructor() {
    /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
    this.actions = [];
    this.checked = false;
    this.minWidths = new MinWidths();
    this.checkable = false;
    this.checkOnRowClick = false;
    this.isMobileExpanded = false;
    this.isMobileCollapsing = false;
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
    if (this.actions.some(action => !action.value))
      throw new Error('Table row actions must have a value property!');
  }
  componentWillRender() {
    // Render collapsed mobile row
    if (!this.minWidths.sm && !this.isMobileExpanded)
      this.element.style.maxHeight = this.getCollapsedHeight();
    // Determine `checkable` and `checked` by pulling props from parent table.
    // This avoids having to manually pass these as props when using mx-table-row inside the table's
    // default slot.
    const table = this.element.closest('mx-table');
    this.checkable = table && table.checkable;
    if (this.checkable && this.rowId == null)
      throw new Error('Checkable rows require either a getRowId prop on the table, or a rowId on the row!');
    if (this.checkable)
      this.checkOnRowClick = table.checkOnRowClick;
  }
  componentDidRender() {
    // Anchor the action menu to the action menu button.
    // We cannot use `componentDidLoad` for this because these elements sometimes get destroyed
    // during render when the viewport is resized across breakpoints.
    if (this.actions.length > 1 && this.actionMenu && this.actionMenuButton)
      this.actionMenu.anchorEl = this.actionMenuButton;
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  onClick(e) {
    if (!!e.target.closest('button, input, mx-menu'))
      return; // Ignore clicks on buttons, etc.
    if (!this.minWidths.sm) {
      // Collapse/expand row when the exposed column cell is clicked
      const exposedCell = this.getExposedCell();
      if (!exposedCell)
        return;
      if (e.target.closest('mx-table-cell') === exposedCell)
        this.accordion();
    }
    else if (this.checkable && this.checkOnRowClick) {
      // (Un)check row
      this.checked = !this.checked;
      this.mxCheck.emit({ rowId: this.rowId, checked: this.checked });
    }
  }
  accordion() {
    if (this.minWidths.sm)
      return;
    this.isMobileExpanded ? this.collapse() : this.expand();
  }
  async collapse() {
    if (!this.isMobileExpanded)
      return;
    this.isMobileCollapsing = true;
    this.element.style.maxHeight = this.element.scrollHeight + 'px';
    requestAnimationFrame(() => {
      this.element.style.maxHeight = this.getCollapsedHeight();
    });
  }
  async expand() {
    if (this.isMobileExpanded)
      return;
    this.element.style.maxHeight = this.element.scrollHeight + 'px';
    this.isMobileExpanded = true;
    requestAnimationFrame(() => {
      this.element.style.maxHeight = this.element.scrollHeight + 'px';
    });
  }
  onTransitionEnd() {
    if (this.isMobileCollapsing) {
      this.isMobileExpanded = false;
      this.isMobileCollapsing = false;
    }
    // Remove explicit max-height after expanding to avoid issues with window resizing, etc.
    this.element.style.maxHeight = '';
  }
  onCheckboxInput(e) {
    this.mxCheck.emit({ rowId: this.rowId, checked: e.target.checked });
  }
  getExposedCell() {
    const cells = Array.from(this.element.querySelectorAll('mx-table-cell')) || [];
    return cells.find((cell) => cell.isExposedMobileColumn);
  }
  getCollapsedHeight() {
    const exposedCell = this.getExposedCell();
    if (!exposedCell)
      return DEFAULT_MAX_HEIGHT;
    return exposedCell.offsetHeight + 1 + 'px';
  }
  get rowClass() {
    let str = 'mx-table-row';
    str += this.minWidths.sm ? ' contents' : ' grid overflow-hidden';
    if (this.checkable)
      str += ' checkable-row';
    if (this.checkable && this.checkOnRowClick)
      str += ' cursor-pointer';
    if (!this.minWidths.sm && !this.isMobileExpanded)
      str += ' mobile-collapsed';
    return str;
  }
  get rowStyle() {
    if (this.minWidths.sm)
      return {};
    return {
      gridTemplateColumns: 'minmax(0, min-content) minmax(0, auto) minmax(0, min-content)',
      maxHeight: '',
    };
  }
  render() {
    return (h(Host, { role: "row", class: this.rowClass, style: this.rowStyle, onClick: this.onClick.bind(this), onTransitionEnd: this.onTransitionEnd.bind(this) },
      this.checkable && (h("div", { class: "flex items-center pr-4 col-start-1 row-start-1 sm:row-start-auto sm:col-start-auto", onClick: this.accordion.bind(this) },
        h("mx-checkbox", { ref: el => (this.checkbox = el), checked: this.checked, onInput: this.onCheckboxInput.bind(this), onClick: e => e.stopPropagation(), "label-name": "Select row", "hide-label": true }))),
      h("slot", null),
      !this.checkable && !this.minWidths.sm && h("div", { class: "row-start-1 col-start-1 w-0" }),
      !this.minWidths.sm && (h("div", { class: "flex items-center justify-end px-16 row-start-1", onClick: this.accordion.bind(this) },
        h("span", { class: 'mobile-row-chevron text-1 transform' +
            (this.isMobileExpanded && !this.isMobileCollapsing ? ' rotate-180' : ''), innerHTML: chevronSvg }))),
      this.actions.length === 1 && (h("div", { class: "action-cell flex items-center p-16 sm:p-0 justify-end col-span-3 sm:col-span-1" },
        h("mx-button", Object.assign({ "data-testid": "action-button", "btn-type": "text" }, this.actions[0]), this.actions[0].value))),
      this.actions.length > 1 && (h("div", { class: "action-cell flex items-center p-0 justify-end col-span-3 sm:col-span-1" },
        h("mx-icon-button", { ref: el => (this.actionMenuButton = el), innerHTML: dotsSvg }),
        h("mx-menu", { "data-testid": "action-menu", ref: el => (this.actionMenu = el) }, this.actions.map(action => (h("mx-menu-item", Object.assign({}, action), action.value))))))));
  }
  static get is() { return "mx-table-row"; }
  static get properties() { return {
    "rowId": {
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
        "text": "This is required for checkable rows in order to persist the checked state through sorting and pagination."
      },
      "attribute": "row-id",
      "reflect": false
    },
    "actions": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "ITableRowAction[]",
        "resolved": "ITableRowAction[]",
        "references": {
          "ITableRowAction": {
            "location": "import",
            "path": "../mx-table/mx-table"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text."
      },
      "defaultValue": "[]"
    },
    "checked": {
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
        "text": ""
      },
      "attribute": "checked",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "minWidths": {},
    "checkable": {},
    "checkOnRowClick": {},
    "isMobileExpanded": {},
    "isMobileCollapsing": {}
  }; }
  static get events() { return [{
      "method": "mxCheck",
      "name": "mxCheck",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emits the `rowId` and `checked` state (via `Event.detail`) of the row whenever it is (un)checked"
      },
      "complexType": {
        "original": "{ rowId: string | number; checked: boolean }",
        "resolved": "{ rowId: string | number; checked: boolean; }",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "collapse": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "expand": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "element"; }
}
