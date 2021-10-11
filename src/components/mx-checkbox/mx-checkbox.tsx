import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

@Component({
  tag: 'mx-checkbox',
  shadow: false,
})
export class MxCheckbox {
  dataAttributes = {};

  @Prop() name: string = '';
  @Prop() value: string = '';
  @Prop() labelLeft: boolean = false;
  @Prop() labelName: string = '';
  @Prop() labelClass: string = '';
  /** Hide the label text visually, but still make it accessible for screen readers */
  @Prop() hideLabel: boolean = false;
  @Prop() checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() indeterminate: boolean = false;

  @Element() element: HTMLMxInputElement;

  componentWillRender = propagateDataAttributes;

  get checkClass(): string {
    let str = 'flex h-18 w-18 flex-shrink-0';
    str += this.labelLeft ? ' order-2' : ' order-1';
    if (this.labelLeft && !this.hideLabel) str += ' ml-16';
    return str;
  }

  get checkLabelClass(): string {
    let str = 'checkbox-label inline-block';
    if (this.hideLabel) str += ' sr-only';
    str += this.labelLeft ? ' order-1 flex-1' : ' order-2';
    if (!this.labelLeft && !this.hideLabel) str += ' ml-16';
    return str;
  }

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
            {...this.dataAttributes}
          />
          <span class={this.checkClass}></span>
          <div class={this.checkLabelClass} data-testid="labelName">
            {this.labelName}
          </div>
        </label>
      </Host>
    );
  }
}
