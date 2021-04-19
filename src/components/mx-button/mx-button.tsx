import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-button',
  styleUrl: 'mx-button.scss',
  shadow: false,
})
export class MxInput {
  @Prop() type: string = 'outlined';
  @Prop() value: string;

  render() {
    return (
      <Host>
        <button class="btn">{this.value}</button>
      </Host>
    );
  }
}
