import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'mx-input',
  styleUrl: 'mx-input.scss',
  shadow: false,
})
export class MxInput {
  render() {
    return (
      <Host>
        <div class="foo">This is foo</div>
      </Host>
    );
  }
}
