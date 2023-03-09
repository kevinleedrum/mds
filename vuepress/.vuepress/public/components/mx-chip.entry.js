import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-7d7e62d7.js';
import { r as ripple } from './ripple-140c6d57.js';
import { u as uuidv4 } from './utils-a3c69dbe.js';

const MxChip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxRemove = createEvent(this, "mxRemove", 7);
    this.uuid = uuidv4();
    this.outlined = false;
    this.disabled = false;
    this.selected = false;
    this.clickable = false;
    this.removable = false;
    this.avatarUrl = undefined;
    this.icon = undefined;
    this.value = undefined;
    this.choice = false;
    this.filter = false;
  }
  componentWillRender() {
    const chipGroup = this.element.closest('mx-chip-group');
    if (!chipGroup)
      return;
    this.selected = chipGroup.value === this.value;
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
      str += ' clickable transform cursor-pointer disabled:pointer-events-none disabled:cursor-auto';
    str += this.hasLeftIcon ? ' pl-6' : ' pl-12';
    if (!this.removable)
      str += ' pr-12';
    else
      str += this.hasLeftIcon ? ' pr-32' : ' pr-40';
    return str;
  }
  get removeButtonClass() {
    let str = 'remove inline-flex absolute top-4 items-center justify-center w-24 h-24 cursor-pointer';
    str += this.hasLeftIcon ? ' right-2' : ' right-8';
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
    return (h(Host, { class: "mx-chip inline-block relative" }, h("div", { ref: el => (this.chipElem = el), id: this.uuid, class: this.chipClass, "aria-checked": this.choice || this.filter ? (this.selected ? 'true' : 'false') : null, "aria-disabled": this.disabled ? 'true' : null, role: this.ariaRole, tabindex: this.isClickable && !this.disabled ? '0' : '-1', onClick: this.onClick.bind(this), onKeyDown: this.onKeyDown.bind(this) }, this.hasLeftIcon && (h("div", { style: this.avatarStyle, role: "presentation", "data-testid": "left-icon", class: "left-icon flex items-center justify-center w-24 h-24 rounded-full relative overflow-hidden" }, this.icon && h("i", { class: this.icon + ' text-1' }), this.selected && (h("div", { "data-testid": "check", class: "check flex absolute inset-0 items-center justify-center" }, h("i", { class: "mds-check" }))))), h("span", null, h("slot", null))), this.removable && (h("button", { type: "button", "data-testid": "remove", "aria-label": "Remove", "aria-controls": this.uuid, disabled: this.disabled, class: this.removeButtonClass, onClick: this.onRemove.bind(this) }, h("i", { class: "mds-remove text-3" })))));
  }
  get element() { return getElement(this); }
};

export { MxChip as mx_chip };
