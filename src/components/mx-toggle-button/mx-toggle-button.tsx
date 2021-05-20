import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-toggle-button',
  shadow: false,
})
export class MxToggleButton {
  inputElem: HTMLInputElement;
  spanElem: HTMLSpanElement;

  @Prop() icon: string;
  @Prop() single: boolean = false;
  @Prop() name: string;
  @Prop() value: string;
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    this.ripple(e);

    // Allow unchecking of radio button
    if (this.inputElem.checked) {
      this.inputElem.checked = false;
      e.preventDefault();
    }
  }

  ripple(e: MouseEvent) {
    let existingRipple = this.spanElem.querySelector('.ripple');
    if (existingRipple) existingRipple.remove();

    // Create span element
    let ripple = document.createElement('span');

    // Add ripple class to span
    ripple.classList.add('ripple');

    // Add span to the button
    this.spanElem.prepend(ripple);

    // Set the size of the span element
    const diameter = Math.max(this.spanElem.clientWidth, this.spanElem.clientHeight);
    ripple.style.width = ripple.style.height = diameter + 'px';

    // Position the span element
    const elemOffset = this.spanElem.getBoundingClientRect();
    // Center over click coords OR over top left corner if activated by keypress
    const left = Math.max(e.clientX - elemOffset.left, 0);
    const top = Math.max(e.clientY - elemOffset.top, 0);
    ripple.style.left = left - diameter / 2 + 'px';
    ripple.style.top = top - diameter / 2 + 'px';

    // Remove span after 0.3s
    setTimeout(() => {
      ripple.remove();
    }, 300);
  }

  render() {
    const buttonContent = (
      <div class="flex justify-center items-center content-center relative">
        <i class={this.icon}></i>
      </div>
    );

    return (
      <Host class="mx-toggle-button">
        <label class="relative" aria-disabled={this.disabled}>
          <input
            ref={el => (this.inputElem = el as HTMLInputElement)}
            class="absolute h-0 w-0 opacity-0"
            type={this.single ? 'radio' : 'checkbox'}
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
          />
          <span
            ref={el => (this.spanElem = el as HTMLSpanElement)}
            class="btn-toggle inline-flex relative items-center justify-center w-48 h-48 text-xl overflow-hidden cursor-pointer"
            onClick={e => this.onClick(e)}
          >
            {buttonContent}
          </span>
        </label>
      </Host>
    );
  }
}
