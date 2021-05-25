import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'mx-badge',
  shadow: false,
})
export class MxBadge {
  childElement: HTMLElement;

  @Element() private element: HTMLElement;

  /** The value to display inside the badge */
  @Prop() value: any;
  /** Make the corners a little more square (best for standalone text) */
  @Prop() squared: boolean = false;
  /** Display as a small dot (no value) */
  @Prop() dot: boolean = false;
  /** Additional classes to add to the badge itself */
  @Prop() badgeClass: string;
  /** Class name of icon */
  @Prop() icon: string;
  /** Place anchored badge further inward */
  @Prop() tight: boolean = false;
  /** Place badge even further inward (suitable for icon buttons) */
  @Prop() snug: boolean = false;
  /** Anchor the badge to the bottom of the wrapped content */
  @Prop() bottom: boolean = false;
  /** Anchor the badge to the left of the wrapped content */
  @Prop() left: boolean = false;

  get isStandalone() {
    return !this.element.firstElementChild;
  }

  get isIconOnly() {
    return this.icon && this.value === undefined;
  }

  get badgeClassNames() {
    let str = 'badge inline-flex items-center justify-center text-sm font-semibold pointer-events-none';

    // Border-Radius
    if (this.dot || this.isIconOnly) {
      str += ' rounded-full';
    } else if (this.squared) {
      str += ' rounded';
    } else {
      str += ' rounded-xl';
    }

    // Width & Height
    if (this.dot) {
      str += ' w-12 h-12';
    } else if (this.isStandalone) {
      str += ' h-24';
      str += this.isIconOnly ? ' w-24' : ' px-8';
    } else {
      str += ' h-20';
      str += this.isIconOnly ? ' w-20' : ' px-6';
    }

    // Position Anchored Badge
    if (!this.isStandalone) {
      const offset = this.tight ? '4' : this.snug ? '10' : '0';
      str += ' absolute transform';
      if (this.bottom) {
        str += ` bottom-${offset} translate-y-1/2`;
        str += this.left ? ' origin-bottom-left' : ' origin-bottom-right';
      } else {
        str += ` top-${offset} -translate-y-1/2`;
        str += this.left ? ' origin-top-left' : ' origin-top-right';
      }
      str += this.left ? ` left-${offset} -translate-x-1/2` : ` right-${offset} translate-x-1/2`;
    }

    return [str, this.badgeClass].join(' ');
  }

  render() {
    return (
      <Host class="mx-badge inline-flex relative">
        <slot></slot>
        <span class={this.badgeClassNames}>
          {this.icon && <i class={this.icon + (this.isIconOnly ? '' : ' mr-4')}></i>}
          {this.value}
        </span>
      </Host>
    );
  }
}
