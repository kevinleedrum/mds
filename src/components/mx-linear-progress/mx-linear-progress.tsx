import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'mx-linear-progress',
  shadow: false,
})
export class MxLinearProgress {
  delayTimeout;

  /** The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. */
  @Prop() value: number = null;
  /** Delay the appearance of the indicator for this many milliseconds */
  @Prop() appearDelay: number = 0;

  @Element() element: HTMLMxLinearProgressElement;

  connectedCallback() {
    if (!this.appearDelay) return;
    this.element.classList.remove('block');
    this.element.classList.add('hidden');
    this.delayTimeout = setTimeout(() => {
      this.element.classList.remove('hidden');
      this.element.classList.add('block');
    }, this.appearDelay);
  }

  disconnectedCallback() {
    clearTimeout(this.delayTimeout);
  }

  get determinateBarStyle() {
    return {
      transform: `translateX(${this.value - 100}%)`,
      transition: 'transform 0.4s linear',
    };
  }

  render() {
    return (
      <Host
        class="mx-linear-progress block h-4 w-full rounded-sm overflow-hidden pointer-events-none"
        role="progressbar"
        aria-valuenow={this.value != null ? Math.round(this.value) : null}
        aria-valuemin={this.value != null ? 0 : null}
        aria-valuemax={this.value != null ? 100 : null}
      >
        <div class="relative h-full">
          {this.value != null ? (
            // Determinate
            <div
              data-testid="determinate"
              class="fill h-4 absolute inset-0 rounded-sm"
              style={this.determinateBarStyle}
            ></div>
          ) : (
            // Indeterminate has two animated bars with nested animations
            [
              <div data-testid="indeterminate1" class="indeterminate1 absolute h-full w-full">
                <div class="fill absolute w-full h-full rounded-sm"></div>
              </div>,
              <div data-testid="indeterminate2" class="indeterminate2 absolute h-full w-full">
                <div class="fill absolute w-full h-full rounded-sm"></div>
              </div>,
            ]
          )}
        </div>
      </Host>
    );
  }
}
