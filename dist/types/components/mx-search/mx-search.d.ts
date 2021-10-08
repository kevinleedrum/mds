import { propagateDataAttributes } from '../../utils/utils';
export declare class MxSearch {
  dataAttributes: {};
  /** If not provided, the `aria-label` will fallback to either the `placeholder` value or simply "Search". */
  ariaLabel: string;
  dense: boolean;
  flat: boolean;
  name: string;
  placeholder: string;
  value: string;
  element: HTMLMxSearchElement;
  componentWillRender: typeof propagateDataAttributes;
  get inputClass(): string;
  render(): any;
}
