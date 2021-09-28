import { getCursorCoords } from './utils';

const SCROLL_PX = 5; // Scroll by 5px ...
const SCROLL_INTERVAL_MS = 5; // ... every 5ms

export default class DragScroller {
  scrollingContainer: HTMLElement | Window;
  interval: NodeJS.Timer;

  constructor(dragEl: HTMLElement) {
    this.scrollingContainer = getScrollingParent(dragEl);
  }

  /** Update (start/stop/speed up/slow down) auto-scrolling based on cursor coordinates */
  update(e: MouseEvent | TouchEvent) {
    clearInterval(this.interval);
    let bounds = { top: 0, right: window.innerWidth, bottom: window.innerHeight, left: 0 };
    if (this.scrollingContainer !== window) {
      bounds.top = (this.scrollingContainer as HTMLElement).clientTop;
      bounds.left = (this.scrollingContainer as HTMLElement).clientLeft;
      bounds.bottom = bounds.top + (this.scrollingContainer as HTMLElement).clientHeight;
      bounds.right = bounds.left + (this.scrollingContainer as HTMLElement).clientWidth;
    }
    const { clientX, clientY } = getCursorCoords(e);
    // If not dragging outside bounds, stop
    if (clientY >= bounds.top && clientY <= bounds.bottom && clientX >= bounds.left && clientX <= bounds.right) return;
    let directionX = 1;
    let directionY = 1;
    if (clientX < bounds.left) directionX = -1;
    if (clientY < bounds.top) directionY = -1;
    this.interval = setInterval(() => {
      window.scrollBy(SCROLL_PX * directionX, SCROLL_PX * directionY);
    }, SCROLL_INTERVAL_MS);
  }

  stop() {
    clearInterval(this.interval);
  }
}

function getScrollingParent(el: HTMLElement): HTMLElement | Window {
  if (!(el instanceof HTMLElement)) return window;
  if (isScrollable(el)) return el;
  return getScrollingParent(el.parentNode as HTMLElement);
}

function isScrollable(el: HTMLElement) {
  const computedStyle = window.getComputedStyle(el);
  const overflowRegex = /(auto|scroll)/;
  const properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.find(property => overflowRegex.test(computedStyle[property]));
}
