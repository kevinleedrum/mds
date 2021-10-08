import { propagateDataAttributes } from '../../utils/utils';
export declare class MxRadio {
  dataAttributes: {};
  name: string;
  value: string;
  labelName: string;
  checked: boolean;
  element: HTMLMxInputElement;
  componentWillRender: typeof propagateDataAttributes;
  render(): any;
}
