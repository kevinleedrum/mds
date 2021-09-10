import { r as registerInstance, e as createEvent, h, f as Host } from './index-a4e4d6b0.js';
import { r as ripple } from './ripple-54ef50dc.js';
import { c as checkSvg } from './check-754da8c1.js';

const removeSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10.87L10.87 12L8 9.13L5.13 12L4 10.87L6.87 8L4 5.13L5.13 4L8 6.87L10.87 4L12 5.13L9.13 8L12 10.87ZM8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0Z" fill="currentColor" />
</svg>
`;

const MxChip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxRemove = createEvent(this, "mxRemove", 7);
    this.outlined = false;
    this.disabled = false;
    /** Display a checkmark on the left side of the chip */
    this.selected = false;
    /** Use the pointer cursor and show a ripple animation.
     * This does not need to be explicitly set for `choice` or `filter` chips. */
    this.clickable = false;
    /** Show the remove icon on the right */
    this.removable = false;
    /** Style as a choice chip when selected.
     * This is set internally when the chip is wrapped with an `mx-chip-group`. */
    this.choice = false;
    /** Style as a filter chip when selected */
    this.filter = false;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (this.isClickable)
      ripple(e, this.chipElem);
  }
  onKeyDown(e) {
    if (!this.isClickable)
      return;
    // Treat pressing Enter or spacebar as a click (like a button)
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      this.chipElem.click();
    }
  }
  onRemove(e) {
    e.stopPropagation(); // Do not trigger the chip's onClick
    if (this.disabled)
      return;
    this.mxRemove.emit(e);
  }
  get hasLeftIcon() {
    return this.icon || this.avatarUrl || (this.selected && !this.choice);
  }
  get isClickable() {
    return this.clickable || this.choice || this.filter;
  }
  get chipClass() {
    let str = 'h-32 inline-grid items-center outline-none leading-none gap-8 grid-flow-col relative rounded-full text-4 overflow-hidden';
    if (this.choice)
      str += ' choice';
    if (this.filter)
      str += ' filter';
    if (this.outlined)
      str += ' outlined border';
    if (this.isClickable)
      str += ' clickable transform cursor-pointer disabled:cursor-auto';
    str += this.hasLeftIcon ? ' pl-6' : ' pl-12';
    if (!this.removable)
      str += ' pr-12';
    else
      str += this.hasLeftIcon ? ' pr-2' : ' pr-8';
    return str;
  }
  get ariaRole() {
    if (this.choice)
      return 'radio';
    if (this.filter)
      return 'checkbox';
    if (this.clickable)
      return 'button';
    return null;
  }
  get avatarStyle() {
    if (!this.avatarUrl)
      return null;
    const background = `url(${this.avatarUrl}) no-repeat center center`;
    return { background, backgroundSize: 'cover' };
  }
  render() {
    return (h(Host, { class: "mx-chip inline-block" }, h("div", { ref: el => (this.chipElem = el), class: this.chipClass, "aria-checked": this.selected, "aria-disabled": this.disabled, role: this.ariaRole, tabindex: this.isClickable ? '0' : '-1', onClick: this.onClick.bind(this), onKeyDown: this.onKeyDown.bind(this) }, this.hasLeftIcon && (h("div", { style: this.avatarStyle, role: "presentation", "data-testid": "left-icon", class: "left-icon flex items-center justify-center w-24 h-24 rounded-full relative overflow-hidden" }, this.icon && h("i", { class: this.icon + ' text-1' }), this.selected && (h("div", { "data-testid": "check", class: "check flex absolute inset-0 items-center justify-center" }, h("span", { innerHTML: checkSvg }))))), h("span", null, h("slot", null)), this.removable && (h("button", { type: "button", "data-testid": "remove", "aria-label": "Remove", class: "remove inline-flex items-center justify-center w-24 h-24 cursor-pointer", innerHTML: removeSvg, onClick: this.onRemove.bind(this) })))));
  }
};

export { MxChip as mx_chip };
