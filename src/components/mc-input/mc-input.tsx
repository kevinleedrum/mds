import { Component, Host, Prop, h } from '@stencil/core';
import { uuidv4 } from '../../utils/utils';

export type McInputType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'file'
  | 'hidden'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'date'
  | 'time';

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
  required?: boolean;
  searchLabel?: string;
  leftIcon?: string;
  showCancelIcon?: boolean;
}

@Component({
  tag: 'mc-input',
  shadow: false,
})
export class McInput implements IMcInputProps {
  elemInput!: HTMLInputElement | HTMLTextAreaElement;
  btnSearch!: HTMLMcButtonElement;
  elemFileUploadNameHolder!: HTMLInputElement;
  elemFileInput!: HTMLInputElement;

  @Prop() type: McInputType = 'text';
  @Prop() name = '';
  @Prop({ mutable: true }) value = '';
  @Prop() disabled = false;
  @Prop() readonly = false;
  @Prop({ mutable: true }) maxlength: number;
  @Prop({ mutable: true }) inputId: string;
  @Prop() label = '';
  @Prop() placeholder = '';
  @Prop({ mutable: true }) instructions = '';
  @Prop({ mutable: true, reflect: true }) error = false;
  @Prop() errorMsg = '';
  @Prop() elAriaLabel: string;
  @Prop() required = false;
  @Prop() searchLabel = 'Search';
  @Prop() leftIcon: string;
  @Prop({ mutable: true }) showCancelIcon = false;

  componentWillRender() {
    this.inputId = this.inputId || uuidv4();

    if (this.type === 'search') {
      this.leftIcon = 'ph-magnifying-glass';
    } else if (this.type === 'file') {
      this.leftIcon = 'ph-file';
    }
  }

  get makeInputClasses() {
    const classArr = ['w-full', 'border', 'text-body1', 'px-15', 'py-12', 'rounded', 'border', 'border-secondary'];

    if (this.error) {
      const index = classArr.indexOf('border-secondary');
      classArr[index] = 'border-status-error';
    }

    if (this.disabled || this.readonly) {
      classArr.push('bg-secondary-ultra-light');
    }

    if (this.type === 'search' || this.type === 'file') {
      const rightPad = this.type === 'search' ? 'pr-112' : 'pr-120';
      classArr.push(rightPad);
      classArr.push('pl-36');
    }

    if (this.type === 'textarea') {
      classArr.push('h-144');
      classArr.push('align-top');
    }

    return classArr.join(' ');
  }

  handleInputFocus() {
    if (this.btnSearch && this.elemInput.value !== '') {
      this.btnSearch.classList.remove('hidden');
    } else if (this.btnSearch && this.elemInput.value == '') {
      this.btnSearch.classList.add('hidden');
      this.showCancelIcon = false;
    }
  }

  triggerFileSelection(event: MouseEvent | KeyboardEvent) {
    if (this.disabled || (event.type !== 'click' && 'key' in event && event.key !== 'Enter')) return false;
    this.elemFileInput.click();
  }

  handleFileUploadChange() {
    if (this.elemFileInput.files.length > 0) {
      this.elemFileUploadNameHolder.value = this.elemFileInput.files[0].name;
      this.elemFileUploadNameHolder.focus();
      this.elemFileUploadNameHolder.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      this.elemFileUploadNameHolder.value = '';
    }
    this.error = false;
  }

  evaluateInputCancelIcon() {
    if (this.type === 'time' || this.type === 'date') return;
    const elem = this.elemInput || this.elemFileUploadNameHolder;
    if (elem.value !== '') {
      this.showCancelIcon = true;
    }
  }

  removeFileInputValue() {
    const elem = this.elemInput || this.elemFileUploadNameHolder;
    elem.value = '';
    if (this.elemFileInput) this.elemFileInput.value = '';
    if (this.btnSearch) this.btnSearch.classList.add('hidden');
    this.showCancelIcon = false;
  }

  get makeCloseIconClasses() {
    const classArr = ['ph-x', 'absolute', 'cursor-pointer', 'cancelBtn', this.type];

    return classArr.join(' ');
  }

  render() {
    return (
      <Host class="text-secondary">
        {this.label && (
          <label data-test-id="label" htmlFor={this.inputId} class="block text-label font-bold mb-10 uppercase">
            {this.label}
            {this.required && <span class="text-status-error">*</span>}
          </label>
        )}
        {this.type !== 'textarea' ? (
          <div class="flex items-center relative">
            {this.leftIcon && <i class={`leftIcon ${this.leftIcon}`} />}
            {this.showCancelIcon && (
              <i onClick={this.removeFileInputValue.bind(this)} class={this.makeCloseIconClasses}></i>
            )}
            {this.type !== 'file' ? (
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
                maxlength={this.maxlength}
                onKeyUp={this.handleInputFocus.bind(this)}
                onChange={this.handleInputFocus.bind(this)}
                onInput={this.evaluateInputCancelIcon.bind(this)}
                ref={el => (this.elemInput = el as HTMLInputElement)}
              />
            ) : (
              <div class="w-full">
                <input
                  tabIndex={-1}
                  type="text"
                  class={`w-full ${this.makeInputClasses}`}
                  onClick={this.triggerFileSelection.bind(this)}
                  onKeyUp={this.triggerFileSelection.bind(this)}
                  onInput={this.evaluateInputCancelIcon.bind(this)}
                  ref={el => (this.elemFileUploadNameHolder = el as HTMLInputElement)}
                  placeholder={this.placeholder}
                  disabled={this.disabled ? true : false}
                  readonly
                />
                <input
                  type="file"
                  aria-label={this.elAriaLabel}
                  ref={el => (this.elemFileInput = el as HTMLInputElement)}
                  onChange={this.handleFileUploadChange.bind(this)}
                  name={this.name}
                />
              </div>
            )}

            {this.type === 'search' && (
              <mc-button ref={el => (this.btnSearch = el as HTMLMcButtonElement)} class="hidden" small>
                {this.searchLabel}
              </mc-button>
            )}
            {this.type === 'file' && !this.disabled && (
              <mc-button onClick={this.triggerFileSelection.bind(this)} small>
                Choose File
              </mc-button>
            )}
          </div>
        ) : (
          <textarea
            id={this.inputId}
            class={this.makeInputClasses}
            name={this.name}
            placeholder={this.placeholder}
            disabled={this.disabled ? true : false}
            readonly={this.readonly ? true : false}
            aria-label={this.elAriaLabel}
            maxlength={this.maxlength}
            ref={el => (this.elemInput = el as HTMLTextAreaElement)}
          >
            {this.value}
          </textarea>
        )}
        {this.instructions && !this.error && (
          <section data-test-id="instructions" class="text-secondary text-body2 mt-10">
            {this.instructions}
          </section>
        )}
        {this.error && this.errorMsg && (
          <section class="flex text-body2 mt-10 text-status-error items-center gap-6">
            <i class="ph-warning"></i>
            {this.errorMsg}
          </section>
        )}
      </Host>
    );
  }
}