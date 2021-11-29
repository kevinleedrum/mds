import { Component, Host, h, Element, Prop, Watch, State } from '@stencil/core';
import { slideIn, slideOut } from '../../utils/transitions';

@Component({
  tag: 'mx-banner',
  shadow: false,
})
export class MxBanner {
  hasActions: boolean = false;
  hasImage: boolean = false;
  bannerEl: HTMLElement;

  @Prop() error: boolean = false;
  @Prop() isOpen: boolean = false;
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
      this.element.style.transition = 'max-height 150ms cubic-bezier(0.4, 0, 0.2, 1)';
      this.element.style.maxHeight = this.element.scrollHeight + 'px';
      requestAnimationFrame(() => {
        this.element.style.maxHeight = '0';
      });
      await slideOut(this.bannerEl, 150);
      this.isVisible = false;
    } else {
      this.isVisible = true;
      this.element.style.transition = 'max-height 180ms cubic-bezier(0.4, 0, 0.2, 1)';
      requestAnimationFrame(() => {
        this.element.style.maxHeight = this.element.scrollHeight + 'px';
      });
      await slideIn(this.bannerEl, 180);
      this.element.style.maxHeight = '';
    }
  }

  get hostClass(): string {
    let str = 'mx-banner overflow-hidden';
    str += this.isVisible ? ' block' : ' hidden';
    if (this.sticky) str += ' sticky z-10'; // TODO
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
          class="flex flex-col md:flex-row md:items-center md:justify-between px-24 md:px-72 py-8 md:py-10"
        >
          <div class={this.messageClass}>
            {this.hasImage && (
              <div class="flex-shrink-0">
                <slot name="image"></slot>
              </div>
            )}
            <p class="my-0 text-4 flex-grow">
              <slot></slot>
            </p>
          </div>
          <div class="text-right flex-shrink-0">
            <slot name="actions"></slot>
          </div>
        </div>
      </Host>
    );
  }
}
