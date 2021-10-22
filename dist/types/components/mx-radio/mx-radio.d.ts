import { propagateDataAttributes } from '../../utils/utils';
export declare class MxRadio {
  dataAttributes: {};
  name: string;
  value: string;
  labelName: string;
  checked: boolean;
  element: HTMLMxInputElement;
  componentWillRender: typeof propagateDataAttributes;
  /** Keep checked prop in sync with input element attribute */
  onInput(e: InputEvent): void;
  render(): any;
}
