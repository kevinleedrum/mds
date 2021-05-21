import { Component, Host, h, Prop } from '@stencil/core';
import ripple from '../ripple';

@Component({
  tag: 'mx-button',
  shadow: false,
})
export class MxButton {
  btnElem!: HTMLButtonElement;
  anchorElem!: HTMLAnchorElement;

  @Prop() btnType: string = 'contained'; // contained | outlined | action | text | icon
  @Prop() type: string = 'button'; // reset | submit
  @Prop() value: string;
  @Prop() disabled: boolean = false;
  @Prop() xl: boolean = false;
  @Prop() href: string;
  @Prop() target: string;
  @Prop() full: boolean = false;
  @Prop() dropdown: boolean = false;
  @Prop() icon: string;

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    if (this.btnType !== 'icon') ripple(e, this.href ? this.anchorElem : this.btnElem);
  }

  get buttonClass() {
    // The btnType and dropdown classes are only used for colors
    let str = this.btnType;
    if (this.dropdown) str += ' dropdown';

    // Common classes
    str += ' relative overflow-hidden cursor-pointer hover:no-underline';

    // Contained & Outlined Buttons
    if (['contained', 'outlined'].includes(this.btnType)) {
      str += ' w-full rounded-lg font-semibold uppercase';
      if (this.btnType === 'outlined') str += ' border';
      if (this.xl) str += ' px-32 py-16 text-base';
      else str += ' px-16 py-10 text-sm';
    }

    // Action Button
    if (this.btnType === 'action') {
      str += ' w-full px-16 py-8 border rounded-3xl text-sm';
    }

    // Text Button
    if (this.btnType === 'text') {
      str += ' w-full px-8 py-10 text-sm leading-4 rounded-lg';
      str += this.dropdown ? ' font-normal' : ' font-semibold uppercase';
    }

    // Icon Button
    if (this.btnType === 'icon') {
      str += ' w-48 h-48 text-xl rounded-full';
    }

    return str;
  }

  get chevronClass() {
    if (this.btnType === 'text') return 'ml-4';
    if (this.btnType === 'icon')
      return 'chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center bg-white shadow-dp-1';
    return 'ml-8';
  }

  render() {
    const chevronIcon = (
      <svg class="chevron-icon" width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.8849 0L6.29492 4.58L1.70492 0L0.294922 1.41L6.29492 7.41L12.2949 1.41L10.8849 0Z"
          fill="currentColor"
          fill-opacity="0.88"
        />
      </svg>
    );

    const buttonContent = (
      <div class="flex justify-center items-center content-center relative">
        {this.icon && <i class={(this.btnType === 'icon' ? '' : 'mr-8 ') + this.icon}></i>}
        {this.btnType !== 'icon' && (
          <span class="slot-content">
            <slot />
          </span>
        )}
        {this.dropdown && this.btnType === 'text' && <span class="separator inline-block w-1 ml-4 -my-4 h-24"></span>}
        {this.dropdown && <span class={this.chevronClass}>{chevronIcon}</span>}
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
            onClick={e => this.onClick(e)}
          >
            {buttonContent}
          </a>
        ) : (
          <button
            type={this.type}
            value={this.value}
            class={this.buttonClass}
            ref={el => (this.btnElem = el as HTMLButtonElement)}
            onClick={e => this.onClick(e)}
            aria-disabled={this.disabled}
          >
            {buttonContent}
          </button>
        )}
      </Host>
    );
  }
}
