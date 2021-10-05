export declare function uuidv4(): string;
export declare function queryPrefersReducedMotion(): boolean;
export declare function capitalize(str: string): string;
export declare function isDateObject(val: any): boolean;
/** Converts a time string such as "15:30" or "3:30PM" into `{ hours: 15, minutes: 30 }` */
/** @returns Time object, or `null` if the string could not be parsed as a valid time */
export declare function parseTimeString(str: string): {
  hours: number;
  minutes: number;
};
/** Returns the `clientX`, `clientY`, `pageX`, `pageY` from any MouseEvent or TouchEvent. */
export declare function getCursorCoords(e: MouseEvent | TouchEvent): {
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
};
/** Returns a DOMRect for an element similar to getBoundingClientRect, however the
 * position ignores CSS transforms and accounts for scrolling. */
export declare function getPageRect(el: HTMLElement): Partial<DOMRect>;
/** Return the client boundaries of an element (or the window) */
export declare function getBounds(container: HTMLElement | Window): Partial<DOMRect>;
/** Determines whether an element needs to be scrolled into view */
export declare function isScrolledOutOfView(el: HTMLElement): boolean;
/** Get the nearest scrolling ancestor, which could be the window */
export declare function getScrollingParent(el: HTMLElement): HTMLElement | Window;
