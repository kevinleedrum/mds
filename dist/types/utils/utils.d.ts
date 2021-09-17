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
