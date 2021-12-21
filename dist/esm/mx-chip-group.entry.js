import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-de1da671.js';

const MxChipGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxInput = createEvent(this, "mxInput", 7);
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
    return (h(Host, { class: "inline-flex", role: "radio-group" }, h("slot", null)));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

export { MxChipGroup as mx_chip_group };
