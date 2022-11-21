import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';
import { uuidv4 } from '../../utils/utils';

@Component({
  tag: 'mc-range',
  shadow: false,
})
export class McRadio {
  inputEl!: HTMLInputElement;
  dataAttributes = {};

  @Prop() disabled = false;
  /** Set to `true` to prevent the value from being shown to the right of the slider */
  @Prop() hideValue = false;
  /** The `id` attribute for the `input` element */
  @Prop() inputId: string = uuidv4();
  @Prop() label = '';
  /** The maximum value for the slider */
  @Prop() max = 100;
  @Prop() name = '';
  /** The minimum value for the slider */
  @Prop() min = 0;
  /** The increment by which the value is changed when adjusting the slider */
  @Prop() step = 1;
  @Prop({ mutable: true }) value = 0;
  /** Additional CSS classes to apply to the value text */
  @Prop() valueClass = '';
  /** A prefix for the displayed value (e.g. "$") */
  @Prop() valuePrefix = '';
  /** A suffix for the displayed value (e.g. "%") */
  @Prop() valueSuffix = '';

  @Element() element: HTMLMcInputElement;

  componentWillRender = propagateDataAttributes;

  get inputClass(): string {
    let str = 'appearance-none bg-transparent flex-1 h-14';
    if (!this.disabled) str += ' cursor-pointer';
    return str;
  }

  onInput(e: InputEvent) {
    this.value = +(e.target as HTMLInputElement).value;
    this.updateTrackFill();
  }

  updateTrackFill() {
    // Webkit browsers do not have a pseudo-element for the "filled" portion of the slider, so this
    // updates a linear gradient to achieve the same effect.
    const percent = ((this.value - this.min) / (this.max - this.min)) * 100;
    const linearGradient = `linear-gradient(to right, var(--mc-bg-range-1) 0%, var(--mc-bg-range-1) ${percent}%,
      var(--mc-bg-range-2) ${percent}%, var(--mc-bg-range-2) 100%)`;
    this.inputEl.style.setProperty('--mc-bg-range', linearGradient);
  }

  componentDidLoad() {
    this.updateTrackFill();
  }

  render() {
    return (
      <Host class="inline-block">
        <label htmlFor={this.inputId} class="block text-label uppercase">
          {this.label}
        </label>
        <div class="flex items-center mt-10 space-x-10">
          <input
            ref={el => (this.inputEl = el)}
            class={this.inputClass}
            type="range"
            id={this.inputId}
            name={this.name}
            min={this.min}
            max={this.max}
            step={this.step}
            value={this.value}
            disabled={this.disabled}
            {...this.dataAttributes}
            onInput={this.onInput.bind(this)}
          />
          {!this.hideValue && (
            <span class={`text-body2 font-bold ${this.valueClass}`}>
              {this.valuePrefix}
              {this.value}
              {this.valueSuffix}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
