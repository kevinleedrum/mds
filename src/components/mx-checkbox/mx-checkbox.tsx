import { Component, Host, h, Prop } from '@stencil/core';
import { nanoid } from 'nanoid';

@Component({
  tag: 'mx-checkbox',
  shadow: false,
})
export class MxCheckbox {
  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() identifier: string = nanoid(5);
  @Prop() labelName: string = '';
  @Prop() checked: boolean = false;

  render() {
    return (
      <Host class="mx-checkbox">
        <label class="relative inline-flex flex-nowrap align-center items-center">
          <input class="absolute h-0 w-0 opacity-0" type="checkbox" checked={this.checked} />
          <span class="flex h-18 w-18 cursor-pointer"></span>
          <div class="ml-16 inline-block">{this.labelName}</div>
        </label>
      </Host>
    );
  }
}
