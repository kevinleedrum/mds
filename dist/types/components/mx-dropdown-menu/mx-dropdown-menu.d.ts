export declare class MxDropdownMenu {
  dropdownWrapper: HTMLElement;
  inputElem: HTMLInputElement;
  menu: HTMLMxMenuElement;
  /** The aria-label attribute for the inner input element. */
  elAriaLabel: string;
  disabled: boolean;
  readonly: boolean;
  dense: boolean;
  /** Style as a filter dropdown with a 1dp elevation */
  elevated: boolean;
  /** Style as a filter dropdown with a "flat" border color */
  flat: boolean;
  label: string;
  /** Additional classes for the dropdown wrapper (e.g. `min-w-0` to override the default `min-width`) */
  dropdownClass: string;
  /** The `id` attribute for the internal input element */
  dropdownId: string;
  name: string;
  /** Text shown to the left of the arrow */
  suffix: string;
  value: any;
  isFocused: boolean;
  onClick(e: MouseEvent): Promise<void>;
  componentDidLoad(): void;
  onValueChange(): void;
  attachMenu(): void;
  onBlur(): void;
  onFocus(): void;
  onMenuClose(e: any): void;
  updateInputValue(): void;
  get dropdownWrapperClass(): string;
  get inputClass(): string;
  get suffixClass(): string;
  render(): any;
}
