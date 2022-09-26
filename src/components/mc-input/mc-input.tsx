import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'mc-input',
  styleUrl: 'mc-input.css',
  shadow: true,
})
export class McInput {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
