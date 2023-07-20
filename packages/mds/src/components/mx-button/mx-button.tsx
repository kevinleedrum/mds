import { Component, Host, h, Prop, Element } from '@stencil/core';
import ripple from '../../utils/ripple';
import { propagateDataAttributes } from '../../utils/utils';

export type BtnType = 'contained' | 'outlined' | 'simple' | 'text' | 'action'; // 'action' is deprecated in favor of 'simple'
export type ButtonTypeAttribute = 'button' | 'submit' | 'reset';

export interface IMxButtonProps {
  btnType?: BtnType;
  type?: ButtonTypeAttribute;
  value?: string;
  form?: string;
  formaction?: string;
  disabled?: boolean;
  xl?: boolean;
  href?: string;
  target?: string;
  full?: boolean;
  dropdown?: boolean;
  icon?: string;
  elAriaLabel?: string;
}

@Component({
  tag: 'mx-button',
  shadow: false,
})
export class MxButton implements IMxButtonProps {
  btnElem!: HTMLButtonElement;
  anchorElem!: HTMLAnchorElement;
  dataAttributes = {};

  @Prop({ mutable: true }) btnType: BtnType = 'contained';
  /** The aria-label attribute for the inner button element. */
  @Prop() elAriaLabel: string;
  @Prop() type: ButtonTypeAttribute = 'button';
  @Prop() value: string;
  @Prop() form: string;
  @Prop() formaction: string;
  @Prop() disabled = false;
  @Prop() xl = false;
  /** Create button as link */
  @Prop() href: string;
  /** Only for link buttons */
  @Prop() target: string;
  /** Sets display to flex instead of inline-flex */
  @Prop() full = false;
  /** Show chevron icon */
  @Prop() dropdown = false;
  /** Class name of icon */
  @Prop() icon: string;

  @Element() element: HTMLMxButtonElement;

  componentWillRender = propagateDataAttributes;

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    ripple(e, this.href ? this.anchorElem : this.btnElem);
  }

  get buttonClass() {
    // The btnType and dropdown classes are only used for colors
    let str = this.btnType;
    if (this.dropdown) str += ' dropdown';

    // Common classes
    str +=
      ' flex items-center justify-center relative overflow-hidden cursor-pointer appearance-none disabled:pointer-events-none disabled:cursor-auto hover:no-underline';

    // Contained & Outlined Buttons
    if (['contained', 'outlined'].includes(this.btnType)) {
      str += ' w-full rounded font-semibold uppercase';
      if (this.btnType === 'outlined') str += ' border';
      if (this.xl) str += ' min-h-48 px-32 text-3 tracking-1-5';
      else str += ' min-h-36 px-16 text-4 tracking tracking-1-25';
    }

    // Simple Button
    if (this.btnType === 'simple') {
      str += ' w-full min-h-36 px-16 border rounded text-4';
    }

    // Text Button
    if (this.btnType === 'text') {
      str += ' w-full min-h-36 px-8 py-10 text-4 rounded';
      str += this.dropdown ? ' font-normal' : ' font-semibold uppercase tracking-1-25';
    }

    return str;
  }

  connectedCallback() {
    // The 'action' type has been renamed to 'simple'
    if (this.btnType === 'action') this.btnType = 'simple';
  }

  render() {
    const buttonContent = (
      <div class="flex justify-center items-center content-center relative overflow-hidden whitespace-nowrap">
        {this.icon && <i class={'mr-8 text-3 ' + this.icon}></i>}
        <span class="slot-content truncate">
          <slot />
        </span>
        {this.dropdown && this.btnType === 'text' && <span class="separator inline-block w-1 ml-4 -my-4 h-24"></span>}
        {this.dropdown && (
          <i
            data-testid="chevron"
            class={'mds-chevron-down text-icon ' + (this.btnType === 'text' ? 'chevron-icon' : 'ml-4')}
          ></i>
        )}
      </div>
    );

    return (
      <Host class={'mx-button appearance-none' + (this.full ? ' flex' : ' inline-flex')}>
        {this.href ? (
          <a
            href={this.href}
            target={this.target}
            aria-disabled={this.disabled ? 'true' : null}
            class={this.buttonClass}
            ref={el => (this.anchorElem = el as HTMLAnchorElement)}
            onClick={this.onClick.bind(this)}
            {...this.dataAttributes}
          >
            {buttonContent}
          </a>
        ) : (
          <button
            type={this.type}
            form={this.form}
            formaction={this.formaction}
            value={this.value}
            disabled={this.disabled}
            class={this.buttonClass}
            ref={el => (this.btnElem = el as HTMLButtonElement)}
            onClick={this.onClick.bind(this)}
            aria-label={this.elAriaLabel}
            {...this.dataAttributes}
          >
            {buttonContent}
          </button>
        )}
      </Host>
    );
  }
}
