import { Component, Host, h, Prop, Element, Event, EventEmitter, State, Method } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';
import dotsSvg from '../../assets/svg/dots-vertical.svg';
import dragDotsSvg from '../../assets/svg/drag-dots.svg';
import chevronSvg from '../../assets/svg/chevron-down.svg';
import { ITableRowAction } from '../mx-table/mx-table';
import { getCursorCoords, getPageRect, isScrolledOutOfView } from '../../utils/utils';
import DragScroller from '../../utils/DragScroller';

const DEFAULT_MAX_HEIGHT = 'calc(3.25rem + 1px)'; // 52px + 1px bottom border

@Component({
  tag: 'mx-table-row',
  shadow: false,
})
export class MxTableRow {
  actionMenuButton: HTMLMxIconButtonElement;
  actionMenu: HTMLMxMenuElement;
  checkbox: HTMLMxCheckboxElement;
  dragOrigin = { x: 0, y: 0 };
  dragShadowEl: HTMLElement;
  keyboardDragHandle: HTMLElement;
  dragScroller: DragScroller;

  /** This is required for checkable rows in order to persist the checked state through sorting and pagination. */
  @Prop() rowId: string;
  /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
  @Prop() actions: ITableRowAction[] = [];
  @Prop({ mutable: true }) checked: boolean = false;

  @Element() element: HTMLMxTableRowElement;

  @State() minWidths = new MinWidths();
  @State() checkable: boolean = false;
  @State() checkOnRowClick: boolean = false;
  @State() isDraggable: boolean = false;
  @State() isDragging: boolean = false;
  @State() isMobileExpanded: boolean = false;
  @State() isMobileCollapsing: boolean = false;

  /** Emits the `rowId` and `checked` state (via `Event.detail`) of the row whenever it is (un)checked */
  @Event() mxCheck: EventEmitter<{ rowId: string; checked: boolean }>;
  /** Emitted when dragging starts.  Handled by the parent table. */
  @Event() mxRowDragStart: EventEmitter<{ isKeyboard: boolean }>;
  /** Emitted when dragging ends.  Handled by the parent table. */
  @Event() mxRowDragEnd: EventEmitter<{ isKeyboard: boolean; isCancel: boolean }>;
  /** Emits the `KeyboardEvent.key` when a key is pressed while keyboard dragging.  Handled by the parent table. */
  @Event() mxDragKeyDown: EventEmitter<string>;

  /** Apply a CSS transform to translate the row by `x` and `y` pixels */
  @Method()
  async translateRow(x: number, y: number) {
    const transform = `translate3d(${x}px, ${y}px, 0)`;
    if (this.dragShadowEl) this.dragShadowEl.style.transform = transform;
    Array.from(this.element.children).forEach((child: HTMLElement) => (child.style.transform = transform));
  }

  connectedCallback() {
    minWidthSync.subscribeComponent(this);
    if (this.actions.some(action => !action.value)) throw new Error('Table row actions must have a value property!');
  }

  componentWillRender() {
    // Render collapsed mobile row
    if (!this.minWidths.sm && !this.isMobileExpanded) this.element.style.maxHeight = this.getCollapsedHeight();
    // Determine `checkable` and `checked` by pulling props from parent table.
    // This avoids having to manually pass these as props when using mx-table-row inside the table's
    // default slot.
    const table = this.element.closest('mx-table') as HTMLMxTableElement;
    this.checkable = table && table.checkable;
    this.isDraggable = table && table.draggableRows;
    if (this.checkable && this.rowId == null)
      throw new Error('Checkable rows require either a getRowId prop on the table, or a rowId on the row!');
    if (this.checkable) this.checkOnRowClick = table.checkOnRowClick;
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

  onClick(e: MouseEvent) {
    if (!!(e.target as HTMLElement).closest('button, input, mx-menu')) return; // Ignore clicks on buttons, etc.
    if (!this.minWidths.sm) {
      // Collapse/expand row when the exposed column cell is clicked
      const exposedCell = this.getExposedCell();
      if (!exposedCell) return;
      if ((e.target as HTMLElement).closest('mx-table-cell') === exposedCell) this.accordion();
    } else if (this.checkable && this.checkOnRowClick) {
      // (Un)check row
      this.checked = !this.checked;
      this.mxCheck.emit({ rowId: this.rowId, checked: this.checked });
    }
  }

  onKeyboardHandleKeyDown(e: KeyboardEvent) {
    // Start keyboard dragging on Space/Enter if not already dragging
    if (!this.isDragging && [' ', 'Enter'].includes(e.key)) this.startDragging(e);
  }

  startDragging(e: MouseEvent | TouchEvent | KeyboardEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.isDragging = true;
    if (e.type !== 'keydown') {
      // If using a mouse or touch, set drag origin to current cursor coordinates
      const { pageX, pageY } = getCursorCoords(e as MouseEvent | TouchEvent);
      this.dragOrigin.x = pageX;
      this.dragOrigin.y = pageY;
    } else {
      // If using a keyboard, set drag origin to the row's coordinates on the page
      const { top, left } = getPageRect(this.element.children[0] as HTMLElement);
      this.dragOrigin.x = left;
      this.dragOrigin.y = top;
    }
    this.element.classList.add('pointer-events-none');
    this.createDragShadowEl();
    for (let i = 0; i < this.element.children.length; i++) {
      const child = this.element.children[i] as HTMLElement;
      child.style.zIndex = '9999';
    }
    this.addDragListeners(e);
    this.mxRowDragStart.emit({ isKeyboard: e.type === 'keydown' });
  }

  addDragListeners(startEvent: MouseEvent | TouchEvent | KeyboardEvent) {
    /** Move all the row children and dragShadowEl with the mouse cursor (via CSS transform) */
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      requestAnimationFrame(() => {
        if (!this.isDragging) return;
        const { pageX, pageY } = getCursorCoords(e);
        const x = pageX - this.dragOrigin.x;
        const y = pageY - this.dragOrigin.y;
        this.translateRow(x, y);
        this.dragScroller && this.dragScroller.update(e);
      });
    };
    /** Stop dragging when the mouse button is released or touch ends */
    const onMouseUp = (e: MouseEvent | TouchEvent) => {
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
    const onKeyDown = (e: KeyboardEvent) => {
      if ([' ', 'Enter'].includes(e.key)) {
        document.removeEventListener('keydown', onKeyDown);
        this.stopDragging(true);
      } else if (['Escape', 'Tab'].includes(e.key)) {
        document.removeEventListener('keydown', onKeyDown);
        this.stopDragging(true, true);
      } else if (e.key.includes('Arrow')) {
        this.mxDragKeyDown.emit(e.key);
      } else {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
    };
    // Add the above listeners based on the type of input device being used
    if (startEvent.type === 'keydown') {
      document.addEventListener('keydown', onKeyDown);
    } else if (startEvent.type === 'touchstart') {
      this.dragScroller = new DragScroller(this.element);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);
      document.addEventListener('touchcancel', onMouseUp);
    } else {
      this.dragScroller = new DragScroller(this.element);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }

  /** Clear transforms and remove dragShadowEl */
  stopDragging(isKeyboard = false, isCancel = false) {
    this.isDragging = false;
    this.element.classList.remove('drag-row', 'pointer-events-none');
    if (this.dragShadowEl) this.dragShadowEl.remove();
    this.dragShadowEl = undefined;
    for (let i = 0; i < this.element.children.length; i++) {
      const child = this.element.children[i] as HTMLElement;
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
    this.dragShadowEl.style.height = (this.element.children[0] as HTMLElement).offsetHeight + 'px';
    this.dragShadowEl.style.top = (this.element.children[0] as HTMLElement).offsetTop + 'px';
    this.dragShadowEl.style.left = (this.element.children[0] as HTMLElement).offsetLeft + 'px';
    this.element.parentNode.insertBefore(this.dragShadowEl, this.element);
  }

  accordion() {
    if (this.minWidths.sm) return;
    this.element.classList.add('overflow-hidden');
    this.isMobileExpanded ? this.collapse() : this.expand();
  }

  @Method()
  async collapse() {
    if (!this.isMobileExpanded) return;
    this.isMobileCollapsing = true;
    this.element.style.maxHeight = this.element.scrollHeight + 'px';
    requestAnimationFrame(() => {
      this.element.style.maxHeight = this.getCollapsedHeight();
    });
  }

  @Method()
  async expand() {
    if (this.isMobileExpanded) return;
    this.element.style.maxHeight = this.element.scrollHeight + 'px';
    this.isMobileExpanded = true;
    requestAnimationFrame(() => {
      this.element.style.maxHeight = this.element.scrollHeight + 'px';
    });
  }

  @Method()
  async focusDragHandle() {
    if (this.keyboardDragHandle) this.keyboardDragHandle.focus();
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
    if (e.target === this.element.children[0] && isScrolledOutOfView(this.element.children[0] as HTMLElement))
      this.element.children[0].scrollIntoView();
  }

  onCheckboxInput(e: InputEvent) {
    this.mxCheck.emit({ rowId: this.rowId, checked: (e.target as HTMLInputElement).checked });
  }

  getExposedCell(): HTMLMxTableCellElement {
    const cells = Array.from(this.element.querySelectorAll('mx-table-cell')) || [];
    return cells.find((cell: HTMLMxTableCellElement) => cell.isExposedMobileColumn);
  }

  getCollapsedHeight(): string {
    const exposedCell = this.getExposedCell();
    if (!exposedCell) return DEFAULT_MAX_HEIGHT;
    return exposedCell.offsetHeight + 1 + 'px';
  }

  get rowClass(): string {
    let str = 'mx-table-row';
    str += this.minWidths.sm ? ' contents' : ' grid';
    if (this.checkable) str += ' checkable-row';
    if (this.checkable && this.checkOnRowClick) str += ' cursor-pointer';
    if (!this.minWidths.sm && !this.isMobileExpanded) str += ' mobile-collapsed';
    return str;
  }

  get rowStyle(): any {
    if (this.minWidths.sm) return {};
    return {
      gridTemplateColumns: 'minmax(0, min-content) minmax(0, min-content) minmax(0, auto) minmax(0, min-content)',
      maxHeight: '',
    };
  }

  render() {
    return (
      <Host
        role="row"
        class={this.rowClass}
        style={this.rowStyle}
        onClick={this.onClick.bind(this)}
        onTransitionEnd={this.onTransitionEnd.bind(this)}
      >
        {/* Checkbox */}
        {this.checkable && (
          <div
            class="flex items-center pr-4 col-start-1 row-start-1 sm:row-start-auto sm:col-start-auto"
            onClick={this.accordion.bind(this)}
          >
            <mx-checkbox
              ref={el => (this.checkbox = el)}
              checked={this.checked}
              onInput={this.onCheckboxInput.bind(this)}
              onClick={e => e.stopPropagation()}
              label-name="Select row"
              hide-label
            ></mx-checkbox>
          </div>
        )}
        {/* Drag Handle */}
        {this.isDraggable && (
          <div
            class="flex items-center col-start-2 row-start-1 sm:row-start-auto sm:col-start-auto cursor-move"
            data-testid="drag-handle"
            onMouseDown={this.startDragging.bind(this)}
            onTouchStart={this.startDragging.bind(this)}
          >
            <span
              aria-label="Press Space or Enter to move this row"
              ref={el => (this.keyboardDragHandle = el)}
              tabindex="0"
              class={'pointer-events-none' + (this.checkable ? ' mx-8' : '')}
              innerHTML={dragDotsSvg}
              onKeyDown={this.onKeyboardHandleKeyDown.bind(this)}
            ></span>
            {this.isDragging && (
              <p class="sr-only" role="alert">
                Use the arrow keys to move the row up and down. Press Space or Enter to accept. Press Escape to cancel.
              </p>
            )}
          </div>
        )}
        <slot></slot>
        {/* Mobile checkbox column filler (prevents having to hack a column span into slotted content) */}
        {!this.checkable && !this.minWidths.sm && <div class="row-start-1 col-start-1 w-0"></div>}
        {/* Mobile drag-handle column filler */}
        {!this.isDraggable && !this.minWidths.sm && <div class="row-start-1 col-start-2 w-0"></div>}
        {/* Mobile accordion chevron */}
        {!this.minWidths.sm && (
          <button
            class="flex border-0 items-center justify-end px-16 row-start-1"
            aria-hidden="true"
            onClick={this.accordion.bind(this)}
            onMouseDown={e => e.preventDefault() /* Do not focus on click */}
          >
            <span
              class={
                'mobile-row-chevron text-1 transform' +
                (this.isMobileExpanded && !this.isMobileCollapsing ? ' rotate-180' : '')
              }
              innerHTML={chevronSvg}
            ></span>
          </button>
        )}
        {/* Single Action Button */}
        {this.actions.length === 1 && (
          <div class="action-cell flex items-center p-16 sm:p-0 justify-end col-span-4 sm:col-span-1">
            <mx-button data-testid="action-button" btn-type="text" {...this.actions[0]}>
              {this.actions[0].value}
            </mx-button>
          </div>
        )}
        {/* Action Menu */}
        {this.actions.length > 1 && (
          <div class="action-cell flex items-center p-0 justify-end col-span-4 sm:col-span-1">
            <mx-icon-button ref={el => (this.actionMenuButton = el)} innerHTML={dotsSvg}></mx-icon-button>
            <mx-menu data-testid="action-menu" ref={el => (this.actionMenu = el)}>
              {this.actions.map(action => (
                <mx-menu-item {...action}>{action.value}</mx-menu-item>
              ))}
            </mx-menu>
          </div>
        )}
      </Host>
    );
  }
}