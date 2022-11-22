import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

export type McIconBtnType = 'normal' | 'small' | 'close';
export type ButtonTypeAttribute = 'button' | 'submit' | 'reset';

export interface IMcIconButtonProps {
  btnType?: McIconBtnType;
  disabled?: boolean;
  /** The aria-label attribute for the inner button element. */
  elAriaLabel?: string;
  form?: string;
  formaction?: string;
  /** Create button as link */
  href?: string;
  /** Class name of icon */
  icon?: string;
  /** Only for link buttons */
  target?: string;
  type?: ButtonTypeAttribute;
  value?: string;
}

@Component({
  tag: 'mc-icon-button',
  shadow: false,
})
export class McIconButton implements IMcIconButtonProps {
  dataAttributes = {};

  @Prop({ mutable: true }) btnType: McIconBtnType = 'normal';
  @Prop() disabled = false;
  @Prop() elAriaLabel: string;
  @Prop() formaction: string;
  @Prop() form: string;
  @Prop() href: string;
  @Prop() icon: string;
  @Prop() target: string;
  @Prop() type: ButtonTypeAttribute = 'button';
  @Prop() value: string;

  @Element() element: HTMLMcIconButtonElement;

  componentWillRender = propagateDataAttributes;

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
  }

  get buttonClass() {
    let str = this.btnType + '-button'; // Sets color vars
    str += ' flex items-center justify-center relative overflow-hidden appearance-none select-none';
    str += ' cursor-pointer disabled:pointer-events-none disabled:cursor-auto hover:no-underline';
    str += ' rounded-full text-16';
    str += this.btnType === 'normal' ? ' h-40 w-40' : ' h-30 w-30';
    return str;
  }

  render() {
    const buttonContent = (
      <span class="flex">
        {this.btnType === 'close' && <i class="mds-x-close"></i>}
        {this.icon && <i class={this.icon}></i>}
        <slot />
      </span>
    );

    return (
      <Host class="inline-flex">
        {this.href ? (
          <a
            href={this.href}
            target={this.target}
            aria-disabled={this.disabled ? 'true' : null}
            class={this.buttonClass}
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
