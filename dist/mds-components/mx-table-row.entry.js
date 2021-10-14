import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-935f3e8d.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';
import { d as dotsSvg } from './dots-vertical-717ab421.js';
import { c as chevronSvg } from './chevron-down-6a7bb36b.js';
import { d as getScrollingParent, a as getCursorCoords, e as getBounds, g as getPageRect, f as isScrolledOutOfView } from './utils-18e3dfde.js';

const dragDotsSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 13C14.5523 13 15 12.5523 15 12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12C13 12.5523 13.4477 13 14 13Z" fill="currentColor"/>
  <path d="M14 5C14.5523 5 15 4.55228 15 4C15 3.44772 14.5523 3 14 3C13.4477 3 13 3.44772 13 4C13 4.55228 13.4477 5 14 5Z" fill="currentColor"/>
  <path d="M14 21C14.5523 21 15 20.5523 15 20C15 19.4477 14.5523 19 14 19C13.4477 19 13 19.4477 13 20C13 20.5523 13.4477 21 14 21Z" fill="currentColor"/>
  <path d="M10 13C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11C9.44772 11 9 11.4477 9 12C9 12.5523 9.44772 13 10 13Z" fill="currentColor"/>
  <path d="M10 5C10.5523 5 11 4.55228 11 4C11 3.44772 10.5523 3 10 3C9.44772 3 9 3.44772 9 4C9 4.55228 9.44772 5 10 5Z" fill="currentColor"/>
  <path d="M14 9C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7C13.4477 7 13 7.44772 13 8C13 8.55228 13.4477 9 14 9Z" fill="currentColor"/>
  <path d="M14 17C14.5523 17 15 16.5523 15 16C15 15.4477 14.5523 15 14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17Z" fill="currentColor"/>
  <path d="M10 9C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7C9.44772 7 9 7.44772 9 8C9 8.55228 9.44772 9 10 9Z" fill="currentColor"/>
  <path d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17Z" fill="currentColor"/>
  <path d="M10 21C10.5523 21 11 20.5523 11 20C11 19.4477 10.5523 19 10 19C9.44772 19 9 19.4477 9 20C9 20.5523 9.44772 21 10 21Z" fill="currentColor"/>
</svg>
`;

const SCROLL_PX = 5; // Scroll by 5px ...
const SCROLL_INTERVAL_MS = 5; // ... every 5ms
class DragScroller {
  constructor(dragEl) {
    this.scrollingContainer = getScrollingParent(dragEl);
  }
  /** Start/stop auto-scrolling based on cursor coordinates */
  update(e) {
    clearInterval(this.interval);
    const { clientX, clientY } = getCursorCoords(e);
    const bounds = getBounds(this.scrollingContainer);
    // If not dragging outside bounds, stop
    if (clientY >= bounds.top && clientY <= bounds.bottom && clientX >= bounds.left && clientX <= bounds.right)
      return;
    const directionX = clientX < bounds.left ? -1 : 1;
    const directionY = clientY < bounds.top ? -1 : 1;
    this.interval = setInterval(window.scrollBy, SCROLL_INTERVAL_MS, SCROLL_PX * directionX, SCROLL_PX * directionY);
  }
  stop() {
    clearInterval(this.interval);
  }
}

const DEFAULT_MAX_HEIGHT = 'calc(3.25rem + 1px)'; // 52px + 1px bottom border
const MxTableRow = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxCheck = createEvent(this, "mxCheck", 7);
    this.mxRowDragStart = createEvent(this, "mxRowDragStart", 7);
    this.mxRowDragEnd = createEvent(this, "mxRowDragEnd", 7);
    this.mxDragKeyDown = createEvent(this, "mxDragKeyDown", 7);
    this.dragOrigin = { x: 0, y: 0 };
    /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
    this.actions = [];
    this.checked = false;
    this.minWidths = new MinWidths();
    this.checkable = false;
    this.checkOnRowClick = false;
    this.isDraggable = false;
    this.isDragging = false;
    this.isMobileExpanded = false;
    this.isMobileCollapsing = false;
  }
  /** Apply a CSS transform to translate the row by `x` and `y` pixels */
  async translateRow(x, y) {
    const transform = `translate3d(${x}px, ${y}px, 0)`;
    if (this.dragShadowEl)
      this.dragShadowEl.style.transform = transform;
    Array.from(this.element.children).forEach((child) => (child.style.transform = transform));
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
    if (this.actions.some(action => !action.value))
      throw new Error('Table row actions must have a value property!');
  }
  componentWillRender() {
    // Render collapsed mobile row
    if (!this.minWidths.sm && !this.isMobileExpanded)
      this.element.style.maxHeight = this.getCollapsedHeight();
    // Determine `checkable` and `checked` by pulling props from parent table.
    // This avoids having to manually pass these as props when using mx-table-row inside the table's
    // default slot.
    const table = this.element.closest('mx-table');
    this.checkable = table && table.checkable;
    this.isDraggable = table && table.draggableRows;
    if (this.checkable && this.rowId == null)
      throw new Error('Checkable rows require either a getRowId prop on the table, or a rowId on the row!');
    if (this.checkable)
      this.checkOnRowClick = table.checkOnRowClick;
  }
  componentDidRender() {
    // Anchor the action menu to the action menu button.
    // We cannot use `componentDidLoad` for this because these elements sometimes get destroyed
    // during render when the viewport is resized across breakpoints.
    if (this.actions.length > 1 && this.actionMenu && this.actionMenuButton)
      this.actionMenu.anchorEl = this.actionMenuButton;
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  onClick(e) {
    if (!!e.target.closest('button, input, mx-menu'))
      return; // Ignore clicks on buttons, etc.
    if (!this.minWidths.sm) {
      // Collapse/expand row when the exposed column cell is clicked
      const exposedCell = this.getExposedCell();
      if (!exposedCell)
        return;
      if (e.target.closest('mx-table-cell') === exposedCell)
        this.accordion();
    }
    else if (this.checkable && this.checkOnRowClick) {
      // (Un)check row
      this.checked = !this.checked;
      this.mxCheck.emit({ rowId: this.rowId, checked: this.checked });
    }
  }
  onKeyboardHandleKeyDown(e) {
    // Start keyboard dragging on Space/Enter if not already dragging
    if (!this.isDragging && [' ', 'Enter'].includes(e.key))
      this.startDragging(e);
  }
  startDragging(e) {
    e.stopPropagation();
    e.preventDefault();
    this.isDragging = true;
    if (e.type !== 'keydown') {
      // If using a mouse or touch, set drag origin to current cursor coordinates
      const { pageX, pageY } = getCursorCoords(e);
      this.dragOrigin.x = pageX;
      this.dragOrigin.y = pageY;
    }
    else {
      // If using a keyboard, set drag origin to the row's coordinates on the page
      const { top, left } = getPageRect(this.element.children[0]);
      this.dragOrigin.x = left;
      this.dragOrigin.y = top;
    }
    this.element.classList.add('pointer-events-none');
    this.createDragShadowEl();
    for (let i = 0; i < this.element.children.length; i++) {
      const child = this.element.children[i];
      child.style.zIndex = '9999';
    }
    this.addDragListeners(e);
    this.mxRowDragStart.emit({ isKeyboard: e.type === 'keydown' });
  }
  addDragListeners(startEvent) {
    /** Move all the row children and dragShadowEl with the mouse cursor (via CSS transform) */
    const onMouseMove = (e) => {
      requestAnimationFrame(() => {
        if (!this.isDragging)
          return;
        const { pageX, pageY } = getCursorCoords(e);
        const x = pageX - this.dragOrigin.x;
        const y = pageY - this.dragOrigin.y;
        this.translateRow(x, y);
        this.dragScroller && this.dragScroller.update(e);
      });
    };
    /** Stop dragging when the mouse button is released or touch ends */
    const onMouseUp = (e) => {
      e.stopPropagation();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
      document.removeEventListener('touchcancel', onMouseUp);
      this.dragScroller.stop();
      this.dragScroller = null;
      this.stopDragging(e.type === 'touchcancel');
    };
    /** Move row or cancel dragging based on keypress */
    const onKeyDown = (e) => {
      if ([' ', 'Enter'].includes(e.key)) {
        document.removeEventListener('keydown', onKeyDown);
        this.stopDragging(true);
      }
      else if (['Escape', 'Tab'].includes(e.key)) {
        document.removeEventListener('keydown', onKeyDown);
        this.stopDragging(true, true);
      }
      else if (e.key.includes('Arrow')) {
        this.mxDragKeyDown.emit(e.key);
      }
      else {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
    };
    // Add the above listeners based on the type of input device being used
    if (startEvent.type === 'keydown') {
      document.addEventListener('keydown', onKeyDown);
    }
    else if (startEvent.type === 'touchstart') {
      this.dragScroller = new DragScroller(this.element);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);
      document.addEventListener('touchcancel', onMouseUp);
    }
    else {
      this.dragScroller = new DragScroller(this.element);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }
  /** Clear transforms and remove dragShadowEl */
  stopDragging(isKeyboard = false, isCancel = false) {
    this.isDragging = false;
    this.element.classList.remove('drag-row', 'pointer-events-none');
    if (this.dragShadowEl)
      this.dragShadowEl.remove();
    this.dragShadowEl = undefined;
    for (let i = 0; i < this.element.children.length; i++) {
      const child = this.element.children[i];
      child.style.transform = '';
      child.style.zIndex = '';
    }
    this.mxRowDragEnd.emit({ isKeyboard, isCancel });
  }
  /** When dragging, add an element behind the row children that has a box shadow.
   * This is simpler than trying to change the row to `display: flex` to add a box shadow to it. */
  createDragShadowEl() {
    this.dragShadowEl = document.createElement('div');
    this.dragShadowEl.classList.add('absolute', 'w-full', 'shadow-24');
    this.dragShadowEl.style.zIndex = '9998';
    this.dragShadowEl.style.height = this.element.children[0].offsetHeight + 'px';
    this.dragShadowEl.style.top = this.element.children[0].offsetTop + 'px';
    this.dragShadowEl.style.left = this.element.children[0].offsetLeft + 'px';
    this.element.parentNode.insertBefore(this.dragShadowEl, this.element);
  }
  accordion() {
    if (this.minWidths.sm)
      return;
    this.element.classList.add('overflow-hidden');
    this.isMobileExpanded ? this.collapse() : this.expand();
  }
  async collapse() {
    if (!this.isMobileExpanded)
      return;
    this.isMobileCollapsing = true;
    this.element.style.maxHeight = this.element.scrollHeight + 'px';
    requestAnimationFrame(() => {
      this.element.style.maxHeight = this.getCollapsedHeight();
    });
  }
  async expand() {
    if (this.isMobileExpanded)
      return;
    this.element.style.maxHeight = this.element.scrollHeight + 'px';
    this.isMobileExpanded = true;
    requestAnimationFrame(() => {
      this.element.style.maxHeight = this.element.scrollHeight + 'px';
    });
  }
  async focusDragHandle() {
    if (this.keyboardDragHandle)
      this.keyboardDragHandle.focus();
  }
  onTransitionEnd(e) {
    if (e.target === this.element) {
      this.element.classList.remove('overflow-hidden');
      if (this.isMobileCollapsing) {
        this.isMobileExpanded = false;
        this.isMobileCollapsing = false;
      }
      // Remove explicit max-height after expanding to avoid issues with window resizing, etc.
      this.element.style.maxHeight = '';
    }
    // When keyboard dragging, scroll the first element into view if moved out of bounds
    if (e.target === this.element.children[0] && isScrolledOutOfView(this.element.children[0]))
      this.element.children[0].scrollIntoView();
  }
  onCheckboxInput(e) {
    this.mxCheck.emit({ rowId: this.rowId, checked: e.target.checked });
  }
  getExposedCell() {
    const cells = Array.from(this.element.querySelectorAll('mx-table-cell')) || [];
    return cells.find((cell) => cell.isExposedMobileColumn);
  }
  getCollapsedHeight() {
    const exposedCell = this.getExposedCell();
    if (!exposedCell)
      return DEFAULT_MAX_HEIGHT;
    return exposedCell.offsetHeight + 1 + 'px';
  }
  get rowClass() {
    let str = 'mx-table-row';
    str += this.minWidths.sm ? ' contents' : ' grid';
    if (this.checkable)
      str += ' checkable-row';
    if (this.checkable && this.checkOnRowClick)
      str += ' cursor-pointer';
    if (!this.minWidths.sm && !this.isMobileExpanded)
      str += ' mobile-collapsed';
    return str;
  }
  get rowStyle() {
    if (this.minWidths.sm)
      return {};
    return {
      gridTemplateColumns: 'minmax(0, min-content) minmax(0, min-content) minmax(0, auto) minmax(0, min-content)',
      maxHeight: '',
    };
  }
  render() {
    return (h(Host, { role: "row", class: this.rowClass, style: this.rowStyle, onClick: this.onClick.bind(this), onTransitionEnd: this.onTransitionEnd.bind(this) }, this.checkable && (h("div", { class: "flex items-center pr-4 col-start-1 row-start-1 sm:row-start-auto sm:col-start-auto", onClick: this.accordion.bind(this) }, h("mx-checkbox", { ref: el => (this.checkbox = el), checked: this.checked, onInput: this.onCheckboxInput.bind(this), onClick: e => e.stopPropagation(), "label-name": "Select row", "hide-label": true }))), this.isDraggable && (h("div", { class: "flex items-center col-start-2 row-start-1 sm:row-start-auto sm:col-start-auto cursor-move", "data-testid": "drag-handle", onMouseDown: this.startDragging.bind(this), onTouchStart: this.startDragging.bind(this) }, h("span", { "aria-label": "Press Space or Enter to move this row", ref: el => (this.keyboardDragHandle = el), tabindex: "0", class: 'pointer-events-none' + (this.checkable ? ' mx-8' : ''), innerHTML: dragDotsSvg, onKeyDown: this.onKeyboardHandleKeyDown.bind(this) }), this.isDragging && (h("p", { class: "sr-only", role: "alert" }, "Use the arrow keys to move the row up and down. Press Space or Enter to accept. Press Escape to cancel.")))), h("slot", null), !this.checkable && !this.minWidths.sm && h("div", { class: "row-start-1 col-start-1 w-0" }), !this.isDraggable && !this.minWidths.sm && h("div", { class: "row-start-1 col-start-2 w-0" }), !this.minWidths.sm && (h("button", { class: "flex border-0 items-center justify-end px-16 row-start-1", "aria-hidden": "true", onClick: this.accordion.bind(this), onMouseDown: e => e.preventDefault() /* Do not focus on click */ }, h("span", { class: 'mobile-row-chevron text-1 transform' +
        (this.isMobileExpanded && !this.isMobileCollapsing ? ' rotate-180' : ''), innerHTML: chevronSvg }))), this.actions.length === 1 && (h("div", { class: "action-cell flex items-center p-16 sm:p-0 justify-end col-span-4 sm:col-span-1" }, h("mx-button", Object.assign({ "data-testid": "action-button", "btn-type": "text" }, this.actions[0]), this.actions[0].value))), this.actions.length > 1 && (h("div", { class: "action-cell flex items-center p-0 justify-end col-span-4 sm:col-span-1" }, h("mx-icon-button", { ref: el => (this.actionMenuButton = el), innerHTML: dotsSvg }), h("mx-menu", { "data-testid": "action-menu", ref: el => (this.actionMenu = el) }, this.actions.map(action => (h("mx-menu-item", Object.assign({}, action), action.value))))))));
  }
  get element() { return getElement(this); }
};

export { MxTableRow as mx_table_row };
