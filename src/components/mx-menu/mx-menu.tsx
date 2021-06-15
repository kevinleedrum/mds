import { Component, Host, h, Prop, Element, Watch, Event, EventEmitter, Listen, State } from '@stencil/core';
import { createPopover, PopoverInstance, PopoverPlacement } from '../../utils/popover';

@Component({
  tag: 'mx-menu',
  shadow: false,
})
export class MxMenu {
  popoverInstance: PopoverInstance;

  @Prop() anchorEl: HTMLElement;
  @Prop() dense: boolean = false;
  @Prop() placement: PopoverPlacement = 'bottom';

  @State() isOpen: boolean = false;

  @Element() element: HTMLMxMenuElement;

  @Event() mxClose: EventEmitter<MouseEvent | KeyboardEvent>;

  @Listen('mxClick')
  onMenuItemClick() {
    // Close menu after menu item is clicked
    this.isOpen = false;
  }

  @Listen('click', { target: 'document', capture: true })
  onClick(e: MouseEvent) {
    if (!this.isOpen && this.anchorEl.contains(e.target as Node)) {
      // Open menu when the anchorEl is clicked
      this.isOpen = true;
    } else if (this.isOpen && this.element && !this.element.contains(e.target as Node)) {
      // Close menu when a click occurs outside the menu
      this.isOpen = false;
    }
  }
  @Listen('keydown', { target: 'document' })
  onKeydown(e: KeyboardEvent) {
    if (this.isOpen && e.key === 'Escape') {
      // Close menu on Escape key
      this.isOpen = false;
    }
  }

  @Watch('isOpen')
  toggleMenu() {
    if (this.isOpen && this.anchorEl) {
      this.popoverInstance = createPopover(this.anchorEl, this.element, this.placement);
    } else if (!this.isOpen && this.popoverInstance) {
      this.popoverInstance.destroy();
      this.popoverInstance = null;
    }
  }

  connectedCallback() {
    this.anchorEl && this.anchorEl.setAttribute('aria-haspopup', 'true');
  }

  get hostClass() {
    let str = 'mx-menu inline-flex flex-col fixed max-w-full py-12 z-10 shadow-9 rounded-lg';
    str += this.dense ? ' py-8' : ' py-12';
    if (!this.isOpen) str += ' hidden';
    return str;
  }

  render() {
    return (
      <Host class={this.hostClass} role="menu">
        <slot></slot>
      </Host>
    );
  }
}
