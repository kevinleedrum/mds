import { Component, Host, h, Prop } from '@stencil/core';
import ripple from '../ripple';

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

    ripple(e, this.spanElem);

    // Allow unchecking of radio button
    if (this.inputElem.checked) {
      this.inputElem.checked = false;
      e.preventDefault();
    }
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
