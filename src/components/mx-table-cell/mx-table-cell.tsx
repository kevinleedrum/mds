import { Component, Host, h, Element, State, Prop } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';

@Component({
  tag: 'mx-table-cell',
  shadow: false,
})
// TODO: set aria-describedby or colindex for cells?
export class MxTableCell {
  @Prop({ reflect: true }) isExposedMobileColumn: boolean = true;
  @Prop({ reflect: true }) columnIndex: number;
  @Prop() heading: string;

  @State() minWidths = new MinWidths();

  @Element() element: HTMLMxTableCellElement;

  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }

  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }

  get cellClass() {
    let str = 'mx-table-cell flex items-center whitespace-nowrap text-4';
    if (!this.minWidths.sm && this.isExposedMobileColumn) str += ' row-start-1 exposed-cell';
    else if (!this.minWidths.sm) str += ' py-0 pb-12 col-span-3';
    return str;
  }

  render() {
    return (
      <Host role="gridcell" class={this.cellClass}>
        <div class="whitespace-normal">
          {!this.minWidths.sm && !this.isExposedMobileColumn && this.heading != null && (
            <p class="subtitle5 my-0 mb-4" innerHTML={this.heading}></p>
          )}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
