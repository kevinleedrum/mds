import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-input',
  styleUrl: 'mx-input.scss',
  shadow: false,
})
export class MxInput {
  @Prop() name: string;
  @Prop() label: string;
  @Prop() value: string;
  @Prop() dense: boolean = false;

  returnType() {
    const type = this.dense ? 'dense' : 'normal';
    return `mx-input-wrapper ${type}`;
  }

  render() {
    return (
      <Host>
        <div class={this.returnType()}>
          <div class="mx-input-inner-wrapper">Hello</div>
        </div>
      </Host>
    );
  }
}
