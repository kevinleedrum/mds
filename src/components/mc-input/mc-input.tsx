import { Component, Host, Prop, h } from '@stencil/core';

export type McInputType = 'text' | 'email' | 'file' | 'hidden' | 'number' | 'password' | 'search' | 'tel';

export interface IMcInputProps {
  type?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number;
  inputId?: string;
  label?: string;
  placeholder?: string;
  instructions?: string;
  error?: boolean;
  errorMsg?: string;
  elAriaLabel?: string;
  hideCharacterCount?: boolean;
}

@Component({
  tag: 'mc-input',
  shadow: false,
})
export class McInput implements IMcInputProps {
  @Prop() type: McInputType;
  @Prop() name = '';
  @Prop() value = '';
  @Prop() disabled = false;
  @Prop() readonly = false;
  @Prop() maxlength: number;
  @Prop() inputId: string;
  @Prop() label = '';
  @Prop() placeholder = '';
  @Prop() instructions = '';
  @Prop() error = false;
  @Prop() errorMsg = '';
  @Prop() elAriaLabel: string;
  @Prop() hideCharacterCount: boolean;

  render() {
    return (
      <Host>
        {this.label && <label class="block text-secondary font-bold subtitle4 mb-10 uppercase">{this.label}</label>}
        <input
          class="border text-4 px-15 py-12 rounded"
          type={this.type}
          name={this.name}
          value={this.value}
          placeholder={this.placeholder}
        />
        {this.instructions && !this.error && <section class="instructions caption1 mt-10">{this.instructions}</section>}
        {this.instructions && !this.error && <section class="instructions caption1 mt-10">{this.instructions}</section>}
      </Host>
    );
  }
}
