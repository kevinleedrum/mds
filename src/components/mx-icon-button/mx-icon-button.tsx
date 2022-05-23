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
  @Prop() form: string;
  @Prop() formaction: string;
  @Prop() value: string;
  /** Create button as link */
  @Prop() href: string;
  /** Only for link buttons */
  @Prop() target: string;
  @Prop({ reflect: true }) disabled: boolean = false;
  /** The aria-label attribute for the inner button element. */
  @Prop() elAriaLabel: string;
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
    const Tag = this.href ? 'a' : 'button';

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
        <Tag
          type={this.href ? null : this.type}
          form={this.form}
          formaction={this.formaction}
          value={this.value}
          href={this.href}
          target={this.href ? this.target : null}
          class="flex text-current appearance-none items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer disabled:pointer-events-none disabled:cursor-auto"
          ref={el => (this.btnElem = el as HTMLButtonElement)}
          disabled={this.disabled}
          aria-disabled={this.disabled ? 'true' : null}
          aria-label={this.elAriaLabel}
          tabindex={this.disabled ? '-1' : '0'}
          {...this.dataAttributes}
          onClick={this.onClick.bind(this)}
        >
          {buttonContent}
        </Tag>
      </Host>
    );
  }
}
