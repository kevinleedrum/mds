import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

@Component({
  tag: 'mc-radio',
  shadow: false,
})
export class McRadio {
  dataAttributes = {};

  @Prop() name = '';
  @Prop() value = '';
  @Prop() labelClass = '';
  @Prop() labelName = '';
  @Prop({ mutable: true }) checked = false;
  @Prop() disabled = false;

  @Element() element: HTMLMcInputElement;

  componentWillRender = propagateDataAttributes;

  /** Keep checked prop in sync with input element attribute */
  onInput(e: InputEvent) {
    this.checked = (e.target as HTMLInputElement).checked;
  }

  get labelClassNames(): string {
    let str = 'inline-flex flex-nowrap text-14 leading-4';
    if (!this.disabled) str += ' cursor-pointer';
    if (this.labelClass) str += ' ' + this.labelClass;
    return str;
  }

  render() {
    return (
      <Host class="inline-flex">
        <label class={this.labelClassNames}>
          <input
            class="relative transition-colors appearance-none flex-shrink-0 rounded-full border focus:outline-none h-20 w-20"
            type="radio"
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            {...this.dataAttributes}
            onInput={this.onInput.bind(this)}
          />
          <div class="ml-10 mt-2 inline-block" data-testid="labelName">
            {this.labelName}
          </div>
        </label>
      </Host>
    );
  }
}
