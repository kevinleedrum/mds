import { Component, Host, h, Prop, Element, State, Method } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';
import { ResizeObserver } from '@juggle/resize-observer';
import { IMxButtonProps } from '../mx-button/mx-button';
import dotsSvg from '../../assets/svg/dots-vertical.svg';
import arrowSvg from '../../assets/svg/arrow-left.svg';

export interface IPageHeaderButton extends IMxButtonProps {
  label: string;
}

@Component({
  tag: 'mx-page-header',
  shadow: false,
})
export class MxPageHeader {
  buttonRow: HTMLElement;
  hasTabs: boolean = false;
  menuButton: HTMLMxIconButtonElement;
  resizeObserver: ResizeObserver;
  tabSlot: HTMLElement;
  tertiaryButtonWrapper: HTMLElement;
  tertiaryMenu: HTMLMxMenuElement;

  /** An array of prop objects for each button.  Use the `label` property to specify the button's inner text. */
  @Prop() buttons: IPageHeaderButton[] = [];
  /** The URL for the previous page link */
  @Prop() previousPageUrl: string = '';
  /** The text to display for the previous page link */
  @Prop() previousPageTitle: string = 'Back';
  /** When set to true, the Page Header will use the themed background pattern. */
  @Prop() pattern: boolean = false;

  @State() minWidths = new MinWidths();
  @State() renderTertiaryButtonAsMenu: boolean = false;

  @Element() element: HTMLMxPageHeaderElement;

  /** Attach a new ResizeObserver that calls `updateRenderTertiaryButtonAsMenu` */
  @Method()
  resetResizeObserver() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.resizeObserver = new ResizeObserver(() => this.updateRenderTertiaryButtonAsMenu());
    this.resizeObserver.observe(this.element);
    // Wait one tick for layout shifts in order to detect overflow correctly.
    requestAnimationFrame(this.updateRenderTertiaryButtonAsMenu.bind(this));
  }

  componentWillLoad() {
    this.hasTabs = !!this.element.querySelector('[slot="tabs"]');
  }

  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }

  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
    this.resizeObserver.disconnect();
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
    if (isOverflowing) {
      requestAnimationFrame(() => {
        if (this.tertiaryMenu) this.tertiaryMenu.anchorEl = this.menuButton;
      });
    }
  }

  componentDidLoad() {
    this.resetResizeObserver();
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
    let str = '!my-0 pr-20 emphasis ';
    if (!this.minWidths.md) str += this.previousPageUrl ? 'text-h6' : 'text-h5';
    else str += this.previousPageUrl ? 'text-h5' : 'text-h3';
    return str;
  }

  get buttonsJsx() {
    return (
      <div
        ref={el => (this.buttonRow = el)}
        class="flex py-1 space-x-8 md:space-x-24 md:justify-end md:flex-row-reverse md:space-x-reverse items-center max-w-full"
      >
        {this.buttons.map((button, index) => {
          // If not specified, set btnType automatically for primary, secondary, and tertiary buttons
          let { btnType } = button;
          if (!btnType) btnType = index === 0 ? 'contained' : index === 1 ? 'outlined' : 'text';
          const isTertiary = index === 2;
          const { label, ...menuItemProps } = button; // Do not use button label as menu item label (use in slot instead)
          return (
            <div
              ref={el => isTertiary && (this.tertiaryButtonWrapper = el)}
              class={isTertiary ? 'relative !ml-auto md:!ml-0' : ''}
            >
              {/* Tertiary menu (shown when the tertiary button does not fit in the viewport) */}
              {isTertiary && this.renderTertiaryButtonAsMenu && (
                <div class="absolute !ml-auto -top-6">
                  <mx-icon-button ref={el => (this.menuButton = el)} innerHTML={dotsSvg}></mx-icon-button>
                  <mx-menu ref={el => (this.tertiaryMenu = el)} anchor-el={this.menuButton}>
                    <mx-menu-item {...menuItemProps}>{button.label}</mx-menu-item>
                  </mx-menu>
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
    return (
      <Host class={this.hostClass}>
        <slot name="previous-page">
          {this.previousPageUrl && (
            <a
              href={this.previousPageUrl}
              class="flex items-center pt-16 md:pt-20 uppercase caption1 font-semibold tracking-1-25"
            >
              <span class="mr-10" innerHTML={arrowSvg}></span>
              {this.previousPageTitle}
            </a>
          )}
        </slot>
        <div class="flex flex-col py-10 space-y-14 md:space-y-0 md:flex-row flex-grow md:items-center justify-center md:justify-between flex-wrap">
          <h1 class={this.headingClass}>
            <slot></slot>
          </h1>
          {this.buttons.length > 0 && this.buttonsJsx}
          <slot name="buttons"></slot>
        </div>
        <slot name="tabs"></slot>
      </Host>
    );
  }
}
