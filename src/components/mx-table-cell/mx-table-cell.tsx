import { Component, Host, h, Element, State, Prop } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';

@Component({
  tag: 'mx-table-cell',
  shadow: false,
})
export class MxTableCell {
  /** This is automatically set by the parent `mx-table`. */
  @Prop({ reflect: true }) isExposedMobileColumn: boolean = true;
  /** This is automatically set by the parent `mx-table`.  For subheaders, this will be null. */
  @Prop({ reflect: true }) columnIndex: number;
  /** This is automatically set by the parent `mx-table`. */
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
    let str = 'mx-table-cell flex flex-1 items-center overflow-hidden';
    if (!this.minWidths.sm && this.isExposedMobileColumn) str += ' row-start-1 exposed-cell';
    else if (!this.minWidths.sm) str += ' py-0 pb-12 col-start-2 col-span-4';
    return str;
  }

  render() {
    return (
      <Host
        role="gridcell"
        aria-describedby={this.columnIndex != null ? `column-header-${this.columnIndex}` : null}
        class={this.cellClass}
      >
        <div class="min-h-16 max-w-full break-words" role={this.columnIndex == null ? 'heading' : null}>
          {!this.minWidths.sm && !this.isExposedMobileColumn && this.heading != null && (
            <p class="subtitle5 my-0 mb-4" innerHTML={this.heading}></p>
          )}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
