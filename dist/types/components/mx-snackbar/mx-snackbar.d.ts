/// <reference types="node" />
import { EventEmitter } from '../../stencil-public-runtime';
export declare class MxSnackbar {
  alertEl: HTMLElement;
  durationTimer: NodeJS.Timeout;
  queueItem: {
    resolve: Function;
    reject: Function;
  };
  duration: number;
  isOpen: boolean;
  isVisible: boolean;
  element: HTMLMxSnackbarElement;
  mxClose: EventEmitter<void>;
  toggleSnackbar(): Promise<void>;
  waitForOtherSnackbars(): Promise<void>;
  removeFromQueue(): void;
  close(): Promise<void>;
  get alertClass(): string;
  render(): any;
}
