import { Component, Host, h, Prop, Watch, State, Element, Listen } from '@stencil/core';
import datepicker from 'js-datepicker';
import calendarSvg from '../../assets/svg/calendar.svg';
import warningCircleSvg from '../../assets/svg/warning-circle.svg';
import { createPopover, PopoverInstance } from '../../utils/popover';
import { isDateObject, propagateDataAttributes, uuidv4 } from '../../utils/utils';
import { fadeIn, fadeOut } from '../../utils/transitions';

const yyyymmdd = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

@Component({
  tag: 'mx-date-picker',
  shadow: false,
})
export class MxDatePicker {
  uuid: string = uuidv4();
  dataAttributes = {};
  datepicker;
  pickerWrapper: HTMLElement;
  calendarButton: HTMLElement;
  inputEl: HTMLInputElement;
  popoverInstance: PopoverInstance;
  isDateInputSupported: boolean = false;

  @Prop() ariaLabel: string;
  /** Helpful text to show below the picker */
  @Prop() assistiveText: string;
  @Prop() dense: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop({ mutable: true }) error: boolean = false;
  @Prop() floatLabel: boolean = false;
  /** The `id` attribute for the internal input element */
  @Prop() inputId: string;
  @Prop() label: string;
  @Prop() name: string;
  /** The selected date in YYYY-MM-DD format */
  @Prop({ mutable: true }) value: string;

  @State() isFocused: boolean = false;
  @State() isInputDirty: boolean = false;

  @Element() element: HTMLMxDatePickerElement;

  @Watch('value')
  onValueChange() {
    if (this.value && !yyyymmdd.test(this.value)) return;
    this.datepicker.setDate(this.value ? new Date(this.value + 'T00:00:00') : undefined, true);
  }

  /** Open/close the calendar.  We're not using the js-datepicker's popover behavior because its
   * placement is buggy. */
  @Listen('click', { target: 'document', capture: true })
  onClick(e: MouseEvent) {
    const calendarButtonWasClicked = this.calendarButton && this.calendarButton.contains(e.target as Node);
    if (!this.isCalendarOpen && calendarButtonWasClicked) {
      // Open closed calendar when the button is clicked
      this.openCalendar();
      e.preventDefault();
    } else if (this.isCalendarOpen && !this.datepicker.calendarContainer.contains(e.target as Node)) {
      // Close calendar when a click occurs outside the calendar
      this.closeCalendar();
    }
  }

  connectedCallback() {
    const validDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    if (this.value && !validDate.test(this.value)) {
      throw new Error('The date picker value must be in YYYY-MM-DD format.');
    }
  }

  componentWillRender = propagateDataAttributes;

  componentDidLoad() {
    this.isDateInputSupported = this.inputEl.type === 'date';
    this.datepicker = datepicker(this.inputEl, {
      alwaysShow: true,
      customDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      overlayButton: 'Confirm',
      overlayPlaceholder: 'Year (YYYY)',
      dateSelected: this.value ? new Date(this.value + 'T00:00:00') : undefined,
      formatter: (input: HTMLInputElement, date: Date) => {
        if (this.inputEl.contains(document.activeElement)) return; // Do not reformat while typing in date
        input.value = date.toISOString().split('T')[0];
        this.value = input.value;
        input.dispatchEvent(new Event('input', { cancelable: true, bubbles: true }));
        if (!this.isDateInputSupported) input.value = date.toLocaleDateString();
      },
      onSelect: () => {
        this.error = false;
        this.closeCalendar();
      },
    });
    this.datepicker.calendarContainer.classList.add('hidden');
    // HACK: Fix js-datepicker moving the calendar when interacting with the year/month selection.
    this.datepicker.calendarContainer.addEventListener('click', this.repositionCalendar.bind(this));
    this.datepicker.calendarContainer.addEventListener('focusin', this.repositionCalendar.bind(this));
    this.datepicker.calendarContainer.addEventListener('mousedown', this.repositionCalendar.bind(this));
  }

  onBlur() {
    if (!this.isCalendarOpen) {
      // Style as focused/active while calendar is open
      this.isFocused = false;
    }
    if (!this.isDateInputSupported && this.isInputDirty) {
      if (this.disabled) return;
      this.error = false;
      let date: Date;
      if (!this.inputEl.value) this.value = null;
      else {
        date = new Date(Date.parse(this.inputEl.value));
        if (!isDateObject(date)) {
          // Invalid date entered into <input type=text>
          this.error = true;
          return;
        }
        this.value = date.toISOString().split('T')[0];
      }
      this.inputEl.value = this.value;
      this.inputEl.dispatchEvent(new Event('input', { cancelable: true, bubbles: true }));
      if (date) this.inputEl.value = date.toLocaleDateString();
    }
  }

  onFocus(e: FocusEvent) {
    this.isFocused = true;
    this.error = false;
    this.isInputDirty = false;
    e.stopPropagation();
  }

  onInput(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    if (value && !yyyymmdd.test(value)) e.stopPropagation();
    else if (this.datepicker && this.value !== value) {
      this.value = value;
      this.datepicker.setDate(value ? new Date(value + 'T00:00:00') : undefined);
    }
    if (!this.isDateInputSupported && this.isFocused) this.isInputDirty = true;
  }

  onKeyDown(e: KeyboardEvent) {
    // Prevent the browser from opening its calendar when pressing Space or Enter
    if (e.key === ' ' || e.key === 'Enter') e.preventDefault();
  }

  onClickLabel() {
    this.inputEl.focus();
  }

  async openCalendar() {
    this.isFocused = true;
    this.datepicker.navigate(this.datepicker.dateSelected || new Date());
    this.datepicker.calendarContainer.classList.remove('hidden');
    this.popoverInstance = await createPopover(this.calendarButton, this.datepicker.calendarContainer, 'bottom', [
      -4,
      0,
    ]);
    await fadeIn(this.datepicker.calendarContainer);
  }

  repositionCalendar() {
    requestAnimationFrame(this.popoverInstance.forceUpdate);
  }

  async closeCalendar() {
    await fadeOut(this.datepicker.calendarContainer);
    this.datepicker.calendarContainer.classList.add('hidden');
    if (!this.inputEl.contains(document.activeElement)) this.isFocused = false;
    if (!this.popoverInstance) return;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
  }

  get isCalendarOpen(): boolean {
    return !this.datepicker.calendarContainer.classList.contains('hidden');
  }

  get labelClassNames() {
    let str = 'block';
    if (this.floatLabel) {
      str += ' absolute mt-0 left-12 px-4 min-w-1/2';
      if (this.dense) str += ' dense text-4';
      if (this.isFocused || this.inputHasText) str += ' floating';
      if (this.isFocused) str += ' -ml-1'; // prevent shifting due to border-width change
    } else {
      str += ' subtitle2 mb-4 pointer-events-none';
    }
    return str;
  }

  get inputHasText() {
    if (!this.inputEl) return false;
    // HTMLInputElement.validity.badInput is true if a partial date has been typed.
    return this.inputEl.value || this.inputEl.validity.badInput;
  }

  get pickerWrapperClass() {
    let str = 'picker-wrapper w-320 flex items-center relative rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    str += this.error || this.isFocused ? ' border-2' : ' border';
    if (this.disabled) str += ' disabled';
    if (this.isFocused) str += ' focused';
    return str;
  }

  get inputClass() {
    let str =
      'absolute inset-0 w-full h-full pl-12 overflow-hidden outline-none appearance-none select-none bg-transparent';
    if (this.isFocused || this.error) str += ' -ml-1'; // prevent shifting due to border-width change
    // Hide input placeholder while floating label is inside input
    if (this.floatLabel && !this.isFocused && !this.inputHasText) str += ' opacity-0';
    // HACK: Safari confusingly uses today's date as the placeholder, even when you've entered a partial date,
    // and it also does not like changing the placeholder text color, so we lower the opacity instead so the user
    // has a visual indication that the input does not actually have a value.
    else if (isSafari && !this.inputHasText) str += ' opacity-50';
    return str;
  }

  get calendarButtonClass() {
    let str = 'calendar-button cursor-pointer border-0 absolute flex items-center h-full right-12 space-x-8';
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
      <Host class={'mx-date-picker block' + (this.error ? ' error' : '')}>
        {this.label && !this.floatLabel && labelJsx}

        <div ref={el => (this.pickerWrapper = el)} class={this.pickerWrapperClass}>
          <input
            ref={el => (this.inputEl = el)}
            aria-label={this.ariaLabel || this.label}
            class={this.inputClass}
            disabled={this.disabled}
            id={this.inputId || this.uuid}
            name={this.name}
            type="date"
            required
            onBlur={this.onBlur.bind(this)}
            onClick={e => e.preventDefault() /* Prevent browser's native calender */}
            onKeyDown={this.onKeyDown.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onFocusin={e => e.stopPropagation() /* Prevent js-datepicker popover behavior */}
            onInput={this.onInput.bind(this)}
            {...this.dataAttributes}
          />
          {this.label && this.floatLabel && labelJsx}
          <button
            ref={el => (this.calendarButton = el)}
            class={this.calendarButtonClass}
            data-testid="calendar-button"
            innerHTML={this.error ? warningCircleSvg : calendarSvg}
            disabled={this.disabled}
          ></button>
        </div>

        {this.assistiveText && (
          <div class="caption1 mt-4 ml-16">
            <span data-testid="assistive-text" class="assistive-text">
              {this.assistiveText}
            </span>
          </div>
        )}
      </Host>
    );
  }
}
