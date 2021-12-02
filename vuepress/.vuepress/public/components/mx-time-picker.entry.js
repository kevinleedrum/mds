import { r as registerInstance, h, e as Host, g as getElement } from './index-b3442404.js';
import { w as warningCircleSvg } from './warning-circle-7e1a7781.js';
import { u as uuidv4, p as propagateDataAttributes, b as parseTimeString } from './utils-18e3dfde.js';

const clockSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z" fill="currentColor" fill-opacity="0.87" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C12.4142 6 12.75 6.33579 12.75 6.75V11.25H17.25C17.6642 11.25 18 11.5858 18 12C18 12.4142 17.6642 12.75 17.25 12.75H12C11.5858 12.75 11.25 12.4142 11.25 12V6.75C11.25 6.33579 11.5858 6 12 6Z" fill="currentColor" fill-opacity="0.87"/>
</svg>
`;

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
    this.dense = false;
    this.disabled = false;
    this.error = false;
    this.floatLabel = false;
    this.isFocused = false;
    this.isInputDirty = false;
    this.componentWillRender = propagateDataAttributes;
  }
  onClick(e) {
    e.stopPropagation();
    // Resize the menu width to match the input.  This is done every click in case the input is resized after initial load.
    this.menu.style.width = this.pickerWrapper.getBoundingClientRect().width + 'px';
  }
  onValueChange() {
    this.updateInputValue();
  }
  componentDidLoad() {
    this.menu.anchorEl = this.pickerWrapper;
    this.menu.triggerEl = this.menuButton;
    // HTMLInputElement.type will return "text" if the "time" value is not supported (i.e. Safari <14.1)
    this.isTimeInputSupported = this.inputElem.type === 'time';
    this.updateInputValue();
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
  onMenuClose() {
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
    let str = 'picker-wrapper flex items-center relative rounded-lg';
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
    let str = 'menu-button cursor-pointer border-0 absolute flex items-center h-full right-12 space-x-8';
    if (this.disabled)
      str += ' pointer-events-none';
    if (this.isFocused || this.error)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.inputId || this.uuid, class: this.labelClassNames, onClick: this.onClickLabel.bind(this) }, this.label));
    return (h(Host, { class: 'mx-time-picker block w-152' + (this.error ? ' error' : '') }, this.label && !this.floatLabel && labelJsx, h("div", { ref: el => (this.pickerWrapper = el), class: this.pickerWrapperClass }, h("input", Object.assign({ "aria-label": this.ariaLabel || this.label, class: this.inputClass, id: this.inputId || this.uuid, name: this.name, onBlur: this.onBlur.bind(this), onFocus: this.onFocus.bind(this), onInput: this.onInput.bind(this), ref: el => (this.inputElem = el), tabindex: "0", type: "time", disabled: this.disabled, required: true }, this.dataAttributes)), this.label && this.floatLabel && labelJsx, h("button", { ref: el => (this.menuButton = el), class: this.menuButtonClass, "data-testid": "menu-button", innerHTML: this.error ? warningCircleSvg : clockSvg, disabled: this.disabled })), this.assistiveText && (h("div", { class: "caption1 mt-4 ml-16" }, h("span", { "data-testid": "assistive-text", class: "assistive-text" }, this.assistiveText))), h("mx-menu", { ref: el => (this.menu = el), placement: "bottom", offset: [0, 1], onMxClose: this.onMenuClose.bind(this), onMxOpen: this.onMenuOpen.bind(this) }, timeOptions.map(timeOption => (h("mx-menu-item", { onClick: this.setValue.bind(this, timeOption) }, this.getLocalizedTimeString(timeOption)))))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

export { MxTimePicker as mx_time_picker };
