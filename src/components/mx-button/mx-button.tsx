import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-button',
  styleUrl: 'mx-button.scss',
  shadow: false,
})
export class MxInput {
  btnElem!: HTMLButtonElement;

  @Prop() type: string = 'contained';
  @Prop() value: string;
  @Prop() disabled: boolean = false;
  @Prop() xl: boolean = false;

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
    return str;
  }

  render() {
    return (
      <Host>
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
      </Host>
    );
  }
}
