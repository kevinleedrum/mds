import { Component, Host, h, Prop, Watch, State, Element } from '@stencil/core';
import { propagateDataAttributes, uuidv4 } from '../../utils/utils';

@Component({
  tag: 'mx-select',
  shadow: false,
})
export class MxSelect {
  selectElem!: HTMLSelectElement;
  textArea!: HTMLTextAreaElement;
  uuid: string = uuidv4();
  dataAttributes = {};

  /** Helpful text to show below the select */
  @Prop() assistiveText: string;
  @Prop() dense = false;
  @Prop() disabled = false;
  /** Style with a 1dp elevation */
  @Prop() elevated = false;
  /** Style with a "flat" border color */
  @Prop() flat = false;
  @Prop() label: string;
  @Prop() floatLabel = false;
  /** The aria-label attribute for the inner select element. */
  @Prop() elAriaLabel: string;
  /** Additional classes for the select wrapper (e.g. `min-w-0` to override the default `min-width`) */
  @Prop() selectClass: string;
  /** The `id` attribute for the select element */
  @Prop() selectId: string;
  @Prop() name: string;
  /** Text shown to the left of the arrow */
  @Prop() suffix: string;
  @Prop({ mutable: true, reflect: true }) error = false;
  /** Additional classes for the label */
  @Prop({ mutable: true }) labelClass = '';
  @Prop({ mutable: true }) value: any;

  @State() isFocused = false;

  @Element() element: HTMLMxInputElement;

  componentWillRender = propagateDataAttributes;

  componentDidLoad() {
    this.updateSelectValue();
  }
  @Watch('value')
  onValueChange() {
    this.updateSelectValue();
  }

  updateSelectValue() {
    this.selectElem.value = this.value;
  }

  onFocus() {
    this.isFocused = true;
    this.error = false;
  }

  onBlur() {
    this.isFocused = false;
  }

  onInput(e: InputEvent) {
    this.value = (e.target as HTMLInputElement).value;
  }

  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }

  get selectWrapperClass() {
    let str = 'mx-select-wrapper flex items-center relative rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    if (!this.hasValue) str += ' no-value';
    if (this.elevated) str += ' elevated shadow-1';
    if (this.flat) str += ' flat';
    str += ' border';
    if (this.error) str += ' error';
    if (this.disabled) str += ' disabled';
    if (this.selectClass) str += ' ' + this.selectClass;
    return str;
  }

  get selectElClass() {
    let str =
      'absolute inset-0 w-full pl-16 overflow-hidden outline-none appearance-none bg-transparent cursor-pointer disabled:cursor-auto';
    if (this.isFocused) str += ' -m-1'; // prevent shifting due to border-width change
    return str;
  }

  get labelClassNames() {
    let str = 'block pointer-events-none';
    if (this.floatLabel) {
      str += ' absolute mt-0 left-12 px-4';
      if (this.dense) str += ' dense text-4';
      if (this.isFocused || this.hasValue) str += ' floating';
      if (this.isFocused) str += ' -ml-1'; // prevent shifting due to border-width change
    } else {
      str += ' subtitle2 mb-4';
    }
    return (str += ' ' + this.labelClass);
  }

  get iconSuffixClass() {
    let str = 'icon-suffix absolute flex items-center h-full right-12 space-x-8 pointer-events-none';
    if (this.isFocused) str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }

  get iconEl() {
    let icon = <i data-testid="arrow" class="mds-arrow-triangle-down text-icon"></i>;
    if (this.error) icon = <i data-testid="error-icon" class="mds-warning-circle text-icon"></i>;
    return icon;
  }

  render() {
    const labelJsx = (
      <label htmlFor={this.selectId || this.uuid} class={this.labelClassNames}>
        {this.label}
      </label>
    );
    return (
      <Host class={'mx-select block text-3' + (this.disabled ? ' disabled' : '')}>
        {this.label && !this.floatLabel && labelJsx}

        <div data-testid="select-wrapper" class={this.selectWrapperClass}>
          <select
            aria-label={this.elAriaLabel || this.label}
            class={this.selectElClass}
            disabled={this.disabled}
            id={this.selectId || this.uuid}
            name={this.name}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onInput={this.onInput.bind(this)}
            ref={el => (this.selectElem = el)}
            {...this.dataAttributes}
          >
            <slot></slot>
          </select>

          {this.label && this.floatLabel && labelJsx}

          <span class={this.iconSuffixClass}>
            {this.suffix && <span class="suffix flex items-center h-full px-4">{this.suffix}</span>}
            {this.iconEl}
          </span>
        </div>

        {this.assistiveText && <div class="assistive-text caption1 mt-4 ml-16">{this.assistiveText}</div>}
      </Host>
    );
  }
}
