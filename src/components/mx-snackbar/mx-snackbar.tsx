import { Component, Host, h, Element, Watch, Prop, Event, EventEmitter, State } from '@stencil/core';
import { fadeOut, fadeScaleIn } from '../../utils/transitions';

const snackbarQueue: { resolve: any; reject: any }[] = []; // Deferred promises

@Component({
  tag: 'mx-snackbar',
  shadow: false,
})
export class MxSnackbar {
  alertEl: HTMLElement;
  durationTimer: NodeJS.Timeout;
  portal: HTMLElement; // Snackbars are moved to a portal to break out of stacking contexts
  queueItem: { resolve: Function; reject: Function };

  @Prop() duration = 6000;
  @Prop({ mutable: true, reflect: true }) isOpen = false;

  @State() isVisible = false;

  @Element() element: HTMLMxSnackbarElement;

  @Event() mxClose: EventEmitter<void>;

  @Watch('isOpen')
  async toggleSnackbar() {
    clearTimeout(this.durationTimer);
    if (this.isOpen) {
      try {
        await this.waitForOtherSnackbars();
        this.durationTimer = setTimeout(this.close.bind(this), this.duration);
        this.isVisible = true;
        fadeScaleIn(this.alertEl, undefined, 'center');
      } catch (err) {
        // Snackbar was closed programmatically before leaving the queue; do nothing.
      }
    } else {
      this.removeFromQueue();
      this.isVisible = false;
      this.mxClose.emit();
    }
  }

  waitForOtherSnackbars(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.queueItem = { resolve, reject };
      snackbarQueue.push(this.queueItem);
      if (snackbarQueue.length === 1) return resolve();
    });
  }

  removeFromQueue() {
    if (!this.queueItem) return;
    const queueIndex = snackbarQueue.indexOf(this.queueItem);
    snackbarQueue.splice(snackbarQueue.indexOf(this.queueItem), 1);
    if (queueIndex === 0 && snackbarQueue.length > 0) snackbarQueue[0].resolve(); // Show next snackbar in queue
  }

  componentWillLoad() {
    this.createSnackbarPortal();
    this.portal.append(this.element);
  }

  createSnackbarPortal() {
    this.portal = document.querySelector('.snackbar-portal');
    if (this.portal) return;
    this.portal = document.createElement('div');
    this.portal.classList.add('snackbar-portal', 'mds');
    document.body.append(this.portal);
  }

  async close() {
    if (!this.isOpen) return;
    await fadeOut(this.alertEl);
    this.isOpen = false;
  }

  get alertClass(): string {
    let str =
      'mx-snackbar-alert flex flex-wrap items-center justify-between rounded-lg text-4 max-w-360 sm:w-360 shadow-6 px-16 py-14';
    return str;
  }

  render() {
    return (
      <Host class={'flex fixed w-full z-50 left-0 bottom-40 px-16 justify-center' + (this.isVisible ? '' : ' hidden')}>
        <div ref={el => (this.alertEl = el)} role="alert" class={this.alertClass}>
          <p class="my-0">
            <slot></slot>
          </p>
          <div class="ml-auto" onClick={this.close.bind(this)}>
            <slot name="action"></slot>
          </div>
        </div>
      </Host>
    );
  }
}