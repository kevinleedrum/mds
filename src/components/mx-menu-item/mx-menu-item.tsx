import { Component, Host, h, Element, Prop, Event, EventEmitter, Listen, Method } from '@stencil/core';
import checkSvg from '../../assets/svg/check.svg';
import arrowSvg from '../../assets/svg/arrow-triangle-down.svg';
@Component({
  tag: 'mx-menu-item',
  shadow: false,
})
export class MxMenuItem {
  menuItemElem: HTMLElement;
  subMenu: HTMLMxMenuElement;
  subMenuDelayTimeout;

  /** If `multiSelect` is false, this will render a checkmark on the right side of the menu item.  If both `multiSelect` and `checked` are `true`, then the rendered multi-select checkbox will be checked. */
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;
  /** The class name of the icon to display on the left.  Internally, this may also be set to `null` to add an empty icon (to align with sibling menu items that have icons). */
  @Prop() icon: string;
  /** A label to display above the menu item */
  @Prop() label: string;
  /** Render a checkbox as part of the menu item.  On small screens, the checkbox will appear on the left; otherwise, it will be on the right. */
  @Prop() multiSelect: boolean = false;

  @Element() element: HTMLMxMenuItemElement;

  /** Fired when an enabled menu item without a submenu is clicked. Used interally to close all ancestor menus. */
  @Event() mxClick: EventEmitter<MouseEvent>;

  @Listen('mouseenter')
  onMouseEnter() {
    this.closeSiblingSubMenus();
    // Focus menu item on hover for consistent keyboard navigation
    this.focusMenuItem();
    if (this.subMenu) {
      // Delay opening the submenu when hovering
      clearTimeout(this.subMenuDelayTimeout);
      this.subMenuDelayTimeout = setTimeout(this.openSubMenu.bind(this), 150);
    }
  }
  @Listen('mouseleave')
  onMouseLeave() {
    clearTimeout(this.subMenuDelayTimeout);
    (document.activeElement as HTMLElement).blur();
  }

  @Listen('focus')
  onFocus() {
    this.closeSiblingSubMenus();
  }

  @Listen('keydown')
  async onKeyDown(e: KeyboardEvent) {
    if (this.subMenu) return this.onKeyDownSubMenu(e);
    // Treat Enter or Space as a click
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      (document.activeElement as HTMLElement).click();
    }
  }

  componentWillLoad() {
    this.subMenu = this.element.querySelector('[slot="subMenu"]');
  }

  @Method()
  async closeSubMenu() {
    if (this.subMenu) {
      clearTimeout(this.subMenuDelayTimeout);
      return await this.subMenu.closeMenu();
    }
  }

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

  async openSubMenu() {
    if (this.subMenu) {
      this.subMenu.placement = 'right-start';
      this.subMenu.anchorEl = this.element;
      return this.subMenu.openMenu();
    }
  }

  onClick(e: MouseEvent) {
    if (this.disabled || !!this.subMenu) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (!this.multiSelect) this.mxClick.emit(e);
  }

  render() {
    return (
      <Host class={'mx-menu-item block' + (!!this.subMenu ? ' has-submenu' : '')}>
        <div
          ref={el => (this.menuItemElem = el)}
          role="menuitem"
          aria-disabled={this.disabled}
          tabindex={this.disabled || this.multiSelect ? '-1' : '0'}
          class="block w-full cursor-pointer text-4 outline-none"
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
              <span class="overflow-hidden overflow-ellipsis">
                <slot></slot>
              </span>
            </div>
            {this.checked && !this.multiSelect && <span class="check ml-12" innerHTML={checkSvg}></span>}
            {!!this.subMenu && <span class="transform -rotate-90" innerHTML={arrowSvg}></span>}
          </div>
          {this.multiSelect && (
            <mx-checkbox
              class="flex items-stretch w-full h-48 sm:h-32"
              label-class="px-12"
              checked={this.checked}
              label-name={this.element.innerText}
            />
          )}
        </div>
        <slot name="subMenu"></slot>
      </Host>
    );
  }
}