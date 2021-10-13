'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c246f020.js');
const dotsVertical = require('./dots-vertical-8fe5a309.js');
const arrowTriangleDown = require('./arrow-triangle-down-a4cc75c3.js');
const minWidthSync = require('./minWidthSync-93e92215.js');
const chevronDown = require('./chevron-down-696a796a.js');
const utils = require('./utils-1f7ef40d.js');

const MxLinearProgress = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. */
    this.value = null;
    /** Delay the appearance of the indicator for this many milliseconds */
    this.appearDelay = 0;
  }
  connectedCallback() {
    if (!this.appearDelay)
      return;
    // Hide indicator until appearDelay duration has passed
    this.element.classList.remove('block');
    this.element.classList.add('hidden');
    this.delayTimeout = setTimeout(() => {
      this.element.classList.remove('hidden');
      this.element.classList.add('block');
    }, this.appearDelay);
  }
  disconnectedCallback() {
    clearTimeout(this.delayTimeout);
  }
  get determinateBarStyle() {
    return {
      transform: `translateX(${this.value - 100}%)`,
      transition: 'transform 0.4s linear',
    };
  }
  render() {
    return (index.h(index.Host, { class: "mx-linear-progress block h-4 w-full rounded-sm overflow-hidden pointer-events-none", role: "progressbar", "aria-valuenow": this.value != null ? Math.round(this.value) : null, "aria-valuemin": this.value != null ? 0 : null, "aria-valuemax": this.value != null ? 100 : null }, index.h("div", { class: "relative h-full" }, this.value != null ? (
    // Determinate
    index.h("div", { "data-testid": "determinate", class: "fill h-4 absolute inset-0 rounded-sm", style: this.determinateBarStyle })) : (
    // Indeterminate has two animated bars with nested animations
    [
      index.h("div", { "data-testid": "indeterminate1", class: "indeterminate1 absolute h-full w-full" }, index.h("div", { class: "fill absolute w-full h-full rounded-sm" })),
      index.h("div", { "data-testid": "indeterminate2", class: "indeterminate2 absolute h-full w-full" }, index.h("div", { class: "fill absolute w-full h-full rounded-sm" })),
    ]))));
  }
  get element() { return index.getElement(this); }
};

const chevronLeftSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 7.41L10.42 12L15 16.59L13.59 18L7.59 12L13.59 6L15 7.41Z" fill="currentColor"/>
</svg>
`;

const chevronRightSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.58997 16.59L13.17 12L8.58997 7.41L9.99997 6L16 12L9.99997 18L8.58997 16.59Z" fill="currentColor"/>
</svg>
`;

const pageFirstSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.41 16.59L13.82 12L18.41 7.41L17 6L11 12L17 18L18.41 16.59ZM6 6H8V18H6V6Z" fill="currentColor" />
</svg>
`;

const pageLastSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.58997 7.41L10.18 12L5.58997 16.59L6.99997 18L13 12L6.99997 6L5.58997 7.41ZM16 6H18V18H16V6Z" fill="currentColor"/>
</svg>
`;

const MxPagination = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxPageChange = index.createEvent(this, "mxPageChange", 7);
    this.hasStatus = false;
    this.page = 1;
    this.rowsPerPageOptions = [10, 25, 50, 100];
    this.rowsPerPage = 100;
    /** Reduce the UI to only a page */
    this.simple = false;
    /** Disable the page buttons (i.e. when loading results) */
    this.disabled = false;
    /** Disable the next page button (i.e. when the last page was loaded from an API) */
    this.disableNextPage = false;
    this.hideRowsPerPage = false;
    this.moveStatusToBottom = false;
    /** Whether the component width (not viewport width) is >= 320px */
    this.isXSmallMinWidth = false;
    /** Whether the component width (not viewport width) is >= 640px */
    this.isSmallMinWidth = false;
  }
  componentWillRender() {
    this.hasStatus = !!this.element.querySelector('[slot="status"]');
  }
  componentDidLoad() {
    if (this.rowsMenu && this.rowsMenuAnchor)
      this.rowsMenu.anchorEl = this.rowsMenuAnchor;
    this.resizeObserver = new dotsVertical.ResizeObserver(() => this.updateResponsiveElements());
    this.resizeObserver.observe(this.element);
    // Wait one tick for layout shifts in order to detect overflow correctly.
    requestAnimationFrame(this.updateResponsiveElements.bind(this));
  }
  updateResponsiveElements() {
    if (!this.paginationWrapper)
      return;
    let totalNeededWidth = Array.from(this.paginationWrapper.children).reduce((total, child) => {
      return total + child.scrollWidth;
    }, 0);
    if (this.hideRowsPerPage && this.rowsPerPageWrapper)
      totalNeededWidth += this.rowsPerPageWrapper.scrollWidth;
    const excessWidth = totalNeededWidth - this.element.offsetWidth;
    this.hideRowsPerPage = excessWidth > 0;
    this.moveStatusToBottom = excessWidth > this.rowsPerPageWrapper.scrollWidth;
    this.isXSmallMinWidth = this.element.offsetWidth >= 320;
    this.isSmallMinWidth = this.element.offsetWidth >= 640;
  }
  onClickFirstPage() {
    this.mxPageChange.emit({ page: 1, rowsPerPage: this.rowsPerPage });
  }
  onClickPreviousPage() {
    this.mxPageChange.emit({ page: this.page - 1, rowsPerPage: this.rowsPerPage });
  }
  onClickNextPage() {
    this.mxPageChange.emit({ page: this.page + 1, rowsPerPage: this.rowsPerPage });
  }
  onClickLastPage() {
    this.mxPageChange.emit({ page: this.lastPage, rowsPerPage: this.rowsPerPage });
  }
  onChangeRowsPerPage(rowsPerPage) {
    // Return to first page whenever the results-per-page changes
    this.mxPageChange.emit({ page: 1, rowsPerPage });
  }
  get lastPage() {
    if (this.totalRows === 0)
      return 1;
    if (this.totalRows == null)
      return null;
    return Math.ceil(this.totalRows / this.rowsPerPage);
  }
  get currentRange() {
    let start = this.rowsPerPage * (this.page - 1) + 1;
    let end = Math.min(this.totalRows, start + this.rowsPerPage - 1);
    return start + '–' + end;
  }
  get rowRangeClass() {
    let str = 'text-center flex-shrink min-w-0';
    str += this.isSmallMinWidth ? ' px-24' : ' px-16';
    if (!this.isXSmallMinWidth)
      str += ' whitespace-normal';
    return str;
  }
  get paginationWrapperClass() {
    let str = 'flex relative';
    if (this.moveStatusToBottom) {
      str += ' flex-col-reverse items-end';
    }
    else {
      str += ' items-center';
      str += this.hasStatus ? ' justify-between' : ' justify-end';
    }
    return str;
  }
  render() {
    return (index.h(index.Host, { class: "mx-pagination relative block text-4 whitespace-nowrap select-none" }, !this.simple && index.h("div", { class: "pagination-bg absolute top-0 left-0 w-full h-56 rounded-b-2xl" }), this.simple ? (
    // Simple pagination
    index.h("div", { class: "simple flex items-center justify-center h-48" }, index.h("mx-icon-button", { "aria-label": "Previous page", "chevron-left": true, disabled: this.page === 1 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }), this.lastPage !== null ? this.page + ' of ' + this.lastPage : '', index.h("mx-icon-button", { "aria-label": "Next page", "chevron-right": true, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }))) : (
    // Standard pagination
    index.h("div", { ref: el => (this.paginationWrapper = el), class: this.paginationWrapperClass }, this.hasStatus && (index.h("div", { "data-testid": "status", class: "px-24 py-10 flex relative items-center justify-self-start" }, index.h("slot", { name: "status" }))), index.h("div", { class: 'flex flex-grow-0 items-center justify-end h-56 pr-4' + (this.hideRowsPerPage ? ' relative' : '') }, this.rowsPerPageOptions && this.rowsPerPageOptions.length > 1 && (index.h("div", { ref: el => (this.rowsPerPageWrapper = el), "aria-hidden": this.hideRowsPerPage, class: 'flex items-center px-24' + (this.hideRowsPerPage ? ' absolute opacity-0 pointer-events-none' : '') }, "Rows per page: \u00A0", index.h("div", { "data-testid": "rows-per-page", ref: el => (this.rowsMenuAnchor = el), class: "flex items-center cursor-pointer" }, this.rowsPerPage, index.h("span", { class: "ml-12", innerHTML: arrowTriangleDown.arrowSvg })), index.h("mx-menu", { ref: el => (this.rowsMenu = el) }, this.rowsPerPageOptions.map(option => (index.h("mx-menu-item", { disabled: this.disabled, onClick: this.onChangeRowsPerPage.bind(this, option) }, option)))))), this.totalRows > 0 && (index.h("div", { "data-testid": "row-range", class: this.rowRangeClass }, this.currentRange, " of ", this.totalRows)), index.h("div", { class: "flex items-center sm:space-x-8" }, index.h("mx-icon-button", { "aria-label": "First page", innerHTML: pageFirstSvg, disabled: this.page === 1 || this.disabled, onClick: this.onClickFirstPage.bind(this) }), index.h("mx-icon-button", { "aria-label": "Previous page", innerHTML: chevronLeftSvg, disabled: this.page === 1 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }), index.h("mx-icon-button", { "aria-label": "Next page", innerHTML: chevronRightSvg, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }), this.lastPage !== null && (index.h("mx-icon-button", { "aria-label": "Last page", innerHTML: pageLastSvg, disabled: this.page === this.lastPage || this.disabled, onClick: this.onClickLastPage.bind(this) }))))))));
  }
  get element() { return index.getElement(this); }
};

const MxTableCell = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /** This is automatically set by the parent `mx-table`. */
    this.isExposedMobileColumn = true;
    this.minWidths = new minWidthSync.MinWidths();
  }
  connectedCallback() {
    minWidthSync.minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.minWidthSync.unsubscribeComponent(this);
  }
  get cellClass() {
    let str = 'mx-table-cell flex items-center text-4';
    if (!this.minWidths.sm && this.isExposedMobileColumn)
      str += ' row-start-1 exposed-cell';
    else if (!this.minWidths.sm)
      str += ' py-0 pb-12 col-span-4';
    return str;
  }
  render() {
    return (index.h(index.Host, { role: "gridcell", "aria-describedby": `column-header-${this.columnIndex}`, class: this.cellClass }, index.h("div", { class: "min-h-20 max-w-full break-words" }, !this.minWidths.sm && !this.isExposedMobileColumn && this.heading != null && (index.h("p", { class: "subtitle5 my-0 mb-4", innerHTML: this.heading })), index.h("slot", null))));
  }
  get element() { return index.getElement(this); }
};

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
    this.scrollingContainer = utils.getScrollingParent(dragEl);
  }
  /** Start/stop auto-scrolling based on cursor coordinates */
  update(e) {
    clearInterval(this.interval);
    const { clientX, clientY } = utils.getCursorCoords(e);
    const bounds = utils.getBounds(this.scrollingContainer);
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
    index.registerInstance(this, hostRef);
    this.mxCheck = index.createEvent(this, "mxCheck", 7);
    this.mxRowDragStart = index.createEvent(this, "mxRowDragStart", 7);
    this.mxRowDragEnd = index.createEvent(this, "mxRowDragEnd", 7);
    this.mxDragKeyDown = index.createEvent(this, "mxDragKeyDown", 7);
    this.dragOrigin = { x: 0, y: 0 };
    /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
    this.actions = [];
    this.checked = false;
    this.minWidths = new minWidthSync.MinWidths();
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
    minWidthSync.minWidthSync.subscribeComponent(this);
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
    minWidthSync.minWidthSync.unsubscribeComponent(this);
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
      const { pageX, pageY } = utils.getCursorCoords(e);
      this.dragOrigin.x = pageX;
      this.dragOrigin.y = pageY;
    }
    else {
      // If using a keyboard, set drag origin to the row's coordinates on the page
      const { top, left } = utils.getPageRect(this.element.children[0]);
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
        const { pageX, pageY } = utils.getCursorCoords(e);
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
    if (e.target === this.element.children[0] && utils.isScrolledOutOfView(this.element.children[0]))
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
    return (index.h(index.Host, { role: "row", class: this.rowClass, style: this.rowStyle, onClick: this.onClick.bind(this), onTransitionEnd: this.onTransitionEnd.bind(this) }, this.checkable && (index.h("div", { class: "flex items-center pr-4 col-start-1 row-start-1 sm:row-start-auto sm:col-start-auto", onClick: this.accordion.bind(this) }, index.h("mx-checkbox", { ref: el => (this.checkbox = el), checked: this.checked, onInput: this.onCheckboxInput.bind(this), onClick: e => e.stopPropagation(), "label-name": "Select row", "hide-label": true }))), this.isDraggable && (index.h("div", { class: "flex items-center col-start-2 row-start-1 sm:row-start-auto sm:col-start-auto cursor-move", "data-testid": "drag-handle", onMouseDown: this.startDragging.bind(this), onTouchStart: this.startDragging.bind(this) }, index.h("span", { "aria-label": "Press Space or Enter to move this row", ref: el => (this.keyboardDragHandle = el), tabindex: "0", class: 'pointer-events-none' + (this.checkable ? ' mx-8' : ''), innerHTML: dragDotsSvg, onKeyDown: this.onKeyboardHandleKeyDown.bind(this) }), this.isDragging && (index.h("p", { class: "sr-only", role: "alert" }, "Use the arrow keys to move the row up and down. Press Space or Enter to accept. Press Escape to cancel.")))), index.h("slot", null), !this.checkable && !this.minWidths.sm && index.h("div", { class: "row-start-1 col-start-1 w-0" }), !this.isDraggable && !this.minWidths.sm && index.h("div", { class: "row-start-1 col-start-2 w-0" }), !this.minWidths.sm && (index.h("button", { class: "flex border-0 items-center justify-end px-16 row-start-1", "aria-hidden": "true", onClick: this.accordion.bind(this), onMouseDown: e => e.preventDefault() /* Do not focus on click */ }, index.h("span", { class: 'mobile-row-chevron text-1 transform' +
        (this.isMobileExpanded && !this.isMobileCollapsing ? ' rotate-180' : ''), innerHTML: chevronDown.chevronSvg }))), this.actions.length === 1 && (index.h("div", { class: "action-cell flex items-center p-16 sm:p-0 justify-end col-span-4 sm:col-span-1" }, index.h("mx-button", Object.assign({ "data-testid": "action-button", "btn-type": "text" }, this.actions[0]), this.actions[0].value))), this.actions.length > 1 && (index.h("div", { class: "action-cell flex items-center p-0 justify-end col-span-4 sm:col-span-1" }, index.h("mx-icon-button", { ref: el => (this.actionMenuButton = el), innerHTML: dotsVertical.dotsSvg }), index.h("mx-menu", { "data-testid": "action-menu", ref: el => (this.actionMenu = el) }, this.actions.map(action => (index.h("mx-menu-item", Object.assign({}, action), action.value))))))));
  }
  get element() { return index.getElement(this); }
};

exports.mx_linear_progress = MxLinearProgress;
exports.mx_pagination = MxPagination;
exports.mx_table_cell = MxTableCell;
exports.mx_table_row = MxTableRow;
