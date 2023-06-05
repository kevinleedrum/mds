import { r as registerInstance, h, e as Host, g as getElement } from './index-20e785a9.js';
import { u as uuidv4, p as propagateDataAttributes } from './utils-a3c69dbe.js';

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
    return (h(Host, { class: 'mx-select block text-3' + (this.disabled ? ' disabled' : '') }, this.label && !this.floatLabel && labelJsx, h("div", { "data-testid": "select-wrapper", class: this.selectWrapperClass }, h("select", Object.assign({ "aria-label": this.elAriaLabel || this.label, class: this.selectElClass, disabled: this.disabled, id: this.selectId || this.uuid, name: this.name, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.selectElem = el) }, this.dataAttributes), h("slot", null)), this.label && this.floatLabel && labelJsx, h("span", { class: this.iconSuffixClass }, this.suffix && h("span", { class: "suffix flex items-center h-full px-4" }, this.suffix), this.iconEl)), this.assistiveText && h("div", { class: "assistive-text caption1 mt-4 ml-16" }, this.assistiveText)));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

export { MxSelect as mx_select };
