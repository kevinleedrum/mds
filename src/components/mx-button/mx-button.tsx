import { Component, Host, h, Prop } from '@stencil/core';

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
  @Prop() iconLeft: string;
  @Prop() icon: string;

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    if (this.btnType !== 'icon') this.ripple(e);
  }

  ripple(e: MouseEvent) {
    const elem = this.href ? this.anchorElem : this.btnElem;

    // Create span element
    let ripple = document.createElement('span');

    // Add ripple class to span
    ripple.classList.add('ripple');

    // Add span to the button
    elem.appendChild(ripple);

    // Position the span element
    ripple.style.left = (e.offsetX || 0) + 'px';
    ripple.style.top = (e.offsetY || 0) + 'px';

    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }

  returnHostClass() {
    let str = 'mx-button';
    str += this.full ? ' flex' : ' inline-flex';
    return str;
  }

  returnBaseClass() {
    let str = `btn ${this.btnType}`;
    if (this.xl) str = `${str} xl`;
    if (this.full) str = `${str} full`;
    if (this.dropdown) str += ' dropdown';
    // Action buttons and Text Dropdown buttons are not uppercase
    if (this.btnType !== 'action' && !(this.btnType === 'text' && this.dropdown)) str += ' uppercase';
    return str;
  }

  returnChevronClass() {
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
        {this.iconLeft && <i class={'mr-8 ' + this.iconLeft}></i>}
        {this.icon && <i class={this.icon}></i>}
        {this.btnType !== 'icon' && (
          <span class="slot-content">
            <slot />
          </span>
        )}
        {this.dropdown && this.btnType === 'text' && <span class="separator inline-block w-1 ml-4 -my-4 h-24"></span>}
        {this.dropdown && <span class={this.returnChevronClass()}>{chevronIcon}</span>}
      </div>
    );

    return (
      <Host class={this.returnHostClass()}>
        {this.href ? (
          <a
            href={this.href}
            target={this.target}
            class={this.returnBaseClass()}
            ref={el => (this.anchorElem = el as HTMLAnchorElement)}
            onClick={e => this.onClick(e)}
          >
            {buttonContent}
          </a>
        ) : (
          <button
            type={this.type}
            value={this.value}
            class={this.returnBaseClass()}
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
