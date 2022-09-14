import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

// TODO: Should "Alt Small" and "Small" be exclusive types?
// https://github.com/moxiworks/mds/issues/208#issuecomment-1242143965
export type McBtnType = 'normal' | 'alt' | 'ghost' | 'transparent' | 'action' | 'error' | 'warning';
export type ButtonTypeAttribute = 'button' | 'submit' | 'reset';

export interface IMcButtonProps {
  btnType?: McBtnType;
  disabled?: boolean;
  /** Show dropdown icon on right (shorthand for `icon-right="mds-caret-down-fill"`) */
  dropdown?: boolean;
  /** The aria-label attribute for the inner button element. */
  elAriaLabel?: string;
  form?: string;
  formaction?: string;
  /** Sets display to flex instead of inline-flex */
  full?: boolean;
  /** Create button as link */
  href?: string;
  /** Sets the min-width to 0.  When combined with a single icon/slot, the text is not centered in the button. */
  hug?: boolean;
  /** Class name of left icon */
  iconLeft?: string;
  /** Class name of right icon */
  iconRight?: string;
  small?: boolean; // TODO: Remove if "small" ends up being a unique type.
  /** Only for link buttons */
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
  @Prop() dropdown = false;
  @Prop() elAriaLabel: string;
  @Prop() formaction: string;
  @Prop() form: string;
  @Prop() full = false;
  @Prop() href: string;
  @Prop() hug = false;
  @Prop() iconLeft: string;
  @Prop() iconRight: string;
  @Prop() small = false; // TODO: Remove if "small" ends up being a unique type.
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

  get hasLeftOrRightContent() {
    return this.hasLeftSlot || this.hasRightSlot || this.iconLeft || this.iconRight || this.dropdown;
  }

  get buttonClass() {
    let str = this.btnType + '-button'; // Sets color vars
    str += ' flex items-center justify-center relative overflow-hidden appearance-none select-none';
    str += ' cursor-pointer disabled:pointer-events-none disabled:cursor-auto hover:no-underline';
    str += ' w-full rounded font-bold caption1 uppercase'; // TODO: Replace caption1 class if necesary
    if (this.btnType === 'ghost') str += ' border';
    // TODO: Update below lines if "small" ends up being a unique type.
    str += this.small ? ' min-h-30' : ' min-h-40';
    str += this.small || this.hasLeftOrRightContent ? ' pr-15' : ' pr-20';
    str += this.small || this.hasLeftOrRightContent ? ' pl-15' : ' pl-20';
    return str;
  }

  get minWidthClass() {
    return this.hug ? null : this.small ? 'min-w-100' : 'min-w-150';
  }

  get showLeft() {
    return this.hasLeftSlot || this.iconLeft || (this.hasLeftOrRightContent && !this.hug);
  }

  get showRight() {
    return this.hasRightSlot || this.iconRight || this.dropdown || (this.hasLeftOrRightContent && !this.hug);
  }

  get gridTemplateColumns() {
    return `${this.showLeft ? '1fr' : ''} auto ${this.showRight ? '1fr' : ''}`;
  }

  render() {
    const buttonContent = (
      <div
        class="grid w-full justify-center items-center relative overflow-hidden whitespace-nowrap"
        style={{ gridTemplateColumns: this.gridTemplateColumns }}
      >
        {this.showLeft && (
          <span class="flex items-center justify-self-start mr-10">
            <slot name="left" />
            {this.iconLeft && <i class={'text-3 ' + this.iconLeft}></i>}
          </span>
        )}
        <span class="slot-content truncate">
          <slot />
        </span>
        {this.showRight && (
          <span class="flex items-center justify-self-end ml-10">
            {(this.iconRight || this.dropdown) && (
              <i
                data-testid="dropdown-icon"
                class={`text-3 ${this.dropdown ? 'mds-caret-down-fill' : this.iconRight}`}
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
