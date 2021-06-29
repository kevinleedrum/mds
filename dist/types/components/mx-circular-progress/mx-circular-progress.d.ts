export declare class MxCircularProgress {
  delayTimeout: any;
  /** The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. */
  value: number;
  /** The value to use for the width and height */
  size: string;
  /** Delay the appearance of the indicator for this many milliseconds */
  appearDelay: number;
  element: HTMLMxLinearProgressElement;
  connectedCallback(): void;
  disconnectedCallback(): void;
  get hostStyle(): any;
  get circleStyle(): any;
  render(): any;
}
