export declare class MxToggleButton {
  btnElem: HTMLButtonElement;
  icon: string;
  selected: boolean;
  disabled: boolean;
  /** Only used inside a toggle button group */
  value: any;
  onClick(e: MouseEvent): void;
  render(): any;
}
