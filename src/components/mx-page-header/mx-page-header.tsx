import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';

@Component({
  tag: 'mx-page-header',
  shadow: false,
})
export class MxPageHeader {
  tabSlot: HTMLElement;
  hasTabs: boolean = false;

  @Prop() buttons: any[] = [];
  @Prop() previousPageUrl: string = '';
  @Prop() previousPageTitle: string = '';
  @Prop() pattern: boolean = false;

  @State() minWidths = new MinWidths();

  @Element() element: HTMLMxPageHeaderElement;

  componentWillLoad() {
    this.hasTabs = !!this.element.querySelector('[slot="tabs"]');
  }

  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }

  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }

  get hostClass() {
    let str = 'mx-page-header flex flex-col px-24 lg:px-72';
    if (this.pattern) str += ' bg-pattern';
    if (this.hasTabs) str += ' pb-12 md:pb-0';
    if (this.buttons.length && this.hasTabs) str += ' min-h-176 md:min-h-164';
    else if (this.buttons.length) str += ' min-h-128';
    else str += ' min-h-80 md:min-h-128';
    return str;
  }

  get headingClass() {
    let str = 'my-0 pr-20 emphasis ';
    if (!this.minWidths.md) str += this.previousPageUrl ? 'text-h6' : 'text-h5';
    else str += this.previousPageUrl ? 'text-h5' : 'text-h3';
    return str;
  }

  render() {
    const arrowSvg = (
      <svg
        class="inline-block mr-10"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.3327 5.33317H3.21935L6.94602 1.6065L5.99935 0.666504L0.666016 5.99984L5.99935 11.3332L6.93935 10.3932L3.21935 6.6665H11.3327V5.33317Z"
          fill="currentColor"
        />
      </svg>
    );

    return (
      <Host class={this.hostClass}>
        <slot name="previous-page">
          {this.previousPageUrl && (
            <a href={this.previousPageUrl} class="block pt-16 md:pt-20 uppercase text-xs font-semibold tracking-1-25">
              {arrowSvg}
              {this.previousPageTitle || 'Back'}
            </a>
          )}
        </slot>
        <div class="flex flex-col py-10 space-y-14 md:space-y-0 md:flex-row flex-grow md:items-center justify-center md:justify-between flex-wrap">
          <h1 class={this.headingClass}>
            <slot>Page Header</slot>
          </h1>
          {this.buttons.length > 0 && (
            <div class="flex space-x-8 md:space-x-24 md:justify-end py-1 md:flex-row-reverse md:space-x-reverse items-center flex-wrap">
              {this.buttons.map((button, index) => {
                let { btnType } = button;
                // If not specified, set btnType automatically for primary, secondary, and tertiary buttons
                if (!btnType) btnType = index === 0 ? 'contained' : index === 1 ? 'outlined' : 'text';
                return (
                  <mx-button
                    {...button}
                    xl={this.minWidths.lg}
                    btn-type={btnType}
                    class={index === 2 ? ' !ml-auto md:!ml-0' : ''}
                  >
                    {button.label}
                  </mx-button>
                );
              })}
            </div>
          )}
          <slot name="buttons"></slot>
        </div>
        <slot name="tabs"></slot>
      </Host>
    );
  }
}
