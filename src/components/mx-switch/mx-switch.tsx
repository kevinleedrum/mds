import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

@Component({
  tag: 'mx-switch',
  shadow: false,
})
export class MxSwitch {
  dataAttributes = {};

  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() labelClass: string = '';
  @Prop() labelName: string = '';
  @Prop({ mutable: true }) checked: boolean = false;

  @Element() element: HTMLMxInputElement;

  componentWillRender = propagateDataAttributes;

  /** Keep checked prop in sync with input element attribute */
  onInput(e: InputEvent) {
    this.checked = (e.target as HTMLInputElement).checked;
  }

  render() {
    return (
      <Host class="mx-switch">
        <label
          class={[
            'relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4',
            this.labelClass,
          ].join(' ')}
        >
          <input
            class="absolute h-0 w-0 opacity-0"
            role="switch"
            type="checkbox"
            name={this.name}
            value={this.value}
            checked={this.checked}
            {...this.dataAttributes}
            onInput={this.onInput.bind(this)}
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
