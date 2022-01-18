import { MinWidths } from '../../utils/minWidthSync';
export declare class MxFab {
  buttonElem: HTMLElement;
  /** Class name of icon */
  icon: string;
  /** Style as a secondary action */
  secondary: boolean;
  /** The aria-label attribute for the inner button element. */
  elAriaLabel: string;
  value: string;
  minWidths: MinWidths;
  isExtended: boolean;
  element: HTMLMxFabElement;
  connectedCallback(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  onClick(e: MouseEvent): void;
  get buttonClass(): string;
  get slotWrapperClass(): string;
  render(): any;
}
