import { propagateDataAttributes } from '../../utils/utils';
export interface IMxInputProps {
  name: string;
  inputId: string;
  label: string;
  placeholder: string;
  value: string;
  type: string;
  dense: boolean;
  disabled: boolean;
  readonly: boolean;
  maxlength: number;
  leftIcon: string | MxInputIcon[];
  rightIcon: string | MxInputIcon[];
  suffix: string;
  outerContainerClass: string;
  labelClass: string;
  error: boolean;
  assistiveText: string;
  floatLabel: boolean;
  textarea: boolean;
  textareaHeight: string;
}
export declare type MxInputIcon = {
  /** The class name of the icon */
  icon: string;
  /** If providing an `onClick` handler, this will be used for the rendered button's aria-label */
  ariaLabel?: string;
  /** A click handler for the icon. If provided, the icon will be wrapped in a <button> element */
  onClick?: (event: MouseEvent) => void;
};
export declare class MxInput implements IMxInputProps {
  dataAttributes: {};
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
  /** The class name of the icon to show on the left side of the input, _or_ an array of objects specifying an `icon`, `ariaLabel`, and `onClick` handler */
  leftIcon: string | MxInputIcon[];
  /** The class name of the icon to show on the right side of the input, _or_ an array of objects specifying an `icon`, `ariaLabel`, and `onClick` handler */
  rightIcon: string | MxInputIcon[];
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
  element: HTMLMxInputElement;
  connectedCallback(): void;
  componentWillRender: typeof propagateDataAttributes;
  componentDidLoad(): void;
  onValueChange(): void;
  updateValue(): void;
  onFocus(): void;
  onBlur(): void;
  onContainerClick(): void;
  onInput(e: InputEvent): void;
  getIconJsx(icon: MxInputIcon): any;
  get workingElem(): HTMLInputElement | HTMLTextAreaElement;
  get hasValue(): boolean;
  get containerClass(): string;
  get inputClass(): string;
  get labelClassNames(): string;
  get leftIconWrapperClass(): string;
  get rightContentClass(): string;
  get textareaClass(): "" | " textarea items-start";
  get leftIcons(): MxInputIcon[];
  get rightIcons(): MxInputIcon[];
  render(): any;
}
