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
  @Prop() labelClass: string = '';
  @Prop() labelName: string = '';
  @Prop({ mutable: true }) checked: boolean = false;
  @Prop() disabled: boolean = false;

  @Element() element: HTMLMxInputElement;

  componentWillRender = propagateDataAttributes;

  /** Keep checked prop in sync with input element attribute */
  onInput(e: InputEvent) {
    this.checked = (e.target as HTMLInputElement).checked;
  }

  get labelClassNames(): string {
    let str = 'relative inline-flex flex-nowrap align-center items-center text-4';
    if (!this.disabled) str += ' cursor-pointer';
    if (this.labelClass) str += ' ' + this.labelClass;
    return str;
  }

  render() {
    return (
      <Host class="mx-radio inline-block">
        <label class={this.labelClassNames}>
          <input
            class="absolute h-0 w-0 opacity-0"
            type="radio"
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            {...this.dataAttributes}
            onInput={this.onInput.bind(this)}
          />
          <span class={'flex h-20 w-20 flex-shrink-0 rounded-full' + (this.disabled ? '' : ' cursor-pointer')}></span>
          <div class="radio-label ml-16 inline-block" data-testid="labelName">
            {this.labelName}
          </div>
        </label>
      </Host>
    );
  }
}
