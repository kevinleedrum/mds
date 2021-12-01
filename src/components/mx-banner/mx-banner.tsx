import { Component, Host, h, Element, Prop, Watch, State } from '@stencil/core';
import { collapse, expand, slideIn, slideOut } from '../../utils/transitions';

@Component({
  tag: 'mx-banner',
  shadow: false,
})
export class MxBanner {
  hasActions: boolean = false;
  hasImage: boolean = false;
  bannerEl: HTMLElement;

  @Prop() error: boolean = false;
  /** Toggles the banner with a transition. */
  @Prop() isOpen: boolean = false;
  /** When set, `position: sticky` will be applied to the banner. */
  @Prop() sticky: boolean = false;

  @State() isVisible: boolean = false;

  @Element() element: HTMLMxBannerElement;

  connectedCallback() {
    this.isVisible = this.isOpen;
  }

  componentWillRender() {
    this.hasActions = !!this.element.querySelector('[slot="actions"]');
    this.hasImage = !!this.element.querySelector('[slot="image"]');
  }

  @Watch('isOpen')
  async transitionBanner() {
    // Collapse/expand host element's max-height while sliding the inner element up/down
    if (!this.isOpen) {
      collapse(this.element);
      await slideOut(this.bannerEl, 150);
      this.isVisible = false;
    } else {
      this.isVisible = true;
      await new Promise(requestAnimationFrame);
      expand(this.element);
      await slideIn(this.bannerEl, 150);
    }
  }

  get hostClass(): string {
    let str = 'mx-banner overflow-hidden';
    str += this.isVisible ? ' block' : ' hidden';
    if (this.sticky) str += ' sticky z-10';
    if (this.error) str += ' is-error';
    return str;
  }

  get messageClass(): string {
    let str = 'flex items-center space-x-12 mt-16 md:mt-0';
    str += this.hasActions ? ' mb-8' : ' mb-16';
    str += ' md:mb-0';
    return str;
  }
  render() {
    return (
      <Host class={this.hostClass} role="alert">
        <div
          ref={el => (this.bannerEl = el)}
          class="flex flex-col md:flex-row md:items-center md:justify-between min-h-56 px-24 md:px-72 py-8 md:py-10"
        >
          <div data-testid="message" class={this.messageClass}>
            {this.hasImage && (
              <div class="flex-shrink-0">
                <slot name="image"></slot>
              </div>
            )}
            <p class="my-0 text-4 flex-grow">
              <slot></slot>
            </p>
          </div>
          <div data-testid="actions" class="text-right flex-shrink-0">
            <slot name="actions"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
