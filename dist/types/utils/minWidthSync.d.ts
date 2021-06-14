/** A key-value pair of breakpoint abbreviations and a boolean for whether the `min-width` meets or exceeds it.
For example, `MinWidths.md` will be true for windows that are tablet-sized or larger */
export declare class MinWidths {
  'sm': boolean;
  'md': boolean;
  'lg': boolean;
  'xl': boolean;
  '2xl': boolean;
}
declare class MinWidthSync {
  componentRefs: any[];
  minWidths: MinWidths;
  listeners: Map<MediaQueryList, (this: MediaQueryList, ev: MediaQueryListEvent) => any>;
  subscribeComponent(componentRef: any): void;
  addListeners(): void;
  unsubscribeComponent(componentRef: any): void;
  removeListeners(): void;
}
/** Update subscribed components' `minWidths` state object based on `min-width` media query listeners. */
export declare const minWidthSync: MinWidthSync;
export {};
