import { Component, Host, h, Prop } from '@stencil/core';
import ripple from '../ripple';

@Component({
  tag: 'mx-toggle-button',
  shadow: false,
})
export class MxToggleButton {
  inputElem: HTMLInputElement;
  btnElem: HTMLElement;

  @Prop() icon: string;
  @Prop() single: boolean = false;
  @Prop() name: string;
  @Prop() value: string;
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;

  onClick(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (this.disabled) return;

    ripple(e, this.btnElem);

    // Allow unchecking of radio button
    this.inputElem.checked = !this.inputElem.checked;
    e.preventDefault();
  }

  onKeyDown(e: KeyboardEvent) {
    // Allow span to be activated using Enter and Space just like a button
    if (e.key === 'Enter' || e.key == ' ') {
      (e.target as HTMLElement).click();
    }
  }

  render() {
    const buttonContent = (
      <div class="flex justify-center items-center content-center relative">
        <i class={this.icon}></i>
      </div>
    );

    return (
      <Host class="mx-toggle-button overflow-hidden border-l first-of-type:border-l-0 first-of-type:rounded-tl first-of-type:rounded-bl last-of-type:rounded-tr last-of-type:rounded-br">
        <label class="relative" aria-disabled={this.disabled}>
          <input
            ref={el => (this.inputElem = el as HTMLInputElement)}
            tabindex="-1"
            class="absolute h-0 w-0 opacity-0"
            type={this.single ? 'radio' : 'checkbox'}
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
          />
          <span
            ref={el => (this.btnElem = el as HTMLElement)}
            tabindex="0"
            class="btn-toggle inline-flex relative items-center justify-center w-48 h-48 text-xl overflow-hidden cursor-pointer"
            onClick={e => this.onClick(e)}
            onKeyDown={e => this.onKeyDown(e)}
          >
            {buttonContent}
          </span>
        </label>
      </Host>
    );
  }
}
