import { Component, Element, Host, h, Prop, State } from '@stencil/core';
import ripple from '../../utils/ripple';
import { MinWidths, minWidthSync } from '../../utils/minWidthSync';

@Component({
  tag: 'mx-fab',
  shadow: false,
})
export class MxFab {
  buttonElem: HTMLElement;

  /** Class name of icon */
  @Prop() icon: string;
  /** Style as a secondary action */
  @Prop() secondary: boolean = false;
  /** The aria-label attribute for the inner button element. */
  @Prop() elAriaLabel: string;
  @Prop() value: string;

  @State() minWidths = new MinWidths();
  @State() isExtended: boolean = false;

  @Element() element: HTMLMxFabElement;

  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }

  componentWillLoad() {
    this.isExtended = !!this.element.textContent;
  }

  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }

  onClick(e: MouseEvent) {
    ripple(e, this.buttonElem);
  }

  get buttonClass() {
    let str = 'flex min-w-full items-center justify-center rounded-full shadow-4 relative overflow-hidden';
    if (this.secondary) str += ' secondary';
    if (this.isExtended) str += ' h-48 py-16 px-24';
    else str += this.minWidths.md ? ' h-56' : ' h-40';
    return str;
  }

  get slotWrapperClass() {
    let str = 'flex items-center text-4 tracking-1-25 leading-4 uppercase font-semibold';
    if (this.isExtended && this.icon) str += ' ml-12';
    return str;
  }

  render() {
    return (
      <Host class={'mx-fab inline-block min-w-max' + (this.minWidths.md ? ' w-56' : ' w-40')}>
        <button
          ref={el => (this.buttonElem = el)}
          type="button"
          value={this.value}
          class={this.buttonClass}
          aria-label={this.elAriaLabel}
          onClick={this.onClick.bind(this)}
        >
          {this.icon && <i class={this.icon + ' text-1'}></i>}
          <div class={this.slotWrapperClass}>
            <slot />
          </div>
        </button>
      </Host>
    );
  }
}
