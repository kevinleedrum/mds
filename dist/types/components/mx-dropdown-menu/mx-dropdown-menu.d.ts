export declare class MxDropdownMenu {
  dropdownWrapper: HTMLElement;
  inputElem: HTMLInputElement;
  menu: HTMLMxMenuElement;
  ariaLabel: string;
  dense: boolean;
  /** Style as a filter dropdown with a 1dp elevation */
  elevated: boolean;
  /** Style as a filter dropdown with a "flat" border color */
  flat: boolean;
  label: string;
  /** The `id` attribute for the internal input element */
  dropdownId: string;
  name: string;
  /** Text shown to the left of the arrow */
  suffix: string;
  value: any;
  isFocused: boolean;
  onClick(e: MouseEvent): void;
  componentDidLoad(): void;
  onValueChange(): void;
  onBlur(): void;
  onFocus(): void;
  onMenuClose(): void;
  updateInputValue(): void;
  get dropdownWrapperClass(): string;
  get inputClass(): string;
  get suffixClass(): string;
  render(): any;
}
