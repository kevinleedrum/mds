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
  @Prop() labelClass: string = '';

  connectedCallback() {
    this.setLabelClass();
  }

  setLabelClass(target = undefined) {
    this.labelClass = '';
    if ((this.leftIcon && !this.isActive) || (this.leftIcon && target && target.value === '')) {
      this.setIndentedLabel();
    }
    if (target && target.value !== '') {
      this.labelClass += ' active';
    }
  }

  setIndentedLabel() {
    this.labelClass += ' indented';
  }

  makeTypeClass() {
    const type = this.dense ? 'dense' : 'standard';
    return `mx-input-wrapper ${type}`;
  }

  handleFocus() {
    this.isActive = true;
    this.labelClass = ' active focus';
  }

  handleBlur(event) {
    const { target } = event;
    this.setLabelClass(target);
  }

  render() {
    return (
      <Host>
        <div class={this.makeTypeClass()}>
          <div class="mx-input-inner-wrapper">
            {this.leftIcon && (
              <div class="mds-input-left-content">
                <i class={this.leftIcon}></i>
              </div>
            )}
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
