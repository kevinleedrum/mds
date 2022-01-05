import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

@Component({
  tag: 'mx-icon-button',
  shadow: false,
})
export class MxIconButton {
  btnElem!: HTMLButtonElement;
  anchorElem!: HTMLAnchorElement;
  dataAttributes = {};

  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() formaction: string;
  @Prop() value: string;
  @Prop({ reflect: true }) disabled: boolean = false;
  /** An aria-label is highly recommended */
  @Prop() ariaLabel: string;
  /** Show downward chevron icon */
  @Prop() chevronDown: boolean = false;
  /** Show left-pointing chevron icon */
  @Prop() chevronLeft: boolean = false;
  /** Show right-pointing chevron icon */
  @Prop() chevronRight: boolean = false;
  /** Class name of icon (for icon font) */
  @Prop() icon: string;

  @Element() element: HTMLMxInputElement;

  componentWillRender = propagateDataAttributes;

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
  }

  get isChevron() {
    return this.chevronDown || this.chevronLeft || this.chevronRight;
  }

  render() {
    const buttonContent = (
      <div class="flex justify-center items-center content-center relative">
        {this.icon && <i class={['text-icon', this.icon].join(' ')}></i>}
        <span class="slot-content">
          <slot />
        </span>
        {this.isChevron && (
          <span class="chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center text-icon shadow-1">
            <i
              data-testid="chevron"
              class={
                this.chevronLeft ? 'mds-chevron-left' : this.chevronRight ? 'mds-chevron-right' : 'mds-chevron-down'
              }
            ></i>
          </span>
        )}
      </div>
    );

    return (
      <Host class="mx-icon-button inline-block appearance-none">
        <button
          type={this.type}
          formaction={this.formaction}
          value={this.value}
          class="flex appearance-none items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto"
          ref={el => (this.btnElem = el as HTMLButtonElement)}
          onClick={this.onClick.bind(this)}
          aria-disabled={this.disabled ? 'true' : null}
          aria-label={this.ariaLabel}
          {...this.dataAttributes}
        >
          {buttonContent}
        </button>
      </Host>
    );
  }
}
