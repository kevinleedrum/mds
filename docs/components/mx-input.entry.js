import { r as registerInstance, h, e as Host, g as getElement } from './index-20e785a9.js';
import { u as uuidv4, p as propagateDataAttributes } from './utils-a3c69dbe.js';

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.uuid = uuidv4();
    /** The `type` attribute for the text input */
    this.type = 'text';
    this.dense = false;
    this.disabled = false;
    this.readonly = false;
    this.outerContainerClass = '';
    this.labelClass = '';
    this.error = false;
    this.floatLabel = false;
    /** Display a multi-line `textarea` instead of an `input` */
    this.textarea = false;
    this.textareaHeight = '15.625rem';
    /** Set to `true` to hide the character count when a `maxlength` is set. */
    this.hideCharacterCount = false;
    this.isFocused = false;
    this.characterCount = 0;
    this.componentWillRender = propagateDataAttributes;
  }
  connectedCallback() {
    this.characterCount = this.hasValue ? this.value.length : 0;
  }
  componentDidLoad() {
    this.updateValue();
  }
  onValueChange() {
    this.updateValue();
    this.characterCount = this.hasValue ? this.value.length : 0;
  }
  updateValue() {
    this.workingElem.value = this.hasValue ? this.value : '';
  }
  onFocus() {
    this.isFocused = true;
    this.error = false;
  }
  onBlur() {
    this.isFocused = false;
  }
  onContainerClick() {
    if (!this.disabled && !this.readonly)
      this.workingElem.focus();
  }
  onInput(e) {
    this.characterCount = e.target.value.length;
    this.value = e.target.value;
  }
  getIconJsx(icon) {
    return icon.onClick ? (h("button", { type: "button", class: "inline-flex items-center justify-center cursor-pointer", "aria-label": icon.ariaLabel, onClick: icon.onClick }, h("i", { class: icon.icon }))) : (h("i", { class: icon.icon + ' pointer-events-none' }));
  }
  get workingElem() {
    return this.textarea ? this.textArea : this.textInput;
  }
  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }
  get containerClass() {
    let str = 'mx-input-wrapper flex items-center relative rounded-lg';
    if (!this.textarea) {
      str += this.dense ? ' h-36' : ' h-48';
    }
    str += this.error || this.isFocused ? ' border-2' : ' border';
    if (this.error)
      str += ' error';
    if (this.disabled)
      str += ' disabled';
    if (this.readonly)
      str += ' readonly';
    return str;
  }
  get inputClass() {
    let str = 'flex-1 outline-none appearance-none bg-transparent';
    if (!this.textarea) {
      str += ' px-16 overflow-hidden';
    }
    else {
      str += ' p-16 overflow-y-auto resize-none';
    }
    if (this.isFocused || this.error)
      str += this.leftIcon ? ' -mr-1' : ' -m-1'; // prevent shifting due to border-width change
    return str;
  }
  get labelClassNames() {
    let str = 'block whitespace-nowrap pointer-events-none';
    if (this.floatLabel) {
      str += ' absolute mt-0 px-4';
      if (this.textarea)
        str += ' top-12';
      str += this.leftIcon && !this.textarea ? ' left-48 has-left-icon' : ' left-12';
      if (this.dense && !this.textarea)
        str += ' dense text-4';
      if (this.isFocused || this.characterCount > 0)
        str += ' floating';
      if (this.isFocused || this.error)
        str += ' -ml-1'; // prevent shifting due to border-width change
      if ((this.isFocused || this.error) && this.textarea)
        str += ' -mt-1';
    }
    else {
      str += ' subtitle2 mb-4';
    }
    if (this.labelClass)
      str += this.labelClass;
    return str;
  }
  get leftIconWrapperClass() {
    let str = 'flex items-center h-full pl-16 space-x-16';
    if (this.isFocused || this.error)
      str += ' -ml-1'; // prevent shifting due to border-width change
    return str;
  }
  get rightContentClass() {
    let str = 'icon-suffix flex items-center h-full pr-16 space-x-8';
    if (this.isFocused || this.error)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  get textareaClass() {
    return this.textarea ? ' textarea items-start' : '';
  }
  get leftIcons() {
    if (typeof this.leftIcon === 'string')
      return [{ icon: this.leftIcon }];
    return this.leftIcon;
  }
  get rightIcons() {
    if (typeof this.rightIcon === 'string')
      return [{ icon: this.rightIcon }];
    return this.rightIcon;
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.inputId || this.uuid, class: this.labelClassNames }, this.label));
    return (h(Host, { class: 'mx-input block text-3' + (this.disabled ? ' disabled' : '') }, this.label && !this.floatLabel && labelJsx, h("div", { class: this.containerClass, onClick: this.onContainerClick.bind(this) }, this.leftIcon && h("div", { class: this.leftIconWrapperClass }, this.leftIcons.map(this.getIconJsx)), this.label && this.floatLabel && labelJsx, !this.textarea ? (h("input", Object.assign({ type: this.type, class: this.inputClass, name: this.name, id: this.inputId || this.uuid, value: this.value, placeholder: this.floatLabel ? null : this.placeholder, "aria-label": this.elAriaLabel || this.placeholder, maxlength: this.maxlength, disabled: this.disabled, readonly: this.readonly, step: this.step, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.textInput = el) }, this.dataAttributes))) : (h("textarea", Object.assign({ class: this.inputClass, style: { height: this.textareaHeight }, name: this.name, id: this.inputId || this.uuid, placeholder: this.floatLabel ? null : this.placeholder, maxlength: this.maxlength, disabled: this.disabled, readonly: this.readonly, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.textArea = el) }, this.dataAttributes), this.value)), !this.textarea && (this.maxlength || this.suffix || this.error || this.rightIcon) && (h("span", { class: this.rightContentClass }, this.maxlength && !this.hideCharacterCount && (h("span", { "data-testid": "character-count", class: "character-count pointer-events-none" }, this.characterCount, "/", this.maxlength)), this.suffix && (h("span", { "data-testid": "suffix", class: "suffix flex items-center h-full px-4 pointer-events-none" }, this.suffix)), this.error && h("i", { class: "mds-warning-circle text-icon pointer-events-none" }), this.rightIcon && !this.error && (h("span", { class: "flex items-center space-x-16" }, this.rightIcons.map(this.getIconJsx)))))), (this.assistiveText || (this.textarea && this.maxlength && !this.hideCharacterCount)) && (h("div", { class: "flex justify-between caption1 mt-4 ml-16 space-x-32" }, h("span", { "data-testid": "assistive-text", class: "assistive-text" }, this.assistiveText), this.textarea && this.maxlength && !this.hideCharacterCount && (h("span", { "data-testid": "character-count", class: "character-count" }, this.characterCount, "/", this.maxlength))))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

export { MxInput as mx_input };
