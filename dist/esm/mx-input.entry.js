import { r as registerInstance, h, H as Host } from './index-51a85981.js';

const MxInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'text';
    this.dense = false;
    this.isActive = false;
    this.isFocused = false;
    this.outerContainerClass = '';
    this.labelClass = '';
    this.error = false;
    this.textarea = false;
    this.textareaHeight = '250px';
  }
  connectedCallback() {
    if (this.error) {
      this.isActive = true;
      this.labelClass += ' active error';
    }
    else {
      this.setLabelClass();
    }
  }
  setLabelClass(target = undefined) {
    this.labelClass = '';
    if ((this.leftIcon && !this.isActive) || (this.leftIcon && target && target.value === '')) {
      this.setIndentedLabel();
    }
    if (target && target.value !== '') {
      this.labelClass += ' active';
    }
  }
  setIndentedLabel() {
    this.labelClass += ' indented';
  }
  makeTypeClass() {
    const type = this.dense ? 'dense' : 'standard';
    return `mx-input-wrapper ${type}`;
  }
  handleFocus() {
    this.isActive = true;
    this.isFocused = true;
    this.labelClass = ' active focus';
    this.removeError();
  }
  handleBlur() {
    const workingElem = this.textarea ? this.textArea : this.textInput;
    this.isFocused = false;
    this.setLabelClass(workingElem);
  }
  focusOnInput() {
    const workingElem = this.textarea ? this.textArea : this.textInput;
    workingElem.focus();
  }
  removeError() {
    this.error = false;
    this.containerElem.classList.remove('error');
  }
  returnTaHeight() {
    return { height: this.textareaHeight };
  }
  overrideTextArea() {
    if (!this.textarea)
      return {};
    return { alignItems: 'start' }; // For icon placement.
  }
  isTextarea() {
    return this.textarea ? 'textarea' : '';
  }
  render() {
    return (h(Host, { class: "mx-input" }, h("div", { class: `${this.makeTypeClass()} ${this.isFocused ? 'focused' : ''} ${this.error ? 'error' : ''}`, ref: el => (this.containerElem = el) }, h("div", { class: `mx-input-inner-wrapper ${this.isTextarea()}`, style: this.overrideTextArea() }, this.leftIcon && (h("div", { class: "mds-input-left-content" }, h("i", { class: this.leftIcon }))), this.label && (h("label", { class: this.labelClass, onClick: () => this.focusOnInput() }, this.label)), !this.textarea ? (h("div", { class: "mds-input" }, h("input", { type: this.type, name: this.name, value: this.value, onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), ref: el => (this.textInput = el) }))) : (h("textarea", { style: this.returnTaHeight(), name: this.name, onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), ref: el => (this.textArea = el) }, this.value)), (this.rightIcon || this.error) && (h("div", { class: "mds-input-right-content" }, this.error ? h("i", { class: "ph-warning-circle" }) : h("i", { class: this.rightIcon }))))), this.assistiveText && h("div", { class: "assistive-text" }, this.assistiveText)));
  }
};

export { MxInput as mx_input };
