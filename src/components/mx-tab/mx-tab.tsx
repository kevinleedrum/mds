import { Component, Host, h, Prop } from '@stencil/core';
import ripple from '../../utils/ripple';

export interface IMxTabProps {
  label?: string;
  ariaLabel?: string;
  icon?: string;
  selected?: boolean;
  badge?: boolean;
  badgeClass?: string;
}

@Component({
  tag: 'mx-tab',
  shadow: false,
})
export class MxTab implements IMxTabProps {
  btnElem: HTMLButtonElement;

  /** Label text to display */
  @Prop() label: string = '';
  /** If you are not providing a `label`, this should be provided instead for accessibility */
  @Prop() ariaLabel: string = '';
  /** Class name of icon to display */
  @Prop() icon: string = '';
  /** Do not set this manually. It will be set automatically based on the `mx-tabs` `value` prop */
  @Prop({ reflect: true }) selected: boolean = false;
  /** Display a circular badge */
  @Prop() badge: boolean = false;
  /** Additional classes for the badge */
  @Prop() badgeClass: string = '';

  componentDidLoad() {
    if (!this.label && !this.ariaLabel) {
      throw new Error('Please provide either a label or an aria-label for each tab.');
    }
  }

  onClick(e: MouseEvent) {
    ripple(e, this.btnElem);
  }

  get tabClass() {
    let str = 'mx-tab relative inline-flex items-center justify-center min-w-full';
    str += this.label && this.icon ? ' h-72' : ' h-48';
    return str;
  }

  get badgeEl() {
    return <mx-badge indicator badgeClass={['w-8 h-8', this.badgeClass].join(' ')} />;
  }

  get isTextOnly() {
    return this.label && !this.icon;
  }

  render() {
    return (
      <Host class={this.tabClass}>
        <button
          ref={el => (this.btnElem = el)}
          role="tab"
          type="button"
          aria-selected={this.selected ? 'true' : null}
          aria-label={this.label || this.ariaLabel}
          class="relative overflow-hidden w-full h-full border border-transparent px-44"
          onClick={this.onClick.bind(this)}
        >
          <div class="relative flex flex-col items-center justify-center space-y-6 pointer-events-none">
            {!this.isTextOnly && (
              <span class="flex items-center space-x-6">
                {!this.label && this.badge && this.badgeEl}
                {this.icon && <i class={this.icon + ' text-1' + (!this.label ? ' icon-only' : '')}></i>}
              </span>
            )}
            {this.label && (
              <span class="flex items-center uppercase text-4 font-semibold leading-4 tracking-1-25 space-x-6">
                {this.badge && this.badgeEl}
                <span>{this.label}</span>
              </span>
            )}
          </div>
        </button>
        <span
          class={
            'active-tab-indicator absolute bottom-0 left-0 w-full h-2 pointer-events-none' +
            (this.selected ? '' : ' opacity-0')
          }
        ></span>
      </Host>
    );
  }
}
