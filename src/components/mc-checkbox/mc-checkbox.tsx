import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

export type McBtnType = 'normal' | 'alt' | 'ghost' | 'transparent' | 'action' | 'error' | 'warning';
export type ButtonTypeAttribute = 'button' | 'submit' | 'reset';

@Component({
  tag: 'mc-checkbox',
  shadow: false,
})
export class McCheckbox {
  dataAttributes = {};

  @Prop() name = '';
  @Prop() value = '';
  @Prop() labelLeft = false;
  @Prop() labelName = '';
  @Prop() labelClass = '';
  /** Hide the label text visually, but still make it accessible for screen readers */
  @Prop() hideLabel = false;
  @Prop({ mutable: true }) checked = false;
  @Prop() disabled = false;
  @Prop() indeterminate = false;
  /** The aria-label attribute for the inner input element. */
  @Prop() elAriaLabel: string;

  @Element() element: HTMLMxInputElement;

  componentWillRender = propagateDataAttributes;

  get checkClass(): string {
    let str = 'relative transition-colors appearance-none flex-shrink-0 rounded border focus:outline-none h-20 w-20';
    if (this.indeterminate) str += ' indeterminate';
    str += this.labelLeft ? ' order-2' : ' order-1';
    if (this.labelLeft && !this.hideLabel) str += ' ml-10';
    return str;
  }

  get checkLabelClass(): string {
    let str = 'inline-block mt-2';
    if (this.hideLabel) str += ' sr-only';
    str += this.labelLeft ? ' order-1 flex-1' : ' order-2';
    if (!this.labelLeft && !this.hideLabel) str += ' ml-10';
    return str;
  }

  /** Keep checked prop in sync with input element attribute */
  onInput(e: InputEvent) {
    this.checked = (e.target as HTMLInputElement).checked;
  }

  render() {
    return (
      <Host class="inline-flex">
        <label
          class={[
            'inline-flex flex-nowrap text-14 leading-4' + (this.disabled ? '' : ' cursor-pointer'),
            this.labelClass,
          ].join(' ')}
        >
          <input
            class={this.checkClass}
            type="checkbox"
            aria-label={this.elAriaLabel}
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            indeterminate={this.indeterminate}
            {...this.dataAttributes}
            onInput={this.onInput.bind(this)}
          />
          <div class={this.checkLabelClass} data-testid="labelName">
            {this.labelName}
          </div>
        </label>
      </Host>
    );
  }
}
