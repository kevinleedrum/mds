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
  return 'getTime' in val;
}

export { capitalize as c, isDateObject as i, queryPrefersReducedMotion as q, uuidv4 as u };
