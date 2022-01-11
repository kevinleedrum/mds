import { propagateDataAttributes } from '../../utils/utils';
export declare class MxSelect {
  selectElem: HTMLSelectElement;
  textArea: HTMLTextAreaElement;
  uuid: string;
  dataAttributes: {};
  /** Helpful text to show below the select */
  assistiveText: string;
  dense: boolean;
  disabled: boolean;
  /** Style with a 1dp elevation */
  elevated: boolean;
  /** Style with a "flat" border color */
  flat: boolean;
  label: string;
  floatLabel: boolean;
  ariaLabel: string;
  /** Additional classes for the select wrapper (e.g. `min-w-0` to override the default `min-width`) */
  selectClass: string;
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
  element: HTMLMxInputElement;
  componentWillRender: typeof propagateDataAttributes;
  componentDidLoad(): void;
  onValueChange(): void;
  updateSelectValue(): void;
  onFocus(): void;
  onBlur(): void;
  onInput(e: InputEvent): void;
  get hasValue(): boolean;
  get selectWrapperClass(): string;
  get selectElClass(): string;
  get labelClassNames(): string;
  get iconSuffixClass(): string;
  get iconEl(): any;
  render(): any;
}
