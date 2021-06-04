import { Component, Host, h, Prop, Listen, Element, Watch, Event, EventEmitter } from '@stencil/core';
import { queryPrefersReducedMotion } from '../../utils/utils';

@Component({
  tag: 'mx-tabs',
  shadow: false,
})
export class MxTabs {
  /** Stretch tabs to fill the entire width */
  @Prop() fill: boolean = false;
  /** The index of the selected tab (not needed if manually setting the `selected` prop on each tab) */
  @Prop() value: number = null;

  /** Emits the clicked tab's index as `Event.detail` */
  @Event() mxChange: EventEmitter<number>;

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

  // Get the clicked tab's index and emit it via the mxChange event
  @Listen('click')
  onClick(e: MouseEvent) {
    const tab: HTMLMxTabElement = (e.target as HTMLElement).closest('mx-tab');
    if (!tab) return;
    const tabs = this.element.querySelectorAll('mx-tab');
    const tabIndex = Array.prototype.indexOf.call(tabs, tab);
    if (tabIndex >= 0) this.mxChange.emit(tabIndex);
  }

  @Watch('value')
  onValueChange() {
    this.animateIndicator(null, this.value);
    this.setSelectedTab();
  }

  connectedCallback() {
    if (this.value !== null) this.setSelectedTab();
  }

  setSelectedTab() {
    const tabs = this.element.querySelectorAll('mx-tab');
    tabs.forEach((tab: HTMLMxTabElement, index) => {
      tab.selected = index === this.value;
    });
  }

  animateIndicator(e: MouseEvent | KeyboardEvent, newSelectedTabIndex?: number) {
    if (queryPrefersReducedMotion()) return;
    if (this.value !== null && this.value === newSelectedTabIndex) return; // no need to animate
    // Find the distance between the clicked tab and the soon-to-be-deselected tab
    const currentSelectedTab = this.element.querySelector('mx-tab[selected]') as HTMLMxTabElement;
    let clickedTab: HTMLMxTabElement;
    if (e) {
      clickedTab = (e.target as HTMLElement).closest('mx-tab');
    } else if (newSelectedTabIndex >= 0) {
      const tabs = this.element.querySelectorAll('mx-tab');
      clickedTab = tabs[newSelectedTabIndex];
    }
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
