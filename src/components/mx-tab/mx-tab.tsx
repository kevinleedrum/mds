import { Component, Host, h, Prop } from '@stencil/core';
import ripple from '../ripple';

@Component({
  tag: 'mx-tab',
  shadow: false,
})
export class MxTab {
  btnElem: HTMLButtonElement;

  /** Label text to display */
  @Prop() label: string = '';
  /** If you are not providing a `label`, this should be provided instead for accessibility */
  @Prop() ariaLabel: string = '';
  /** Class name of icon to display */
  @Prop() icon: string = '';
  /** Only set this if you are not using the `mx-tabs` `value` prop */
  @Prop({ reflect: true }) selected: boolean = false;
  /** Display a dot badge */
  @Prop() badge: boolean = false;
  /** Additional classes for the badge */
  @Prop() badgeClass: string = '';

  onClick(e: MouseEvent) {
    ripple(e, this.btnElem);
  }

  get tabClass() {
    let str = 'mx-tab relative inline-flex items-center justify-center min-w-full';
    str += this.label && this.icon ? ' h-72' : ' h-48';
    if (this.badge && this.label) str += ' wider';
    return str;
  }

  get badgeEl() {
    return <mx-badge dot badgeClass={['w-8 h-8', this.badgeClass].join(' ')} />;
  }

  render() {
    return (
      <Host class={this.tabClass}>
        <button
          ref={el => (this.btnElem = el)}
          role="tab"
          type="button"
          aria-selected={this.selected}
          aria-label={this.label || this.ariaLabel}
          class="relative overflow-hidden w-full h-full border border-transparent"
          onClick={this.onClick.bind(this)}
        >
          <div class="relative flex flex-col items-center justify-center space-y-6 pointer-events-none">
            <span class="flex items-center space-x-6">
              {!this.label && this.badge && this.badgeEl}
              {this.icon && <i class={this.icon + ' text-xl' + (!this.label ? ' icon-only' : '')}></i>}
            </span>
            {this.label && (
              <span class="flex items-center uppercase text-sm font-semibold leading-4 tracking-1-25 space-x-6">
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