import { Component, Host, h, Prop, Element, Listen, Method, Event } from '@stencil/core';
import { createPopover, convertPlacementToOrigin, } from '../../utils/popover';
import { fadeScaleIn, fadeOut } from '../../utils/transitions';
export class MxMenu {
  constructor() {
    /** The placement of the menu, relative to the `anchorEl`. */
    this.placement = 'bottom-start';
    /** This is set to true automatically when the `anchorEl` is clicked.  Dropdown menus read this prop internally for styling purposes. */
    this.isOpen = false;
  }
  onMenuItemClick() {
    // Close menu when a descendent menu item is clicked
    this.closeMenu();
  }
  onClick(e) {
    const anchorWasClicked = this.anchorEl && this.anchorEl.contains(e.target);
    if (!this.isOpen && anchorWasClicked) {
      // Open closed menu when the anchorEl is clicked
      this.openMenu();
    }
    else if (this.isOpen && this.element && !this.element.contains(e.target)) {
      if (this.isSubMenu && anchorWasClicked)
        return; // Do not close submenu when its anchor is clicked
      // Otherwise, close menu when a click occurs outside the menu
      this.closeMenu();
    }
  }
  onDocumentKeyDown(e) {
    // Open menu if Enter or Space is pressed while anchor is focused
    if (['Enter', ' '].includes(e.key) && this.anchorEl && this.anchorEl.contains(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      document.activeElement.click();
      return;
    }
    if (!this.isOpen)
      return;
    // Close menus on Escape key
    if (e.key === 'Escape')
      this.closeMenu();
    else if (e.key === 'ArrowDown' && this.anchorEl.contains(e.target)) {
      // If focus is still on anchor, switch focus to first menu item on arrow down
      e.preventDefault();
      e.stopPropagation();
      const enabledMenuItems = this.menuItems.filter(m => !m.disabled);
      enabledMenuItems.length && enabledMenuItems[0].focusMenuItem();
    }
  }
  onKeydown(e) {
    if (!this.isOpen)
      return;
    if (!['ArrowDown', 'ArrowUp'].includes(e.key))
      return;
    // Menu item keyboard navigation
    e.preventDefault(); // Prevent scrolling
    e.stopPropagation();
    const menuItems = this.menuItems.filter(m => !m.disabled);
    const focusedIndex = menuItems.findIndex(m => m.contains(document.activeElement));
    if (e.key === 'ArrowDown' && focusedIndex !== menuItems.length - 1) {
      menuItems[focusedIndex + 1].focusMenuItem();
    }
    else if (e.key === 'ArrowUp' && focusedIndex !== 0) {
      menuItems[focusedIndex - 1].focusMenuItem();
    }
  }
  /** Open the menu.  Returns a promise that resolves to false if the menu was already open. */
  async openMenu() {
    if (this.isOpen || !this.anchorEl)
      return false;
    this.isOpen = true;
    const offset = this.offset || (this.isSubMenu ? [-8, 0] : null); // Offset submenus by -8px to line up menu items
    this.popoverInstance = await createPopover(this.anchorEl, this.element, this.placement, offset);
    await fadeScaleIn(this.menuElem, undefined, convertPlacementToOrigin(this.popoverInstance.state.placement));
    return true;
  }
  /** Close the menu.  Returns a promise that resolves to false if the menu was already closed. */
  async closeMenu() {
    if (!this.isOpen)
      return false;
    this.menuItems.forEach(m => m.closeSubMenu());
    await fadeOut(this.menuElem);
    this.mxClose.emit();
    this.isOpen = false;
    if (!this.popoverInstance)
      return true;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
    return true;
  }
  connectedCallback() {
    this.anchorEl && this.anchorEl.setAttribute('aria-haspopup', 'true');
  }
  componentWillUpdate() {
    // If any menu item has an icon, ensure that all menu items at least have a null icon.
    // This will ensure the inner text of all the menu items is aligned.
    const anyMenuItemHasIcon = this.menuItems.some(m => !!m.icon);
    if (anyMenuItemHasIcon) {
      this.menuItems.forEach(m => {
        if (m.icon === undefined)
          m.icon = null;
      });
    }
  }
  get menuItems() {
    return (Array.from(this.scrollElem.children).filter(e => e.tagName === 'MX-MENU-ITEM') ||
      []);
  }
  get isSubMenu() {
    return this.element.hasAttribute('slot') && this.element.getAttribute('slot') === 'submenu';
  }
  render() {
    return (h(Host, { class: 'mx-menu block z-50 w-screen sm:w-auto' + (this.isOpen ? '' : ' hidden'), role: "menu" },
      h("div", { ref: el => (this.menuElem = el), class: "flex flex-col py-8 shadow-9 rounded-lg" },
        h("div", { ref: el => (this.scrollElem = el), class: "scroll-wrapper overflow-y-auto overflow-x-hidden max-h-216 overscroll-contain" },
          h("slot", null)))));
  }
  static get is() { return "mx-menu"; }
  static get properties() { return {
    "anchorEl": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "HTMLElement",
        "resolved": "HTMLElement",
        "references": {
          "HTMLElement": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The element that will open the menu when clicked"
      }
    },
    "offset": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "PopoverOffset",
        "resolved": "[number, number]",
        "references": {
          "PopoverOffset": {
            "location": "import",
            "path": "../../utils/popover"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "An array of offsets in pixels. The first is the \"skidding\" along the edge of the `anchorEl`.  The second is the distance from the `anchorEl`."
      }
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
        "text": "The placement of the menu, relative to the `anchorEl`."
      },
      "attribute": "placement",
      "reflect": false,
      "defaultValue": "'bottom-start'"
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
        "text": "This is set to true automatically when the `anchorEl` is clicked.  Dropdown menus read this prop internally for styling purposes."
      },
      "attribute": "is-open",
      "reflect": true,
      "defaultValue": "false"
    }
  }; }
  static get events() { return [{
      "method": "mxClose",
      "name": "mxClose",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when the menu closes."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "openMenu": {
      "complexType": {
        "signature": "() => Promise<boolean>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          },
          "PopoverOffset": {
            "location": "import",
            "path": "../../utils/popover"
          }
        },
        "return": "Promise<boolean>"
      },
      "docs": {
        "text": "Open the menu.  Returns a promise that resolves to false if the menu was already open.",
        "tags": []
      }
    },
    "closeMenu": {
      "complexType": {
        "signature": "() => Promise<boolean>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<boolean>"
      },
      "docs": {
        "text": "Close the menu.  Returns a promise that resolves to false if the menu was already closed.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "element"; }
  static get listeners() { return [{
      "name": "mxClick",
      "method": "onMenuItemClick",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "click",
      "method": "onClick",
      "target": "document",
      "capture": true,
      "passive": false
    }, {
      "name": "keydown",
      "method": "onDocumentKeyDown",
      "target": "document",
      "capture": false,
      "passive": false
    }, {
      "name": "keydown",
      "method": "onKeydown",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
