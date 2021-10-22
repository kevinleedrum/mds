import { propagateDataAttributes } from '../../utils/utils';
export declare class MxCheckbox {
  dataAttributes: {};
  name: string;
  value: string;
  labelLeft: boolean;
  labelName: string;
  labelClass: string;
  /** Hide the label text visually, but still make it accessible for screen readers */
  hideLabel: boolean;
  checked: boolean;
  disabled: boolean;
  indeterminate: boolean;
  element: HTMLMxInputElement;
  componentWillRender: typeof propagateDataAttributes;
  get checkClass(): string;
  get checkLabelClass(): string;
  /** Keep checked prop in sync with input element attribute */
  onInput(e: InputEvent): void;
  render(): any;
}
