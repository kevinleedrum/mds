import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

// TODO: Should "Alt Small" and "Small" be exclusive types?
// https://github.com/moxiworks/mds/issues/208#issuecomment-1242143965
export type McBtnType = 'normal' | 'alt' | 'ghost' | 'transparent' | 'action' | 'error' | 'warning';
export type ButtonTypeAttribute = 'button' | 'submit' | 'reset';

export interface IMcButtonProps {
  btnType?: McBtnType;
  disabled?: boolean;
  dropdown?: boolean;
  elAriaLabel?: string;
  form?: string;
  formaction?: string;
  full?: boolean;
  href?: string;
  hug?: boolean;
  iconLeft?: string;
  iconRight?: string;
  small?: boolean; // TODO: Remove if "small" ends up being a unique type.
  target?: string;
  type?: ButtonTypeAttribute;
  value?: string;
}

@Component({
  tag: 'mc-button',
  shadow: false,
})
export class McButton implements IMcButtonProps {
  dataAttributes = {};
  hasLeftSlot = false;
  hasRightSlot = false;

  @Prop({ mutable: true }) btnType: McBtnType = 'normal';
  @Prop() disabled = false;
  /** Show dropdown icon on right (shorthand for `icon-right="mc-caret-down-fill"`) */
  @Prop() dropdown = false;
  /** The aria-label attribute for the inner button element. */
  @Prop() elAriaLabel: string;
  @Prop() formaction: string;
  @Prop() form: string;
  /** Sets display to flex instead of inline-flex */
  @Prop() full = false;
  /** Create button as link */
  @Prop() href: string;
  /** Sets the min-width to 0.  When combined with a single icon/slot, the text is not centered in the button. */
  @Prop() hug = false;
  /** Class name of left icon */
  @Prop() iconLeft: string;
  /** Class name of right icon */
  @Prop() iconRight: string;
  @Prop() small = false; // TODO: Remove if "small" ends up being a unique type.
  /** Only for link buttons */
  @Prop() target: string;
  @Prop() type: ButtonTypeAttribute = 'button';
  @Prop() value: string;

  @Element() element: HTMLMcButtonElement;

  componentWillRender() {
    this.hasLeftSlot = !!this.element.querySelector('[slot="left"]');
    this.hasRightSlot = !!this.element.querySelector('[slot="right"]');
    propagateDataAttributes.call(this);
  }

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
    str += ' w-full rounded font-bold caption1 uppercase';
    if (this.btnType === 'ghost') str += ' border';
    // TODO: Update below lines if "small" ends up being a unique type.
    str += this.small ? ' min-h-30' : ' min-h-40';
    str += this.small || this.hasRightSlot || this.iconRight || this.dropdown ? ' pr-15' : ' pr-20';
    str += this.small || this.hasLeftSlot || this.iconLeft ? ' pl-15' : ' pl-20';
    return str;
  }

  get minWidthClass() {
    return this.hug ? null : this.small ? 'min-w-100' : 'min-w-150';
  }

  render() {
    const hasLeftOrRightContent =
      this.hasLeftSlot || this.hasRightSlot || this.iconLeft || this.iconRight || this.dropdown;
    const showLeft = this.hasLeftSlot || this.iconLeft || (hasLeftOrRightContent && !this.hug);
    const showRight = this.hasRightSlot || this.iconRight || this.dropdown || (hasLeftOrRightContent && !this.hug);

    const buttonContent = (
      <div
        class="grid w-full justify-center items-center relative overflow-hidden whitespace-nowrap"
        style={{
          gridTemplateColumns: hasLeftOrRightContent && `${showLeft ? '1fr' : ''} auto ${showRight ? '1fr' : ''}`,
        }}
      >
        {showLeft && (
          <span class="flex items-center justify-self-start mr-10">
            <slot name="left" />
            {this.iconLeft && <i class={'text-3 ' + this.iconLeft}></i>}
          </span>
        )}
        <span class="slot-content truncate">
          <slot />
        </span>
        {showRight && (
          <span class="flex items-center justify-self-end ml-10">
            {(this.iconRight || this.dropdown) && (
              <i
                data-testid="dropdown-icon"
                class={`text-3 ${this.dropdown ? 'mc-caret-down-fill' : this.iconRight}`}
              ></i>
            )}
            <slot name="right" />
          </span>
        )}
      </div>
    );

    return (
      <Host class={`${this.minWidthClass} ${this.full ? 'flex' : 'inline-flex'}`}>
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
