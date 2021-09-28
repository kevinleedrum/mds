import { getBounds, getCursorCoords, getScrollingParent } from './utils';

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
    const { clientX, clientY } = getCursorCoords(e);
    // If not dragging outside bounds, stop
    const bounds = getBounds(this.scrollingContainer);
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
