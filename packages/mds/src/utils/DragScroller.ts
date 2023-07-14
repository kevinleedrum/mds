import { getBounds, getCursorCoords, getScrollingParent } from './utils';

const SCROLL_PX = 5; // Scroll by 5px ...
const SCROLL_INTERVAL_MS = 5; // ... every 5ms

export default class DragScroller {
  scrollingContainer: HTMLElement | Window;
  interval: NodeJS.Timer;

  constructor(dragEl: HTMLElement) {
    this.scrollingContainer = getScrollingParent(dragEl);
  }

  /** Start/stop auto-scrolling based on cursor coordinates */
  update(e: MouseEvent | TouchEvent) {
    clearInterval(this.interval);
    const { clientX, clientY } = getCursorCoords(e);
    const bounds = getBounds(this.scrollingContainer);
    // If not dragging outside bounds, stop
    if (clientY >= bounds.top && clientY <= bounds.bottom && clientX >= bounds.left && clientX <= bounds.right) return;
    const directionX = clientX < bounds.left ? -1 : 1;
    const directionY = clientY < bounds.top ? -1 : 1;
    this.interval = setInterval(window.scrollBy, SCROLL_INTERVAL_MS, SCROLL_PX * directionX, SCROLL_PX * directionY);
  }

  stop() {
    clearInterval(this.interval);
  }
}
