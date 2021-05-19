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

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    this.ripple(e);
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
    return str;
  }

  render() {
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
            <div class="flex justify-center items-center content-center">
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
            onClick={e => this.onClick(e)}
            aria-disabled={this.disabled}
          >
            <div class="flex justify-center items-center content-center relative">
              {this.iconLeft && <i class={this.iconLeft}></i>}
              <slot />
            </div>
          </button>
        )}
      </Host>
    );
  }
}
