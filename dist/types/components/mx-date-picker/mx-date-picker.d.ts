import { PopoverInstance } from '../../utils/popover';
import { propagateDataAttributes } from '../../utils/utils';
export declare class MxDatePicker {
  uuid: string;
  dataAttributes: {};
  datepicker: any;
  pickerWrapper: HTMLElement;
  calendarButton: HTMLElement;
  inputEl: HTMLInputElement;
  popoverInstance: PopoverInstance;
  isDateInputSupported: boolean;
  /** Set to false to prevent entering a date after today */
  allowFuture: boolean;
  /** Set to false to prevent entering a date before today */
  allowPast: boolean;
  /** Helpful text to show below the picker */
  assistiveText: string;
  dense: boolean;
  disabled: boolean;
  /** The aria-label attribute for the inner input element. */
  elAriaLabel: string;
  error: boolean;
  floatLabel: boolean;
  /** The `id` attribute for the internal input element */
  inputId: string;
  label: string;
  /** The earliest date to accept (in YYYY-MM-DD format) */
  min: string;
  /** The latest date to accept (in YYYY-MM-DD format) */
  max: string;
  name: string;
  /** The selected date in YYYY-MM-DD format */
  value: string;
  isFocused: boolean;
  isInputDirty: boolean;
  element: HTMLMxDatePickerElement;
  onValueChange(): void;
  /** Open/close the calendar.  We're not using the js-datepicker's popover behavior because its
   * placement is buggy. */
  onClick(e: MouseEvent): void;
  connectedCallback(): void;
  componentWillRender: typeof propagateDataAttributes;
  componentDidLoad(): void;
  onBlur(): void;
  onFocus(e: FocusEvent): void;
  onInput(e: InputEvent): void;
  onKeyDown(e: KeyboardEvent): void;
  onClickLabel(): void;
  openCalendar(): Promise<void>;
  repositionCalendar(): void;
  closeCalendar(): Promise<void>;
  get minDate(): Date;
  get maxDate(): Date;
  get minValue(): string;
  get maxValue(): string;
  get isCalendarOpen(): boolean;
  get labelClassNames(): string;
  get inputHasText(): string | boolean;
  get pickerWrapperClass(): string;
  get inputClass(): string;
  get calendarButtonClass(): string;
  render(): any;
}
