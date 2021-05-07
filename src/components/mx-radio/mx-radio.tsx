import { Component, Host, h, Prop } from '@stencil/core';
import { nanoid } from 'nanoid';

@Component({
  tag: 'mx-radio',
  shadow: false,
})
export class MxRadio {
  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() identifier: string = nanoid(5);
  @Prop() labelName: string = '';
  @Prop() checked: boolean = false;

  render() {
    return (
      <Host class="mx-radio">
        <label class="relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm">
          <input class="absolute h-0 w-0 opacity-0" type="radio" name={this.name} checked={this.checked} />
          <span class="flex h-20 w-20 cursor-pointer rounded-full"></span>
          <div class="ml-16 inline-block">{this.labelName}</div>
        </label>
      </Host>
    );
  }
}
