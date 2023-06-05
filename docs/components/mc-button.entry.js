import { r as registerInstance, h, e as Host, g as getElement } from './index-20e785a9.js';
import { p as propagateDataAttributes } from './utils-a3c69dbe.js';

const McButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.hasLeftSlot = false;
    this.hasRightSlot = false;
    this.btnType = 'normal';
    this.disabled = false;
    this.dropdown = false;
    this.full = false;
    this.hug = false;
    this.small = false;
    this.type = 'button';
  }
  componentWillRender() {
    this.hasLeftSlot = !!this.element.querySelector('[slot="left"]');
    this.hasRightSlot = !!this.element.querySelector('[slot="right"]');
    propagateDataAttributes.call(this);
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
  }
  get hasLeftOrRightContent() {
    return this.hasLeftSlot || this.hasRightSlot || this.iconLeft || this.iconRight || this.dropdown;
  }
  get buttonClass() {
    let str = this.btnType + '-button'; // Sets color vars
    str += ' flex items-center justify-center relative overflow-hidden appearance-none select-none';
    str += ' cursor-pointer disabled:pointer-events-none disabled:cursor-auto hover:no-underline';
    str += ' w-full rounded font-bold text-button uppercase';
    if (this.btnType === 'ghost')
      str += ' border';
    str += this.small ? ' min-h-30' : ' min-h-40';
    str += this.small || this.hasLeftOrRightContent ? ' px-15' : ' px-20';
    return str;
  }
  get minWidthClass() {
    return this.hug ? null : this.small ? 'min-w-100' : 'min-w-150';
  }
  get showLeft() {
    return this.hasLeftSlot || this.iconLeft || (this.hasLeftOrRightContent && !this.hug);
  }
  get showRight() {
    return this.hasRightSlot || this.iconRight || this.dropdown || (this.hasLeftOrRightContent && !this.hug);
  }
  get gridTemplateColumns() {
    return `${this.showLeft ? '1fr' : ''} auto ${this.showRight ? '1fr' : ''}`;
  }
  render() {
    const buttonContent = (h("div", { class: "grid w-full justify-center items-center relative overflow-hidden whitespace-nowrap", style: { gridTemplateColumns: this.gridTemplateColumns } }, this.showLeft && (h("span", { class: "flex items-center justify-self-start mr-10", "data-testid": "left-content" }, h("slot", { name: "left" }), this.iconLeft && h("i", { class: 'text-subtitle ' + this.iconLeft }))), h("span", { class: "slot-content truncate" }, h("slot", null)), this.showRight && (h("span", { class: "flex items-center justify-self-end ml-10", "data-testid": "right-content" }, (this.iconRight || this.dropdown) && (h("i", { "data-testid": "dropdown-icon", class: `text-subtitle ${this.dropdown ? 'mds-caret-down-fill' : this.iconRight}` })), h("slot", { name: "right" })))));
    return (h(Host, { class: `${this.minWidthClass} ${this.full ? 'flex' : 'inline-flex'}` }, this.href ? (h("a", Object.assign({ href: this.href, target: this.target, "aria-disabled": this.disabled ? 'true' : null, class: this.buttonClass, onClick: this.onClick.bind(this) }, this.dataAttributes), buttonContent)) : (h("button", Object.assign({ type: this.type, form: this.form, formaction: this.formaction, value: this.value, disabled: this.disabled, class: this.buttonClass, onClick: this.onClick.bind(this), "aria-label": this.elAriaLabel }, this.dataAttributes), buttonContent))));
  }
  get element() { return getElement(this); }
};

export { McButton as mc_button };
