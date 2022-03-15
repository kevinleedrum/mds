import { r as registerInstance, h, H as Host, g as getElement, c as createEvent } from './index-d3b6906c.js';
import { R as ResizeObserver } from './ResizeObserver-f193871f.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';
import { d as getScrollingParent, e as getBounds, a as getCursorCoords, g as getPageRect, f as isScrolledOutOfView } from './utils-f31b72fe.js';
import { c as collapse, e as expand } from './transitions-4a0eb798.js';

const MxLinearProgress = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, { class: "mx-linear-progress block h-4 w-full rounded-sm overflow-hidden pointer-events-none", role: "progressbar", "aria-valuenow": this.value != null ? Math.round(this.value) : null, "aria-valuemin": this.value != null ? 0 : null, "aria-valuemax": this.value != null ? 100 : null }, h("div", { class: "relative h-full" }, this.value != null ? (
    // Determinate
    h("div", { "data-testid": "determinate", class: "fill h-4 absolute inset-0 rounded-sm", style: this.determinateBarStyle })) : (
    // Indeterminate has two animated bars with nested animations
    [
      h("div", { "data-testid": "indeterminate1", class: "indeterminate1 absolute h-full w-full" }, h("div", { class: "fill absolute w-full h-full rounded-sm" })),
      h("div", { "data-testid": "indeterminate2", class: "indeterminate2 absolute h-full w-full" }, h("div", { class: "fill absolute w-full h-full rounded-sm" })),
    ]))));
  }
  get element() { return getElement(this); }
};

const MxPagination = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxPageChange = createEvent(this, "mxPageChange", 7);
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
    this.resizeObserver = new ResizeObserver(() => this.updateResponsiveElements());
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
  get isPreviousPageDisabled() {
    return this.page === 1 || this.disabled;
  }
  get isNextPageDisabled() {
    return this.page === this.lastPage || this.disabled || this.disableNextPage;
  }
  get isLastPageDisabled() {
    return this.page === this.lastPage || this.disabled;
  }
  onClickFirstPage() {
    if (this.isPreviousPageDisabled)
      return;
    this.mxPageChange.emit({ page: 1, rowsPerPage: this.rowsPerPage });
  }
  onClickPreviousPage() {
    if (this.isPreviousPageDisabled)
      return;
    this.mxPageChange.emit({ page: this.page - 1, rowsPerPage: this.rowsPerPage });
  }
  onClickNextPage() {
    if (this.isNextPageDisabled)
      return;
    this.mxPageChange.emit({ page: this.page + 1, rowsPerPage: this.rowsPerPage });
  }
  onClickLastPage() {
    if (this.isLastPageDisabled)
      return;
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
    return (h(Host, { class: "mx-pagination relative block text-4 whitespace-nowrap select-none" }, !this.simple && h("div", { class: "pagination-bg absolute top-0 left-0 w-full h-56 rounded-b-2xl" }), this.simple ? (
    // Simple pagination
    h("div", { class: "simple flex items-center justify-center h-48" }, h("mx-icon-button", { "el-aria-label": "Previous page", "chevron-left": true, disabled: this.page === 1 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }), this.lastPage !== null ? this.page + ' of ' + this.lastPage : '', h("mx-icon-button", { "el-aria-label": "Next page", "chevron-right": true, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }))) : (
    // Standard pagination
    h("div", { ref: el => (this.paginationWrapper = el), class: this.paginationWrapperClass }, this.hasStatus && (h("div", { "data-testid": "status", class: "px-24 py-10 flex relative items-center justify-self-start" }, h("slot", { name: "status" }))), h("div", { class: 'flex flex-grow-0 items-center justify-end h-56 pr-4' + (this.hideRowsPerPage ? ' relative' : '') }, this.rowsPerPageOptions && this.rowsPerPageOptions.length > 1 && (h("div", { ref: el => (this.rowsPerPageWrapper = el), "aria-hidden": this.hideRowsPerPage, class: 'flex items-center px-24' + (this.hideRowsPerPage ? ' absolute opacity-0 pointer-events-none' : '') }, "Rows per page: \u00A0", h("div", { "data-testid": "rows-per-page", ref: el => (this.rowsMenuAnchor = el), class: "flex items-center cursor-pointer" }, this.rowsPerPage, h("i", { class: "mds-arrow-triangle-down ml-12 text-icon" })), h("mx-menu", { ref: el => (this.rowsMenu = el), onMxClose: e => e.stopPropagation() }, this.rowsPerPageOptions.map(option => (h("mx-menu-item", { disabled: this.disabled, onClick: this.onChangeRowsPerPage.bind(this, option) }, option)))))), this.totalRows > 0 && (h("div", { "data-testid": "row-range", class: this.rowRangeClass }, this.currentRange, " of ", this.totalRows)), h("div", { class: "flex items-center sm:space-x-8" }, h("mx-icon-button", { "el-aria-label": "First page", icon: "mds-page-first", disabled: this.isPreviousPageDisabled, onClick: this.onClickFirstPage.bind(this) }), h("mx-icon-button", { "el-aria-label": "Previous page", icon: "mds-chevron-left", disabled: this.isPreviousPageDisabled, onClick: this.onClickPreviousPage.bind(this) }), h("mx-icon-button", { "el-aria-label": "Next page", icon: "mds-chevron-right", disabled: this.isNextPageDisabled, onClick: this.onClickNextPage.bind(this) }), this.lastPage !== null && (h("mx-icon-button", { "el-aria-label": "Last page", icon: "mds-page-last", disabled: this.isLastPageDisabled, onClick: this.onClickLastPage.bind(this) }))))))));
  }
  get element() { return getElement(this); }
};

const MxTableCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** This is automatically set by the parent `mx-table`. */
    this.isExposedMobileColumn = true;
    this.minWidths = new MinWidths();
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  get cellClass() {
    let str = 'mx-table-cell flex flex-1 items-center overflow-hidden';
    if (!this.minWidths.sm && this.isExposedMobileColumn)
      str += ' row-start-1 exposed-cell';
    else if (!this.minWidths.sm)
      str += ' col-start-2 col-span-4';
    return str;
  }
  render() {
    return (h(Host, { role: "gridcell", "aria-describedby": this.columnIndex != null ? `column-header-${this.columnIndex}` : null, class: this.cellClass }, h("div", { class: !this.isExposedMobileColumn && !this.minWidths.sm ? 'py-0 pb-12' : '' }, h("div", { class: "min-h-16 max-w-full break-words", role: this.columnIndex == null ? 'heading' : null, "aria-level": this.columnIndex == null ? '1' : null }, !this.minWidths.sm && !this.isExposedMobileColumn && this.heading != null && (h("p", { class: "subtitle5 my-0 mb-4", innerHTML: this.heading })), h("slot", null)))));
  }
  get element() { return getElement(this); }
};

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
let rowAccordionDebounce;
const MxTableRow = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mxCheck = createEvent(this, "mxCheck", 7);
    this.mxRowDragStart = createEvent(this, "mxRowDragStart", 7);
    this.mxRowDragEnd = createEvent(this, "mxRowDragEnd", 7);
    this.mxDragKeyDown = createEvent(this, "mxDragKeyDown", 7);
    this.mxRowAccordion = createEvent(this, "mxRowAccordion", 7);
    this.dragOrigin = { x: 0, y: 0 };
    this.indentLevel = 0;
    this.columnCount = 1;
    this.isHidden = false;
    /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
    this.actions = [];
    /** Do not collapse this row if the parent row's `collapseNestedRows` prop is set to `true`. */
    this.doNotCollapse = false;
    /** Do not allow dragging of this row even if the parent table's `draggableRows` prop is set to `true`. */
    this.doNotDrag = false;
    this.checked = false;
    /** Toggles the visibility of all nested rows (except those set to `doNotCollapse`) */
    this.collapseNestedRows = false;
    /** Style the row as a subheader. */
    this.subheader = false;
    this.minWidths = new MinWidths();
    this.checkable = false;
    this.checkOnRowClick = false;
    this.isDraggable = false;
    this.isDragging = false;
    this.isMobileExpanded = false;
    this.isMobileCollapsing = false;
  }
  onCollapseNestedRowsChange() {
    this.toggleNestedRows();
  }
  async onMinWidthsChange() {
    if (!this.collapseNestedRows)
      return;
    // Ensure that collapsed, nested rows are hidden after switching to/from mobile UI
    await new Promise(requestAnimationFrame);
    this.toggleNestedRows(true);
  }
  /** Apply a CSS transform to translate the row by `x` and `y` pixels */
  async translateRow(x, y) {
    const transform = `translate3d(${x}px, ${y}px, 0)`;
    if (this.dragShadowEl)
      this.dragShadowEl.style.transform = transform;
    (await this.getChildren()).forEach((child) => (child.style.transform = transform));
  }
  /** Show/hide the row (with an optional accordion transition) */
  async toggle(hideRow, skipTransition) {
    this.isHidden = hideRow;
    const children = await this.getChildren();
    const transition = this.isHidden ? collapse : expand;
    await Promise.all(children.map(child => transition(child, skipTransition ? 0 : undefined)));
    children.forEach(child => (child.style.border = this.isHidden ? '0' : ''));
    this.element.setAttribute('aria-hidden', this.isHidden ? 'true' : 'false');
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
    if (this.actions.some(action => !action.value))
      throw new Error('Table row actions must have a value property!');
    this.setIndentLevel();
  }
  componentDidLoad() {
    if (this.collapseNestedRows)
      this.toggleNestedRows(true);
  }
  componentWillRender() {
    // Determine `checkable` and `isDraggable` by pulling props from parent table.
    // This avoids having to manually pass these as props when using mx-table-row inside the table's
    // default slot.
    const table = this.element.closest('mx-table');
    this.checkable = table && table.checkable;
    this.isDraggable = table && table.draggableRows && !this.doNotDrag;
    this.columnCount = (table && table.columns.length) + (this.actions.length ? 1 : 0);
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
    this.wrapFirstColumn();
    this.moveNestedRows();
    // Render collapsed mobile row
    if (!this.minWidths.sm && !this.isMobileExpanded && !this.isHidden)
      this.rowEl.style.maxHeight = this.getCollapsedHeight();
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  setIndentLevel() {
    let parentRow = this.element.parentElement.closest('mx-table-row');
    this.indentLevel = 0;
    while (parentRow) {
      if (!parentRow.subheader)
        this.indentLevel++;
      parentRow = parentRow.parentElement.closest('mx-table-row');
    }
  }
  toggleNestedRows(skipTransition = false) {
    const nestedRows = Array.from(this.childRowWrapper.children).filter((row) => !row.doNotCollapse);
    nestedRows.forEach(async (row) => {
      row.toggle(this.collapseNestedRows, skipTransition);
    });
    clearTimeout(rowAccordionDebounce);
    rowAccordionDebounce = setTimeout(this.mxRowAccordion.emit, 200);
  }
  /** Move first cell into same container as checkbox and drag handle. */
  wrapFirstColumn() {
    const firstCell = this.element.querySelector('mx-table-cell');
    if (this.firstCellTarget && firstCell) {
      this.firstCellTarget.appendChild(firstCell);
    }
  }
  /** Move nested rows from the default slot to a container outside the collapsible row. */
  moveNestedRows() {
    const nestedRows = Array.from(this.rowEl.children).filter(c => c.tagName === 'MX-TABLE-ROW');
    nestedRows.forEach(childRow => this.childRowWrapper.appendChild(childRow));
  }
  onClick(e) {
    if (!!e.target.closest('a, button, input, mx-menu'))
      return; // Ignore clicks on links, buttons, etc.
    if (!this.minWidths.sm) {
      // Collapse/expand row when the exposed column cell is clicked
      const exposedCell = this.getExposedCell();
      if (!exposedCell || this.subheader || this.columnCount < 2)
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
  /** Add hover styling to this row, but not the parent row(s) */
  onMouseOver(e) {
    e.stopPropagation();
    const isDraggingChildRow = e.buttons > 0;
    if (!isDraggingChildRow)
      this.rowEl.classList.add('hovered-row');
  }
  onMouseOut(e) {
    e.stopPropagation();
    this.rowEl.classList.remove('hovered-row');
  }
  onKeyboardHandleKeyDown(e) {
    // Start keyboard dragging on Space/Enter if not already dragging
    if (!this.isDragging && [' ', 'Enter'].includes(e.key))
      this.startDragging(e);
  }
  async startDragging(e) {
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
      const { top, left } = getPageRect(this.rowEl.children[0]);
      this.dragOrigin.x = left;
      this.dragOrigin.y = top;
    }
    this.rowEl.classList.add('pointer-events-none');
    this.createDragShadowEl();
    const children = await this.getChildren();
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
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
      this.dragScroller = new DragScroller(this.rowEl);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);
      document.addEventListener('touchcancel', onMouseUp);
    }
    else {
      this.dragScroller = new DragScroller(this.rowEl);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }
  /** Clear transforms and remove dragShadowEl */
  async stopDragging(isKeyboard = false, isCancel = false) {
    this.isDragging = false;
    this.rowEl.classList.remove('drag-row', 'pointer-events-none');
    if (this.dragShadowEl)
      this.dragShadowEl.remove();
    this.dragShadowEl = undefined;
    const children = await this.getChildren();
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.style.transform = '';
      child.style.zIndex = '';
    }
    this.mxRowDragEnd.emit({ isKeyboard, isCancel });
  }
  /** When dragging, add an element behind the row children that has a box shadow.
   * This is simpler than trying to change the row to `display: flex` to add a box shadow to it. */
  async createDragShadowEl() {
    this.dragShadowEl = document.createElement('div');
    this.dragShadowEl.classList.add('absolute', 'w-full', 'shadow-24');
    this.dragShadowEl.style.zIndex = '9998';
    this.dragShadowEl.style.height = (await this.getHeight()) + 'px';
    const firstChild = (await this.getChildren())[0];
    this.dragShadowEl.style.top = firstChild.offsetTop + 'px';
    this.dragShadowEl.style.left = firstChild.offsetLeft + 'px';
    this.element.parentNode.insertBefore(this.dragShadowEl, this.element);
  }
  accordion() {
    if (this.minWidths.sm)
      return;
    this.isMobileExpanded ? this.collapse() : this.expand();
  }
  async collapse(skipTransition = false) {
    if (!this.isMobileExpanded)
      return;
    this.isMobileCollapsing = true;
    if (!skipTransition)
      await collapse(this.rowEl, 150, this.getCollapsedHeight());
    this.isMobileExpanded = false;
    this.isMobileCollapsing = false;
  }
  async expand() {
    if (this.isMobileExpanded)
      return;
    this.isMobileExpanded = true;
    await new Promise(requestAnimationFrame);
    expand(this.rowEl);
  }
  async focusDragHandle() {
    if (this.keyboardDragHandle)
      this.keyboardDragHandle.focus();
  }
  /** Returns the immediate children of the row, as well as the immediate children of all nested
   * rows.  If a child is `display: contents` (i.e. the first column wrapper), then its children
   * are added. */
  async getChildren() {
    let children = [];
    if (!this.minWidths.sm)
      children.push(this.rowEl);
    else
      Array.from(this.rowEl.children).forEach(child => {
        if (!child.offsetParent)
          children.push(...Array.from(child.children));
        else
          children.push(child);
      });
    if (!this.collapseNestedRows) {
      const nestedRows = Array.from(this.childRowWrapper.children);
      await Promise.all(nestedRows.map(childRow => childRow.getChildren().then(grandchildren => children.push(...grandchildren))));
    }
    return children;
  }
  /** Get an array of row IDs for rows nested directly inside this row */
  async getNestedRowIndexes() {
    const nestedRows = Array.from(this.childRowWrapper.children);
    return nestedRows.map((row) => row.rowIndex).filter(x => x != null);
  }
  /** Calculate the height of the row, including the height of nested rows */
  async getHeight() {
    let height = (await this.getChildren())[0].offsetHeight;
    const nestedRows = Array.from(this.childRowWrapper.children);
    await Promise.all(nestedRows.map(childRow => childRow.getHeight().then(childHeight => (height += childHeight))));
    return height;
  }
  onTransitionEnd(e) {
    // When keyboard dragging, scroll the first element into view if moved out of bounds
    if (e.target === this.rowEl.children[0] && isScrolledOutOfView(this.rowEl.children[0]))
      this.rowEl.children[0].scrollIntoView();
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
    if (!exposedCell || !exposedCell.offsetHeight)
      return DEFAULT_MAX_HEIGHT;
    return exposedCell.offsetHeight + 1 + 'px';
  }
  get rowEl() {
    return this.element.firstElementChild;
  }
  get rowClass() {
    let str = 'table-row overflow-hidden';
    str += this.minWidths.sm ? ' contents' : ' grid';
    if (this.checkable)
      str += ' checkable-row';
    if (this.checkable && this.checkOnRowClick)
      str += ' cursor-pointer';
    if (!this.minWidths.sm && !this.isMobileExpanded)
      str += ' mobile-collapsed';
    if (this.subheader)
      str += ' subheader overline2';
    return str;
  }
  get rowStyle() {
    if (this.minWidths.sm)
      return {};
    let gridTemplateColumns = this.indentLevel > 0 ? 'minmax(0, min-content)' : '0';
    gridTemplateColumns += this.checkable ? ' minmax(0, min-content)' : ' 0';
    gridTemplateColumns += this.isDraggable ? ' minmax(0, min-content)' : ' 0';
    gridTemplateColumns += ' minmax(0, auto) minmax(0, min-content)';
    return {
      gridTemplateColumns,
      maxHeight: '',
    };
  }
  get indentClass() {
    let str = 'table-row-indent sm:h-full';
    if (this.minWidths.sm)
      return str;
    str += ' col-start-1 row-start-1';
    return (str += ' row-span-' + this.columnCount);
  }
  get indentStyle() {
    return { width: 2 * this.indentLevel + 'rem', minWidth: this.indentLevel + 'rem' };
  }
  render() {
    return (h(Host, { class: "mx-table-row contents" }, h("div", { role: "row", class: this.rowClass, style: this.rowStyle, onClick: this.onClick.bind(this), onTransitionEnd: this.onTransitionEnd.bind(this), onMouseOver: this.onMouseOver.bind(this), onMouseOut: this.onMouseOut.bind(this) }, h("div", { class: 'first-column-wrapper contents sm:flex sm:items-center min-w-0 overflow-hidden' +
        (this.subheader ? ' sm:col-span-full pr-0' : '') }, h("div", { class: this.indentClass, style: this.indentStyle, "data-testid": 'indent-' + this.indentLevel }), this.checkable && (h("div", { class: "flex items-center pr-4 col-start-2 row-start-1 sm:row-start-auto sm:col-start-auto", onClick: this.accordion.bind(this) }, h("mx-checkbox", { ref: el => (this.checkbox = el), checked: this.checked, onInput: this.onCheckboxInput.bind(this), onClick: e => e.stopPropagation(), "label-name": "Select row", "hide-label": true }))), this.isDraggable && (h("div", { class: "drag-handle flex items-center col-start-3 row-start-1 sm:row-start-auto sm:col-start-auto cursor-move", "data-testid": "drag-handle", onMouseDown: this.startDragging.bind(this), onTouchStart: this.startDragging.bind(this) }, h("i", { "aria-label": "Press Space or Enter to move this row", ref: el => (this.keyboardDragHandle = el), role: "button", tabindex: "0", class: 'mds-drag-dots text-icon pointer-events-none' + (this.checkable ? ' mx-8' : ''), onKeyDown: this.onKeyboardHandleKeyDown.bind(this) }), this.isDragging && (h("p", { class: "sr-only", role: "alert" }, "Use the arrow keys to move the row up and down. Press Space or Enter to accept. Press Escape to cancel.")))), h("div", { ref: el => (this.firstCellTarget = el), class: "contents" }), this.subheader && (h("button", { type: "button", class: "flex border-0 items-center h-full justify-end px-12", "aria-label": "Toggle visibility of rows grouped under this one", onClick: () => (this.collapseNestedRows = !this.collapseNestedRows), onMouseDown: e => e.preventDefault() /* Do not focus on click */ }, h("i", { class: 'subheader-chevron mds-chevron-down text-icon transform' +
        (!this.collapseNestedRows ? ' rotate-180' : '') })))), h("slot", null), !this.checkable && !this.minWidths.sm && h("div", { class: "row-start-1 col-start-2 w-0" }), !this.isDraggable && !this.minWidths.sm && h("div", { class: "row-start-1 col-start-3 w-0" }), !this.minWidths.sm && !this.subheader && this.columnCount > 1 && (h("button", { type: "button", class: "flex border-0 items-center justify-end px-12 row-start-1", "aria-label": "Toggle visibility of more column data", onClick: this.accordion.bind(this), onMouseDown: e => e.preventDefault() /* Do not focus on click */ }, h("i", { class: 'mobile-row-chevron mds-chevron-down text-icon transform' +
        (this.isMobileExpanded && !this.isMobileCollapsing ? ' rotate-180' : '') }))), this.actions.length === 1 && (h("div", { class: "action-cell flex items-center p-16 sm:p-0 justify-end col-start-2 col-span-4 sm:col-span-1" }, h("mx-button", Object.assign({ "data-testid": "action-button", "btn-type": "text" }, this.actions[0]), this.actions[0].value))), this.actions.length > 1 && (h("div", { class: "action-cell flex items-center p-0 justify-end col-start-2 col-span-4 sm:col-span-1" }, h("mx-icon-button", { ref: el => (this.actionMenuButton = el), "el-aria-label": "Row Actions", icon: "mds-dots-vertical" }), h("mx-menu", { "data-testid": "action-menu", ref: el => (this.actionMenu = el), onMxClose: e => e.stopPropagation() }, this.actions.map(action => (h("mx-menu-item", Object.assign({}, action), action.value))))))), h("div", { ref: el => (this.childRowWrapper = el), class: "contents" })));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "collapseNestedRows": ["onCollapseNestedRowsChange"],
    "minWidths": ["onMinWidthsChange"]
  }; }
};

export { MxLinearProgress as mx_linear_progress, MxPagination as mx_pagination, MxTableCell as mx_table_cell, MxTableRow as mx_table_row };
