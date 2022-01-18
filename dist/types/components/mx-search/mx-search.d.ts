import { propagateDataAttributes } from '../../utils/utils';
export declare class MxSearch {
  dataAttributes: {};
  inputEl: HTMLInputElement;
  dense: boolean;
  /** The `aria-label` attribute for the `<input>` element. If not provided, the `aria-label` will fallback to either the `placeholder` value or simply "Search". */
  elAriaLabel: string;
  flat: boolean;
  name: string;
  placeholder: string;
  /** Set to `false` to hide the clear button. */
  showClear: boolean;
  value: string;
  element: HTMLMxSearchElement;
  componentWillRender: typeof propagateDataAttributes;
  onInput(e: InputEvent): void;
  onClear(): void;
  get inputClass(): string;
  get clearButtonClass(): string;
  render(): any;
}
