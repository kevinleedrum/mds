export declare class MxLinearProgress {
  delayTimeout: any;
  /** The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. */
  value: number;
  /** Delay the appearance of the indicator for this many milliseconds */
  appearDelay: number;
  element: HTMLMxLinearProgressElement;
  connectedCallback(): void;
  disconnectedCallback(): void;
  get determinateBarStyle(): {
    transform: string;
    transition: string;
  };
  render(): any;
}
