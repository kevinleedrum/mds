export declare class MxInput {
  containerElem: HTMLDivElement;
  textInput: HTMLInputElement;
  textArea: HTMLTextAreaElement;
  uuid: string;
  /** The `name` attribute for the text input */
  name: string;
  /** The `id` attribute for the text input */
  inputId: string;
  label: string;
  value: string;
  /** The `type` attribute for the text input */
  type: string;
  dense: boolean;
  disabled: boolean;
  readonly: boolean;
  leftIcon: string;
  rightIcon: string;
  isActive: boolean;
  isFocused: boolean;
  outerContainerClass: string;
  labelClass: string;
  error: boolean;
  assistiveText: string;
  /** Display a multi-line `textarea` instead of an `input` */
  textarea: boolean;
  textareaHeight: string;
  connectedCallback(): void;
  setLabelClass(target?: any): void;
  setIndentedLabel(): void;
  get containerClass(): string;
  handleFocus(): void;
  handleBlur(): void;
  focusOnInput(): void;
  removeError(): void;
  returnTaHeight(): {
    height: string;
  };
  overrideTextArea(): {
    alignItems?: undefined;
  } | {
    alignItems: string;
  };
  isTextarea(): "" | "textarea";
  render(): any;
}
