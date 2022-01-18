import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import ripple from '../../utils/ripple';
import { uuidv4 } from '../../utils/utils';

@Component({
  tag: 'mx-chip',
  shadow: false,
})
export class MxChip {
  chipElem: HTMLElement;
  uuid: string = uuidv4();

  @Prop() outlined: boolean = false;
  @Prop() disabled: boolean = false;
  /** Display a checkmark on the left side of the chip */
  @Prop({ reflect: true }) selected: boolean = false;
  /** Use the pointer cursor and show a ripple animation.
   * This does not need to be explicitly set for `choice` or `filter` chips. */
  @Prop() clickable: boolean = false;
  /** Show the remove icon on the right */
  @Prop() removable: boolean = false;
  /** URL of image to show on the left */
  @Prop() avatarUrl: string;
  /** Class name of icon to show on the left */
  @Prop() icon: string;
  /** The value associated with a choice chip (used with `mx-chip-group`) */
  @Prop() value: any;
  /** Style as a choice chip when selected.
   * This is set internally when the chip is wrapped with an `mx-chip-group`. */
  @Prop() choice: boolean = false;
  /** Style as a filter chip when selected */
  @Prop() filter: boolean = false;

  /** Emitted when the remove icon is clicked */
  @Event() mxRemove: EventEmitter<MouseEvent>;

  onClick(e: MouseEvent) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (this.isClickable) ripple(e, this.chipElem);
  }

  onKeyDown(e: KeyboardEvent) {
    if (!this.isClickable) return;
    // Treat pressing Enter or spacebar as a click (like a button)
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      this.chipElem.click();
    }
  }

  onRemove(e: MouseEvent) {
    e.stopPropagation(); // Do not trigger the chip's onClick
    if (this.disabled) return;
    this.mxRemove.emit(e);
  }

  get hasLeftIcon() {
    return this.icon || this.avatarUrl || (this.selected && !this.choice);
  }

  get isClickable() {
    return this.clickable || this.choice || this.filter;
  }

  get chipClass() {
    let str =
      'h-32 inline-grid items-center outline-none leading-none gap-8 grid-flow-col relative rounded-full text-4 overflow-hidden';
    if (this.choice) str += ' choice';
    if (this.filter) str += ' filter';
    if (this.outlined) str += ' outlined border';
    if (this.isClickable) str += ' clickable transform cursor-pointer disabled:cursor-auto';
    str += this.hasLeftIcon ? ' pl-6' : ' pl-12';
    if (!this.removable) str += ' pr-12';
    else str += this.hasLeftIcon ? ' pr-32' : ' pr-40';
    return str;
  }

  get removeButtonClass() {
    let str = 'remove inline-flex absolute top-4 items-center justify-center w-24 h-24 cursor-pointer';
    str += this.hasLeftIcon ? ' right-2' : ' right-8';
    return str;
  }

  get ariaRole() {
    if (this.choice) return 'radio';
    if (this.filter) return 'checkbox';
    if (this.clickable) return 'button';
    return null;
  }

  get avatarStyle() {
    if (!this.avatarUrl) return null;
    const background = `url(${this.avatarUrl}) no-repeat center center`;
    return { background, backgroundSize: 'cover' };
  }

  render() {
    return (
      <Host class="mx-chip inline-block relative">
        <div
          ref={el => (this.chipElem = el)}
          id={this.uuid}
          class={this.chipClass}
          aria-checked={this.choice || this.filter ? (this.selected ? 'true' : 'false') : null}
          aria-disabled={this.disabled ? 'true' : null}
          role={this.ariaRole}
          tabindex={this.isClickable ? '0' : '-1'}
          onClick={this.onClick.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
        >
          {this.hasLeftIcon && (
            <div
              style={this.avatarStyle}
              role="presentation"
              data-testid="left-icon"
              class="left-icon flex items-center justify-center w-24 h-24 rounded-full relative overflow-hidden"
            >
              {this.icon && <i class={this.icon + ' text-1'}></i>}
              {this.selected && (
                <div data-testid="check" class="check flex absolute inset-0 items-center justify-center">
                  <i class="mds-check"></i>
                </div>
              )}
            </div>
          )}
          <span>
            <slot></slot>
          </span>
        </div>
        {this.removable && (
          <button
            type="button"
            data-testid="remove"
            aria-label="Remove"
            aria-controls={this.uuid}
            class={this.removeButtonClass}
            onClick={this.onRemove.bind(this)}
          >
            <i class="mds-remove text-3"></i>
          </button>
        )}
      </Host>
    );
  }
}
