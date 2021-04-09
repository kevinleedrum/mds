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
  @Prop() type: string = 'text';
  @Prop() dense: boolean = false;
  @Prop() leftIcon: string;
  @Prop() rightIcon: string;

  returnType() {
    const type = this.dense ? 'dense' : 'standard';
    return `mx-input-wrapper ${type}`;
  }

  render() {
    return (
      <Host>
        <div class={this.returnType()}>
          <div class="mx-input-inner-wrapper">
            {this.leftIcon && <div class="mds-icon-left">1</div>}
            {this.label && <label>{this.label}</label>}
            <div class="mds-input">
              <input type={this.type} name={this.name} value={this.value} />
            </div>
            {this.rightIcon && <div class="mds-icon-right">3</div>}
          </div>
        </div>
      </Host>
    );
  }
}
