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
  @Prop() isActive: boolean = false;
  @Prop() isFocused: boolean = false;
  @Prop() labelClass: string;

  makeTypeClass() {
    const type = this.dense ? 'dense' : 'standard';
    return `mx-input-wrapper ${type}`;
  }

  setLabelClass() {}

  handleFocus() {
    this.labelClass = 'active focus';
  }

  handleBlur(event) {
    const { target } = event;
    this.labelClass = target.value === '' ? '' : 'active';
  }

  render() {
    return (
      <Host>
        <div class={this.makeTypeClass()}>
          <div class="mx-input-inner-wrapper">
            {this.leftIcon && <div class="mds-input-left-content">1</div>}
            {this.label && <label class={this.labelClass}>{this.label}</label>}
            <div class="mds-input">
              <input type={this.type} name={this.name} value={this.value} onFocus={() => this.handleFocus()} onBlur={event => this.handleBlur(event)} />
            </div>
            {this.rightIcon && <div class="mds-input-right-content">3</div>}
          </div>
        </div>
      </Host>
    );
  }
}
