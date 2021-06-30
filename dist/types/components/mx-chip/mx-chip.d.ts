import { EventEmitter } from '../../stencil-public-runtime';
export declare class MxChip {
  chipElem: HTMLElement;
  outlined: boolean;
  disabled: boolean;
  /** Display a checkmark on the left side of the chip */
  selected: boolean;
  /** Use the pointer cursor and show a ripple animation.
   * This does not need to be explicitly set for `choice` or `filter` chips. */
  clickable: boolean;
  /** Show the remove icon on the right */
  removable: boolean;
  /** URL of image to show on the left */
  avatarUrl: string;
  /** Class name of icon to show on the left */
  icon: string;
  /** The value associated with a choice chip (used with `mx-chip-group`) */
  value: any;
  /** Style as a choice chip when selected.
   * This is set internally when the chip is wrapped with an `mx-chip-group`. */
  choice: boolean;
  /** Style as a filter chip when selected */
  filter: boolean;
  /** Emitted when the remove icon is clicked */
  mxRemove: EventEmitter<MouseEvent>;
  onClick(e: MouseEvent): void;
  onKeyDown(e: KeyboardEvent): void;
  onRemove(e: MouseEvent): void;
  get hasLeftIcon(): string | boolean;
  get isClickable(): boolean;
  get chipClass(): string;
  get ariaRole(): "button" | "checkbox" | "radio";
  get avatarStyle(): {
    background: string;
    backgroundSize: string;
  };
  render(): any;
}
