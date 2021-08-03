import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-checkbox',
  shadow: false,
})
export class MxCheckbox {
  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() labelLeft: boolean = false;
  @Prop() labelName: string = '';
  @Prop() labelClass: string = '';
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() indeterminate: boolean = false;

  render() {
    return (
      <Host class="mx-checkbox inline-flex items-center">
        <label
          class={[
            'relative flex-1 inline-flex flex-nowrap align-center items-center text-4' +
              (this.disabled ? '' : ' cursor-pointer'),
            this.labelClass,
          ].join(' ')}
        >
          <input
            class={'absolute h-0 w-0 opacity-0' + (this.indeterminate ? ' indeterminate' : '')}
            type="checkbox"
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
          />
          <span class={'flex h-18 w-18' + (this.labelLeft ? ' order-2 ml-16' : ' order-1')}></span>
          <div
            class={'checkbox-label inline-block' + (this.labelLeft ? ' order-1 flex-1' : ' order-2 ml-16')}
            data-testid="labelName"
          >
            {this.labelName}
          </div>
        </label>
      </Host>
    );
  }
}
