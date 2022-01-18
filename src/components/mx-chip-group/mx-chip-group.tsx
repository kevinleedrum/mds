import { Component, Host, h, Prop, Listen, Element, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'mx-chip-group',
  shadow: false,
})
export class MxChipGroup {
  @Prop({ mutable: true }) value: any;

  @Watch('value')
  onValueChange() {
    this.updateChildChips();
  }

  @Element() private element: HTMLMxChipGroupElement;

  /** Emits the updated value as event.detail */
  @Event() mxInput: EventEmitter<any>;

  connectedCallback() {
    this.updateChildChips();
  }

  @Listen('click')
  onChipClick(e: MouseEvent) {
    const chip: HTMLMxChipElement = (e.target as HTMLElement).closest('mx-chip');
    if (!chip) return;
    this.toggleValue(chip.value);
    this.mxInput.emit(this.value);
  }

  toggleValue(value: any) {
    if (this.value !== value) this.value = value;
    else this.value = null;
  }

  updateChildChips() {
    const chips: NodeListOf<HTMLMxChipElement> = this.element.querySelectorAll('mx-chip');
    chips.forEach(chip => {
      chip.choice = true;
      chip.clickable = true;
      chip.selected = chip.value === this.value;
    });
  }

  render() {
    return (
      <Host class="inline-flex" role="radiogroup">
        <slot></slot>
      </Host>
    );
  }
}
