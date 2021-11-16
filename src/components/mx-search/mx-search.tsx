import { Component, Host, h, Prop, Element } from '@stencil/core';
import xSvg from '../../assets/svg/x.svg';
import searchSvg from '../../assets/svg/search.svg';
import { propagateDataAttributes } from '../../utils/utils';

@Component({
  tag: 'mx-search',
  shadow: false,
})
export class MxSearch {
  dataAttributes = {};

  /** If not provided, the `aria-label` will fallback to either the `placeholder` value or simply "Search". */
  @Prop() ariaLabel: string;
  @Prop() dense: boolean = false;
  @Prop() flat: boolean = false;
  @Prop() name: string;
  @Prop() placeholder: string;
  /** Set to `false` to hide the clear button. */
  @Prop() showClear: boolean = true;
  @Prop({ mutable: true }) value: string;

  @Element() element: HTMLMxSearchElement;

  componentWillRender = propagateDataAttributes;

  onInput(e: InputEvent) {
    this.value = (e.target as HTMLInputElement).value;
  }

  onClear() {
    this.value = null;
    if (typeof jest === 'undefined') (this.element.firstElementChild as HTMLElement).focus();
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
      <Host class="mx-search flex items-center relative">
        <input
          type="search"
          aria-label={this.ariaLabel || this.placeholder || 'Search'}
          name={this.name}
          placeholder={this.placeholder}
          value={this.value}
          class={this.inputClass}
          {...this.dataAttributes}
          onInput={this.onInput.bind(this)}
        ></input>
        <span innerHTML={searchSvg} class="absolute left-16 pointer-events-none"></span>
        {this.showClear && (
          <button class={this.clearButtonClass} data-testid="clear-button" onClick={this.onClear.bind(this)}>
            <span innerHTML={xSvg}></span>
          </button>
        )}
      </Host>
    );
  }
}
