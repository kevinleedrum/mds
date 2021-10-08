import { propagateDataAttributes } from '../../utils/utils';
export declare class MxToggleButton {
  btnElem: HTMLButtonElement;
  dataAttributes: {};
  icon: string;
  selected: boolean;
  disabled: boolean;
  ariaLabel: string;
  /** Only used inside a toggle button group */
  value: any;
  element: HTMLMxToggleButtonElement;
  componentWillRender: typeof propagateDataAttributes;
  onClick(e: MouseEvent): void;
  render(): any;
}
