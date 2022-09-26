import { Component, Host, Prop, h } from '@stencil/core';
import { nanoid } from 'nanoid';

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
  required?: boolean;
  searchLabel?: string;
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
  @Prop() required: boolean = false;
  @Prop() searchLabel: string = 'Search';

  componentWillRender() {
    this.inputId = this.inputId || nanoid(10);
  }

  get makeInputClasses() {
    const classArr = ['border', 'text-4', 'px-15', 'py-12', 'rounded', 'border', 'border-secondary'];

    if (this.error) {
      const index = classArr.indexOf('border-secondary');
      classArr[index] = 'border-status-error';
    }

    if (this.disabled || this.readonly) {
      classArr.push('bg-secondary-ultra-light');
    }

    if (this.type === 'search') {
      classArr.push('pr-112');
    }

    return classArr.join(' ');
  }

  handleInputFocus() {}

  render() {
    return (
      <Host>
        {this.label && (
          <label htmlFor={this.inputId} class="block text-secondary font-bold subtitle4 mb-10 uppercase">
            {this.label}
            {this.required && <span class="text-status-error">*</span>}
          </label>
        )}
        <div class="flex items-center relative">
          <input
            id={this.inputId}
            class={this.makeInputClasses}
            type={this.type}
            name={this.name}
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled ? true : false}
            readonly={this.readonly ? true : false}
            aria-label={this.elAriaLabel}
            onFocus={this.handleInputFocus.bind(this)}
          />
          {this.type === 'search' && (
            <mc-button class="hidden" small>
              {this.searchLabel}
            </mc-button>
          )}
        </div>
        {this.instructions && !this.error && (
          <section class="text-secondary caption1 mt-10">{this.instructions}</section>
        )}
        {this.error && this.errorMsg && (
          <section class="flex caption1 mt-10 text-status-error items-center gap-6">
            <i class="ph-warning"></i>
            {this.errorMsg}
          </section>
        )}
      </Host>
    );
  }
}
