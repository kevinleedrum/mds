import { propagateDataAttributes } from '../../utils/utils';
export declare class MxSwitch {
  dataAttributes: {};
  name: string;
  value: string;
  labelName: string;
  checked: boolean;
  element: HTMLMxInputElement;
  componentWillRender: typeof propagateDataAttributes;
  render(): any;
}
