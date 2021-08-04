import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'mx-table-row',
  shadow: false,
})
export class MxTableRow {
  checkbox: HTMLMxCheckboxElement;

  @Prop() checkable: boolean = false;
  @Prop({ mutable: true }) checked: boolean = false;
  /** This is required for checkable rows in order to persist the checked state through sorting and pagination. */
  @Prop() rowId: string | number;

  @Event() mxCheck: EventEmitter<{ rowId: string | number; checked: boolean }>;

  connectedCallback() {
    if (this.checkable && this.rowId == null) throw new Error('Checkable table rows must have a rowId!');
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
      </Host>
    );
  }
}
