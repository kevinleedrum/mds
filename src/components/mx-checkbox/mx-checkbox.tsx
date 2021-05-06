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
  @Prop() labelName: string = undefined;

  render() {
    return (
      <Host>
        <div class="inline-flex flex-nowrap align-center items-center">
          <input type="checkbox" name={this.name} value={this.value} id={this.identifier} />
          {this.labelName && (
            <label class="ml-16 cursor-pointer" htmlFor={this.identifier}>
              {this.labelName}
            </label>
          )}
        </div>
      </Host>
    );
  }
}
