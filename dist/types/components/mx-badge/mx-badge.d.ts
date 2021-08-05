export declare class MxBadge {
  childElement: HTMLElement;
  private element;
  /** The value to display inside the badge */
  value: any;
  /** Make the corners a little more square (best for standalone text) */
  squared: boolean;
  /** Render as a small indicator shape with no inner text.  If the prop is present, but no string value is passed, the shape will default to `circle`. */
  indicator: boolean | 'square' | 'triangle-up' | 'hexagon' | 'triangle-down' | 'star';
  /** Additional classes to add to the badge itself */
  badgeClass: string;
  /** Class name of icon */
  icon: string;
  /** Offset badge inward by this many pixels (e.g. 10 for icon buttons) */
  offset: number;
  /** Anchor the badge to the bottom of the wrapped content */
  bottom: boolean;
  /** Anchor the badge to the left of the wrapped content */
  left: boolean;
  get indicatorSvg(): string;
  get isStandalone(): boolean;
  get isIconOnly(): boolean;
  get badgeClassNames(): string;
  render(): any;
}
