// https://github.com/ionic-team/capacitor/blob/b893a57aaaf3a16e13db9c33037a12f1a5ac92e0/cli/src/util/uuid.ts
export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function queryPrefersReducedMotion(): boolean {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery || mediaQuery.matches;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isDateObject(val: any): boolean {
  if (typeof val !== 'object') return false;
  return 'getTime' in val && !isNaN(val.getTime()); // "Invalid Date" objects return NaN for getTime()
}

/** Converts a time string such as "15:30" or "3:30PM" into `{ hours: 15, minutes: 30 }` */
/** @returns Time object, or `null` if the string could not be parsed as a valid time */
export function parseTimeString(str: string): { hours: number; minutes: number } {
  if (str == null || str.trim() === '') return;
  const isExplicitAM = str.toLowerCase().includes('a');
  const isExplicitPM = str.toLowerCase().includes('p');
  let digits = str.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  if (!digits.length || digits.length > 4) return null;
  // If only 1 or 2 digits entered, assume only an hour was entered
  let hours = digits.length <= 2 ? Number(digits) : Number(digits.slice(0, -2));
  const minutes = digits.length <= 2 ? 0 : Number(digits.slice(-2));
  if (hours === 12 && isExplicitAM) hours = 0; // '12:00AM' -> 0 hours
  if (hours < 12 && isExplicitPM) hours += 12; // '2:00PM' -> 14 hours
  if (hours > 23 || minutes > 59) return null;
  return { hours, minutes };
}

/** Returns the `clientX` and `clientY` from any MouseEvent or TouchEvent. */
export function getCursorCoords(e: MouseEvent | TouchEvent): { clientX: number; clientY: number } {
  if ((e as TouchEvent).changedTouches) return (e as TouchEvent).changedTouches[0];
  else if ((e as TouchEvent).touches) return (e as TouchEvent).touches[0];
  else return e as MouseEvent;
}
