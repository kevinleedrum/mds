import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'mx-table-row',
  shadow: false,
})
export class MxTableRow {
  checkbox: HTMLMxCheckboxElement;

  @Prop() checkable: boolean = false;
  @Prop({ mutable: true }) checked: boolean = false;

  @Event() mxCheck: EventEmitter<boolean>;

  onClick(e: MouseEvent) {
    if (!this.checkable) return;
    if (!!(e.target as HTMLElement).closest('button, input, mx-menu')) return; // Ignore clicks on buttons, etc.
    this.checked = !this.checked;
    this.mxCheck.emit(this.checked);
  }

  onCheckboxInput(e: InputEvent) {
    this.mxCheck.emit((e.target as HTMLInputElement).checked);
  }

  render() {
    return (
      <Host role="row" class="mx-table-row contents" onClick={this.onClick.bind(this)}>
        {this.checkable && (
          <mx-table-cell>
            <mx-checkbox
              ref={el => (this.checkbox = el)}
              checked={this.checked}
              onInput={this.onCheckboxInput.bind(this)}
            ></mx-checkbox>
          </mx-table-cell>
        )}
        <slot></slot>
      </Host>
    );
  }
}
