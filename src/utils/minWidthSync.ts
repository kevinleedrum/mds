const SCREENS = {
  'sm': '640px',
  'md': '720px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
};

/** A key-value pair of breakpoint abbreviations and a boolean for whether the `min-width` meets or exceeds it.
For example, `MinWidths.md` will be true for windows that are tablet-sized or larger */
export class MinWidths {
  'sm' = false;
  'md' = false;
  'lg' = false;
  'xl' = false;
  '2xl' = false;
}

class MinWidthSync {
  componentRefs: any[] = [];
  minWidths = new MinWidths();
  listeners: Map<MediaQueryList, (this: MediaQueryList, ev: MediaQueryListEvent) => any> = new Map();

  subscribeComponent(componentRef: any) {
    // If this is the first subscribed component, set up listeners.
    if (this.componentRefs.length === 0) this.addListeners();
    this.componentRefs.push(componentRef);
    // Immediately sync minWidths to component.
    componentRef.minWidths = { ...this.minWidths };
  }

  addListeners() {
    Object.keys(SCREENS).forEach(screen => {
      const mql = window.matchMedia(`(min-width: ${SCREENS[screen]})`);
      const listener = (e: MediaQueryList | MediaQueryListEvent) => {
        this.minWidths[screen] = e.matches;
        // Sync minWidths to all subscribed components
        this.componentRefs.forEach(componentRef => {
          componentRef.minWidths = { ...this.minWidths };
        });
      };
      listener(mql);
      mql.addListener(listener);
      this.listeners.set(mql, listener); // Store listener so it can be removed later
    });
  }

  unsubscribeComponent(componentRef: any) {
    this.componentRefs = this.componentRefs.filter(c => c !== componentRef);
    // If no more subscribed components, remove listeners to prevent memory leaks.
    if (this.componentRefs.length === 0) this.removeListeners();
  }

  removeListeners() {
    this.listeners.forEach((listener, mql) => {
      mql.removeListener(listener);
    });
  }
}

/** Update subscribed components' `minWidths` state object based on `min-width` media query listeners. */
export const minWidthSync = new MinWidthSync();
