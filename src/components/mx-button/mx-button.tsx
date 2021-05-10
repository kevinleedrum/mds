import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-button',
  shadow: false,
})
export class MxButton {
  btnElem!: HTMLButtonElement;
  anchorElem!: HTMLAnchorElement;

  @Prop() btnType: string = 'contained';
  @Prop() type: string = 'button'; // reset | submit
  @Prop() value: string;
  @Prop() disabled: boolean = false;
  @Prop() xl: boolean = false;
  @Prop() href: string;
  @Prop() target: string;
  @Prop() full: boolean = false;
  @Prop() iconLeft: string;

  ripple() {
    const elem = this.href ? this.anchorElem : this.btnElem;

    // Create span element
    let ripple = document.createElement('span');

    // Add ripple class to span
    ripple.classList.add('ripple');

    // Add span to the button
    elem.appendChild(ripple);

    // Position the span element
    ripple.style.left = '0';
    ripple.style.top = '0';

    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }

  returnBaseClass() {
    let str = `btn ${this.btnType}`;
    if (this.xl) str = `${str} xl`;
    if (this.full) str = `${str} full`;
    return str;
  }

  render() {
    return (
      <Host class="mx-button">
        {this.href ? (
          <a
            href={this.href}
            target={this.target}
            class={this.returnBaseClass()}
            ref={el => (this.anchorElem = el as HTMLAnchorElement)}
            onClick={() => {
              this.ripple();
            }}
          >
            <div
              class="flex justify-center items-center content-center"
              onClick={() => {
                this.ripple();
              }}
            >
              {this.iconLeft && <i class={this.iconLeft}></i>}
              <slot />
            </div>
          </a>
        ) : (
          <button
            type={this.type}
            value={this.value}
            class={this.returnBaseClass()}
            ref={el => (this.btnElem = el as HTMLButtonElement)}
            onClick={() => {
              this.ripple();
            }}
            disabled={this.disabled}
          >
            <div
              class="flex justify-center items-center content-center relative"
              onClick={() => {
                this.ripple();
              }}
            >
              {this.iconLeft && <i class={this.iconLeft}></i>}
              <slot />
            </div>
          </button>
        )}
      </Host>
    );
  }
}
