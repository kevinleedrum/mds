import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

@Component({
  tag: 'mx-radio',
  shadow: false,
})
export class MxRadio {
  dataAttributes = {};

  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() labelName: string = '';
  @Prop() checked: boolean = false;

  @Element() element: HTMLMxInputElement;

  componentWillRender = propagateDataAttributes;

  render() {
    return (
      <Host class="mx-radio">
        <label class="relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4">
          <input
            class="absolute h-0 w-0 opacity-0"
            type="radio"
            name={this.name}
            value={this.value}
            checked={this.checked}
            {...this.dataAttributes}
          />
          <span class="flex h-20 w-20 cursor-pointer flex-shrink-0 rounded-full"></span>
          <div class="ml-16 inline-block" data-testid="labelName">
            {this.labelName}
          </div>
        </label>
      </Host>
    );
  }
}
