import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mc-modal-nav',
  shadow: false,
})
export class McModalNav {
  @Prop() heading: string;

  render() {
    return (
      <Host class="flex">
        <nav class="flex flex-col" style={{ width: '13.75rem' }}>
          <header class="h-60 p-20 bg-cover" style={{ backgroundImage: 'var(--mc-bg-image-mercury)' }}>
            <h1 class="text-label mb-6 uppercase">{this.heading}</h1>
          </header>
          <ol class="my-10 mx-15 text-body1">
            <slot></slot>
          </ol>
        </nav>
      </Host>
    );
  }
}
