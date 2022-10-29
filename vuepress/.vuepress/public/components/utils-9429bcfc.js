// https://github.com/ionic-team/capacitor/blob/b893a57aaaf3a16e13db9c33037a12f1a5ac92e0/cli/src/util/uuid.ts
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
function queryPrefersReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery || mediaQuery.matches;
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function isDateObject(val) {
  if (typeof val !== 'object')
    return false;
  return 'getTime' in val && !isNaN(val.getTime()); // "Invalid Date" objects return NaN for getTime()
}
/** Converts a time string such as "15:30" or "3:30PM" into `{ hours: 15, minutes: 30 }` */
/** @returns Time object, or `null` if the string could not be parsed as a valid time */
function parseTimeString(str) {
  if (str == null || str.trim() === '')
    return;
  const isExplicitAM = str.toLowerCase().includes('a');
  const isExplicitPM = str.toLowerCase().includes('p');
  const digits = str.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  if (!digits.length || digits.length > 4)
    return null;
  // If only 1 or 2 digits entered, assume only an hour was entered
  let hours = digits.length <= 2 ? Number(digits) : Number(digits.slice(0, -2));
  const minutes = digits.length <= 2 ? 0 : Number(digits.slice(-2));
  if (hours === 12 && isExplicitAM)
    hours = 0; // '12:00AM' -> 0 hours
  if (hours < 12 && isExplicitPM)
    hours += 12; // '2:00PM' -> 14 hours
  if (hours > 23 || minutes > 59)
    return null;
  return { hours, minutes };
}
/** Returns the `clientX`, `clientY`, `pageX`, `pageY` from any MouseEvent or TouchEvent. */
function getCursorCoords(e) {
  if (e.changedTouches)
    return e.changedTouches[0];
  else if (e.touches)
    return e.touches[0];
  else
    return e;
}
/** Returns a DOMRect for an element similar to getBoundingClientRect, however the
 * position ignores CSS transforms and accounts for scrolling. */
function getPageRect(el) {
  const { height, width } = el.getBoundingClientRect();
  let top = 0;
  let left = 0;
  do {
    top += el.offsetTop;
    left += el.offsetLeft;
    el = el.offsetParent;
  } while (el);
  return { top, left, width, height, bottom: top + height, right: left + width };
}
/** Return the client boundaries of an element (or the window) */
function getBounds(container) {
  if (container === window) {
    return { top: 0, right: window.innerWidth, bottom: window.innerHeight, left: 0 };
  }
  return container.getBoundingClientRect();
}
/** Determines whether an element needs to be scrolled into view */
function isScrolledOutOfView(el) {
  const bounds = el.getBoundingClientRect(); // getBoundingClientRect accounts for CSS translate
  const scrollBounds = getBounds(getScrollingParent(el));
  if (bounds.top < scrollBounds.top)
    return true;
  if (bounds.bottom > scrollBounds.bottom)
    return true;
  if (bounds.left < scrollBounds.left)
    return true;
  if (bounds.left > scrollBounds.right)
    return true; // It's okay if the right edge is out of bounds
  return false;
}
/** Get the nearest scrolling ancestor, which could be the window */
function getScrollingParent(el) {
  if (!(el instanceof HTMLElement))
    return window;
  if (isScrollable(el))
    return el;
  return getScrollingParent(el.parentNode);
}
function isScrollable(el) {
  const computedStyle = window.getComputedStyle(el);
  const overflowRegex = /(auto|scroll)/;
  const properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.find(property => overflowRegex.test(computedStyle[property]));
}
/** Remove data attributes from the host element, and store them in this.dataAttributes,
 * so they can be applied to the native element in the render function. */
function propagateDataAttributes() {
  console.log(this);
  Array.from(this.element.attributes).forEach((attribute) => {
    if (!/^data-/.test(attribute.name))
      return;
    this.element.removeAttribute(attribute.name);
    this.dataAttributes[attribute.name] = attribute.value;
  });
}

export { getCursorCoords as a, parseTimeString as b, capitalize as c, getScrollingParent as d, getBounds as e, isScrolledOutOfView as f, getPageRect as g, isDateObject as i, propagateDataAttributes as p, queryPrefersReducedMotion as q, uuidv4 as u };
