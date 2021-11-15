export declare type TransitionOptions = {
  /** Property to animate */
  property: string;
  startValue: string;
  endValue: string;
  timing: string;
};
export declare const fadeIn: (el: HTMLElement, duration?: number) => Promise<void>;
export declare const fadeOut: (el: HTMLElement, duration?: number) => Promise<void>;
/** Fade in and scale from 80% to 100% (Material Fade) */
export declare const fadeScaleIn: (el: HTMLElement, duration?: number, transformOrigin?: string) => Promise<void>;
/** Fade and slide in */
export declare const fadeSlideIn: (el: HTMLElement, duration?: number, fromRight?: boolean) => Promise<void>;
/** Fade and slide out */
export declare const fadeSlideOut: (el: HTMLElement, duration?: number, toRight?: boolean) => Promise<void>;
