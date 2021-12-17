import { Component, Host, h, Prop, Element, State, Method, Watch } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';
import { ResizeObserver } from '@juggle/resize-observer';
import { IMxButtonProps } from '../mx-button/mx-button';

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
  hasModalHeaderCenter: boolean = false;
  menuButton: HTMLMxIconButtonElement;
  resizeObserver: ResizeObserver;
  tabSlot: HTMLElement;
  tertiaryButtonWrapper: HTMLElement;
  tertiaryMenu: HTMLMxMenuElement;

  /** An array of prop objects for each button.  Use the `label` property to specify the button's inner text. */
  @Prop() buttons: IPageHeaderButton[] = [];
  /** This flag is set by the Modal component to adjust the page header styling when used internally. */
  @Prop() modal: boolean = false;
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
  async resetResizeObserver() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.resizeObserver = new ResizeObserver(() => this.updateRenderTertiaryButtonAsMenu());
    this.resizeObserver.observe(this.element);
    // Wait one tick for layout shifts in order to detect overflow correctly.
    requestAnimationFrame(this.updateRenderTertiaryButtonAsMenu.bind(this));
  }

  @Watch('minWidths')
  updateSlottedButtonSize() {
    const slottedButtons = this.element.querySelectorAll('[slot="buttons"] > mx-button');
    slottedButtons.forEach((button: HTMLMxButtonElement) => (button.xl = this.minWidths.lg));
  }

  componentWillLoad() {
    this.hasTabs = !!this.element.querySelector('[slot="tabs"]');
    this.hasModalHeaderCenter = !!this.element.querySelector('[slot="modal-header-center"]');
    this.updateSlottedButtonSize();
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
    let str = 'mx-page-header flex flex-col';
    if (this.pattern) str += ' bg-pattern';
    if (this.minWidths.md && this.modal) {
      str += ' px-40';
      str += this.hasTabs ? ' min-h-128' : ' min-h-80';
      return str;
    } else {
      str += ' px-24 lg:px-72';
    }
    if (this.hasTabs) str += ' pb-12 md:pb-0';
    if (this.buttons.length && this.hasTabs) str += ' min-h-176 md:min-h-164';
    else if (this.buttons.length) str += ' min-h-128';
    else str += ' min-h-80 md:min-h-128';
    return str;
  }

  get headingClass() {
    let str = '!my-0 pr-20 emphasis ';
    if (!this.minWidths.md) str += this.previousPageUrl ? 'text-h6' : 'text-h5';
    else str += this.previousPageUrl || this.modal ? 'text-h5' : 'text-h3';
    return str;
  }

  get previousPageClass(): string {
    let str = 'flex items-center pt-16 md:pt-20 uppercase caption1 font-semibold tracking-1-25';
    if (this.modal) str += ' md:hidden';
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
                  <mx-icon-button ref={el => (this.menuButton = el)} icon="mds-dots-vertical"></mx-icon-button>
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
                aria-hidden={isTertiary && this.renderTertiaryButtonAsMenu ? 'true' : null}
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
        {/* This slot is typically used for the modal Close button */}
        <div class="absolute top-16 md:top-20 md:mt-2 right-24 md:right-40">
          <slot name="modal-header-right"></slot>
        </div>
        <slot name="previous-page">
          {this.previousPageUrl && (
            <a href={this.previousPageUrl} class={this.previousPageClass}>
              <i class="mds-arrow-left mr-10"></i>
              {this.previousPageTitle}
            </a>
          )}
        </slot>
        <div class="flex flex-col py-10 space-y-14 md:space-y-0 md:flex-row flex-grow md:items-center justify-center md:justify-between flex-wrap">
          <div
            class={
              'flex-1 items-center' + (this.hasModalHeaderCenter ? ' grid grid-cols-1 sm:grid-cols-3 h-full' : ' flex') // HACK: Safari needs the `h-full` to constrain the grid to its parent
            }
          >
            <h1 class={this.headingClass}>
              <slot></slot>
            </h1>
            <slot name="modal-header-center"></slot>
          </div>
          {!(this.modal && this.minWidths.md) && this.buttons.length > 0 && this.buttonsJsx}
          <slot name="buttons"></slot>
        </div>
        <slot name="tabs"></slot>
      </Host>
    );
  }
}
