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
  @Prop() disabled: boolean = false;

  @Element() element: HTMLMxInputElement;

  componentWillRender = propagateDataAttributes;

  /** Keep checked prop in sync with input element attribute */
  onInput(e: InputEvent) {
    this.checked = (e.target as HTMLInputElement).checked;
  }

  get labelClassNames(): string {
    let str = 'elative inline-flex flex-nowrap align-center items-center text-4';
    if (!this.disabled) str += ' cursor-pointer';
    if (this.labelClass) str += ' ' + this.labelClass;
    return str;
  }

  render() {
    return (
      <Host class="mx-switch">
        <label class={this.labelClassNames}>
          <input
            class="absolute h-0 w-0 opacity-0"
            role="switch"
            type="checkbox"
            name={this.name}
            value={this.value}
            disabled={this.disabled}
            checked={this.checked}
            {...this.dataAttributes}
            onInput={this.onInput.bind(this)}
          />
          <div class={'slider relative round w-36 h-14 flex-shrink-0' + (this.disabled ? '' : ' cursor-pointer')}></div>
          <div class="switch-label ml-16 inline-block" data-testid="labelName">
            {this.labelName}
          </div>
        </label>
      </Host>
    );
  }
}
