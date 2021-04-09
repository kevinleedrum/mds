import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'mx-input',
  styleUrl: 'mx-input.css',
  shadow: true,
})
export class MxInput {
  render() {
    return (
      <Host>
        <slot>Help</slot>
      </Host>
    );
  }
}
