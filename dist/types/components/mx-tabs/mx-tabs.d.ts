import { EventEmitter } from '../../stencil-public-runtime';
export declare class MxTabs {
  /** Stretch tabs to fill the entire width */
  fill: boolean;
  /** The index of the selected tab (not needed if manually setting the `selected` prop on each tab) */
  value: number;
  /** Emits the clicked tab's index as `Event.detail` */
  mxChange: EventEmitter<number>;
  element: HTMLMxTabsElement;
  onKeyUp(e: KeyboardEvent): void;
  onMouseUp(e: MouseEvent): void;
  onClick(e: MouseEvent): void;
  onValueChange(): void;
  connectedCallback(): void;
  setSelectedTab(): void;
  animateIndicator(e: MouseEvent | KeyboardEvent, newSelectedTabIndex?: number): void;
  get gridClass(): string;
  render(): any;
}
