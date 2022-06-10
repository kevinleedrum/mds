import { Component, Host, h, Prop, Listen, Element, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'mx-toggle-button-group',
  shadow: false,
})
export class MxToggleButtonGroup {
  @Prop({ mutable: true }) value: any;
  /** Set to `true` to prevent deselecting once a selection has been made. */
  @Prop() required = false;

  @Watch('value')
  onValueChange() {
    this.updateChildButtons();
  }

  @Element() private element: HTMLElement;

  /** Emits the updated value as event.detail */
  @Event() mxInput: EventEmitter<any>;

  connectedCallback() {
    this.updateChildButtons();
  }

  @Listen('click')
  onToggleButtonClick(e: MouseEvent) {
    const toggleButton: HTMLMxToggleButtonElement = (e.target as HTMLElement).closest('mx-toggle-button');
    if (!toggleButton || toggleButton.disabled) return;
    this.toggleValue(toggleButton.value);
    this.mxInput.emit(this.value);
  }

  toggleValue(value: any) {
    if (this.value !== value) this.value = value;
    else if (!this.required) this.value = null;
  }

  updateChildButtons() {
    const buttons: NodeListOf<HTMLMxToggleButtonElement> = this.element.querySelectorAll('mx-toggle-button');
    buttons.forEach(button => (button.selected = button.value === this.value));
  }

  render() {
    return (
      <Host class="inline-flex" role="radiogroup">
        <slot></slot>
      </Host>
    );
  }
}
