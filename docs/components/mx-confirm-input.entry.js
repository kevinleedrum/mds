import { r as registerInstance, h, e as Host } from './index-f6edd80d.js';

const MxConfirmInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.isEmittingEventAfterConfirm = false;
    this.type = 'text';
    this.dense = false;
    this.disabled = false;
    this.readonly = false;
    this.outerContainerClass = '';
    this.labelClass = '';
    this.error = false;
    this.floatLabel = false;
    this.textarea = false;
    this.textareaHeight = '250px';
    this.hideCharacterCount = false;
    this.isFocused = false;
    this.isHovered = false;
  }
  onValueChange() {
    this.previousValue = this.value;
    this.mxInput.value = this.value;
  }
  connectedCallback() {
    this.previousValue = this.value;
  }
  get rightIcons() {
    if (this.isFocused) {
      return [
        { icon: 'mds-x', ariaLabel: 'Cancel', onClick: this.onCancel.bind(this) },
        { icon: 'mds-check', ariaLabel: 'Okay', onClick: this.onConfirm.bind(this) },
      ];
    }
    const canEdit = this.value != null && this.value !== '' && !this.readonly && !this.disabled;
    const canHover = window.matchMedia('(hover: hover)');
    if ((this.isHovered || !canHover.matches) && canEdit)
      return 'mds-edit';
  }
  onCancel(e) {
    if (e)
      e.stopPropagation(); // Do not focus input when clicking cancel button
    if (!this.mxInput)
      return;
    this.mxInput.value = this.previousValue;
    if (document.activeElement && this.mxInput.contains(document.activeElement))
      document.activeElement.blur();
  }
  onConfirm(e) {
    if (e)
      e.stopPropagation(); // Do not focus input when clicking confirm button
    this.value = this.mxInput.value;
    if (this.mxInput) {
      const input = this.mxInput.querySelector('input');
      this.isEmittingEventAfterConfirm = true; // Stop blocking input events temporarily
      input && input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    }
    if (document.activeElement)
      document.activeElement.blur();
  }
  onFocusin() {
    this.isFocused = true;
  }
  async onFocusout() {
    await new Promise(requestAnimationFrame); // Wait a tick in case confirm button was clicked
    if (document.activeElement && this.mxInput.contains(document.activeElement))
      return;
    this.isFocused = false;
    this.onCancel();
  }
  onMouseEnter() {
    this.isHovered = true;
  }
  onMouseLeave() {
    this.isHovered = false;
  }
  onInput(e) {
    if (!this.isEmittingEventAfterConfirm) {
      e.stopPropagation(); // Only emit input event after confirmation
    }
    else {
      this.isEmittingEventAfterConfirm = false;
    }
  }
  onKeyDown(e) {
    if (e.key === 'Escape')
      this.onCancel();
    if (e.target.closest('button'))
      return; // Pressing Enter while Cancel button is focused should not confirm
    if (e.key === 'Enter')
      this.onConfirm();
  }
  render() {
    return (h(Host, { class: 'mx-confirm-input block' + (this.value != null && this.value !== '' ? ' has-value' : '') }, h("mx-input", { ref: el => (this.mxInput = el), name: this.name, inputId: this.inputId, label: this.label, placeholder: this.placeholder, value: this.value, type: this.type, dense: this.dense, disabled: this.disabled, readonly: this.readonly, maxlength: this.maxlength, leftIcon: this.leftIcon, suffix: this.suffix, outerContainerClass: this.outerContainerClass, labelClass: this.labelClass, error: this.error, assistiveText: this.assistiveText, floatLabel: this.floatLabel, rightIcon: this.rightIcons, elAriaLabel: this.elAriaLabel, hideCharacterCount: this.hideCharacterCount, onFocusin: this.onFocusin.bind(this), onFocusout: this.onFocusout.bind(this), onInput: this.onInput.bind(this), onKeyDown: this.onKeyDown.bind(this), onMouseEnter: this.onMouseEnter.bind(this), onMouseLeave: this.onMouseLeave.bind(this) })));
  }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

export { MxConfirmInput as mx_confirm_input };
