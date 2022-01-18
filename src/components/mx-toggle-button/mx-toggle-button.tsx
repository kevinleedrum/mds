import { Component, Host, h, Prop, Element } from '@stencil/core';
import ripple from '../../utils/ripple';
import { propagateDataAttributes } from '../../utils/utils';

@Component({
  tag: 'mx-toggle-button',
  shadow: false,
})
export class MxToggleButton {
  btnElem: HTMLButtonElement;
  dataAttributes = {};

  @Prop() icon: string;
  @Prop({ reflect: true }) selected: boolean = false;
  @Prop() disabled: boolean = false;
  /** The aria-label attribute for the inner button element. */
  @Prop() elAriaLabel: string;
  /** Only used inside a toggle button group */
  @Prop() value: any;

  @Element() element: HTMLMxToggleButtonElement;

  componentWillRender = propagateDataAttributes;

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    ripple(e, this.btnElem);
  }

  render() {
    return (
      <Host
        class="mx-toggle-button inline-flex overflow-hidden border-l
      first-of-type:border-l-0 first-of-type:rounded-tl first-of-type:rounded-bl
      last-of-type:rounded-tr last-of-type:rounded-br"
      >
        <button
          class={
            'btn-toggle inline-flex relative items-center justify-center w-48 h-48 text-1 overflow-hidden cursor-pointer' +
            (this.selected ? ' selected' : '')
          }
          ref={el => (this.btnElem = el as HTMLButtonElement)}
          aria-disabled={this.disabled ? 'true' : null}
          role={this.value === undefined ? 'switch' : 'radio'}
          aria-checked={this.selected ? 'true' : 'false'}
          aria-label={this.elAriaLabel}
          onClick={this.onClick.bind(this)}
          {...this.dataAttributes}
        >
          <i class={this.icon}></i>
        </button>
      </Host>
    );
  }
}
