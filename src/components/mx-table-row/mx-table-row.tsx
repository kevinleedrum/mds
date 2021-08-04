import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { IMxMenuItemProps } from '../mx-menu-item/mx-menu-item';
import dotsSvg from '../../assets/svg/dots-vertical.svg';

export interface ITableRowAction extends IMxMenuItemProps {
  /* The menu item text for the row action */
  value: string;
}

@Component({
  tag: 'mx-table-row',
  shadow: false,
})
export class MxTableRow {
  actionMenuButton: HTMLMxIconButtonElement;
  actionMenu: HTMLMxMenuElement;
  checkbox: HTMLMxCheckboxElement;

  @Prop() checkable: boolean = false;
  @Prop({ mutable: true }) checked: boolean = false;
  /** This is required for checkable rows in order to persist the checked state through sorting and pagination. */
  @Prop() rowId: string | number;
  /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
  @Prop() actions: ITableRowAction[] = [];

  @Event() mxCheck: EventEmitter<{ rowId: string | number; checked: boolean }>;

  connectedCallback() {
    if (this.checkable && this.rowId == null) throw new Error('Checkable table rows must have a rowId!');
    if (this.actions.length && this.rowId == null) throw new Error('Table rows with actions must have a rowId!');
    if (this.actions.some(action => !action.value)) throw new Error('Table row actions must have a value property!');
  }

  componentDidLoad() {
    if (this.actions.length) this.actionMenu.anchorEl = this.actionMenuButton;
  }

  onClick(e: MouseEvent) {
    if (!this.checkable) return;
    if (!!(e.target as HTMLElement).closest('button, input, mx-menu')) return; // Ignore clicks on buttons, etc.
    this.checked = !this.checked;
    this.mxCheck.emit({ rowId: this.rowId, checked: this.checked });
  }

  onCheckboxInput(e: InputEvent) {
    this.mxCheck.emit({ rowId: this.rowId, checked: (e.target as HTMLInputElement).checked });
  }

  get rowClass(): string {
    let str = 'mx-table-row contents';
    if (this.checkable) str += ' cursor-pointer';
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
        {this.actions.length > 0 && (
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
