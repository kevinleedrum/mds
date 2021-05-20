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

  get hostClass() {
    let str = 'mx-button';
    str += this.full ? ' flex' : ' inline-flex';
    return str;
  }

  get baseClass() {
    let str = `btn ${this.btnType}`;
    if (this.xl) str += ' xl';
    if (this.full) str += ' full';
    if (this.dropdown) str += ' dropdown';
    // Action buttons and Text Dropdown buttons are not uppercase
    if (this.btnType !== 'action' && !(this.btnType === 'text' && this.dropdown)) str += ' uppercase';
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
      <Host class={this.hostClass}>
        {this.href ? (
          <a
            href={this.href}
            target={this.target}
            class={this.baseClass}
            ref={el => (this.anchorElem = el as HTMLAnchorElement)}
            onClick={e => this.onClick(e)}
          >
            {buttonContent}
          </a>
        ) : (
          <button
            type={this.type}
            value={this.value}
            class={this.baseClass}
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
