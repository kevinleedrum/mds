import { Component, Host, h, Prop, State, Watch, Element } from '@stencil/core';
import { uuidv4, propagateDataAttributes } from '../../utils/utils';

export interface IMxBlockInputProps {
  assistiveText: string;
  colspan: number;
  disabled: boolean;
  error: boolean;
  inputId: string;
  label: string;
  maxlength: number;
  name: string;
  placeholder: string;
  readonly: boolean;
  type: string;
  value: string;
}

@Component({
  tag: 'mx-block-input',
  shadow: false,
})
export class MxBlockInput implements IMxBlockInputProps {
  dataAttributes = {};
  textInput!: HTMLInputElement;
  textArea!: HTMLTextAreaElement;
  uuid: string = uuidv4();

  @Prop() assistiveText: string;
  @Prop() colspan: number;
  @Prop() disabled = false;
  @Prop({ mutable: true, reflect: true }) error = false;
  @Prop() inputId: string;
  @Prop() label: string;
  @Prop() maxlength: number;
  @Prop() name: string;
  @Prop() placeholder: string;
  @Prop() readonly = false;
  @Prop() type = 'text';
  @Prop({ mutable: true }) value: string;

  @State() isFocused = false;
  @State() characterCount = 0;

  @Element() element: HTMLMxBlockInputElement;

  componentWillRender = propagateDataAttributes;

  componentDidLoad() {
    this.updateValue();
  }

  @Watch('value')
  onValueChange() {
    this.updateValue();
  }

  updateValue() {
    this.textInput.value = this.hasValue ? this.value : '';
  }

  onFocus() {
    this.isFocused = true;
    this.error = false;
  }

  onBlur() {
    this.isFocused = false;
  }

  onContainerClick() {
    if (!this.disabled && !this.readonly) this.textInput.focus();
  }

  onInput(e: InputEvent) {
    this.characterCount = (e.target as HTMLInputElement).value.length;
    this.value = (e.target as HTMLInputElement).value;
  }

  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }

  get hostClass() {
    let str = 'mx-block-input';
    // for now we want to allow up to 6 columns
    if (this.colspan > 0 && this.colspan < 7) {
      str += ' col-span-' + this.colspan;
    }
    return str;
  }

  get containerClass() {
    let str = 'mx-block-input-container';
    if (this.error) str += ' error';
    return str;
  }

  render() {
    return (
      <Host class={this.hostClass}>
        <div class={this.containerClass} onClick={this.onContainerClick.bind(this)}>
          <label htmlFor={this.inputId || this.uuid}>
            {this.label}
            {this.assistiveText && <span id={this.inputId || this.uuid + '-assistive'}>{this.assistiveText}</span>}
          </label>
          <input
            aria-describedby={this.assistiveText ? this.inputId || this.uuid + '-assistive' : null}
            disabled={this.disabled}
            id={this.inputId || this.uuid}
            maxlength={this.maxlength}
            name={this.name}
            onBlur={this.onBlur.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onInput={this.onInput.bind(this)}
            placeholder={this.placeholder}
            readonly={this.readonly}
            ref={el => (this.textInput = el as HTMLInputElement)}
            type={this.type}
            value={this.value}
            {...this.dataAttributes}
          />
        </div>
      </Host>
    );
  }
}
