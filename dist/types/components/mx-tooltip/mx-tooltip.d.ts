import { PopoverInstance, PopoverPlacement } from '../../utils/popover';
export declare class MxTooltip {
  openTimeout: any;
  popoverInstance: PopoverInstance;
  tooltipElem: HTMLElement;
  uuid: string;
  /** Delay showing the tooltip for this many milliseconds */
  appearDelay: number;
  /** Increase the padding, add a shadow, and make the corners less rounded (typically for multi-line text) */
  extended: boolean;
  /** Invert the default colors (i.e. dark text on a light background) */
  inverted: boolean;
  /** The maximum width of the tooltip (e.g. '20rem') */
  maxWidth: string;
  /** This is typically updated automatically based on events, but may be changed programmatically if necessary. */
  isOpen: boolean;
  /** The preferred placement of the tooltip, relative to the anchor element. */
  placement: PopoverPlacement;
  /** Additional classes to add to the tooltip. */
  tooltipClass: string;
  /** The text to show inside the tooltip.  Alternatively, use the `tooltip` slot. */
  value: string;
  element: HTMLMxTooltipElement;
  onIsOpenChange(): void;
  componentDidLoad(): void;
  show(): Promise<void>;
  hide(): Promise<void>;
  get tooltipClasses(): string;
  render(): any;
}
