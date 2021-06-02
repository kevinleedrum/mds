import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-tab-content',
  shadow: false,
})
export class MxTabContent {
  /** The index of the tab that corresponds to this content */
  @Prop() index: number;
  /** The index of the selected tab */
  @Prop() value: number;

  get isActiveTab() {
    return this.value >= 0 && this.index === this.value;
  }
  render() {
    return (
      <Host class={!this.isActiveTab ? 'hidden' : ''}>
        <slot></slot>
      </Host>
    );
  }
}
