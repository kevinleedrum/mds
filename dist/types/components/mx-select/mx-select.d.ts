export declare class MxSelect {
  selectElem: HTMLSelectElement;
  textArea: HTMLTextAreaElement;
  /** Helpful text to show below the select */
  assistiveText: string;
  dense: boolean;
  disabled: boolean;
  /** Style with a 1dp elevation */
  elevated: boolean;
  /** Style with a "flat" border color */
  flat: boolean;
  label: string;
  ariaLabel: string;
  /** The `id` attribute for the select element */
  selectId: string;
  name: string;
  /** Text shown to the left of the arrow */
  suffix: string;
  error: boolean;
  /** Additional classes for the label */
  labelClass: string;
  value: any;
  isFocused: boolean;
  element: HTMLMxSelectElement;
  componentDidLoad(): void;
  onValueChange(): void;
  updateSelectValue(): void;
  onFocus(): void;
  onBlur(): void;
  get hasValue(): boolean;
  get selectWrapperClass(): string;
  get selectClass(): string;
  get labelClassNames(): string;
  get iconSuffixClass(): string;
  get iconEl(): any;
  render(): any;
}
