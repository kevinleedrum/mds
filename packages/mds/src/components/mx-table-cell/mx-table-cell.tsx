import { Component, Host, h, Element, State, Prop } from '@stencil/core';
import { minWidthSync, MinWidths } from '../../utils/minWidthSync';

@Component({
  tag: 'mx-table-cell',
  shadow: false,
})
export class MxTableCell {
  /** This is automatically set by the parent `mx-table`. */
  @Prop({ reflect: true }) isExposedMobileColumn = true;
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
    else if (!this.minWidths.sm) str += ' col-start-2 col-span-4';
    return str;
  }

  render() {
    return (
      <Host
        role="gridcell"
        aria-describedby={this.columnIndex != null ? `column-header-${this.columnIndex}` : null}
        class={this.cellClass}
      >
        {/* Padding is applied to this inner div in the scss file so the <mx-table-cell> can be collapsed with max-height:0 */}
        <div class={!this.isExposedMobileColumn && !this.minWidths.sm ? 'py-0 pb-12' : 'overflow-hidden'}>
          <div
            class="min-h-16 max-w-full overflow-hidden overflow-ellipsis whitespace-normal"
            role={this.columnIndex == null ? 'heading' : null}
            aria-level={this.columnIndex == null ? '1' : null}
          >
            {!this.minWidths.sm && !this.isExposedMobileColumn && this.heading != null && (
              <p class="subtitle5 my-0 mb-4" innerHTML={this.heading}></p>
            )}
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
