import { EventEmitter } from '../../stencil-public-runtime';
import { IMxTabProps } from '../mx-tab/mx-tab';
export declare class MxTabs {
  /** Stretch tabs to fill the entire width */
  fill: boolean;
  /** The index of the selected tab */
  value: number;
  /** An array of objects for each tab (see Tab Properties) */
  tabs: IMxTabProps[];
  /** When true, render the tabs as an mx-select */
  renderAsSelect: boolean;
  /** Emits the newly selected tab's index as `Event.detail` */
  mxChange: EventEmitter<number>;
  element: HTMLMxTabsElement;
  connectedCallback(): void;
  animateIndicator(tabIndex: any, previousTabIndex: any): void;
  onTabsPropChange(tabs: any, previousTabs: any): void;
  disconnectedCallback(): void;
  onClick(e: MouseEvent): void;
  onInput(e: InputEvent): void;
  updateRenderAsSelect(): void;
  get gridClass(): string;
  render(): any;
}
