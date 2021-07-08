import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-checkbox',
  shadow: false,
})
export class MxCheckbox {
  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() labelName: string = '';
  @Prop() labelClass: string = '';
  @Prop() checked: boolean = false;

  render() {
    return (
      <Host class="mx-checkbox">
        <label
          class={[
            'relative flex-1 inline-flex flex-nowrap align-center items-center cursor-pointer text-4',
            this.labelClass,
          ].join(' ')}
        >
          <input
            class="absolute h-0 w-0 opacity-0"
            type="checkbox"
            name={this.name}
            value={this.value}
            checked={this.checked}
          />
          <span class="flex h-18 w-18 cursor-pointer"></span>
          <div class="ml-16 inline-block" data-testid="labelName">
            {this.labelName}
          </div>
        </label>
      </Host>
    );
  }
}
