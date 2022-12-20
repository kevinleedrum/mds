import { r as registerInstance, h, e as Host, g as getElement } from './index-7d7e62d7.js';
import { u as uuidv4, p as propagateDataAttributes, b as parseTimeString } from './utils-eee50014.js';

const timeOptions = [];
for (let i = 0; i < 24; i++) {
  timeOptions.push({ hours: i, minutes: 0 });
  timeOptions.push({ hours: i, minutes: 30 });
}
const MxTimePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dataAttributes = {};
    this.isTimeInputSupported = false;
    this.uuid = uuidv4();
    this.componentWillRender = propagateDataAttributes;
    this.assistiveText = undefined;
    this.dense = false;
    this.disabled = false;
    this.elAriaLabel = undefined;
    this.error = false;
    this.floatLabel = false;
    this.inputId = undefined;
    this.label = undefined;
    this.name = undefined;
    this.value = undefined;
    this.isFocused = false;
    this.isInputDirty = false;
  }
  onClick(e) {
    e.stopPropagation();
    // Resize the menu width to match the input.  This is done every click in case the input is resized after initial load.
    this.menu.style.width = this.pickerWrapper.getBoundingClientRect().width + 'px';
  }
  onValueChange() {
    this.normalizeValue();
    this.updateInputValue();
  }
  componentWillLoad() {
    this.normalizeValue();
  }
  componentDidLoad() {
    this.menu.anchorEl = this.pickerWrapper;
    this.menu.triggerEl = this.menuButton;
    // HTMLInputElement.type will return "text" if the "time" value is not supported (i.e. Safari <14.1)
    this.isTimeInputSupported = this.inputElem.type === 'time';
    this.updateInputValue();
  }
  normalizeValue() {
    // If HH:MM:ss.mmm value is passed, change it to just HH:MM
    if (this.value && /\d\d:\d\d:\d\d/.test(this.value)) {
      let [hours] = this.value.split(':');
      const [, minutes] = this.value.split(':');
      if (this.value.toUpperCase().includes('PM')) {
        hours = (Number(hours) + 12).toString();
      }
      if (hours.length === 1)
        hours = '0' + hours;
      this.value = [hours, minutes].join(':');
    }
  }
  onInput(e) {
    if (!this.isTimeInputSupported) {
      e.stopPropagation(); // For <input type="text">, the input event will be dispatched on blur
      if (this.isFocused)
        this.isInputDirty = true;
    }
  }
  onBlur() {
    if (!this.menu || !this.menu.isOpen) {
      // Style as focused/active while menu is open
      this.isFocused = false;
    }
    if (!this.isTimeInputSupported && this.isInputDirty) {
      const time = parseTimeString(this.inputElem.value);
      if (time === null) {
        // Invalid time entered into <input type=text>
        this.error = true;
        return;
      }
      this.setValue(time);
      this.updateInputValue();
    }
  }
  onFocus() {
    this.isFocused = true;
    this.error = false;
    this.isInputDirty = false;
  }
  /** Focus the input when clicking the floating label.
   * Using `pointer-events: none` on the label could cause the user to unknowingly click on
   * the minutes/AM/PM entry, which would be annoying. */
  onClickLabel() {
    this.inputElem.focus();
  }
  onMenuClose(e) {
    e.stopPropagation();
    if (!this.inputElem.contains(document.activeElement))
      this.isFocused = false;
  }
  onMenuOpen() {
    this.isFocused = true;
  }
  /** This is only called if <input type="time"> is not supported. */
  setValue({ hours, minutes }) {
    if (this.disabled)
      return;
    this.error = false;
    this.value = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);
    this.updateInputValue();
    this.inputElem.dispatchEvent(new Event('input', { cancelable: true, bubbles: true }));
  }
  updateInputValue() {
    if (!this.inputElem)
      return;
    if (this.value == null) {
      this.inputElem.value = '';
      return;
    }
    this.inputElem.value = this.value;
    if (!this.isTimeInputSupported) {
      this.inputElem.dispatchEvent(new Event('input', { cancelable: true, bubbles: true }));
      // If time input is not supported, format text input value for locale
      const [hours, minutes] = this.value.split(':').map(Number);
      this.inputElem.value = this.getLocalizedTimeString({ hours, minutes });
    }
  }
  getLocalizedTimeString({ hours, minutes }) {
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  get labelClassNames() {
    let str = 'block';
    if (this.floatLabel) {
      str += ' absolute mt-0 left-12 px-4';
      if (this.dense)
        str += ' dense text-4';
      if (this.isFocused || this.inputHasText)
        str += ' floating';
      if (this.isFocused)
        str += ' -ml-1'; // prevent shifting due to border-width change
    }
    else {
      str += ' subtitle2 mb-4 pointer-events-none';
    }
    return str;
  }
  get inputHasText() {
    // HTMLInputElement.validity.badInput is true if a partial time has been typed.
    return this.value || (this.inputElem && this.inputElem.validity.badInput);
  }
  get pickerWrapperClass() {
    let str = 'picker-wrapper w-152 flex items-center relative rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    str += this.error || this.isFocused ? ' border-2' : ' border';
    if (this.disabled)
      str += ' disabled';
    if (this.isFocused)
      str += ' focused';
    return str;
  }
  get inputClass() {
    let str = 'absolute inset-0 w-full h-full pl-12 overflow-hidden outline-none appearance-none select-none bg-transparent';
    if (this.isFocused || this.error)
      str += ' -ml-1'; // prevent shifting due to border-width change
    if (this.floatLabel && !this.isFocused && !this.inputHasText)
      str += ' opacity-0'; // Hide input placeholder while floating label is inside input
    return str;
  }
  get menuButtonClass() {
    let str = 'menu-button text-icon cursor-pointer border-0 absolute flex items-center h-full right-12 space-x-8';
    if (this.disabled)
      str += ' pointer-events-none';
    if (this.isFocused || this.error)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.inputId || this.uuid, class: this.labelClassNames, onClick: this.onClickLabel.bind(this) }, this.label));
    return (h(Host, { class: 'mx-time-picker block text-3' + (this.error ? ' error' : '') }, this.label && !this.floatLabel && labelJsx, h("div", { ref: el => (this.pickerWrapper = el), class: this.pickerWrapperClass }, h("input", Object.assign({ "aria-label": this.elAriaLabel || this.label, class: this.inputClass, id: this.inputId || this.uuid, name: this.name, onBlur: this.onBlur.bind(this), onFocus: this.onFocus.bind(this), onInput: this.onInput.bind(this), ref: el => (this.inputElem = el), tabindex: "0", type: "time", disabled: this.disabled }, this.dataAttributes)), this.label && this.floatLabel && labelJsx, h("button", { type: "button", "aria-label": "Open time menu", ref: el => (this.menuButton = el), class: this.menuButtonClass, "data-testid": "menu-button", disabled: this.disabled }, h("i", { class: this.error ? 'mds-warning-circle' : 'mds-clock' }))), this.assistiveText && (h("div", { class: "caption1 mt-4 ml-16" }, h("span", { "data-testid": "assistive-text", class: "assistive-text" }, this.assistiveText))), h("mx-menu", { ref: el => (this.menu = el), placement: "bottom", offset: [0, 1], onMxClose: this.onMenuClose.bind(this), onMxOpen: this.onMenuOpen.bind(this) }, timeOptions.map(timeOption => (h("mx-menu-item", { onClick: this.setValue.bind(this, timeOption) }, this.getLocalizedTimeString(timeOption)))))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

export { MxTimePicker as mx_time_picker };
