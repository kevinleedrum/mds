import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'mx-badge',
  shadow: false,
})
export class MxBadge {
  isStandalone = true;

  @Element() private element: HTMLElement;

  /** The value to display inside the badge */
  @Prop() value: any;
  /** Make the corners a little more square (best for standalone text) */
  @Prop() squared = false;
  /** Render as a small indicator shape with no inner text.  If the prop is present, but no string value is passed, the shape will default to `circle`. */
  @Prop() indicator: boolean | 'square' | 'triangle-up' | 'hexagon' | 'triangle-down' | 'star';
  /** Additional classes to add to the badge itself */
  @Prop() badgeClass: string;
  /** Class name of icon */
  @Prop() icon: string;
  /** Offset badge inward by this many pixels (e.g. 10 for icon buttons) */
  @Prop() offset = 0;
  /** Anchor the badge to the bottom of the wrapped content */
  @Prop() bottom = false;
  /** Anchor the badge to the left of the wrapped content */
  @Prop() left = false;

  componentWillLoad() {
    this.isStandalone = !this.element.firstElementChild;
  }

  get isIconOnly() {
    return this.icon && this.value === undefined;
  }

  get indicatorIcon(): string {
    if ([false, undefined].includes(this.indicator as any)) return null;
    if ((this.indicator as string).length) return this.indicator as string;
    return 'circle';
  }

  get badgeClassNames() {
    let str = 'badge inline-flex items-center justify-center text-4 font-semibold pointer-events-none';

    // Border-Radius
    if (this.isIconOnly) {
      str += ' rounded-full';
    } else if (this.squared) {
      str += ' rounded';
    } else {
      str += ' rounded-xl';
    }

    // Width & Height
    if (this.indicator != null) {
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
      str += ' absolute transform';
      if (this.bottom) {
        str += ` bottom-${this.offset} translate-y-1/2`;
        str += this.left ? ' origin-bottom-left' : ' origin-bottom-right';
      } else {
        str += ` top-${this.offset} -translate-y-1/2`;
        str += this.left ? ' origin-top-left' : ' origin-top-right';
      }
      str += this.left ? ` left-${this.offset} -translate-x-1/2` : ` right-${this.offset} translate-x-1/2`;
    }

    return [str, this.badgeClass].join(' ');
  }

  render() {
    return (
      <Host class="mx-badge inline-flex relative">
        <slot></slot>
        {this.indicatorIcon ? (
          <span class={this.badgeClassNames} data-testid={'indicator-' + this.indicatorIcon}>
            <i class={'mds-badge-' + this.indicatorIcon}></i>
          </span>
        ) : (
          <span class={this.badgeClassNames}>
            {this.icon && <i class={this.icon + (this.isIconOnly ? '' : ' mr-4')}></i>}
            {this.value}
          </span>
        )}
      </Host>
    );
  }
}
