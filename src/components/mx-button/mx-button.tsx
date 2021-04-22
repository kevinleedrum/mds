import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-button',
  shadow: false,
})
export class MxInput {
  btnElem!: HTMLButtonElement;
  anchorElem!: HTMLAnchorElement;

  @Prop() type: string = 'contained';
  @Prop() value: string;
  @Prop() disabled: boolean = false;
  @Prop() xl: boolean = false;
  @Prop() href: string;
  @Prop() target: string;
  @Prop() full: boolean = false;

  ripple(e) {
    // Create span element
    let ripple = document.createElement('span');

    // Add ripple class to span
    ripple.classList.add('ripple');

    // Add span to the button
    this.btnElem.appendChild(ripple);

    // Get position of X
    let x = e.clientX - e.target.offsetLeft;

    // Get position of Y
    let y = e.clientY - e.target.offsetTop;

    // Position the span element
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }

  returnBaseClass() {
    let str = `btn ${this.type}`;
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
            onClick={e => {
              this.ripple(e);
            }}
          >
            {this.value}
          </a>
        ) : (
          <button
            class={this.returnBaseClass()}
            ref={el => (this.btnElem = el as HTMLButtonElement)}
            onClick={e => {
              this.ripple(e);
            }}
            disabled={this.disabled}
          >
            {this.value}
          </button>
        )}
      </Host>
    );
  }
}
