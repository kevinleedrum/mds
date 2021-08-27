import { MinWidths } from '../../utils/minWidthSync';
import { ResizeObserver } from '@juggle/resize-observer';
import { IMxButtonProps } from '../mx-button/mx-button';
export interface IPageHeaderButton extends IMxButtonProps {
  label: string;
}
export declare class MxPageHeader {
  buttonRow: HTMLElement;
  hasTabs: boolean;
  menuButton: HTMLMxIconButtonElement;
  resizeObserver: ResizeObserver;
  tabSlot: HTMLElement;
  tertiaryButtonWrapper: HTMLElement;
  tertiaryMenu: HTMLMxMenuElement;
  /** An array of prop objects for each button.  Use the `label` property to specify the button's inner text. */
  buttons: IPageHeaderButton[];
  /** The URL for the previous page link */
  previousPageUrl: string;
  /** The text to display for the previous page link */
  previousPageTitle: string;
  /** When set to true, the Page Header will use the themed background pattern. */
  pattern: boolean;
  minWidths: MinWidths;
  renderTertiaryButtonAsMenu: boolean;
  element: HTMLMxPageHeaderElement;
  componentWillLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  updateRenderTertiaryButtonAsMenu(): void;
  componentDidLoad(): void;
  get hostClass(): string;
  get headingClass(): string;
  get buttonsJsx(): any;
  render(): any;
}
