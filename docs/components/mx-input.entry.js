import { r as registerInstance, h, f as Host, g as getElement } from './index-935f3e8d.js';
import { w as warningCircleSvg } from './warning-circle-7e1a7781.js';
import { u as uuidv4, p as propagateDataAttributes } from './utils-18e3dfde.js';

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
    this.textareaHeight = '250px';
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
  onInput(e) {
    this.characterCount = e.target.value.length;
  }
  get workingElem() {
    return this.textarea ? this.textArea : this.textInput;
  }
  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }
  get containerClass() {
    let str = 'mx-input-wrapper flex items-center relative border rounded-lg';
    if (!this.textarea) {
      str += this.dense ? ' h-36' : ' h-48';
    }
    if (this.error || this.isFocused)
      str += ' border-2';
    if (this.error)
      str += ' error';
    if (this.disabled)
      str += ' disabled';
    if (this.readonly)
      str += ' readonly';
    return str;
  }
  get inputClass() {
    let str = 'flex-1 overflow-hidden outline-none appearance-none bg-transparent';
    if (!this.textarea) {
      str += ' px-16';
    }
    else {
      str += ' p-16 resize-none';
    }
    if (this.isFocused || this.error)
      str += this.leftIcon ? ' -mr-1' : ' -m-1'; // prevent shifting due to border-width change
    return str;
  }
  get labelClassNames() {
    let str = 'block pointer-events-none';
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
    let str = 'flex items-center h-full pointer-events-none pl-16';
    if (this.isFocused || this.error)
      str += ' -ml-1'; // prevent shifting due to border-width change
    return str;
  }
  get rightContentClass() {
    let str = 'icon-suffix flex items-center h-full pr-16 space-x-8 pointer-events-none';
    if (this.isFocused || this.error)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  get textareaClass() {
    return this.textarea ? ' textarea items-start' : '';
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.inputId || this.uuid, class: this.labelClassNames }, this.label));
    return (h(Host, { class: 'mx-input block' + (this.disabled ? ' disabled' : '') }, this.label && !this.floatLabel && labelJsx, h("div", { class: this.containerClass }, this.leftIcon && (h("div", { class: this.leftIconWrapperClass }, h("i", { class: this.leftIcon }))), this.label && this.floatLabel && labelJsx, !this.textarea ? (h("input", Object.assign({ type: this.type, class: this.inputClass, name: this.name, id: this.inputId || this.uuid, value: this.value, placeholder: this.floatLabel ? null : this.placeholder, maxlength: this.maxlength, disabled: this.disabled, readonly: this.readonly, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.textInput = el) }, this.dataAttributes))) : (h("textarea", Object.assign({ class: this.inputClass, style: { height: this.textareaHeight }, name: this.name, id: this.inputId || this.uuid, placeholder: this.floatLabel ? null : this.placeholder, maxlength: this.maxlength, disabled: this.disabled, readonly: this.readonly, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.textArea = el) }, this.dataAttributes), this.value)), !this.textarea && (this.maxlength || this.suffix || this.error || this.rightIcon) && (h("span", { class: this.rightContentClass }, this.maxlength && (h("span", { "data-testid": "character-count", class: "character-count" }, this.characterCount, "/", this.maxlength)), this.suffix && (h("span", { "data-testid": "suffix", class: "suffix flex items-center h-full px-4" }, this.suffix)), this.error && h("span", { innerHTML: warningCircleSvg }), this.rightIcon && !this.error && h("i", { class: this.rightIcon })))), (this.assistiveText || (this.textarea && this.maxlength)) && (h("div", { class: "flex justify-between caption1 mt-4 ml-16 space-x-32" }, h("span", { "data-testid": "assistive-text", class: "assistive-text" }, this.assistiveText), this.textarea && this.maxlength && (h("span", { "data-testid": "character-count", class: "character-count" }, this.characterCount, "/", this.maxlength))))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

export { MxInput as mx_input };
