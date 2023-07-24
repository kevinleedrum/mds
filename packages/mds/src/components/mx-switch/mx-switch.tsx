import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

@Component({
  tag: 'mx-switch',
  shadow: false,
})
export class MxSwitch {
  dataAttributes = {};

  @Prop() name = '';
  @Prop() value = '';
  @Prop() labelClass = '';
  @Prop() labelName = '';
  @Prop({ mutable: true }) checked = false;
  @Prop({ mutable: true }) userchecked = false;
  @Prop() disabled = false;

  @Element() element: HTMLMxInputElement;

  componentWillRender = propagateDataAttributes;

  /** Keep checked prop in sync with input element attribute */
  onInput(e: InputEvent) {
    this.checked = this.userchecked = (e.target as HTMLInputElement).checked;
  }

  get switchClass(): string {
    let str = 'slider relative round flex-shrink-0';
    if (!this.disabled) str += ' cursor-pointer';
    str += this.userchecked ? ' userchecked' : '';
    return str;
  }
  
  get labelClassNames(): string {
    let str = 'relative inline-flex flex-nowrap align-center items-center text-4';
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
          <div class={this.switchClass}></div>
          <div class="switch-label ml-16 inline-block" data-testid="labelName">
            {this.labelName}
          </div>
        </label>
      </Host>
    );
  }
}
