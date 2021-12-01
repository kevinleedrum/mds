export declare class MxBanner {
  hasActions: boolean;
  hasImage: boolean;
  bannerEl: HTMLElement;
  error: boolean;
  /** Toggles the banner with a transition. */
  isOpen: boolean;
  /** When set, `position: sticky` will be applied to the banner. */
  sticky: boolean;
  isVisible: boolean;
  element: HTMLMxBannerElement;
  connectedCallback(): void;
  componentWillRender(): void;
  transitionBanner(): Promise<void>;
  get hostClass(): string;
  get messageClass(): string;
  render(): any;
}
