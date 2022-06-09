import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-1ef0feab.js';

const MxToggleButtonGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxInput = createEvent(this, "mxInput", 7);
    /** Set to `true` to prevent deselecting once a selection has been made. */
    this.required = false;
  }
  onValueChange() {
    this.updateChildButtons();
  }
  connectedCallback() {
    this.updateChildButtons();
  }
  onToggleButtonClick(e) {
    const toggleButton = e.target.closest('mx-toggle-button');
    if (!toggleButton || toggleButton.disabled)
      return;
    this.toggleValue(toggleButton.value);
    this.mxInput.emit(this.value);
  }
  toggleValue(value) {
    if (this.value !== value)
      this.value = value;
    else if (!this.required)
      this.value = null;
  }
  updateChildButtons() {
    const buttons = this.element.querySelectorAll('mx-toggle-button');
    buttons.forEach(button => (button.selected = button.value === this.value));
  }
  render() {
    return (h(Host, { class: "inline-flex", role: "radiogroup" }, h("slot", null)));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

export { MxToggleButtonGroup as mx_toggle_button_group };
