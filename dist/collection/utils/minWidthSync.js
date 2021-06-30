const SCREENS = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
};
/** A key-value pair of breakpoint abbreviations and a boolean for whether the `min-width` meets or exceeds it.
For example, `MinWidths.md` will be true for windows that are tablet-sized or larger */
export class MinWidths {
  constructor() {
    this['sm'] = false;
    this['md'] = false;
    this['lg'] = false;
    this['xl'] = false;
    this['2xl'] = false;
  }
}
class MinWidthSync {
  constructor() {
    this.componentRefs = [];
    this.minWidths = new MinWidths();
    this.listeners = new Map();
  }
  subscribeComponent(componentRef) {
    // If this is the first subscribed component, set up listeners.
    if (this.componentRefs.length === 0)
      this.addListeners();
    this.componentRefs.push(componentRef);
    // Immediately sync minWidths to component.
    componentRef.minWidths = Object.assign({}, this.minWidths);
  }
  addListeners() {
    Object.keys(SCREENS).forEach(screen => {
      const mql = window.matchMedia(`(min-width: ${SCREENS[screen]})`);
      const listener = (e) => {
        this.minWidths[screen] = e.matches;
        // Sync minWidths to all subscribed components
        this.componentRefs.forEach(componentRef => {
          componentRef.minWidths = Object.assign({}, this.minWidths);
        });
      };
      listener(mql);
      mql.addListener(listener);
      this.listeners.set(mql, listener); // Store listener so it can be removed later
    });
  }
  unsubscribeComponent(componentRef) {
    this.componentRefs = this.componentRefs.filter(c => c !== componentRef);
    // If no more subscribed components, remove listeners to prevent memory leaks.
    if (this.componentRefs.length === 0)
      this.removeListeners();
  }
  removeListeners() {
    this.listeners.forEach((listener, mql) => {
      mql.removeListener(listener);
    });
  }
}
/** Update subscribed components' `minWidths` state object based on `min-width` media query listeners. */
export const minWidthSync = new MinWidthSync();
