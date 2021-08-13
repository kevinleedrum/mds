import { Component, Host, h, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import dotsSvg from '../../assets/svg/dots-vertical.svg';
import { ITableRowAction } from '../mx-table/mx-table';

@Component({
  tag: 'mx-table-row',
  shadow: false,
})
export class MxTableRow {
  actionMenuButton: HTMLMxIconButtonElement;
  actionMenu: HTMLMxMenuElement;
  checkbox: HTMLMxCheckboxElement;

  /** This is required for checkable rows in order to persist the checked state through sorting and pagination. */
  @Prop() rowId: string;
  /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
  @Prop() actions: ITableRowAction[] = [];
  @Prop({ mutable: true }) checked: boolean = false;

  @Element() element: HTMLMxTableRowElement;

  @State() checkable: boolean = false;
  @State() checkOnRowClick: boolean = false;

  @Event() mxCheck: EventEmitter<{ rowId: string | number; checked: boolean }>;

  connectedCallback() {
    if (this.actions.some(action => !action.value)) throw new Error('Table row actions must have a value property!');
  }

  componentWillRender() {
    // Determine `checkable` and `checked` by pulling props from parent table.
    // This avoids having to manually pass these as props when using mx-table-row inside the table's
    // default slot.
    const table = this.element.closest('mx-table') as HTMLMxTableElement;
    this.checkable = table && table.checkable;
    if (this.checkable && this.rowId == null)
      throw new Error('Checkable rows require either a getRowId prop on the table, or a rowId on the row!');
    if (this.checkable) this.checkOnRowClick = table.checkOnRowClick;
  }

  componentDidLoad() {
    if (this.actions.length > 1) this.actionMenu.anchorEl = this.actionMenuButton;
  }

  onClick(e: MouseEvent) {
    if (!this.checkable || !this.checkOnRowClick) return;
    if (!!(e.target as HTMLElement).closest('button, input, mx-menu')) return; // Ignore clicks on buttons, etc.
    this.checked = !this.checked;
    this.mxCheck.emit({ rowId: this.rowId, checked: this.checked });
  }

  onCheckboxInput(e: InputEvent) {
    this.mxCheck.emit({ rowId: this.rowId, checked: (e.target as HTMLInputElement).checked });
  }

  get rowClass(): string {
    let str = 'mx-table-row contents';
    if (this.checkable && this.checkOnRowClick) str += ' cursor-pointer';
    return str;
  }

  render() {
    return (
      <Host role="row" class={this.rowClass} onClick={this.onClick.bind(this)}>
        {this.checkable && (
          <mx-table-cell class="pr-4">
            <mx-checkbox
              ref={el => (this.checkbox = el)}
              checked={this.checked}
              onInput={this.onCheckboxInput.bind(this)}
              label-name="Select row"
              hide-label
            ></mx-checkbox>
          </mx-table-cell>
        )}
        <slot></slot>
        {this.actions.length === 1 && (
          <mx-table-cell class="justify-end">
            <mx-button btn-type="text" {...this.actions[0]}>
              {this.actions[0].value}
            </mx-button>
          </mx-table-cell>
        )}
        {this.actions.length > 1 && (
          <mx-table-cell class="p-0 justify-end">
            <mx-icon-button ref={el => (this.actionMenuButton = el)} innerHTML={dotsSvg}></mx-icon-button>
            <mx-menu ref={el => (this.actionMenu = el)}>
              {this.actions.map(action => (
                <mx-menu-item {...action}>{action.value}</mx-menu-item>
              ))}
            </mx-menu>
          </mx-table-cell>
        )}
      </Host>
    );
  }
}
