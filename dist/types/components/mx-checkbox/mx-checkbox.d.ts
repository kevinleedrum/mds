export declare class MxCheckbox {
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
  get checkClass(): string;
  get checkLabelClass(): string;
  render(): any;
}
