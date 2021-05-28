import { Component, Host, h, Prop, Listen, Element } from '@stencil/core';

@Component({
  tag: 'mx-tabs',
  shadow: false,
})
export class MxTabs {
  /** Stretch tabs to fill the entire width */
  @Prop() fill: boolean = false;

  @Element() element: HTMLMxTabsElement;

  @Listen('keyup')
  onKeyUp(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') this.animateIndicator(e);
  }
  @Listen('mouseup')
  onMouseUp(e: MouseEvent) {
    this.animateIndicator(e);
  }

  animateIndicator(e: MouseEvent | KeyboardEvent) {
    const currentSelectedTab = this.element.querySelector('mx-tab[selected]') as HTMLMxTabElement;
    const clickedTab = (e.target as HTMLElement).parentElement as HTMLMxTabElement;
    if (!currentSelectedTab || !clickedTab || clickedTab.tagName !== 'MX-TAB') return;
    const deltaX = currentSelectedTab.offsetLeft - clickedTab.offsetLeft;
    const indicator = clickedTab.querySelector('.active-tab-indicator') as HTMLElement;
    if (!indicator) return;
    indicator.style.transform = `translateX(${deltaX}px)`;
    indicator.style.transition = `none`;
    setTimeout(() => {
      indicator.style.transform = `translateX(0)`;
      indicator.style.transition = `transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)`;
    }, 0);
  }

  get gridClass() {
    let str = this.fill ? 'grid' : 'inline-grid';
    str += ' grid-flow-col auto-cols-fr';
    return str;
  }

  render() {
    return (
      <Host class="mx-tabs relative block" role="tablist">
        <div class={this.gridClass}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
