import { Component, Host, h, Prop, Element } from '@stencil/core';
import { propagateDataAttributes } from '../../utils/utils';

export interface IMxBlockWrapperProps {
  columns: number;
}

@Component({
  tag: 'mx-block-wrapper',
  shadow: false,
})
export class MxBlockWrapper implements IMxBlockWrapperProps {
  @Prop() columns: number;

  @Element() element: HTMLMxBlockWrapperElement;

  componentWillRender = propagateDataAttributes;

  get containerClass() {
    let str = 'mx-block-wrapper-container';
    // for now we want to allow up to 6 columns
    if (this.columns > 0 && this.columns < 7) {
      str += ' md:grid-cols-' + this.columns;
    } else {
      str += ' md:grid-cols-none';
    }
    return str;
  }

  render() {
    return (
      <Host class={'mx-block-wrapper'}>
        <div class={this.containerClass}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
