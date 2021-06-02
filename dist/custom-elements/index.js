import { h, Host, createEvent, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';

const MxBadge$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** Make the corners a little more square (best for standalone text) */
    this.squared = false;
    /** Display as a small dot (no value) */
    this.dot = false;
    /** Offset badge inward by this many pixels (e.g. 10 for icon buttons) */
    this.offset = 0;
    /** Anchor the badge to the bottom of the wrapped content */
    this.bottom = false;
    /** Anchor the badge to the left of the wrapped content */
    this.left = false;
  }
  get isStandalone() {
    return !this.element.firstElementChild;
  }
  get isIconOnly() {
    return this.icon && this.value === undefined;
  }
  get badgeClassNames() {
    let str = 'badge inline-flex items-center justify-center text-sm font-semibold pointer-events-none';
    // Border-Radius
    if (this.dot || this.isIconOnly) {
      str += ' rounded-full';
    }
    else if (this.squared) {
      str += ' rounded';
    }
    else {
      str += ' rounded-xl';
    }
    // Width & Height
    if (this.dot) {
      str += ' w-12 h-12';
    }
    else if (this.isStandalone) {
      str += ' h-24';
      str += this.isIconOnly ? ' w-24' : ' px-8';
    }
    else {
      str += ' h-20';
      str += this.isIconOnly ? ' w-20' : ' px-6';
    }
    // Position Anchored Badge
    if (!this.isStandalone) {
      str += ' absolute transform';
      if (this.bottom) {
        str += ` bottom-${this.offset} translate-y-1/2`;
        str += this.left ? ' origin-bottom-left' : ' origin-bottom-right';
      }
      else {
        str += ` top-${this.offset} -translate-y-1/2`;
        str += this.left ? ' origin-top-left' : ' origin-top-right';
      }
      str += this.left ? ` left-${this.offset} -translate-x-1/2` : ` right-${this.offset} translate-x-1/2`;
    }
    return [str, this.badgeClass].join(' ');
  }
  render() {
    return (h(Host, { class: "mx-badge inline-flex relative" }, h("slot", null), h("span", { class: this.badgeClassNames }, this.icon && h("i", { class: this.icon + (this.isIconOnly ? '' : ' mr-4') }), this.value)));
  }
  get element() { return this; }
};

function ripple(e, elem) {
  let existingRipple = elem.querySelector('.ripple');
  if (existingRipple)
    existingRipple.remove();
  // Create span element
  let ripple = document.createElement('span');
  // Add ripple class to span
  ripple.classList.add('ripple');
  // Add span to the button
  elem.prepend(ripple);
  // Set the size of the span element
  const diameter = Math.max(elem.clientWidth, elem.clientHeight);
  ripple.style.width = ripple.style.height = diameter + 'px';
  // Position the span element
  const elemOffset = elem.getBoundingClientRect();
  // Center over click coords OR over top left corner if activated by keypress
  const left = Math.max(e.clientX - elemOffset.left, 0);
  const top = Math.max(e.clientY - elemOffset.top, 0);
  ripple.style.left = left - diameter / 2 + 'px';
  ripple.style.top = top - diameter / 2 + 'px';
  // Remove span after 0.3s
  setTimeout(() => {
    ripple.remove();
  }, 300);
}

const MxButton$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.btnType = 'contained';
    this.type = 'button';
    this.disabled = false;
    this.xl = false;
    /** Sets display to flex instead of inline-flex */
    this.full = false;
    /** Show chevron icon */
    this.dropdown = false;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (this.btnType !== 'icon')
      ripple(e, this.href ? this.anchorElem : this.btnElem);
  }
  get buttonClass() {
    // The btnType and dropdown classes are only used for colors
    let str = this.btnType;
    if (this.dropdown)
      str += ' dropdown';
    // Common classes
    str += ' flex items-center justify-center relative overflow-hidden cursor-pointer hover:no-underline';
    // Contained & Outlined Buttons
    if (['contained', 'outlined'].includes(this.btnType)) {
      str += ' w-full rounded-lg font-semibold uppercase';
      if (this.btnType === 'outlined')
        str += ' border';
      if (this.xl)
        str += ' h-48 px-32 text-base';
      else
        str += ' h-36 px-16 text-sm';
    }
    // Action Button
    if (this.btnType === 'action') {
      str += ' w-full h-36 px-16 border rounded-3xl text-sm';
    }
    // Text Button
    if (this.btnType === 'text') {
      str += ' w-full h-36 px-8 py-10 text-sm rounded-lg';
      str += this.dropdown ? ' font-normal' : ' font-semibold uppercase';
    }
    // Icon Button
    if (this.btnType === 'icon') {
      str += ' w-48 h-48 rounded-full';
    }
    return str;
  }
  get chevronClass() {
    if (this.btnType === 'text')
      return 'ml-4';
    if (this.btnType === 'icon')
      return 'chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center shadow-1';
    return 'ml-8';
  }
  render() {
    const chevronIcon = (h("svg", { class: "chevron-icon", width: "13", height: "7", viewBox: "0 0 13 7", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M10.8849 0L6.29492 4.58L1.70492 0L0.294922 1.41L6.29492 7.41L12.2949 1.41L10.8849 0Z", fill: "currentColor", "fill-opacity": "0.88" })));
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && h("i", { class: (this.btnType === 'icon' ? 'text-xl ' : 'mr-8 text-base ') + this.icon }), this.btnType !== 'icon' && (h("span", { class: "slot-content" }, h("slot", null))), this.dropdown && this.btnType === 'text' && h("span", { class: "separator inline-block w-1 ml-4 -my-4 h-24" }), this.dropdown && h("span", { class: this.chevronClass }, chevronIcon)));
    return (h(Host, { class: 'mx-button' + (this.full ? ' flex' : ' inline-flex') }, this.href ? (h("a", { href: this.href, target: this.target, class: this.buttonClass, ref: el => (this.anchorElem = el), onClick: this.onClick.bind(this) }, buttonContent)) : (h("button", { type: this.type, value: this.value, class: this.buttonClass, ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled }, buttonContent))));
  }
};

const MxCheckbox$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-checkbox" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm" }, h("input", { class: "absolute h-0 w-0 opacity-0", type: "checkbox", name: this.name, value: this.value, checked: this.checked }), h("span", { class: "flex h-18 w-18 cursor-pointer" }), h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
};

const MxInput$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.type = 'text';
    this.dense = false;
    this.isActive = false;
    this.isFocused = false;
    this.outerContainerClass = '';
    this.labelClass = '';
    this.error = false;
    this.textarea = false;
    this.textareaHeight = '250px';
  }
  connectedCallback() {
    if (this.error) {
      this.isActive = true;
      this.labelClass += ' active error';
    }
    else {
      this.setLabelClass();
    }
  }
  setLabelClass(target = undefined) {
    this.labelClass = '';
    if ((this.leftIcon && !this.isActive) || (this.leftIcon && target && target.value === '')) {
      this.setIndentedLabel();
    }
    if (target && target.value !== '') {
      this.labelClass += ' active';
    }
  }
  setIndentedLabel() {
    this.labelClass += ' indented';
  }
  makeTypeClass() {
    const type = this.dense ? 'dense' : 'standard';
    return `mx-input-wrapper ${type}`;
  }
  handleFocus() {
    this.isActive = true;
    this.isFocused = true;
    this.labelClass = ' active focus';
    this.removeError();
  }
  handleBlur() {
    const workingElem = this.textarea ? this.textArea : this.textInput;
    this.isFocused = false;
    this.setLabelClass(workingElem);
  }
  focusOnInput() {
    const workingElem = this.textarea ? this.textArea : this.textInput;
    workingElem.focus();
  }
  removeError() {
    this.error = false;
    this.containerElem.classList.remove('error');
  }
  returnTaHeight() {
    return { height: this.textareaHeight };
  }
  overrideTextArea() {
    if (!this.textarea)
      return {};
    return { alignItems: 'start' }; // For icon placement.
  }
  isTextarea() {
    return this.textarea ? 'textarea' : '';
  }
  render() {
    return (h(Host, { class: "mx-input" }, h("div", { class: `${this.makeTypeClass()} ${this.isFocused ? 'focused' : ''} ${this.error ? 'error' : ''}`, ref: el => (this.containerElem = el) }, h("div", { class: `mx-input-inner-wrapper ${this.isTextarea()}`, style: this.overrideTextArea() }, this.leftIcon && (h("div", { class: "mds-input-left-content" }, h("i", { class: this.leftIcon }))), this.label && (h("label", { class: this.labelClass, onClick: () => this.focusOnInput() }, this.label)), !this.textarea ? (h("div", { class: "mds-input" }, h("input", { type: this.type, name: this.name, value: this.value, onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), ref: el => (this.textInput = el) }))) : (h("textarea", { style: this.returnTaHeight(), name: this.name, onFocus: () => this.handleFocus(), onBlur: () => this.handleBlur(), ref: el => (this.textArea = el) }, this.value)), (this.rightIcon || this.error) && (h("div", { class: "mds-input-right-content" }, this.error ? h("i", { class: "ph-warning-circle" }) : h("i", { class: this.rightIcon }))))), this.assistiveText && h("div", { class: "assistive-text" }, this.assistiveText)));
  }
};

const MxRadio$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-radio" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm" }, h("input", { class: "absolute h-0 w-0 opacity-0", type: "radio", name: this.name, value: this.value, checked: this.checked }), h("span", { class: "flex h-20 w-20 cursor-pointer rounded-full" }), h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
};

const MxSwitch$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (h(Host, { class: "mx-switch" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-sm w-36 h-14" }, h("input", { class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, checked: this.checked }), h("span", { class: "slider round" }), h("div", { class: "pl-48 inline-block whitespace-nowrap", "data-testid": "labelName" }, this.labelName))));
  }
};

const MxTab$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** Label text to display */
    this.label = '';
    /** If you are not providing a `label`, this should be provided instead for accessibility */
    this.ariaLabel = '';
    /** Class name of icon to display */
    this.icon = '';
    /** Only set this if you are not using the `mx-tabs` `value` prop */
    this.selected = false;
    /** Display a dot badge */
    this.badge = false;
    /** Additional classes for the badge */
    this.badgeClass = '';
  }
  onClick(e) {
    ripple(e, this.btnElem);
  }
  get tabClass() {
    let str = 'mx-tab relative inline-flex items-center justify-center min-w-full';
    str += this.label && this.icon ? ' h-72' : ' h-48';
    if (this.badge && this.label)
      str += ' wider';
    return str;
  }
  get badgeEl() {
    return h("mx-badge", { dot: true, badgeClass: ['w-8 h-8', this.badgeClass].join(' ') });
  }
  render() {
    return (h(Host, { class: this.tabClass }, h("button", { ref: el => (this.btnElem = el), role: "tab", type: "button", "aria-selected": this.selected, "aria-label": this.label || this.ariaLabel, class: "relative overflow-hidden w-full h-full border border-transparent", onClick: this.onClick.bind(this) }, h("div", { class: "relative flex flex-col items-center justify-center space-y-6 pointer-events-none" }, h("span", { class: "flex items-center space-x-6" }, !this.label && this.badge && this.badgeEl, this.icon && h("i", { class: this.icon + ' text-xl' + (!this.label ? ' icon-only' : '') })), this.label && (h("span", { class: "flex items-center uppercase text-sm font-semibold leading-4 tracking-1-25 space-x-6" }, this.badge && this.badgeEl, h("span", null, this.label))))), h("span", { class: 'active-tab-indicator absolute bottom-0 left-0 w-full h-2 pointer-events-none' +
        (this.selected ? '' : ' opacity-0') })));
  }
};

const MxTabContent$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  get isActiveTab() {
    return this.value >= 0 && this.index === this.value;
  }
  render() {
    return (h(Host, { class: !this.isActiveTab ? 'hidden' : '' }, h("slot", null)));
  }
};

const MxTabs$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxChange = createEvent(this, "mxChange", 7);
    /** Stretch tabs to fill the entire width */
    this.fill = false;
    /** The index of the selected tab (not needed if manually setting the `selected` prop on each tab) */
    this.value = null;
  }
  // Listen to keyup and mouseup so we can get the selected tab before the click event changes it
  onKeyUp(e) {
    if (e.key === 'Enter' || e.key === ' ')
      this.animateIndicator(e);
  }
  onMouseUp(e) {
    this.animateIndicator(e);
  }
  // Get the clicked tab's index and emit it via the mxChange event
  onClick(e) {
    const tab = e.target.closest('mx-tab');
    if (!tab)
      return;
    const tabs = this.element.querySelectorAll('mx-tab');
    const tabIndex = Array.prototype.indexOf.call(tabs, tab);
    if (tabIndex >= 0)
      this.mxChange.emit(tabIndex);
  }
  onValueChange() {
    this.animateIndicator(null, this.value);
    this.setSelectedTab();
  }
  connectedCallback() {
    if (this.value !== null)
      this.setSelectedTab();
  }
  setSelectedTab() {
    const tabs = this.element.querySelectorAll('mx-tab');
    tabs.forEach((tab, index) => {
      tab.selected = index === this.value;
    });
  }
  animateIndicator(e, newSelectedTabIndex) {
    if (this.value !== null && this.value === newSelectedTabIndex)
      return; // no need to animate
    // Find the distance between the clicked tab and the soon-to-be-deselected tab
    const currentSelectedTab = this.element.querySelector('mx-tab[selected]');
    let clickedTab;
    if (e) {
      clickedTab = e.target.closest('mx-tab');
    }
    else if (newSelectedTabIndex >= 0) {
      const tabs = this.element.querySelectorAll('mx-tab');
      clickedTab = tabs[newSelectedTabIndex];
    }
    if (!currentSelectedTab || !clickedTab || clickedTab.tagName !== 'MX-TAB')
      return;
    const distance = currentSelectedTab.offsetLeft - clickedTab.offsetLeft;
    const indicator = clickedTab.querySelector('.active-tab-indicator');
    if (!indicator)
      return;
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
    return (h(Host, { class: "mx-tabs relative block", role: "tablist" }, h("div", { class: this.gridClass }, h("slot", null))));
  }
  get element() { return this; }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

const MxToggleButton$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.selected = false;
    this.disabled = false;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    ripple(e, this.btnElem);
  }
  render() {
    return (h(Host, { class: "mx-toggle-button inline-flex overflow-hidden border-l\n      first-of-type:border-l-0 first-of-type:rounded-tl first-of-type:rounded-bl\n      last-of-type:rounded-tr last-of-type:rounded-br" }, h("button", { class: 'btn-toggle inline-flex relative items-center justify-center w-48 h-48 text-xl overflow-hidden cursor-pointer' +
        (this.selected ? ' selected' : ''), ref: el => (this.btnElem = el), "aria-disabled": this.disabled, role: this.value === undefined ? 'switch' : 'radio', "aria-checked": this.selected, onClick: this.onClick.bind(this) }, h("i", { class: this.icon }))));
  }
};

const MxToggleButtonGroup$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxInput = createEvent(this, "mxInput", 7);
  }
  onValueChange() {
    this.updateChildButtons();
  }
  connectedCallback() {
    this.updateChildButtons();
  }
  onToggleButtonClick(e) {
    const toggleButton = e.target.closest('mx-toggle-button');
    if (!toggleButton)
      return;
    this.toggleValue(toggleButton.value);
    this.mxInput.emit(this.value);
  }
  toggleValue(value) {
    if (this.value !== value)
      this.value = value;
    else
      this.value = null;
  }
  updateChildButtons() {
    const buttons = this.element.querySelectorAll('mx-toggle-button');
    buttons.forEach(button => (button.selected = button.value === this.value));
  }
  render() {
    return (h(Host, { class: "inline-flex", role: "radio-group" }, h("slot", null)));
  }
  get element() { return this; }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

const MxBadge = /*@__PURE__*/proxyCustomElement(MxBadge$1, [4,"mx-badge",{"value":[8],"squared":[4],"dot":[4],"badgeClass":[1,"badge-class"],"icon":[1],"offset":[2],"bottom":[4],"left":[4]}]);
const MxButton = /*@__PURE__*/proxyCustomElement(MxButton$1, [4,"mx-button",{"btnType":[1,"btn-type"],"type":[1],"value":[1],"disabled":[4],"xl":[4],"href":[1],"target":[1],"full":[4],"dropdown":[4],"icon":[1]}]);
const MxCheckbox = /*@__PURE__*/proxyCustomElement(MxCheckbox$1, [0,"mx-checkbox",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]);
const MxInput = /*@__PURE__*/proxyCustomElement(MxInput$1, [0,"mx-input",{"name":[1],"label":[1],"value":[1],"type":[1],"dense":[4],"leftIcon":[1,"left-icon"],"rightIcon":[1,"right-icon"],"isActive":[1028,"is-active"],"isFocused":[1028,"is-focused"],"outerContainerClass":[1,"outer-container-class"],"labelClass":[1025,"label-class"],"error":[1028],"assistiveText":[1,"assistive-text"],"textarea":[4],"textareaHeight":[1025,"textarea-height"]}]);
const MxRadio = /*@__PURE__*/proxyCustomElement(MxRadio$1, [0,"mx-radio",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]);
const MxSwitch = /*@__PURE__*/proxyCustomElement(MxSwitch$1, [0,"mx-switch",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[4]}]);
const MxTab = /*@__PURE__*/proxyCustomElement(MxTab$1, [0,"mx-tab",{"label":[1],"ariaLabel":[1,"aria-label"],"icon":[1],"selected":[516],"badge":[4],"badgeClass":[1,"badge-class"]}]);
const MxTabContent = /*@__PURE__*/proxyCustomElement(MxTabContent$1, [4,"mx-tab-content",{"index":[2],"value":[2]}]);
const MxTabs = /*@__PURE__*/proxyCustomElement(MxTabs$1, [4,"mx-tabs",{"fill":[4],"value":[2]},[[0,"keyup","onKeyUp"],[1,"mouseup","onMouseUp"],[0,"click","onClick"]]]);
const MxToggleButton = /*@__PURE__*/proxyCustomElement(MxToggleButton$1, [0,"mx-toggle-button",{"icon":[1],"selected":[516],"disabled":[4],"value":[8]}]);
const MxToggleButtonGroup = /*@__PURE__*/proxyCustomElement(MxToggleButtonGroup$1, [4,"mx-toggle-button-group",{"value":[1032]},[[0,"click","onToggleButtonClick"]]]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      MxBadge,
  MxButton,
  MxCheckbox,
  MxInput,
  MxRadio,
  MxSwitch,
  MxTab,
  MxTabContent,
  MxTabs,
  MxToggleButton,
  MxToggleButtonGroup
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { MxBadge, MxButton, MxCheckbox, MxInput, MxRadio, MxSwitch, MxTab, MxTabContent, MxTabs, MxToggleButton, MxToggleButtonGroup, defineCustomElements };
