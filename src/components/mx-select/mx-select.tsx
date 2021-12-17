import { Component, Host, h, Prop, Watch, State, Element } from '@stencil/core';
import arrowSvg from '../../assets/svg/arrow-triangle-down.svg';
import warningCircleSvg from '../../assets/svg/warning-circle.svg';
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
  @Prop() dense: boolean = false;
  @Prop() disabled: boolean = false;
  /** Style with a 1dp elevation */
  @Prop() elevated: boolean = false;
  /** Style with a "flat" border color */
  @Prop() flat: boolean = false;
  @Prop() label: string;
  @Prop() floatLabel: boolean = false;
  @Prop() ariaLabel: string;
  /** The `id` attribute for the select element */
  @Prop() selectId: string;
  @Prop() name: string;
  /** Text shown to the left of the arrow */
  @Prop() suffix: string;
  @Prop({ mutable: true }) error: boolean = false;
  /** Additional classes for the label */
  @Prop({ mutable: true }) labelClass: string = '';
  @Prop({ mutable: true }) value: any;

  @State() isFocused: boolean = false;

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
    str += this.error || this.isFocused ? ' border-2' : ' border';
    if (this.error) str += ' error';
    if (this.disabled) str += ' disabled';
    return str;
  }

  get selectClass() {
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
    let str = 'icon-suffix absolute flex items-center h-full right-16 space-x-8 pointer-events-none';
    if (this.isFocused) str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }

  get iconEl() {
    let icon = <span data-testid="arrow" innerHTML={arrowSvg}></span>;
    if (this.error) icon = <span data-testid="error-icon" innerHTML={warningCircleSvg}></span>;
    return icon;
  }

  render() {
    const labelJsx = (
      <label htmlFor={this.selectId || this.uuid} class={this.labelClassNames}>
        {this.label}
      </label>
    );
    return (
      <Host class={'mx-select' + (this.disabled ? ' disabled' : '')}>
        {this.label && !this.floatLabel && labelJsx}

        <div data-testid="select-wrapper" class={this.selectWrapperClass}>
          <select
            aria-label={this.label || this.ariaLabel}
            class={this.selectClass}
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
