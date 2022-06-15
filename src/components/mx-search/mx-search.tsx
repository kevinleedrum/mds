import { Component, Host, h, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

@Component({
  tag: 'mx-search',
  shadow: false,
})
export class MxSearch {
  dataAttributes = {};
  inputEl: HTMLInputElement;

  @Prop() dense = false;
  /** The `aria-label` attribute for the `<input>` element. If not provided, the `aria-label` will fallback to either the `placeholder` value or simply "Search". */
  @Prop() elAriaLabel: string;
  @Prop() flat = false;
  @Prop() name: string;
  @Prop() placeholder: string;
  /** Set to `false` to hide the clear button. */
  @Prop() showClear = true;
  @Prop({ mutable: true }) value: string;

  @Element() element: HTMLMxSearchElement;

  /** Emitted when the clear button is clicked. */
  @Event() mxClear: EventEmitter<void>;

  componentWillRender = propagateDataAttributes;

  onInput(e: InputEvent) {
    this.value = (e.target as HTMLInputElement).value;
  }

  onClear() {
    this.inputEl.value = '';
    this.inputEl.dispatchEvent(new window.Event('input', { bubbles: true }));
    this.mxClear.emit();
    if (typeof jest === 'undefined') this.inputEl.focus();
  }

  get inputClass() {
    let str = 'w-full pl-56 pr-16 rounded-lg outline-none border focus:border-2';
    str += this.flat ? ' flat' : ' shadow-1';
    str += this.dense ? ' h-36 py-8 text-4' : ' h-48 py-12';
    return str;
  }

  get clearButtonClass() {
    let str = 'clear-button absolute right-8 inline-flex items-center justify-center w-24 h-24 cursor-pointer';
    if (!this.value) str += ' hidden';
    return str;
  }

  render() {
    return (
      <Host class="mx-search flex items-center text-3 relative">
        <input
          ref={el => (this.inputEl = el)}
          type="search"
          aria-label={this.elAriaLabel || this.placeholder || 'Search'}
          name={this.name}
          placeholder={this.placeholder}
          value={this.value}
          class={this.inputClass}
          {...this.dataAttributes}
          onInput={this.onInput.bind(this)}
        ></input>
        <i class="absolute mds-search text-icon left-16 pointer-events-none"></i>
        {this.showClear && (
          <button
            type="button"
            aria-label="Clear search"
            class={this.clearButtonClass}
            data-testid="clear-button"
            onClick={this.onClear.bind(this)}
          >
            <i class="mds-x text-icon"></i>
          </button>
        )}
      </Host>
    );
  }
}
