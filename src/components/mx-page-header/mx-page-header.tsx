import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';
import { ResizeObserver } from '@juggle/resize-observer';

@Component({
  tag: 'mx-page-header',
  shadow: false,
})
export class MxPageHeader {
  buttonRow: HTMLElement;
  hasTabs: boolean = false;
  menuButton: HTMLMxButtonElement;
  resizeObserver: ResizeObserver;
  tabSlot: HTMLElement;
  tertiaryButtonWrapper: HTMLElement;

  @Prop() buttons: any[] = [];
  @Prop() previousPageUrl: string = '';
  @Prop() previousPageTitle: string = '';
  @Prop() pattern: boolean = false;

  @State() minWidths = new MinWidths();
  @State() renderTertiaryButtonAsMenu: boolean = false;

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

  updateRenderTertiaryButtonAsMenu() {
    // Only move tertiary button to menu, and only for small screens
    if (this.minWidths.md || this.buttons.length < 3) {
      this.renderTertiaryButtonAsMenu = false;
      return;
    }
    if (!this.tertiaryButtonWrapper) return;
    const { left } = this.tertiaryButtonWrapper.getBoundingClientRect();
    const buttonRight = Math.floor(left + this.tertiaryButtonWrapper.offsetWidth);
    const { right: containerRight } = this.buttonRow.getBoundingClientRect();
    const isOverflowing = buttonRight > containerRight;
    this.renderTertiaryButtonAsMenu = isOverflowing;
  }

  componentDidLoad() {
    this.resizeObserver = new ResizeObserver(() => this.updateRenderTertiaryButtonAsMenu());
    this.resizeObserver.observe(this.element);
    // HACK: Elements are not fully rendered after loading, so we wait 100ms.
    setTimeout(() => this.updateRenderTertiaryButtonAsMenu(), 100);
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

  get buttonsJsx() {
    const dotsSvg = (
      <svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 12C3.10457 12 4 11.1046 4 10C4 8.89543 3.10457 8 2 8C0.89543 8 0 8.89543 0 10C0 11.1046 0.89543 12 2 12Z"
          fill="currentColor"
        />
        <path
          d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
          fill="currentColor"
        />
        <path
          d="M2 20C3.10457 20 4 19.1046 4 18C4 16.8954 3.10457 16 2 16C0.89543 16 0 16.8954 0 18C0 19.1046 0.89543 20 2 20Z"
          fill="currentColor"
        />
      </svg>
    );

    return (
      <div
        ref={el => (this.buttonRow = el)}
        class="flex space-x-8 md:space-x-24 md:justify-end py-1 md:flex-row-reverse md:space-x-reverse items-center"
      >
        {this.buttons.map((button, index) => {
          // If not specified, set btnType automatically for primary, secondary, and tertiary buttons
          let { btnType } = button;
          if (!btnType) btnType = index === 0 ? 'contained' : index === 1 ? 'outlined' : 'text';
          const isTertiary = index === 2;
          return (
            <div
              ref={el => isTertiary && (this.tertiaryButtonWrapper = el)}
              class={isTertiary ? 'relative !ml-auto md:!ml-0' : ''}
            >
              {/* Tertiary menu (shown when the tertiary button does not fit in the viewport) */}
              {isTertiary && this.renderTertiaryButtonAsMenu && (
                <div class="absolute !ml-auto -top-6">
                  <mx-button ref={el => (this.menuButton = el)} btn-type="icon">
                    {dotsSvg}
                  </mx-button>
                  {/* <mx-menu anchor-el={this.menuButton}>
                    <mx-menu-item {...button}>{button.label}</mx-menu-item>
                  </mx-menu> */}
                </div>
              )}
              {/* The tertiary button is always rendered so we always know when it is overflowing the viewport. */}
              <mx-button
                {...button}
                xl={this.minWidths.lg}
                btn-type={btnType}
                aria-hidden={isTertiary && this.renderTertiaryButtonAsMenu}
                class={isTertiary && this.renderTertiaryButtonAsMenu ? 'opacity-0 pointer-events-none' : ''}
              >
                {button.label}
              </mx-button>
            </div>
          );
        })}
      </div>
    );
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
          {this.buttons.length > 0 && this.buttonsJsx}
          <slot name="buttons"></slot>
        </div>
        <slot name="tabs"></slot>
      </Host>
    );
  }
}
