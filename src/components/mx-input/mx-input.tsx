import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import warningCircleSvg from '../../assets/svg/warning-circle.svg';
import { uuidv4 } from '../../utils/utils';

@Component({
  tag: 'mx-input',
  shadow: false,
})
export class MxInput {
  textInput!: HTMLInputElement;
  textArea!: HTMLTextAreaElement;
  uuid: string = uuidv4();

  /** The `name` attribute for the text input */
  @Prop() name: string;
  /** The `id` attribute for the text input */
  @Prop() inputId: string;
  @Prop() label: string;
  @Prop({ mutable: true }) value: string;
  /** The `type` attribute for the text input */
  @Prop() type: string = 'text';
  @Prop() dense: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() maxlength: number;
  /** The class name of the icon to show on the left side of the input */
  @Prop() leftIcon: string;
  /** The class name of the icon to show on the right side of the input */
  @Prop() rightIcon: string;
  /** Text shown to the right of the input value */
  @Prop() suffix: string;
  @Prop() outerContainerClass: string = '';
  @Prop({ mutable: true }) labelClass: string = '';
  @Prop({ mutable: true }) error: boolean = false;
  @Prop() assistiveText: string;
  @Prop() floatLabel: boolean = false;
  /** Display a multi-line `textarea` instead of an `input` */
  @Prop() textarea: boolean = false;
  @Prop({ mutable: true }) textareaHeight: string = '250px';

  @State() isFocused: boolean = false;
  @State() characterCount: number = 0;

  connectedCallback() {
    this.characterCount = this.hasValue ? this.value.length : 0;
  }

  componentDidLoad() {
    this.updateValue();
  }

  @Watch('value')
  onValueChange() {
    this.updateValue();
    this.characterCount = this.hasValue ? this.value.length : 0;
  }

  updateValue() {
    this.workingElem.value = this.hasValue ? this.value : '';
  }

  onFocus() {
    this.isFocused = true;
    this.error = false;
  }

  onBlur() {
    this.isFocused = false;
  }

  onInput(e: InputEvent) {
    this.characterCount = (e.target as HTMLInputElement).value.length;
  }

  get workingElem() {
    return this.textarea ? this.textArea : this.textInput;
  }

  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }

  get containerClass() {
    let str = 'mx-input-wrapper flex items-center relative border rounded-lg';
    if (!this.textarea) {
      str += this.dense ? ' h-36' : ' h-48';
    }
    if (this.error || this.isFocused) str += ' border-2';
    if (this.error) str += ' error';
    if (this.disabled) str += ' disabled';
    if (this.readonly) str += ' readonly';
    return str;
  }

  get inputClass() {
    let str = 'flex-1 overflow-hidden outline-none appearance-none bg-transparent';
    if (!this.textarea) {
      str += ' px-16';
    } else {
      str += ' p-16 resize-none';
    }
    if (this.isFocused || this.error) str += this.leftIcon ? ' -mr-1' : ' -m-1'; // prevent shifting due to border-width change
    return str;
  }

  get labelClassNames() {
    let str = 'block pointer-events-none';
    if (this.floatLabel) {
      str += ' absolute mt-0 px-4';
      if (this.textarea) str += ' top-12';
      str += this.leftIcon && !this.textarea ? ' left-48 has-left-icon' : ' left-12';
      if (this.dense && !this.textarea) str += ' dense text-4';
      if (this.isFocused || this.characterCount > 0) str += ' floating';
      if (this.isFocused || this.error) str += ' -ml-1'; // prevent shifting due to border-width change
      if ((this.isFocused || this.error) && this.textarea) str += ' -mt-1';
    } else {
      str += ' subtitle2 mb-4';
    }
    if (this.labelClass) str += this.labelClass;
    return str;
  }

  get leftIconWrapperClass() {
    let str = 'flex items-center h-full pointer-events-none pl-16';
    if (this.isFocused || this.error) str += ' -ml-1'; // prevent shifting due to border-width change
    return str;
  }

  get rightContentClass() {
    let str = 'icon-suffix flex items-center h-full pr-16 space-x-8 pointer-events-none';
    if (this.isFocused || this.error) str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }

  get textareaClass() {
    return this.textarea ? ' textarea items-start' : '';
  }

  render() {
    const labelJsx = (
      <label htmlFor={this.inputId || this.uuid} class={this.labelClassNames}>
        {this.label}
      </label>
    );
    return (
      <Host class={'mx-input block' + (this.disabled ? ' disabled' : '')}>
        {this.label && !this.floatLabel && labelJsx}

        <div class={this.containerClass}>
          {this.leftIcon && (
            <div class={this.leftIconWrapperClass}>
              <i class={this.leftIcon}></i>
            </div>
          )}

          {this.label && this.floatLabel && labelJsx}

          {!this.textarea ? (
            <input
              type={this.type}
              class={this.inputClass}
              name={this.name}
              id={this.inputId || this.uuid}
              value={this.value}
              maxlength={this.maxlength}
              disabled={this.disabled}
              readonly={this.readonly}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              onInput={this.onInput.bind(this)}
              ref={el => (this.textInput = el as HTMLInputElement)}
            />
          ) : (
            <textarea
              class={this.inputClass}
              style={{ height: this.textareaHeight }}
              name={this.name}
              id={this.inputId || this.uuid}
              maxlength={this.maxlength}
              disabled={this.disabled}
              readonly={this.readonly}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              onInput={this.onInput.bind(this)}
              ref={el => (this.textArea = el as HTMLTextAreaElement)}
            >
              {this.value}
            </textarea>
          )}

          {!this.textarea && (this.maxlength || this.suffix || this.error || this.rightIcon) && (
            <span class={this.rightContentClass}>
              {this.maxlength && (
                <span data-testid="character-count" class="character-count">
                  {this.characterCount}/{this.maxlength}
                </span>
              )}
              {this.suffix && (
                <span data-testid="suffix" class="suffix flex items-center h-full px-4">
                  {this.suffix}
                </span>
              )}
              {this.error && <span innerHTML={warningCircleSvg}></span>}
              {this.rightIcon && !this.error && <i class={this.rightIcon}></i>}
            </span>
          )}
        </div>

        {(this.assistiveText || (this.textarea && this.maxlength)) && (
          <div class="flex justify-between caption1 mt-4 ml-16 space-x-32">
            <span data-testid="assistive-text" class="assistive-text">
              {this.assistiveText}
            </span>
            {this.textarea && this.maxlength && (
              <span data-testid="character-count" class="character-count">
                {this.characterCount}/{this.maxlength}
              </span>
            )}
          </div>
        )}
      </Host>
    );
  }
}
