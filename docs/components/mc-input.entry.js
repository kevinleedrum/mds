import { r as registerInstance, h, e as Host } from './index-20e785a9.js';
import { u as uuidv4 } from './utils-a3c69dbe.js';

const McInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'text';
    this.name = '';
    this.value = '';
    this.disabled = false;
    this.readonly = false;
    this.label = '';
    this.placeholder = '';
    this.instructions = '';
    this.error = false;
    this.errorMsg = '';
    this.required = false;
    this.searchLabel = 'Search';
    this.showCancelIcon = false;
  }
  componentWillRender() {
    this.inputId = this.inputId || uuidv4();
    if (this.type === 'search') {
      this.leftIcon = 'ph-magnifying-glass';
    }
    else if (this.type === 'file') {
      this.leftIcon = 'ph-file';
    }
  }
  get makeInputClasses() {
    const classArr = ['w-full', 'border', 'text-body1', 'px-15', 'py-12', 'rounded', 'border', 'border-secondary'];
    if (this.error) {
      const index = classArr.indexOf('border-secondary');
      classArr[index] = 'border-status-error';
    }
    if (this.disabled || this.readonly) {
      classArr.push('bg-secondary-ultra-light');
    }
    if (this.type === 'search' || this.type === 'file') {
      const rightPad = this.type === 'search' ? 'pr-112' : 'pr-120';
      classArr.push(rightPad);
      classArr.push('pl-36');
    }
    if (this.type === 'textarea') {
      classArr.push('h-144');
      classArr.push('align-top');
    }
    return classArr.join(' ');
  }
  handleInputFocus() {
    if (this.btnSearch && this.elemInput.value !== '') {
      this.btnSearch.classList.remove('hidden');
    }
    else if (this.btnSearch && this.elemInput.value == '') {
      this.btnSearch.classList.add('hidden');
      this.showCancelIcon = false;
    }
  }
  triggerFileSelection(event) {
    if (this.disabled || (event.type !== 'click' && 'key' in event && event.key !== 'Enter'))
      return false;
    this.elemFileInput.click();
  }
  handleFileUploadChange() {
    if (this.elemFileInput.files.length > 0) {
      this.elemFileUploadNameHolder.value = this.elemFileInput.files[0].name;
      this.elemFileUploadNameHolder.focus();
      this.elemFileUploadNameHolder.dispatchEvent(new Event('input', { bubbles: true }));
    }
    else {
      this.elemFileUploadNameHolder.value = '';
    }
    this.error = false;
  }
  evaluateInputCancelIcon() {
    if (this.type === 'time' || this.type === 'date')
      return;
    const elem = this.elemInput || this.elemFileUploadNameHolder;
    if (elem.value !== '') {
      this.showCancelIcon = true;
    }
  }
  removeFileInputValue() {
    const elem = this.elemInput || this.elemFileUploadNameHolder;
    elem.value = '';
    if (this.elemFileInput)
      this.elemFileInput.value = '';
    if (this.btnSearch)
      this.btnSearch.classList.add('hidden');
    this.showCancelIcon = false;
  }
  get makeCloseIconClasses() {
    const classArr = ['ph-x', 'absolute', 'cursor-pointer', 'cancelBtn', this.type];
    return classArr.join(' ');
  }
  render() {
    return (h(Host, { class: "text-secondary" }, this.label && (h("label", { "data-test-id": "label", htmlFor: this.inputId, class: "block text-label font-bold mb-10 uppercase" }, this.label, this.required && h("span", { class: "text-status-error" }, "*"))), this.type !== 'textarea' ? (h("div", { class: "flex items-center relative" }, this.leftIcon && h("i", { class: `leftIcon ${this.leftIcon}` }), this.showCancelIcon && (h("i", { onClick: this.removeFileInputValue.bind(this), class: this.makeCloseIconClasses })), this.type !== 'file' ? (h("input", { id: this.inputId, class: this.makeInputClasses, type: this.type, name: this.name, value: this.value, placeholder: this.placeholder, disabled: this.disabled ? true : false, readonly: this.readonly ? true : false, "aria-label": this.elAriaLabel, maxlength: this.maxlength, onKeyUp: this.handleInputFocus.bind(this), onChange: this.handleInputFocus.bind(this), onInput: this.evaluateInputCancelIcon.bind(this), ref: el => (this.elemInput = el) })) : (h("div", { class: "w-full" }, h("input", { tabIndex: -1, type: "text", class: `w-full ${this.makeInputClasses}`, onClick: this.triggerFileSelection.bind(this), onKeyUp: this.triggerFileSelection.bind(this), onInput: this.evaluateInputCancelIcon.bind(this), ref: el => (this.elemFileUploadNameHolder = el), placeholder: this.placeholder, disabled: this.disabled ? true : false, readonly: true }), h("input", { type: "file", "aria-label": this.elAriaLabel, ref: el => (this.elemFileInput = el), onChange: this.handleFileUploadChange.bind(this), name: this.name }))), this.type === 'search' && (h("mc-button", { ref: el => (this.btnSearch = el), class: "hidden", small: true }, this.searchLabel)), this.type === 'file' && !this.disabled && (h("mc-button", { onClick: this.triggerFileSelection.bind(this), small: true }, "Choose File")))) : (h("textarea", { id: this.inputId, class: this.makeInputClasses, name: this.name, placeholder: this.placeholder, disabled: this.disabled ? true : false, readonly: this.readonly ? true : false, "aria-label": this.elAriaLabel, maxlength: this.maxlength, ref: el => (this.elemInput = el) }, this.value)), this.instructions && !this.error && (h("section", { "data-test-id": "instructions", class: "text-secondary text-body2 mt-10" }, this.instructions)), this.error && this.errorMsg && (h("section", { class: "flex text-body2 mt-10 text-status-error items-center gap-6" }, h("i", { class: "ph-warning" }), this.errorMsg))));
  }
};

export { McInput as mc_input };
