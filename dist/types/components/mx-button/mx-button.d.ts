import { propagateDataAttributes } from '../../utils/utils';
export declare type BtnType = 'contained' | 'outlined' | 'action' | 'text';
export declare type ButtonTypeAttribute = 'button' | 'submit' | 'reset';
export interface IMxButtonProps {
  btnType?: BtnType;
  type?: ButtonTypeAttribute;
  value?: string;
  formaction?: string;
  disabled?: boolean;
  xl?: boolean;
  href?: string;
  target?: string;
  full?: boolean;
  dropdown?: boolean;
}
export declare class MxButton implements IMxButtonProps {
  btnElem: HTMLButtonElement;
  anchorElem: HTMLAnchorElement;
  dataAttributes: {};
  btnType: BtnType;
  type: ButtonTypeAttribute;
  value: string;
  formaction: string;
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
  element: HTMLMxInputElement;
  componentWillRender: typeof propagateDataAttributes;
  onClick(e: MouseEvent): void;
  get buttonClass(): string;
  render(): any;
}
