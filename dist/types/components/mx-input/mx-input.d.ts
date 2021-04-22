export declare class MxInput {
  containerElem: HTMLDivElement;
  textInput: HTMLInputElement;
  textArea: HTMLTextAreaElement;
  name: string;
  label: string;
  value: string;
  type: string;
  dense: boolean;
  leftIcon: string;
  rightIcon: string;
  isActive: boolean;
  isFocused: boolean;
  outerContainerClass: string;
  labelClass: string;
  error: boolean;
  assistiveText: string;
  textarea: boolean;
  textareaHeight: string;
  connectedCallback(): void;
  setLabelClass(target?: any): void;
  setIndentedLabel(): void;
  makeTypeClass(): string;
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
