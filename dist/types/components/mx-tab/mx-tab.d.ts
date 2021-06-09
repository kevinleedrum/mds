export interface IMxTabProps {
  label?: string;
  ariaLabel?: string;
  icon?: string;
  selected?: boolean;
  badge?: boolean;
  badgeClass?: string;
}
export declare class MxTab implements IMxTabProps {
  btnElem: HTMLButtonElement;
  /** Label text to display */
  label: string;
  /** If you are not providing a `label`, this should be provided instead for accessibility */
  ariaLabel: string;
  /** Class name of icon to display */
  icon: string;
  /** Do not set this manually. It will be set automatically based on the `mx-tabs` `value` prop */
  selected: boolean;
  /** Display a dot badge */
  badge: boolean;
  /** Additional classes for the badge */
  badgeClass: string;
  componentDidLoad(): void;
  onClick(e: MouseEvent): void;
  get tabClass(): string;
  get badgeEl(): any;
  render(): any;
}
