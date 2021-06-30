import { EventEmitter } from '../../stencil-public-runtime';
export declare class MxChipGroup {
  value: any;
  onValueChange(): void;
  private element;
  /** Emits the updated value as event.detail */
  mxInput: EventEmitter<any>;
  connectedCallback(): void;
  onChipClick(e: MouseEvent): void;
  toggleValue(value: any): void;
  updateChildChips(): void;
  render(): any;
}
