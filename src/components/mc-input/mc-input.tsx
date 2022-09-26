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
    return <Host></Host>;
  }
}
