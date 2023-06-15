import { Component, Host, h, Element, Prop, Watch } from '@stencil/core';
import { createPopover, PopoverInstance, PopoverPlacement } from '../../utils/popover';
import { fadeIn, fadeOut } from '../../utils/transitions';
import { uuidv4 } from '../../utils/utils';

@Component({
  tag: 'mx-tooltip',
  shadow: false,
})
export class MxTooltip {
  openTimeout;
  popoverInstance: PopoverInstance;
  tooltipElem: HTMLElement;
  uuid: string = uuidv4();

  /** Delay showing the tooltip for this many milliseconds */
  @Prop() appearDelay = 0;
  /** Increase the padding, add a shadow, and make the corners less rounded (typically for multi-line text) */
  @Prop() extended = false;
  /** Invert the default colors (i.e. dark text on a light background) */
  @Prop() inverted = false;
  /** The maximum width of the tooltip (e.g. '20rem') */
  @Prop() maxWidth = '10rem';
  /** This is typically updated automatically based on events, but may be changed programmatically if necessary. */
  @Prop({ mutable: true, reflect: true }) isOpen = false;
  /** The preferred placement of the tooltip, relative to the anchor element. */
  @Prop() placement: PopoverPlacement = 'bottom';
  /** Additional classes to add to the tooltip. */
  @Prop() tooltipClass: string;
  /** The text to show inside the tooltip.  Alternatively, use the `tooltip` slot. */
  @Prop() value: string;

  @Element() element: HTMLMxTooltipElement;

  @Watch('isOpen')
  onIsOpenChange() {
    this.isOpen ? this.show() : this.hide();
  }

  componentDidLoad() {
    let anchorEl = this.element.firstElementChild as HTMLElement;
    // For custom elements that wrap buttons, inputs, attach event listeners to the native element
    anchorEl = this.element.querySelector('a, button, input, [role="button"]') || anchorEl;
    anchorEl.setAttribute('aria-describedby', this.uuid);
    anchorEl.addEventListener('mouseenter', this.show.bind(this));
    anchorEl.addEventListener('mouseleave', this.hide.bind(this));
    if (anchorEl.tabIndex === -1) anchorEl.tabIndex = 0;
    anchorEl.addEventListener('focus', this.show.bind(this));
    anchorEl.addEventListener('blur', this.hide.bind(this));
  }

  async show() {
    clearTimeout(this.openTimeout);
    if (this.isOpen) return;
    this.openTimeout = setTimeout(async () => {
      this.isOpen = true;
      this.popoverInstance = await createPopover(
        this.element.firstElementChild as HTMLElement,
        this.tooltipElem,
        this.placement,
        [0, 4],
      );
      fadeIn(this.tooltipElem);
    }, this.appearDelay);
  }

  async hide() {
    clearTimeout(this.openTimeout);
    if (!this.isOpen) return;
    await fadeOut(this.tooltipElem);
    this.isOpen = false;
    if (!this.popoverInstance) return;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
  }

  get tooltipClasses(): string {
    let str = 'mx-tooltip caption1 absolute pointer-events-none z-50';
    if (!this.isOpen) str += ' hidden';
    if (this.inverted) str += ' inverted';
    if (this.extended) {
      str += ' p-16 rounded-lg shadow-4';
    } else {
      str += ' px-12 py-4 rounded-2xl';
    }
    if (this.tooltipClass) str += ' ' + this.tooltipClass;
    return str;
  }

  render() {
    return (
      <Host class="inline-flex">
        <slot></slot>
        <div
          ref={el => (this.tooltipElem = el)}
          id={this.uuid}
          role="tooltip"
          class={this.tooltipClasses}
          style={{ maxWidth: this.maxWidth }}
          data-testid="tooltip"
        >
          <slot name="tooltip">{this.value}</slot>
        </div>
      </Host>
    );
  }
}
