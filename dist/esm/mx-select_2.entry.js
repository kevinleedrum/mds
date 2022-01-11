import { r as registerInstance, h, H as Host, g as getElement } from './index-de1da671.js';
import { u as uuidv4, p as propagateDataAttributes } from './utils-18e3dfde.js';
import { r as ripple } from './ripple-54ef50dc.js';

const MxSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.uuid = uuidv4();
    this.dataAttributes = {};
    this.dense = false;
    this.disabled = false;
    /** Style with a 1dp elevation */
    this.elevated = false;
    /** Style with a "flat" border color */
    this.flat = false;
    this.floatLabel = false;
    this.error = false;
    /** Additional classes for the label */
    this.labelClass = '';
    this.isFocused = false;
    this.componentWillRender = propagateDataAttributes;
  }
  componentDidLoad() {
    this.updateSelectValue();
  }
  onValueChange() {
    this.updateSelectValue();
  }
  updateSelectValue() {
    this.selectElem.value = this.value;
  }
  onFocus() {
    this.isFocused = true;
    this.error = false;
  }
  onBlur() {
    this.isFocused = false;
  }
  onInput(e) {
    this.value = e.target.value;
  }
  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }
  get selectWrapperClass() {
    let str = 'mx-select-wrapper flex items-center relative rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    if (!this.hasValue)
      str += ' no-value';
    if (this.elevated)
      str += ' elevated shadow-1';
    if (this.flat)
      str += ' flat';
    str += this.error || this.isFocused ? ' border-2' : ' border';
    if (this.error)
      str += ' error';
    if (this.disabled)
      str += ' disabled';
    if (this.selectClass)
      str += ' ' + this.selectClass;
    return str;
  }
  get selectElClass() {
    let str = 'absolute inset-0 w-full pl-16 overflow-hidden outline-none appearance-none bg-transparent cursor-pointer disabled:cursor-auto';
    if (this.isFocused)
      str += ' -m-1'; // prevent shifting due to border-width change
    return str;
  }
  get labelClassNames() {
    let str = 'block pointer-events-none';
    if (this.floatLabel) {
      str += ' absolute mt-0 left-12 px-4';
      if (this.dense)
        str += ' dense text-4';
      if (this.isFocused || this.hasValue)
        str += ' floating';
      if (this.isFocused)
        str += ' -ml-1'; // prevent shifting due to border-width change
    }
    else {
      str += ' subtitle2 mb-4';
    }
    return (str += ' ' + this.labelClass);
  }
  get iconSuffixClass() {
    let str = 'icon-suffix absolute flex items-center h-full right-12 space-x-8 pointer-events-none';
    if (this.isFocused)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  get iconEl() {
    let icon = h("i", { "data-testid": "arrow", class: "mds-arrow-triangle-down text-icon" });
    if (this.error)
      icon = h("i", { "data-testid": "error-icon", class: "mds-warning-circle text-icon" });
    return icon;
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.selectId || this.uuid, class: this.labelClassNames }, this.label));
    return (h(Host, { class: 'mx-select block' + (this.disabled ? ' disabled' : '') }, this.label && !this.floatLabel && labelJsx, h("div", { "data-testid": "select-wrapper", class: this.selectWrapperClass }, h("select", Object.assign({ "aria-label": this.label || this.ariaLabel, class: this.selectElClass, disabled: this.disabled, id: this.selectId || this.uuid, name: this.name, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.selectElem = el) }, this.dataAttributes), h("slot", null)), this.label && this.floatLabel && labelJsx, h("span", { class: this.iconSuffixClass }, this.suffix && h("span", { class: "suffix flex items-center h-full px-4" }, this.suffix), this.iconEl)), this.assistiveText && h("div", { class: "assistive-text caption1 mt-4 ml-16" }, this.assistiveText)));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

const MxTab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** Label text to display */
    this.label = '';
    /** If you are not providing a `label`, this should be provided instead for accessibility */
    this.ariaLabel = '';
    /** Class name of icon to display */
    this.icon = '';
    /** Do not set this manually. It will be set automatically based on the `mx-tabs` `value` prop */
    this.selected = false;
    /** Display a circular badge */
    this.badge = false;
    /** Additional classes for the badge */
    this.badgeClass = '';
  }
  componentDidLoad() {
    if (!this.label && !this.ariaLabel) {
      throw new Error('Please provide either a label or an aria-label for each tab.');
    }
  }
  onClick(e) {
    ripple(e, this.btnElem);
  }
  get tabClass() {
    let str = 'mx-tab relative inline-flex items-center justify-center min-w-full';
    str += this.label && this.icon ? ' h-72' : ' h-48';
    return str;
  }
  get badgeEl() {
    return h("mx-badge", { indicator: true, badgeClass: ['w-8 h-8', this.badgeClass].join(' ') });
  }
  get isTextOnly() {
    return this.label && !this.icon;
  }
  render() {
    return (h(Host, { class: this.tabClass }, h("button", { ref: el => (this.btnElem = el), role: "tab", type: "button", "aria-selected": this.selected ? 'true' : null, "aria-label": this.label || this.ariaLabel, class: "relative overflow-hidden w-full h-full border border-transparent px-44", onClick: this.onClick.bind(this) }, h("div", { class: "relative flex flex-col items-center justify-center space-y-6 pointer-events-none" }, !this.isTextOnly && (h("span", { class: "flex items-center space-x-6" }, !this.label && this.badge && this.badgeEl, this.icon && h("i", { class: this.icon + ' text-1' + (!this.label ? ' icon-only' : '') }))), this.label && (h("span", { class: "flex items-center uppercase text-4 font-semibold leading-4 tracking-1-25 space-x-6" }, this.badge && this.badgeEl, h("span", null, this.label))))), h("span", { class: 'active-tab-indicator absolute bottom-0 left-0 w-full h-2 pointer-events-none' +
        (this.selected ? '' : ' opacity-0') })));
  }
};

export { MxSelect as mx_select, MxTab as mx_tab };
