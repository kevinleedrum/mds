export declare class MxSearch {
  /** If not provided, the `aria-label` will fallback to either the `placeholder` value or simply "Search". */
  ariaLabel: string;
  dense: boolean;
  flat: boolean;
  name: string;
  placeholder: string;
  value: string;
  get inputClass(): string;
  render(): any;
}
