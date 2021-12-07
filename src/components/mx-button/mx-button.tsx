import { Component, Host, h, Prop, Element } from '@stencil/core';
import ripple from '../../utils/ripple';
import chevronSvg from '../../assets/svg/chevron-down.svg';
import { propagateDataAttributes } from '../../utils/utils';

export type BtnType = 'contained' | 'outlined' | 'action' | 'text';
export type ButtonTypeAttribute = 'button' | 'submit' | 'reset';

export interface IMxButtonProps {
  btnType?: BtnType;
  type?: ButtonTypeAttribute;
  value?: string;
  formaction?: string;
  disabled?: boolean;
  xl?: boolean;
  href?: string;
  target?: string;
  full?: boolean;
  dropdown?: boolean;
}

@Component({
  tag: 'mx-button',
  shadow: false,
})
export class MxButton implements IMxButtonProps {
  btnElem!: HTMLButtonElement;
  anchorElem!: HTMLAnchorElement;
  dataAttributes = {};

  @Prop() btnType: BtnType = 'contained';
  @Prop() type: ButtonTypeAttribute = 'button';
  @Prop() value: string;
  @Prop() formaction: string;
  @Prop() disabled: boolean = false;
  @Prop() xl: boolean = false;
  /** Create button as link */
  @Prop() href: string;
  /** Only for link buttons */
  @Prop() target: string;
  /** Sets display to flex instead of inline-flex */
  @Prop() full: boolean = false;
  /** Show chevron icon */
  @Prop() dropdown: boolean = false;
  /** Class name of icon */
  @Prop() icon: string;

  @Element() element: HTMLMxInputElement;

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
      ' flex items-center justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto hover:no-underline';

    // Contained & Outlined Buttons
    if (['contained', 'outlined'].includes(this.btnType)) {
      str += ' w-full rounded-lg font-semibold uppercase';
      if (this.btnType === 'outlined') str += ' border';
      if (this.xl) str += ' min-h-48 px-32 text-3 tracking-1-5';
      else str += ' min-h-36 px-16 text-4 tracking tracking-1-25';
    }

    // Action Button
    if (this.btnType === 'action') {
      str += ' w-full min-h-36 px-16 border rounded-3xl text-4';
    }

    // Text Button
    if (this.btnType === 'text') {
      str += ' w-full min-h-36 px-8 py-10 text-4 rounded-lg';
      str += this.dropdown ? ' font-normal' : ' font-semibold uppercase tracking-1-25';
    }

    return str;
  }

  render() {
    const buttonContent = (
      <div class="flex justify-center items-center content-center relative">
        {this.icon && <i class={'mr-8 text-3 ' + this.icon}></i>}
        <span class="slot-content">
          <slot />
        </span>
        {this.dropdown && this.btnType === 'text' && <span class="separator inline-block w-1 ml-4 -my-4 h-24"></span>}
        {this.dropdown && (
          <span
            data-testid="chevron"
            class={this.btnType === 'text' ? 'chevron-icon ml-4' : 'ml-8'}
            innerHTML={chevronSvg}
          ></span>
        )}
      </div>
    );

    return (
      <Host class={'mx-button' + (this.full ? ' flex' : ' inline-flex')}>
        {this.href ? (
          <a
            href={this.href}
            target={this.target}
            class={this.buttonClass}
            ref={el => (this.anchorElem = el as HTMLAnchorElement)}
            onClick={this.onClick.bind(this)}
          >
            {buttonContent}
          </a>
        ) : (
          <button
            type={this.type}
            formaction={this.formaction}
            value={this.value}
            class={this.buttonClass}
            ref={el => (this.btnElem = el as HTMLButtonElement)}
            onClick={this.onClick.bind(this)}
            aria-disabled={this.disabled ? 'true' : null}
            {...this.dataAttributes}
          >
            {buttonContent}
          </button>
        )}
      </Host>
    );
  }
}
