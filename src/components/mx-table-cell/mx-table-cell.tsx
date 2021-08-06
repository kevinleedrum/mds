import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'mx-table-cell',
  shadow: false,
})
// TODO: set aria-describedby or colindex for cells?
export class MxTableCell {
  render() {
    return (
      <Host role="gridcell" class="mx-table-cell flex items-center text-4">
        <slot></slot>
      </Host>
    );
  }
}
