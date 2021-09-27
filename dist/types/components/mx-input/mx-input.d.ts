export declare class MxInput {
  textInput: HTMLInputElement;
  textArea: HTMLTextAreaElement;
  uuid: string;
  /** The `name` attribute for the text input */
  name: string;
  /** The `id` attribute for the text input */
  inputId: string;
  /** Text for the label element */
  label: string;
  /** Placeholder text for the input.  This will be ignored if `floatLabel` is `true`. */
  placeholder: string;
  value: string;
  /** The `type` attribute for the text input */
  type: string;
  dense: boolean;
  disabled: boolean;
  readonly: boolean;
  maxlength: number;
  /** The class name of the icon to show on the left side of the input */
  leftIcon: string;
  /** The class name of the icon to show on the right side of the input */
  rightIcon: string;
  /** Text shown to the right of the input value */
  suffix: string;
  outerContainerClass: string;
  labelClass: string;
  error: boolean;
  assistiveText: string;
  floatLabel: boolean;
  /** Display a multi-line `textarea` instead of an `input` */
  textarea: boolean;
  textareaHeight: string;
  isFocused: boolean;
  characterCount: number;
  connectedCallback(): void;
  componentDidLoad(): void;
  onValueChange(): void;
  updateValue(): void;
  onFocus(): void;
  onBlur(): void;
  onInput(e: InputEvent): void;
  get workingElem(): HTMLInputElement | HTMLTextAreaElement;
  get hasValue(): boolean;
  get containerClass(): string;
  get inputClass(): string;
  get labelClassNames(): string;
  get leftIconWrapperClass(): string;
  get rightContentClass(): string;
  get textareaClass(): "" | " textarea items-start";
  render(): any;
}
