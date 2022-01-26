import { propagateDataAttributes } from '../../utils/utils';
export declare class MxTimePicker {
  dataAttributes: {};
  pickerWrapper: HTMLElement;
  menuButton: HTMLElement;
  inputElem: HTMLInputElement;
  menu: HTMLMxMenuElement;
  isTimeInputSupported: boolean;
  uuid: string;
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
  name: string;
  /** The time in 24-hour hh:mm format */
  value: string;
  isFocused: boolean;
  isInputDirty: boolean;
  element: HTMLMxTimePickerElement;
  onClick(e: MouseEvent): void;
  onValueChange(): void;
  componentWillRender: typeof propagateDataAttributes;
  componentDidLoad(): void;
  onInput(e: InputEvent): void;
  onBlur(): void;
  onFocus(): void;
  /** Focus the input when clicking the floating label.
   * Using `pointer-events: none` on the label could cause the user to unknowingly click on
   * the minutes/AM/PM entry, which would be annoying. */
  onClickLabel(): void;
  onMenuClose(e: any): void;
  onMenuOpen(): void;
  /** This is only called if <input type="time"> is not supported. */
  setValue({ hours, minutes }: {
    hours: number;
    minutes: number;
  }): void;
  updateInputValue(): void;
  getLocalizedTimeString({ hours, minutes }: {
    hours: number;
    minutes: number;
  }): string;
  get labelClassNames(): string;
  get inputHasText(): string | boolean;
  get pickerWrapperClass(): string;
  get inputClass(): string;
  get menuButtonClass(): string;
  render(): any;
}
