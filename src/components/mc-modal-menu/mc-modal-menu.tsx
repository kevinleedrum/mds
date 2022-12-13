import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'mc-modal-menu',
  shadow: false,
})
export class McModalMenu {
  @Prop() heading: string;

  render() {
    return (
      <Host class="flex">
        <nav class="flex flex-col" style={{ width: '13.75rem' }}>
          <header class="h-60 p-20 bg-cover" style={{ backgroundImage: 'var(--mc-bg-image-mercury)' }}>
            <h1 class="text-label mb-6 uppercase">{this.heading}</h1>
          </header>
          <ol class="my-10 mx-15 text-body1">
            <li>
              <a class="flex items-center py-12 pr-10 pl-6 rounded cursor-pointer">Item One</a>
            </li>
            <li>
              <a class="active font-bold flex items-center py-12 pr-10 pl-6 rounded cursor-pointer">Item Two</a>
            </li>
            <li>
              <a class="flex items-center py-12 pr-10 pl-6 rounded cursor-pointer">Item Three</a>
            </li>
            <li>
              <a class="flex items-center py-12 pr-10 pl-6 rounded cursor-pointer">Item Four</a>
            </li>
            <li>
              <a class="flex items-center py-12 pr-10 pl-6 rounded cursor-pointer">Item One</a>
            </li>
            <li>
              <a class="flex items-center py-12 pr-10 pl-6 rounded cursor-pointer">Item Five</a>
            </li>
            <li>
              <a class="flex items-center py-12 pr-10 pl-6 rounded cursor-pointer">Item Six</a>
            </li>
            <li>
              <a class="flex items-center py-12 pr-10 pl-6 rounded cursor-pointer">Item Seven</a>
            </li>
            <li>
              <a class="flex items-center py-12 pr-10 pl-6 rounded cursor-pointer">Item Eight</a>
            </li>
          </ol>
        </nav>
        <slot></slot>
      </Host>
    );
  }
}
