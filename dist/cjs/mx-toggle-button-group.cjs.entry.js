'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7252b109.js');

const MxToggleButtonGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxInput = index.createEvent(this, "mxInput", 7);
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
    if (!toggleButton)
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
    return (index.h(index.Host, { class: "inline-flex", role: "radiogroup" }, index.h("slot", null)));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

exports.mx_toggle_button_group = MxToggleButtonGroup;
