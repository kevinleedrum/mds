import { Component, Host, h, Prop, Listen, Element } from '@stencil/core';

@Component({
  tag: 'mx-tabs',
  shadow: false,
})
export class MxTabs {
  /** Stretch tabs to fill the entire width */
  @Prop() fill: boolean = false;

  @Element() element: HTMLMxTabsElement;

  // Listen to keyup and mouseup so we can get the selected tab before the click event changes it
  @Listen('keyup')
  onKeyUp(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') this.animateIndicator(e);
  }
  @Listen('mouseup')
  onMouseUp(e: MouseEvent) {
    this.animateIndicator(e);
  }

  animateIndicator(e: MouseEvent | KeyboardEvent) {
    // Find the distance between the clicked tab and the soon-to-be-deselected tab
    const currentSelectedTab = this.element.querySelector('mx-tab[selected]') as HTMLMxTabElement;
    const clickedTab = (e.target as HTMLElement).parentElement as HTMLMxTabElement;
    if (!currentSelectedTab || !clickedTab || clickedTab.tagName !== 'MX-TAB') return;
    const distance = currentSelectedTab.offsetLeft - clickedTab.offsetLeft;
    const indicator = clickedTab.querySelector('.active-tab-indicator') as HTMLElement;
    if (!indicator) return;
    // Position clicked tab's indicator under the tab that is being deselected
    indicator.style.transform = `translateX(${distance}px)`;
    indicator.style.transition = `none`;
    // Transition the indicator back to the clicked tab
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
