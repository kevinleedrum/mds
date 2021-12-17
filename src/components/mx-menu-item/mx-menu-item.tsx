import { Component, Host, h, Element, Prop, Event, EventEmitter, Listen, Method, State } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';

export interface IMxMenuItemProps {
  checked?: boolean;
  disabled?: boolean;
  icon?: string;
  label?: string;
  multiSelect?: boolean;
}

@Component({
  tag: 'mx-menu-item',
  shadow: false,
})
export class MxMenuItem implements IMxMenuItemProps {
  menuItemElem: HTMLElement;
  role: string;
  submenu: HTMLMxMenuElement;
  slotWrapper: HTMLElement;
  submenuDelayTimeout;

  /** If `multiSelect` is false, this will render a checkmark on the right side of the menu item.  If both `multiSelect` and `checked` are `true`, then the rendered multi-select checkbox will be checked. */
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;
  /** The class name of the icon to display on the left. This is sometimes automatically set to `null` to add an empty icon for alignment purposes (when a sibling menu item has an icon). */
  @Prop() icon: string;
  /** A label to display above the menu item */
  @Prop() label: string;
  /** A subtitle to display below the menu item text */
  @Prop() subtitle: string;
  /** Render a checkbox as part of the menu item.  On small screens, the checkbox will appear on the left; otherwise, it will be on the right. */
  @Prop() multiSelect: boolean = false;
  /** This is automatically set by a parent Dropdown Menu. */
  @Prop() selected: boolean = false;

  @State() minWidths = new MinWidths();

  @Element() element: HTMLMxMenuItemElement;

  /** Fired when an enabled menu item without a submenu is clicked. Used interally to close all ancestor menus. */
  @Event() mxClick: EventEmitter<MouseEvent>;

  @Listen('mouseenter')
  onMouseEnter() {
    this.closeSiblingSubMenus();
    // Focus menu item on hover for consistent keyboard navigation
    this.focusMenuItem();
    if (this.submenu) {
      // Delay opening the submenu when hovering
      clearTimeout(this.submenuDelayTimeout);
      this.submenuDelayTimeout = setTimeout(this.openSubMenu.bind(this), 150);
    }
  }
  @Listen('mouseleave')
  onMouseLeave() {
    clearTimeout(this.submenuDelayTimeout);
    (document.activeElement as HTMLElement).blur();
  }

  @Listen('focus')
  onFocus() {
    this.closeSiblingSubMenus();
  }

  @Listen('keydown')
  onKeyDown(e: KeyboardEvent) {
    if (this.submenu) return this.onKeyDownSubMenu(e);
    // Treat Enter (or Space if multi-select) as a click
    const clickKeys = ['Enter'];
    if (this.multiSelect) clickKeys.push(' ');
    if (clickKeys.includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      (document.activeElement as HTMLElement).click();
    }
  }

  componentWillLoad() {
    this.submenu = this.element.querySelector('[slot="submenu"]');
  }

  connectedCallback() {
    this.role = !!this.element.closest('mx-dropdown-menu') ? 'option' : 'menuitem';
    minWidthSync.subscribeComponent(this);
  }

  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }

  /** Close the item's submenu. */
  @Method()
  async closeSubMenu() {
    if (this.submenu) {
      clearTimeout(this.submenuDelayTimeout);
      return await this.submenu.closeMenu();
    }
  }

  /** Returns the menu item inner text (excluding any label or subtitle) */
  @Method()
  async getValue(): Promise<string> {
    return this.slotWrapper && this.slotWrapper.innerText.trim();
  }

  /** Focuses the menu item. */
  @Method()
  async focusMenuItem() {
    if (this.multiSelect) {
      const label = this.menuItemElem.querySelector('mx-checkbox label') as HTMLElement;
      label && label.focus();
    } else {
      this.menuItemElem.focus();
    }
  }

  async onKeyDownSubMenu(e: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowRight'].includes(e.key)) {
      // Open submenu and focus its first item when pressing Enter, Space, or right arrow
      e.preventDefault();
      e.stopPropagation();
      const didOpen = await this.openSubMenu();
      if (didOpen) {
        const firstMenuItem = this.element.querySelector('mx-menu-item:not(:disabled)') as HTMLMxMenuItemElement;
        firstMenuItem && firstMenuItem.focusMenuItem();
      }
    } else if (e.key === 'ArrowLeft') {
      // Close submenu when pressing left arrow
      e.preventDefault();
      e.stopPropagation();
      const didClose = await this.closeSubMenu();
      if (didClose) {
        this.focusMenuItem();
      } else {
        // If submenu was already closed, propagate event to parent (to close next parent menu).
        // We have to manually propagate the event because we are awaiting a promise beforehand.
        this.element.parentElement.dispatchEvent(new KeyboardEvent(e.type, e));
      }
    }
  }

  closeSiblingSubMenus() {
    const siblingMenuItems = Array.from(this.element.parentElement.children).filter(
      e => e !== this.element && e.tagName === 'MX-MENU-ITEM',
    );
    siblingMenuItems.forEach((m: HTMLMxMenuItemElement) => m.closeSubMenu());
  }

  openSubMenu() {
    if (this.submenu) {
      this.submenu.placement = 'right-start';
      this.submenu.anchorEl = this.element;
      return this.submenu.openMenu();
    }
  }

  onClick(e: MouseEvent) {
    if (this.disabled || !!this.submenu) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (!this.multiSelect) this.mxClick.emit(e);
  }

  get checkboxLabel() {
    // After initial render, the text must be read from the slotWrapper because
    // this.element.innerText will include both the slot text AND the checkbox label.
    return (this.slotWrapper || this.element).innerText;
  }

  render() {
    return (
      <Host class={'mx-menu-item block' + (!!this.submenu ? ' has-submenu' : '')}>
        <div
          ref={el => (this.menuItemElem = el)}
          role={this.role}
          aria-checked={this.checked ? 'true' : null}
          aria-disabled={this.disabled ? 'true' : null}
          aria-selected={this.selected ? 'true' : null}
          tabindex={this.disabled || this.multiSelect ? '-1' : '0'}
          class="block w-full cursor-pointer select-none text-4 outline-none"
          onClick={this.onClick.bind(this)}
        >
          {this.label && (
            <p class="item-label flex items-end py-0 px-12 my-0 h-18 uppercase subtitle5">
              <span class="block -mb-4">{this.label}</span>
            </p>
          )}
          <div
            class={
              'flex items-center w-full justify-between px-12 h-48 sm:h-32 whitespace-nowrap' +
              (this.multiSelect ? ' hidden' : '')
            }
          >
            <div class="flex items-center w-full h-full">
              {this.icon !== undefined && (
                <i class={'inline-flex items-center justify-center text-1 w-20 mr-8 ' + this.icon}></i>
              )}
              <span ref={el => (this.slotWrapper = el)} class="truncate">
                <slot></slot>
              </span>
            </div>
            {this.checked && !this.multiSelect && <i class="check mds-check text-icon ml-12" data-testid="check"></i>}
            {!!this.submenu && (
              <i class="mds-arrow-triangle-down text-icon transform -rotate-90" data-testid="arrow"></i>
            )}
          </div>
          {this.subtitle && (
            <p class="item-subtitle flex items-start py-0 px-12 my-0 h-16 caption2">
              <span class="block -mt-4 truncate">{this.subtitle}</span>
            </p>
          )}
          {this.multiSelect && (
            <mx-checkbox
              class="flex items-stretch w-full overflow-hidden h-48 sm:h-32"
              label-class="pl-12 pr-16"
              checked={this.checked}
              label-name={this.checkboxLabel}
              label-left={!this.minWidths.sm}
            />
          )}
        </div>
        <slot name="submenu"></slot>
      </Host>
    );
  }
}
