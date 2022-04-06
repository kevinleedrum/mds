import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-f6edd80d.js';
import { R as ResizeObserver } from './resize-observer-9111af2a.js';
import { M as MinWidths, m as minWidthSync } from './minWidthSync-ff38ec9f.js';
import { d as getScrollingParent, a as getCursorCoords, e as getBounds, g as getPageRect, f as isScrolledOutOfView } from './utils-f31b72fe.js';
import { c as collapse, e as expand } from './transitions-4a0eb798.js';

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
    // this.resetResizeObserver();
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
    // Set up ResizeObserver for collapsed mobile row
    this.resetResizeObserver();
  }
  setCollapsedHeight() {
    if (!this.minWidths.sm && !this.isMobileExpanded && !this.isHidden)
      this.rowEl.style.maxHeight = this.getCollapsedHeight();
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  async resetResizeObserver() {
    if (this.resizeObserver)
      this.resizeObserver.disconnect();
    if (this.minWidths.sm)
      return;
    this.resizeObserver = new ResizeObserver(() => this.setCollapsedHeight());
    this.resizeObserver.observe(this.element.firstElementChild);
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
    if (this.firstCellTarget && this.firstCellTarget.parentNode) {
      const firstCell = this.element.querySelector('mx-table-cell');
      if (firstCell)
        this.firstCellTarget.parentNode.replaceChild(firstCell, this.firstCellTarget);
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
        (this.subheader ? ' sm:col-span-full pr-0' : '') }, h("div", { class: this.indentClass, style: this.indentStyle, "data-testid": 'indent-' + this.indentLevel }), this.checkable && (h("div", { class: "flex items-center pr-4 col-start-2 row-start-1 sm:row-start-auto sm:col-start-auto", onClick: this.accordion.bind(this) }, h("mx-checkbox", { ref: el => (this.checkbox = el), checked: this.checked, onInput: this.onCheckboxInput.bind(this), onClick: e => e.stopPropagation(), "label-name": "Select row", "hide-label": true }))), this.isDraggable && (h("div", { class: "drag-handle flex items-center col-start-3 row-start-1 sm:row-start-auto sm:col-start-auto cursor-move", "data-testid": "drag-handle", onMouseDown: this.startDragging.bind(this), onTouchStart: this.startDragging.bind(this) }, h("i", { "aria-label": "Press Space or Enter to move this row", ref: el => (this.keyboardDragHandle = el), role: "button", tabindex: "0", class: 'mds-drag-dots text-icon pointer-events-none' + (this.checkable ? ' mx-8' : ''), onKeyDown: this.onKeyboardHandleKeyDown.bind(this) }), this.isDragging && (h("p", { class: "sr-only", role: "alert" }, "Use the arrow keys to move the row up and down. Press Space or Enter to accept. Press Escape to cancel.")))), h("div", { ref: el => (this.firstCellTarget = el), class: "contents" }), this.subheader && (h("button", { type: "button", class: "flex border-0 items-center h-40 justify-end px-12", "aria-label": "Toggle visibility of rows grouped under this one", onClick: () => (this.collapseNestedRows = !this.collapseNestedRows), onMouseDown: e => e.preventDefault() /* Do not focus on click */ }, h("i", { class: 'subheader-chevron mds-chevron-down text-icon transform' +
        (!this.collapseNestedRows ? ' rotate-180' : '') })))), h("slot", null), !this.checkable && !this.minWidths.sm && h("div", { class: "row-start-1 col-start-2 w-0" }), !this.isDraggable && !this.minWidths.sm && h("div", { class: "row-start-1 col-start-3 w-0" }), !this.minWidths.sm && !this.subheader && this.columnCount > 1 && (h("button", { type: "button", class: "flex border-0 items-center justify-end px-12 row-start-1", "aria-label": "Toggle visibility of more column data", onClick: this.accordion.bind(this), onMouseDown: e => e.preventDefault() /* Do not focus on click */ }, h("i", { class: 'mobile-row-chevron mds-chevron-down text-icon transform' +
        (this.isMobileExpanded && !this.isMobileCollapsing ? ' rotate-180' : '') }))), this.actions.length === 1 && (h("div", { class: "action-cell flex items-center p-16 sm:p-0 justify-end col-start-2 col-span-4 sm:col-span-1" }, h("mx-button", Object.assign({ "data-testid": "action-button", "btn-type": "text" }, this.actions[0]), this.actions[0].value))), this.actions.length > 1 && (h("div", { class: "action-cell flex items-center p-0 justify-end col-start-2 col-span-4 sm:col-span-1" }, h("mx-icon-button", { ref: el => (this.actionMenuButton = el), "el-aria-label": "Row Actions", icon: "mds-dots-vertical" }), h("mx-menu", { "data-testid": "action-menu", ref: el => (this.actionMenu = el), onMxClose: e => e.stopPropagation() }, this.actions.map(action => (h("mx-menu-item", Object.assign({}, action), action.value))))))), h("div", { ref: el => (this.childRowWrapper = el), class: "contents" })));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "collapseNestedRows": ["onCollapseNestedRowsChange"],
    "minWidths": ["onMinWidthsChange"]
  }; }
};

export { MxTableRow as mx_table_row };
