import { EventEmitter } from '../../stencil-public-runtime';
export declare class MxToggleButtonGroup {
  value: any;
  /** Set to `true` to prevent deselecting once a selection has been made. */
  required: boolean;
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
