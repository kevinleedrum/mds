'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-e2d1a458.js');

const MxChipGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxInput = index.createEvent(this, "mxInput", 7);
  }
  onValueChange() {
    this.updateChildChips();
  }
  connectedCallback() {
    this.updateChildChips();
  }
  onChipClick(e) {
    const chip = e.target.closest('mx-chip');
    if (!chip)
      return;
    this.toggleValue(chip.value);
    this.mxInput.emit(this.value);
  }
  toggleValue(value) {
    if (this.value !== value)
      this.value = value;
    else
      this.value = null;
  }
  updateChildChips() {
    const chips = this.element.querySelectorAll('mx-chip');
    chips.forEach(chip => {
      chip.choice = true;
      chip.clickable = true;
      chip.selected = chip.value === this.value;
    });
  }
  render() {
    return (index.h(index.Host, { class: "inline-flex", role: "radio-group" }, index.h("slot", null)));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

exports.mx_chip_group = MxChipGroup;
