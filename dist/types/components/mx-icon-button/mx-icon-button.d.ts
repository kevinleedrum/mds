export declare class MxIconButton {
  btnElem: HTMLButtonElement;
  anchorElem: HTMLAnchorElement;
  type: 'button' | 'submit' | 'reset';
  value: string;
  disabled: boolean;
  /** An aria-label is highly recommended */
  ariaLabel: string;
  /** Show downward chevron icon */
  chevronDown: boolean;
  /** Show left-pointing chevron icon */
  chevronLeft: boolean;
  /** Show right-pointing chevron icon */
  chevronRight: boolean;
  /** Class name of icon (for icon font) */
  icon: string;
  onClick(e: MouseEvent): void;
  get isChevron(): boolean;
  render(): any;
}
