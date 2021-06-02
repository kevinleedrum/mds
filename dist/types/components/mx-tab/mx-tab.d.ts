export declare class MxTab {
  btnElem: HTMLButtonElement;
  /** Label text to display */
  label: string;
  /** If you are not providing a `label`, this should be provided instead for accessibility */
  ariaLabel: string;
  /** Class name of icon to display */
  icon: string;
  /** Only set this if you are not using the `mx-tabs` `value` prop */
  selected: boolean;
  /** Display a dot badge */
  badge: boolean;
  /** Additional classes for the badge */
  badgeClass: string;
  onClick(e: MouseEvent): void;
  get tabClass(): string;
  get badgeEl(): any;
  render(): any;
}
