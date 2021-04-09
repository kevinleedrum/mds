import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mx-input',
  styleUrl: 'mx-input.scss',
  shadow: false,
})
export class MxInput {
  containerElem!: HTMLDivElement;
  textInput!: HTMLInputElement;

  @Prop() name: string;
  @Prop() label: string;
  @Prop() value: string;
  @Prop() type: string = 'text';
  @Prop() dense: boolean = false;
  @Prop() leftIcon: string;
  @Prop() rightIcon: string;
  @Prop({ mutable: true }) isActive: boolean = false;
  @Prop() isFocused: boolean = false;
  @Prop() outerContainerClass: string = '';
  @Prop({ mutable: true }) labelClass: string = '';
  @Prop() error: boolean = false;
  @Prop() assistiveText: string;

  connectedCallback() {
    if (this.error) {
      this.isActive = true;
      this.labelClass += ' active error';
    } else {
      this.setLabelClass();
    }
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
    this.isFocused = true;
    this.labelClass = ' active focus';
    this.removeError();
  }

  handleBlur() {
    this.isFocused = false;
    this.setLabelClass(this.textInput);
  }

  focusOnInput() {
    this.textInput.focus();
  }

  removeError() {
    this.containerElem.classList.remove('error');
  }

  render() {
    return (
      <Host>
        <div
          class={`${this.makeTypeClass()} ${this.isFocused ? 'focused' : ''} ${this.error ? 'error' : ''}`}
          ref={el => (this.containerElem = el as HTMLDivElement)}
        >
          <div class="mx-input-inner-wrapper">
            {this.leftIcon && (
              <div class="mds-input-left-content">
                <i class={this.leftIcon}></i>
              </div>
            )}
            {this.label && (
              <label class={this.labelClass} onClick={() => this.focusOnInput()}>
                {this.label}
              </label>
            )}
            <div class="mds-input">
              <input
                type={this.type}
                name={this.name}
                value={this.value}
                onFocus={() => this.handleFocus()}
                onBlur={() => this.handleBlur()}
                ref={el => (this.textInput = el as HTMLInputElement)}
              />
            </div>
            {(this.rightIcon || this.error) && (
              <div class="mds-input-right-content">
                {this.error ? <i class="ph-warning-circle"></i> : <i class={this.rightIcon}></i>}
              </div>
            )}
          </div>
        </div>
        {this.assistiveText && <div class="assistive-text">{this.assistiveText}</div>}
      </Host>
    );
  }
}
