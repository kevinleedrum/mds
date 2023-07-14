import { Component, Host, h, Prop, Element, Watch, Event, Listen, EventEmitter, State } from '@stencil/core';
import { IMxTabProps } from '../mx-tab/mx-tab';
import { queryPrefersReducedMotion } from '../../utils/utils';
import { MinWidths, minWidthSync } from '../../utils/minWidthSync';

@Component({
  tag: 'mx-tabs',
  shadow: false,
})
export class MxTabs {
  /** Stretch tabs to fill the entire width */
  @Prop() fill = false;
  /** The index of the selected tab */
  @Prop() value: number = null;
  /** An array of objects for each tab (see Tab Properties) */
  @Prop() tabs!: IMxTabProps[];

  @State() minWidths = new MinWidths();

  /** Emits the newly selected tab's index as `Event.detail` */
  @Event() mxChange: EventEmitter<number>;

  @Element() element: HTMLMxTabsElement;

  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }

  @Watch('value')
  animateIndicator(tabIndex, previousTabIndex) {
    if (queryPrefersReducedMotion()) return;
    if (tabIndex == null || previousTabIndex == null) return;
    // Find the distance between the clicked tab and the soon-to-be-deselected tab
    const tabEls = this.element.querySelectorAll('.mx-tab');
    const previousSelectedTab = tabEls[previousTabIndex] as HTMLElement;
    const newSelectedTab = tabEls[tabIndex] as HTMLElement;
    if (!previousSelectedTab || !newSelectedTab) return;
    const distance = previousSelectedTab.offsetLeft - newSelectedTab.offsetLeft;
    const scaleX = previousSelectedTab.offsetWidth / newSelectedTab.offsetWidth;
    const indicator = newSelectedTab.querySelector('.active-tab-indicator') as HTMLElement;
    if (!indicator) return;
    // Position clicked tab's indicator under the tab that is being deselected
    indicator.style.transform = `translateX(${distance}px) scale3d(${scaleX}, 1, 1)`;
    indicator.style.transformOrigin = 'left';
    indicator.style.transition = `none`;
    // Transition the indicator back to the clicked tab
    setTimeout(() => {
      indicator.style.transform = `translateX(0) scale3d(1, 1, 1)`;
      indicator.style.transition = `transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)`;
    }, 0);
  }

  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }

  // Get the clicked tab's index and emit it via the mxChange event
  @Listen('click')
  onClick(e: MouseEvent) {
    const tab = (e.target as HTMLElement).closest('.mx-tab');
    if (!tab) return;
    const tabs = this.element.querySelectorAll('.mx-tab');
    const tabIndex = Array.prototype.indexOf.call(tabs, tab);
    if (tabIndex >= 0) this.mxChange.emit(tabIndex);
  }

  // When rendered as an mx-select, emit the select element's value via the mxChange event
  onInput(e: InputEvent) {
    this.mxChange.emit(+(e.target as HTMLSelectElement).value);
  }

  // When true, render the tabs as an mx-select
  get renderAsSelect() {
    return !this.minWidths.md && this.tabs && this.tabs.length > 2;
  }

  get gridClass() {
    let str = this.fill ? 'grid' : 'inline-grid';
    str += ' grid-flow-col auto-cols-auto';
    return str;
  }

  render() {
    return (
      <Host class="mx-tabs relative block" role="tablist">
        {this.renderAsSelect ? (
          <mx-select value={this.value} onInput={this.onInput.bind(this)} dense>
            {this.tabs.map((tab: IMxTabProps, index: number) => (
              <option value={index}>{tab.label || tab.elAriaLabel}</option>
            ))}
          </mx-select>
        ) : (
          this.tabs && (
            <div class={this.gridClass}>
              {this.tabs.map((tab: IMxTabProps, index: number) => (
                <mx-tab selected={this.value === index} {...tab} />
              ))}
            </div>
          )
        )}
      </Host>
    );
  }
}
