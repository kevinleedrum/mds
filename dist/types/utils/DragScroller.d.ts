/// <reference types="node" />
export default class DragScroller {
  scrollingContainer: HTMLElement | Window;
  interval: NodeJS.Timer;
  constructor(dragEl: HTMLElement);
  /** Start/stop auto-scrolling based on cursor coordinates */
  update(e: MouseEvent | TouchEvent): void;
  stop(): void;
}
