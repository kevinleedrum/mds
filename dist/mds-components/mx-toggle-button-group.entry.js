import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-3267cb6d.js';

const MxToggleButtonGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxInput = createEvent(this, "mxInput", 7);
  }
  onValueChange() {
    this.updateChildButtons();
  }
  connectedCallback() {
    this.updateChildButtons();
  }
  onToggleButtonClick(e) {
    const toggleButton = e.target.closest('mx-toggle-button');
    if (!toggleButton)
      return;
    this.toggleValue(toggleButton.value);
    this.mxInput.emit(this.value);
  }
  toggleValue(value) {
    if (this.value !== value)
      this.value = value;
    else
      this.value = null;
  }
  updateChildButtons() {
    const buttons = this.element.querySelectorAll('mx-toggle-button');
    buttons.forEach(button => (button.selected = button.value === this.value));
  }
  render() {
    return (h(Host, { class: "inline-flex", role: "radio-group" }, h("slot", null)));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

export { MxToggleButtonGroup as mx_toggle_button_group };
