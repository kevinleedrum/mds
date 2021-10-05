import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-switch',
  shadow: false,
})
export class MxSwitch {
  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() labelName: string = '';
  @Prop() checked: boolean = false;

  render() {
    return (
      <Host class="mx-switch">
        <label class="relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4">
          <input
            class="absolute h-0 w-0 opacity-0"
            role="switch"
            type="checkbox"
            name={this.name}
            checked={this.checked}
          />
          <div class="slider relative cursor-pointer round w-36 h-14 flex-shrink-0"></div>
          <div class="ml-16 inline-block" data-testid="labelName">
            {this.labelName}
          </div>
        </label>
      </Host>
    );
  }
}
