import { Component, Host, h, Prop, Element, Listen, Method, Event, EventEmitter, Watch } from '@stencil/core';
import {
  createPopover,
  PopoverInstance,
  PopoverPlacement,
  convertPlacementToOrigin,
  PopoverOffset,
} from '../../utils/popover';
import { fadeScaleIn, fadeOut } from '../../utils/transitions';
import { uuidv4 } from '../../utils/utils';

@Component({
  tag: 'mx-menu',
  shadow: false,
})
export class MxMenu {
  popoverInstance: PopoverInstance;
  menuElem: HTMLElement;
  scrollElem: HTMLElement;
  inputEl: HTMLInputElement;
  isClosing = false;
  uuid = uuidv4();

  /** The element to which the menu's position will be anchored */
  @Prop() anchorEl: HTMLElement;
  /** If the anchor element contains an `input`, setting this to `true` will always select the first menu item when Enter is pressed inside the input.  */
  @Prop() autocompleteOnly = false;
  /** The element that will open the menu when clicked.  If not provided, the `anchorEl' will be used. */
  @Prop() triggerEl: HTMLElement;
  /** An array of offsets in pixels. The first is the "skidding" along the edge of the `anchorEl`.  The second is the distance from the `anchorEl`. */
  @Prop() offset: PopoverOffset;
  /** The placement of the menu, relative to the `anchorEl`. */
  @Prop() placement: PopoverPlacement = 'bottom-start';
  /** This is set to true automatically when the `anchorEl` is clicked.  Dropdown menus read this prop internally for styling purposes. */
  @Prop({ mutable: true, reflect: true }) isOpen = false;

  @Element() element: HTMLMxMenuElement;

  /** Emitted when the menu closes. */
  @Event() mxClose: EventEmitter<void>;

  /** Emitted when the menu opens. */
  @Event() mxOpen: EventEmitter<void>;

  @Listen('mxClick')
  onMenuItemClick() {
    // Close menu when a descendent menu item is clicked
    this.closeMenu();
  }

  @Listen('click', { target: 'document', capture: true })
  onClick(e: MouseEvent) {
    const triggerEl = this.triggerEl || this.anchorEl;
    const triggerElWasClicked = triggerEl && triggerEl.contains(e.target as Node);
    if (triggerElWasClicked) e.preventDefault();
    if (!this.isOpen && triggerElWasClicked) {
      // Open closed menu when the anchorEl is clicked
      this.openMenu();
      e.preventDefault();
    } else if (this.isOpen && this.element && !this.element.contains(e.target as Node)) {
      if (this.isSubMenu && triggerElWasClicked) return; // Do not close submenu when its anchor is clicked
      if (this.inputEl && this.inputEl.contains(e.target as Node)) return; // Do not close suggestion menu on input click
      // Otherwise, close menu when a click occurs outside the menu
      this.closeMenu();
    }
  }

  @Listen('focus', { target: 'document', capture: true })
  onFocus(e: FocusEvent) {
    if (!this.anchorEl) return;
    // Close menu when focus leaves both the menu and the anchorEl
    if (this.isOpen && !this.anchorEl.contains(e.target as Node) && !this.element.contains(e.target as Node))
      this.closeMenu();
    // If the input is focused, open the menu
    else if (this.inputEl && this.inputEl.contains(e.target as Node) && !this.isOpen) this.openMenu();
  }

  @Listen('keydown', { target: 'document' })
  onDocumentKeyDown(e: KeyboardEvent) {
    const isFocused = (el: HTMLElement) => el && el.contains(e.target as Node);
    const enabledMenuItems = this.menuItems.filter(m => !m.disabled);
    // For autocomplete menus, select first item by default when pressing Enter
    if (this.autocompleteOnly && this.inputEl && this.isOpen && e.key === 'Enter' && !isFocused(this.element)) {
      e.preventDefault();
      enabledMenuItems.length && enabledMenuItems[0].click();
      this.onMenuItemClick();
      return;
    }
    // Toggle menu if Enter (or Space if no input) is pressed while anchor is focused
    const openKeys = ['Enter'];
    if (!this.inputEl) openKeys.push(' ');
    if (openKeys.includes(e.key) && this.anchorEl && isFocused(this.anchorEl)) {
      (this.triggerEl || this.anchorEl).click();
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Open the menu when typing into the input
    if (!this.isOpen && this.inputEl && isFocused(this.inputEl)) {
      (this.triggerEl || this.anchorEl).click();
    }
    if (!this.isOpen) return;
    const shouldEditInput = e.key.length === 1 || ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key);
    if (this.inputEl && shouldEditInput && !isFocused(this.inputEl)) {
      // Typing visible characters, etc. while the menu is open should refocus the input
      this.inputEl.focus();
    } else if (e.key === 'Escape') {
      // Close menus on Escape key
      this.closeMenu();
      e.preventDefault();
    } else if (['Tab', 'ArrowDown'].includes(e.key) && isFocused(this.anchorEl) && enabledMenuItems.length > 0) {
      // Pressing Tab or down focuses the first menu item (or second if first is already "focused" due to autocomplete)
      if (e.shiftKey && e.key === 'Tab') return; // ... unless Shift+Tab
      if (!this.inputEl || !this.autocompleteOnly) {
        enabledMenuItems[0].focusMenuItem();
      } else if (this.autocompleteOnly && enabledMenuItems.length >= 2) {
        enabledMenuItems[1].focusMenuItem();
      }
      e.preventDefault();
      e.stopPropagation();
    } else if (e.key === 'ArrowUp' && isFocused(this.inputEl)) {
      // Prevent up arrow from moving cursor to start of input (Firefox, possibly others)
      e.preventDefault();
    } else if (this.inputEl && isFocused(this.inputEl)) {
      // HACK: When typing in the input while the menu is open, force the menu to re-render in case
      // menu items are added/removed in the slot.
      this.isOpen = !this.isOpen;
      this.isOpen = !this.isOpen;
    }
  }

  @Listen('keydown')
  onKeydown(e: KeyboardEvent) {
    if (!this.isOpen) return;
    if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
    // Menu item keyboard navigation
    e.preventDefault(); // Prevent scrolling
    e.stopPropagation();
    const menuItems = this.menuItems.filter(m => !m.disabled);
    const focusedIndex = menuItems.findIndex(m => m.contains(document.activeElement));
    if (e.key === 'ArrowDown' && focusedIndex !== menuItems.length - 1) {
      (menuItems[focusedIndex + 1] as HTMLMxMenuItemElement).focusMenuItem();
    } else if (e.key === 'ArrowUp' && focusedIndex !== 0) {
      (menuItems[focusedIndex - 1] as HTMLMxMenuItemElement).focusMenuItem();
    }
  }

  /** Open the menu.  Returns a promise that resolves to false if the menu was already open. */
  @Method()
  async openMenu() {
    if (this.isOpen || !this.anchorEl) return false;
    this.isOpen = true;
    this.mxOpen.emit();
    const offset: PopoverOffset = this.offset || (this.isSubMenu ? [-8, 0] : [0, 1]); // Offset submenus by -8px to line up menu items
    this.popoverInstance = await createPopover(this.anchorEl, this.element, this.placement, offset);
    await fadeScaleIn(this.menuElem, undefined, convertPlacementToOrigin(this.popoverInstance.state.placement));
    return true;
  }

  @Watch('anchorEl')
  @Watch('triggerEl')
  setTriggerElAttributes() {
    if (!this.anchorEl && !this.triggerEl) return;
    (this.triggerEl || this.anchorEl).setAttribute('aria-haspopup', 'true');
    (this.triggerEl || this.anchorEl).setAttribute('aria-controls', this.uuid);
  }

  /** Close the menu.  Returns a promise that resolves to false if the menu was already closed. */
  @Method()
  async closeMenu(): Promise<boolean> {
    if (!this.isOpen || this.isClosing) return false;
    this.isClosing = true; // Prevents invoking closeMenu again while it is transitioning out
    this.menuItems.forEach(m => m.closeSubMenu());
    await fadeOut(this.menuElem);
    this.isClosing = false;
    this.mxClose.emit();
    this.isOpen = false;
    if (!this.popoverInstance) return true;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
    return true;
  }

  componentDidLoad() {
    this.setInputEl();
    if (this.menuItems.length) {
      const role = this.element.querySelector('[role="option"]') ? 'listbox' : 'menu';
      this.scrollElem.setAttribute('role', role);
    }
    this.setTriggerElAttributes();
  }

  componentWillUpdate() {
    this.setInputEl();
    this.anchorEl &&
      this.anchorEl.getAttribute('role') === 'menuitem' &&
      this.anchorEl.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
    if (this.inputEl && this.anchorEl) this.element.style.width = this.anchorEl.getBoundingClientRect().width + 'px';
    // If any menu item has an icon, ensure that all menu items at least have a null icon.
    // This will ensure the inner text of all the menu items is aligned.
    const anyMenuItemHasIcon = this.menuItems.some(m => !!m.icon);
    if (anyMenuItemHasIcon) {
      this.menuItems.forEach(m => {
        if (m.icon === undefined) m.icon = null;
      });
    }
    // Set selected prop on dropdown menu items (which updates aria-selected attribute)
    if (this.inputEl) {
      this.menuItems.forEach(async (m: HTMLMxMenuItemElement) => {
        m.selected = this.inputEl.value === (await m.getValue());
      });
    }
  }

  setInputEl() {
    if (this.anchorEl && !this.inputEl) {
      this.inputEl = this.anchorEl.querySelector('input[type="text"], input[type="search"]');
      this.inputEl && this.inputEl.setAttribute('autocomplete', 'off');
    }
  }

  get menuItems(): HTMLMxMenuItemElement[] {
    return (Array.from(this.scrollElem.children).filter(e => e.tagName === 'MX-MENU-ITEM') ||
      []) as HTMLMxMenuItemElement[];
  }

  get isSubMenu() {
    return this.element.hasAttribute('slot') && this.element.getAttribute('slot') === 'submenu';
  }

  get hostClass(): string {
    let str = 'mx-menu block z-50 w-screen sm:w-auto';
    if (!this.isOpen) str += ' hidden';
    if (this.autocompleteOnly) str += ' autocomplete-only';
    return str;
  }

  render() {
    return (
      <Host class={this.hostClass}>
        <div ref={el => (this.menuElem = el)} class="flex flex-col shadow-9 rounded-lg overflow-hidden">
          <div
            id={this.uuid}
            ref={el => (this.scrollElem = el)}
            class="scroll-wrapper overflow-y-auto overflow-x-hidden overscroll-contain"
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
