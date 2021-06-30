import { Component, Host, h, Element, Prop, Event, EventEmitter } from '@stencil/core';
import ripple from '../ripple';

@Component({
  tag: 'mx-menu-item',
  shadow: false,
})
export class MxMenuItem {
  btnElem: HTMLButtonElement;

  @Prop() disabled: boolean = false;
  @Prop() value: any = null;

  @Element() element: HTMLMxMenuItemElement;

  @Event() mxClick: EventEmitter<MouseEvent>;

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    ripple(e, this.btnElem);
    // Allow ripple to animate for 100ms before closing menu
    setTimeout(this.mxClick.emit, 100, e);
  }

  get menuItemClass() {
    let str = 'flex items-center w-full relative cursor-pointer overflow-hidden';
    const isDense = (this.element.parentElement as HTMLMxMenuElement).dense;
    str += isDense ? ' h-32 text-sm px-8' : ' h-36 px-12';
    return str;
  }

  render() {
    return (
      <Host class="mx-menu-item block">
        <button
          ref={el => (this.btnElem = el)}
          role="menuitem"
          type="button"
          aria-disabled={this.disabled}
          class={this.menuItemClass}
          onClick={this.onClick.bind(this)}
        >
          <slot></slot>
        </button>
      </Host>
    );
  }
}
