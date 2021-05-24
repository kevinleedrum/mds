export declare type BtnType = 'contained' | 'outlined' | 'action' | 'text' | 'icon';
export declare type ButtonTypeAttribute = 'button' | 'submit' | 'reset';
export declare class MxButton {
  btnElem: HTMLButtonElement;
  anchorElem: HTMLAnchorElement;
  btnType: BtnType;
  type: ButtonTypeAttribute;
  value: string;
  disabled: boolean;
  xl: boolean;
  /** Create button as link */
  href: string;
  /** Only for link buttons */
  target: string;
  /** Sets display to flex instead of inline-flex */
  full: boolean;
  /** Show chevron icon */
  dropdown: boolean;
  /** Class name of icon */
  icon: string;
  onClick(e: MouseEvent): void;
  get buttonClass(): string;
  get chevronClass(): "ml-4" | "chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center shadow-1" | "ml-8";
  render(): any;
}
