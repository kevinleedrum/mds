import { Component, Host, h, Prop } from '@stencil/core';
import { nanoid } from 'nanoid';

@Component({
  tag: 'mx-switch',
  shadow: false,
})
export class MxSwitch {
  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() identifier: string = nanoid(5);
  @Prop() labelName: string = '';
  @Prop() checked: boolean = false;

  render() {
    return (
      <Host class="mx-switch">
        <label class="relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm w-36 h-14">
          <input class="absolute h-0 w-0 opacity-0" type="checkbox" name={this.name} checked={this.checked} />
          <span class="slider round"></span>
          <div class="ml-48 inline-block">{this.labelName}</div>
        </label>
      </Host>
    );
  }
}
