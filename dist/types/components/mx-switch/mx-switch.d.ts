import { propagateDataAttributes } from '../../utils/utils';
export declare class MxSwitch {
  dataAttributes: {};
  name: string;
  value: string;
  labelClass: string;
  labelName: string;
  checked: boolean;
  disabled: boolean;
  element: HTMLMxInputElement;
  componentWillRender: typeof propagateDataAttributes;
  /** Keep checked prop in sync with input element attribute */
  onInput(e: InputEvent): void;
  get labelClassNames(): string;
  render(): any;
}
