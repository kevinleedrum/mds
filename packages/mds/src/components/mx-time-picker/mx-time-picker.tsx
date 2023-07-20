import { Component, Host, h, Prop, State, Watch, Listen, Element } from '@stencil/core';
import { parseTimeString, propagateDataAttributes, uuidv4 } from '../../utils/utils';

const timeOptions: { hours: number; minutes: number }[] = [];
for (let i = 0; i < 24; i++) {
  timeOptions.push({ hours: i, minutes: 0 });
  timeOptions.push({ hours: i, minutes: 30 });
}

@Component({
  tag: 'mx-time-picker',
  shadow: false,
})
export class MxTimePicker {
  dataAttributes = {};

  pickerWrapper: HTMLElement;
  menuButton: HTMLElement;
  inputElem: HTMLInputElement;
  menu: HTMLMxMenuElement;
  isTimeInputSupported = false;
  uuid: string = uuidv4();

  /** Helpful text to show below the picker */
  @Prop() assistiveText: string;
  @Prop() dense = false;
  @Prop() disabled = false;
  /** The aria-label attribute for the inner input element. */
  @Prop() elAriaLabel: string;
  @Prop({ mutable: true, reflect: true }) error = false;
  @Prop() floatLabel = false;
  /** The `id` attribute for the internal input element */
  @Prop() inputId: string;
  @Prop() label: string;
  @Prop() name: string;
  /** The time in 24-hour hh:mm format */
  @Prop({ mutable: true }) value: string;

  @State() isFocused = false;
  @State() isInputDirty = false;

  @Element() element: HTMLMxTimePickerElement;

  @Listen('click')
  onClick(e: MouseEvent) {
    e.stopPropagation();
    // Resize the menu width to match the input.  This is done every click in case the input is resized after initial load.
    this.menu.style.width = this.pickerWrapper.getBoundingClientRect().width + 'px';
  }

  @Watch('value')
  onValueChange() {
    this.normalizeValue();
    this.updateInputValue();
  }

  componentWillRender = propagateDataAttributes;

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
      if (hours.length === 1) hours = '0' + hours;
      this.value = [hours, minutes].join(':');
    }
  }

  onInput(e: InputEvent) {
    if (!this.isTimeInputSupported) {
      e.stopPropagation(); // For <input type="text">, the input event will be dispatched on blur
      if (this.isFocused) this.isInputDirty = true;
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
    if (!this.inputElem.contains(document.activeElement)) this.isFocused = false;
  }

  onMenuOpen() {
    this.isFocused = true;
  }

  /** This is only called if <input type="time"> is not supported. */

  setValue({ hours, minutes }: { hours: number; minutes: number }) {
    if (this.disabled) return;
    this.error = false;
    this.value = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);
    this.updateInputValue();
    this.inputElem.dispatchEvent(new Event('input', { cancelable: true, bubbles: true }));
  }

  updateInputValue() {
    if (!this.inputElem) return;
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

  getLocalizedTimeString({ hours, minutes }: { hours: number; minutes: number }) {
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  get labelClassNames() {
    let str = 'block';
    if (this.floatLabel) {
      str += ' absolute mt-0 left-12 px-4';
      if (this.dense) str += ' dense text-4';
      if (this.isFocused || this.inputHasText) str += ' floating';
      if (this.isFocused) str += ' -ml-1'; // prevent shifting due to border-width change
    } else {
      str += ' subtitle2 mb-4 pointer-events-none';
    }
    return str;
  }

  get inputHasText() {
    // HTMLInputElement.validity.badInput is true if a partial time has been typed.
    return this.value || (this.inputElem && this.inputElem.validity.badInput);
  }

  get pickerWrapperClass() {
    let str = 'picker-wrapper w-152 flex items-center relative rounded';
    str += this.dense ? ' h-36' : ' h-48';
    str += ' border';
    if (this.disabled) str += ' disabled';
    if (this.isFocused) str += ' focused';
    return str;
  }

  get inputClass() {
    let str =
      'absolute inset-0 w-full h-full pl-12 overflow-hidden outline-none appearance-none select-none bg-transparent';
    if (this.isFocused || this.error) str += ' -ml-1'; // prevent shifting due to border-width change
    if (this.floatLabel && !this.isFocused && !this.inputHasText) str += ' opacity-0'; // Hide input placeholder while floating label is inside input
    return str;
  }

  get menuButtonClass() {
    let str = 'menu-button text-icon cursor-pointer border-0 absolute flex items-center h-full right-12 space-x-8';
    if (this.disabled) str += ' pointer-events-none';
    if (this.isFocused || this.error) str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }

  render() {
    const labelJsx = (
      <label htmlFor={this.inputId || this.uuid} class={this.labelClassNames} onClick={this.onClickLabel.bind(this)}>
        {this.label}
      </label>
    );

    return (
      <Host class={'mx-time-picker block text-3' + (this.error ? ' error' : '')}>
        {this.label && !this.floatLabel && labelJsx}

        <div ref={el => (this.pickerWrapper = el)} class={this.pickerWrapperClass}>
          <input
            aria-label={this.elAriaLabel || this.label}
            class={this.inputClass}
            id={this.inputId || this.uuid}
            name={this.name}
            onBlur={this.onBlur.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onInput={this.onInput.bind(this)}
            ref={el => (this.inputElem = el)}
            tabindex="0"
            type="time"
            disabled={this.disabled}
            {...this.dataAttributes}
          />
          {this.label && this.floatLabel && labelJsx}
          <button
            type="button"
            aria-label="Open time menu"
            ref={el => (this.menuButton = el)}
            class={this.menuButtonClass}
            data-testid="menu-button"
            disabled={this.disabled}
          >
            <i class={this.error ? 'mds-warning-circle' : 'mds-clock'}></i>
          </button>
        </div>

        {this.assistiveText && (
          <div class="caption1 mt-4 ml-16">
            <span data-testid="assistive-text" class="assistive-text">
              {this.assistiveText}
            </span>
          </div>
        )}

        <mx-menu
          ref={el => (this.menu = el)}
          placement="bottom"
          offset={[0, 1]}
          onMxClose={this.onMenuClose.bind(this)}
          onMxOpen={this.onMenuOpen.bind(this)}
        >
          {timeOptions.map(timeOption => (
            <mx-menu-item onClick={this.setValue.bind(this, timeOption)}>
              {this.getLocalizedTimeString(timeOption)}
            </mx-menu-item>
          ))}
        </mx-menu>
      </Host>
    );
  }
}
