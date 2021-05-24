import { EventEmitter } from '../../stencil-public-runtime';
export declare class MxToggleButtonGroup {
  value: any;
  onValueChange(): void;
  private element;
  /** Emits the updated value as event.detail */
  mxInput: EventEmitter<any>;
  connectedCallback(): void;
  onToggleButtonClick(e: MouseEvent): void;
  toggleValue(value: any): void;
  updateChildButtons(): void;
  render(): any;
}
