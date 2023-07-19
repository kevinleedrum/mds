import { Component, Host, h, Prop, State, Watch, Element } from '@stencil/core';
import { uuidv4, propagateDataAttributes } from '../../utils/utils';

export interface IMxInputProps {
  name: string;
  inputId: string;
  label: string;
  placeholder: string;
  value: string;
  type: string;
  dense: boolean;
  disabled: boolean;
  readonly: boolean;
  maxlength: number;
  leftIcon: string | MxInputIcon[];
  rightIcon: string | MxInputIcon[];
  suffix: string;
  outerContainerClass: string;
  labelClass: string;
  error: boolean;
  assistiveText: string;
  floatLabel: boolean;
  textarea: boolean;
  textareaHeight: string;
  elAriaLabel: string;
  hideCharacterCount: boolean;
  step: string;
}

export type MxInputIcon = {
  /** The class name of the icon */
  icon: string;
  /** If providing an `onClick` handler, this will be used for the rendered button's aria-label */
  ariaLabel?: string;
  /** A click handler for the icon. If provided, the icon will be wrapped in a <button> element */
  onClick?: (event: MouseEvent) => void;
};

@Component({
  tag: 'mx-input',
  shadow: false,
})
export class MxInput implements IMxInputProps {
  dataAttributes = {};
  textInput!: HTMLInputElement;
  textArea!: HTMLTextAreaElement;
  uuid: string = uuidv4();

  /** The `name` attribute for the text input */
  @Prop() name: string;
  /** The `id` attribute for the text input */
  @Prop() inputId: string;
  /** Text for the label element */
  @Prop() label: string;
  /** Placeholder text for the input.  This will be ignored if `floatLabel` is `true`. */
  @Prop() placeholder: string;
  @Prop({ mutable: true }) value: string;
  /** The `type` attribute for the text input */
  @Prop() type = 'text';
  @Prop() dense = false;
  @Prop() disabled = false;
  @Prop() readonly = false;
  @Prop() maxlength: number;
  /** The class name of the icon to show on the left side of the input, _or_ an array of objects specifying an `icon`, `ariaLabel`, and `onClick` handler */
  @Prop() leftIcon: string | MxInputIcon[];
  /** The class name of the icon to show on the right side of the input, _or_ an array of objects specifying an `icon`, `ariaLabel`, and `onClick` handler */
  @Prop() rightIcon: string | MxInputIcon[];
  /** Text shown to the right of the input value */
  @Prop() suffix: string;
  @Prop() outerContainerClass = '';
  @Prop({ mutable: true }) labelClass = '';
  @Prop({ mutable: true, reflect: true }) error = false;
  @Prop() assistiveText: string;
  @Prop() floatLabel = false;
  /** Display a multi-line `textarea` instead of an `input` */
  @Prop() textarea = false;
  @Prop({ mutable: true }) textareaHeight = '15.625rem';
  /** The aria-label attribute for the inner input element. */
  @Prop() elAriaLabel: string;
  /** Set to `true` to hide the character count when a `maxlength` is set. */
  @Prop() hideCharacterCount = false;
  @Prop() step: string;

  @State() isFocused = false;
  @State() characterCount = 0;

  @Element() element: HTMLMxInputElement;

  connectedCallback() {
    this.characterCount = this.hasValue ? this.value.length : 0;
  }

  componentWillRender = propagateDataAttributes;

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

  onContainerClick() {
    if (!this.disabled && !this.readonly) this.workingElem.focus();
  }

  onInput(e: InputEvent) {
    this.characterCount = (e.target as HTMLInputElement).value.length;
    this.value = (e.target as HTMLInputElement).value;
  }

  getIconJsx(icon: MxInputIcon) {
    return icon.onClick ? (
      <button
        type="button"
        class="inline-flex items-center justify-center cursor-pointer"
        aria-label={icon.ariaLabel}
        onClick={icon.onClick}
      >
        <i class={icon.icon}></i>
      </button>
    ) : (
      <i class={icon.icon + ' pointer-events-none'}></i>
    );
  }

  get workingElem() {
    return this.textarea ? this.textArea : this.textInput;
  }

  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }

  get containerClass() {
    let str = 'mx-input-wrapper flex items-center relative rounded-lg';
    if (!this.textarea) {
      str += this.dense ? ' h-36' : ' h-48';
    }
    str += ' border';
    if (this.error) str += ' error';
    if (this.disabled) str += ' disabled';
    if (this.readonly) str += ' readonly';
    return str;
  }

  get inputClass() {
    let str = 'flex-1 outline-none appearance-none bg-transparent';
    if (!this.textarea) {
      str += ' px-16 overflow-hidden';
    } else {
      str += ' p-16 overflow-y-auto resize-none';
    }
    if (this.isFocused || this.error) str += this.leftIcon ? ' -mr-1' : ' -m-1'; // prevent shifting due to border-width change
    return str;
  }

  get labelClassNames() {
    let str = 'block whitespace-nowrap pointer-events-none';
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
    let str = 'flex items-center h-full pl-16 space-x-16';
    if (this.isFocused || this.error) str += ' -ml-1'; // prevent shifting due to border-width change
    return str;
  }

  get rightContentClass() {
    let str = 'icon-suffix flex items-center h-full pr-16 space-x-8';
    if (this.isFocused || this.error) str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }

  get textareaClass() {
    return this.textarea ? ' textarea items-start' : '';
  }

  get leftIcons(): MxInputIcon[] {
    if (typeof this.leftIcon === 'string') return [{ icon: this.leftIcon }];
    return this.leftIcon;
  }

  get rightIcons(): MxInputIcon[] {
    if (typeof this.rightIcon === 'string') return [{ icon: this.rightIcon }];
    return this.rightIcon;
  }

  render() {
    const labelJsx = (
      <label htmlFor={this.inputId || this.uuid} class={this.labelClassNames}>
        {this.label}
      </label>
    );
    return (
      <Host class={'mx-input block text-3' + (this.disabled ? ' disabled' : '')}>
        {this.label && !this.floatLabel && labelJsx}

        <div class={this.containerClass} onClick={this.onContainerClick.bind(this)}>
          {this.leftIcon && <div class={this.leftIconWrapperClass}>{this.leftIcons.map(this.getIconJsx)}</div>}

          {this.label && this.floatLabel && labelJsx}

          {!this.textarea ? (
            <input
              type={this.type}
              class={this.inputClass}
              name={this.name}
              id={this.inputId || this.uuid}
              value={this.value}
              placeholder={this.floatLabel ? null : this.placeholder}
              aria-label={this.elAriaLabel || this.placeholder}
              maxlength={this.maxlength}
              disabled={this.disabled}
              readonly={this.readonly}
              step={this.step}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              onInput={this.onInput.bind(this)}
              ref={el => (this.textInput = el as HTMLInputElement)}
              {...this.dataAttributes}
            />
          ) : (
            <textarea
              class={this.inputClass}
              style={{ height: this.textareaHeight }}
              name={this.name}
              id={this.inputId || this.uuid}
              placeholder={this.floatLabel ? null : this.placeholder}
              maxlength={this.maxlength}
              disabled={this.disabled}
              readonly={this.readonly}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              onInput={this.onInput.bind(this)}
              ref={el => (this.textArea = el as HTMLTextAreaElement)}
              {...this.dataAttributes}
            >
              {this.value}
            </textarea>
          )}

          {!this.textarea && (this.maxlength || this.suffix || this.error || this.rightIcon) && (
            <span class={this.rightContentClass}>
              {this.maxlength && !this.hideCharacterCount && (
                <span data-testid="character-count" class="character-count pointer-events-none">
                  {this.characterCount}/{this.maxlength}
                </span>
              )}
              {this.suffix && (
                <span data-testid="suffix" class="suffix flex items-center h-full px-4 pointer-events-none">
                  {this.suffix}
                </span>
              )}
              {this.error && <i class="mds-warning-circle text-icon pointer-events-none"></i>}
              {this.rightIcon && !this.error && (
                <span class="flex items-center space-x-16">{this.rightIcons.map(this.getIconJsx)}</span>
              )}
            </span>
          )}
        </div>

        {(this.assistiveText || (this.textarea && this.maxlength && !this.hideCharacterCount)) && (
          <div class="flex justify-between caption1 mt-4 ml-16 space-x-32">
            <span data-testid="assistive-text" class="assistive-text">
              {this.assistiveText}
            </span>
            {this.textarea && this.maxlength && !this.hideCharacterCount && (
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
