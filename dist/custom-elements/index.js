import { h, Host, createEvent, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';

const circleSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
  <circle cx="6" cy="6" r="6" fill="currentColor"/>
</svg>`;

const hexagonSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M6 0L11.1962 3V9L6 12L0.803848 9V3L6 0Z" fill="currentColor"/>
</svg>`;

const squareSvg = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
  <rect width="10" height="10" fill="currentColor"/>
</svg>`;

const starSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M6 0.5L7.76336 4.07295L11.7063 4.6459L8.85317 7.42705L9.52671 11.3541L6 9.5L2.47329 11.3541L3.14683 7.42705L0.293661 4.6459L4.23664 4.07295L6 0.5Z" fill="currentColor"/>
</svg>`;

const triangleDownSvg = `<svg width="12" height="10" viewBox="0 0 12 10" fill="none">
  <path d="M6.00011 10L12 0H0L6.00011 10Z" fill="currentColor"/>
</svg>`;

const triangleUpSvg = `<svg width="12" height="10" viewBox="0 0 12 10" fill="none">
  <path d="M6.00011 0L12 10H0L6.00011 0Z" fill="currentColor"/>
</svg>`;

const MxBadge$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** Make the corners a little more square (best for standalone text) */
    this.squared = false;
    /** Offset badge inward by this many pixels (e.g. 10 for icon buttons) */
    this.offset = 0;
    /** Anchor the badge to the bottom of the wrapped content */
    this.bottom = false;
    /** Anchor the badge to the left of the wrapped content */
    this.left = false;
  }
  get indicatorSvg() {
    if (this.indicator === 'star')
      return starSvg;
    if (this.indicator === 'triangle-down')
      return triangleDownSvg;
    if (this.indicator === 'hexagon')
      return hexagonSvg;
    if (this.indicator === 'triangle-up')
      return triangleUpSvg;
    if (this.indicator === 'square')
      return squareSvg;
    return circleSvg;
  }
  get isStandalone() {
    return !this.element.firstElementChild;
  }
  get isIconOnly() {
    return this.icon && this.value === undefined;
  }
  get badgeClassNames() {
    let str = 'badge inline-flex items-center justify-center text-4 font-semibold pointer-events-none';
    // Border-Radius
    if (this.isIconOnly) {
      str += ' rounded-full';
    }
    else if (this.squared) {
      str += ' rounded';
    }
    else {
      str += ' rounded-xl';
    }
    // Width & Height
    if (this.indicator != null) {
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
    return (h(Host, { class: "mx-badge inline-flex relative" }, h("slot", null), this.indicator != null ? (h("span", { class: this.badgeClassNames, "data-testid": 'indicator-' + (this.indicator || 'circle'), innerHTML: this.indicatorSvg })) : (h("span", { class: this.badgeClassNames }, this.icon && h("i", { class: this.icon + (this.isIconOnly ? '' : ' mr-4') }), this.value))));
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

const chevronSvg = `<svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M10.8849 0L6.29492 4.58L1.70492 0L0.294922 1.41L6.29492 7.41L12.2949 1.41L10.8849 0Z"
    fill="currentColor"
    fill-opacity="0.88"
  />
</svg>
`;

// https://github.com/ionic-team/capacitor/blob/b893a57aaaf3a16e13db9c33037a12f1a5ac92e0/cli/src/util/uuid.ts
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
function queryPrefersReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery || mediaQuery.matches;
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function isDateObject(val) {
  if (typeof val !== 'object')
    return false;
  return 'getTime' in val && !isNaN(val.getTime()); // "Invalid Date" objects return NaN for getTime()
}
/** Converts a time string such as "15:30" or "3:30PM" into `{ hours: 15, minutes: 30 }` */
/** @returns Time object, or `null` if the string could not be parsed as a valid time */
function parseTimeString(str) {
  if (str == null || str.trim() === '')
    return;
  const isExplicitAM = str.toLowerCase().includes('a');
  const isExplicitPM = str.toLowerCase().includes('p');
  let digits = str.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  if (!digits.length || digits.length > 4)
    return null;
  // If only 1 or 2 digits entered, assume only an hour was entered
  let hours = digits.length <= 2 ? Number(digits) : Number(digits.slice(0, -2));
  const minutes = digits.length <= 2 ? 0 : Number(digits.slice(-2));
  if (hours === 12 && isExplicitAM)
    hours = 0; // '12:00AM' -> 0 hours
  if (hours < 12 && isExplicitPM)
    hours += 12; // '2:00PM' -> 14 hours
  if (hours > 23 || minutes > 59)
    return null;
  return { hours, minutes };
}
/** Returns the `clientX`, `clientY`, `pageX`, `pageY` from any MouseEvent or TouchEvent. */
function getCursorCoords(e) {
  if (e.changedTouches)
    return e.changedTouches[0];
  else if (e.touches)
    return e.touches[0];
  else
    return e;
}
/** Returns a DOMRect for an element similar to getBoundingClientRect, however the
 * position ignores CSS transforms and accounts for scrolling. */
function getPageRect(el) {
  const { height, width } = el.getBoundingClientRect();
  let top = 0;
  let left = 0;
  do {
    top += el.offsetTop;
    left += el.offsetLeft;
    el = el.offsetParent;
  } while (el);
  return { top, left, width, height, bottom: top + height, right: left + width };
}
/** Return the client boundaries of an element (or the window) */
function getBounds(container) {
  if (container === window) {
    return { top: 0, right: window.innerWidth, bottom: window.innerHeight, left: 0 };
  }
  return container.getBoundingClientRect();
}
/** Determines whether an element needs to be scrolled into view */
function isScrolledOutOfView(el) {
  const bounds = el.getBoundingClientRect(); // getBoundingClientRect accounts for CSS translate
  const scrollBounds = getBounds(getScrollingParent(el));
  if (bounds.top < scrollBounds.top)
    return true;
  if (bounds.bottom > scrollBounds.bottom)
    return true;
  if (bounds.left < scrollBounds.left)
    return true;
  if (bounds.left > scrollBounds.right)
    return true; // It's okay if the right edge is out of bounds
  return false;
}
/** Get the nearest scrolling ancestor, which could be the window */
function getScrollingParent(el) {
  if (!(el instanceof HTMLElement))
    return window;
  if (isScrollable(el))
    return el;
  return getScrollingParent(el.parentNode);
}
function isScrollable(el) {
  const computedStyle = window.getComputedStyle(el);
  const overflowRegex = /(auto|scroll)/;
  const properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.find(property => overflowRegex.test(computedStyle[property]));
}
/** Remove data attributes from the host element, and store them in this.dataAttributes,
 * so they can be applied to the native element in the render function. */
function propagateDataAttributes() {
  Object.keys(this.element.dataset).forEach(key => {
    this.dataAttributes['data-' + key] = this.element.dataset[key];
    this.element.removeAttribute(`data-${key}`);
  });
}

const MxButton$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dataAttributes = {};
    this.btnType = 'contained';
    this.type = 'button';
    this.disabled = false;
    this.xl = false;
    /** Sets display to flex instead of inline-flex */
    this.full = false;
    /** Show chevron icon */
    this.dropdown = false;
    this.componentWillRender = propagateDataAttributes;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    ripple(e, this.href ? this.anchorElem : this.btnElem);
  }
  get buttonClass() {
    // The btnType and dropdown classes are only used for colors
    let str = this.btnType;
    if (this.dropdown)
      str += ' dropdown';
    // Common classes
    str +=
      ' flex items-center justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto hover:no-underline';
    // Contained & Outlined Buttons
    if (['contained', 'outlined'].includes(this.btnType)) {
      str += ' w-full rounded-lg font-semibold uppercase';
      if (this.btnType === 'outlined')
        str += ' border';
      if (this.xl)
        str += ' min-h-48 px-32 text-3 tracking-1-5';
      else
        str += ' min-h-36 px-16 text-4 tracking tracking-1-25';
    }
    // Action Button
    if (this.btnType === 'action') {
      str += ' w-full min-h-36 px-16 border rounded-3xl text-4';
    }
    // Text Button
    if (this.btnType === 'text') {
      str += ' w-full min-h-36 px-8 py-10 text-4 rounded-lg';
      str += this.dropdown ? ' font-normal' : ' font-semibold uppercase tracking-1-25';
    }
    return str;
  }
  render() {
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && h("i", { class: 'mr-8 text-3 ' + this.icon }), h("span", { class: "slot-content" }, h("slot", null)), this.dropdown && this.btnType === 'text' && h("span", { class: "separator inline-block w-1 ml-4 -my-4 h-24" }), this.dropdown && (h("span", { "data-testid": "chevron", class: this.btnType === 'text' ? 'chevron-icon ml-4' : 'ml-8', innerHTML: chevronSvg }))));
    return (h(Host, { class: 'mx-button' + (this.full ? ' flex' : ' inline-flex') }, this.href ? (h("a", { href: this.href, target: this.target, class: this.buttonClass, ref: el => (this.anchorElem = el), onClick: this.onClick.bind(this) }, buttonContent)) : (h("button", Object.assign({ type: this.type, formaction: this.formaction, value: this.value, class: this.buttonClass, ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled }, this.dataAttributes), buttonContent))));
  }
  get element() { return this; }
};

const MxCheckbox$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelLeft = false;
    this.labelName = '';
    this.labelClass = '';
    /** Hide the label text visually, but still make it accessible for screen readers */
    this.hideLabel = false;
    this.checked = false;
    this.disabled = false;
    this.indeterminate = false;
    this.componentWillRender = propagateDataAttributes;
  }
  get checkClass() {
    let str = 'flex h-18 w-18 flex-shrink-0';
    str += this.labelLeft ? ' order-2' : ' order-1';
    if (this.labelLeft && !this.hideLabel)
      str += ' ml-16';
    return str;
  }
  get checkLabelClass() {
    let str = 'checkbox-label inline-block';
    if (this.hideLabel)
      str += ' sr-only';
    str += this.labelLeft ? ' order-1 flex-1' : ' order-2';
    if (!this.labelLeft && !this.hideLabel)
      str += ' ml-16';
    return str;
  }
  /** Keep checked prop in sync with input element attribute */
  onInput(e) {
    this.checked = e.target.checked;
  }
  render() {
    return (h(Host, { class: "mx-checkbox inline-flex items-center" }, h("label", { class: [
        'relative flex-1 inline-flex flex-nowrap align-center items-center text-4' +
          (this.disabled ? '' : ' cursor-pointer'),
        this.labelClass,
      ].join(' ') }, h("input", Object.assign({ class: 'absolute h-0 w-0 opacity-0' + (this.indeterminate ? ' indeterminate' : ''), type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled }, this.dataAttributes, { onInput: this.onInput.bind(this) })), h("span", { class: this.checkClass }), h("div", { class: this.checkLabelClass, "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return this; }
};

const removeSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 10.87L10.87 12L8 9.13L5.13 12L4 10.87L6.87 8L4 5.13L5.13 4L8 6.87L10.87 4L12 5.13L9.13 8L12 10.87ZM8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0Z" fill="currentColor" />
</svg>
`;

const checkSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.18875 12.9387L3.06125 9.81125L2 10.8725L6.18875 15.0612L15.1888 6.06125L14.1275 5L6.18875 12.9387Z" fill="currentColor"/>
</svg>`;

const MxChip$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxRemove = createEvent(this, "mxRemove", 7);
    this.outlined = false;
    this.disabled = false;
    /** Display a checkmark on the left side of the chip */
    this.selected = false;
    /** Use the pointer cursor and show a ripple animation.
     * This does not need to be explicitly set for `choice` or `filter` chips. */
    this.clickable = false;
    /** Show the remove icon on the right */
    this.removable = false;
    /** Style as a choice chip when selected.
     * This is set internally when the chip is wrapped with an `mx-chip-group`. */
    this.choice = false;
    /** Style as a filter chip when selected */
    this.filter = false;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (this.isClickable)
      ripple(e, this.chipElem);
  }
  onKeyDown(e) {
    if (!this.isClickable)
      return;
    // Treat pressing Enter or spacebar as a click (like a button)
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      this.chipElem.click();
    }
  }
  onRemove(e) {
    e.stopPropagation(); // Do not trigger the chip's onClick
    if (this.disabled)
      return;
    this.mxRemove.emit(e);
  }
  get hasLeftIcon() {
    return this.icon || this.avatarUrl || (this.selected && !this.choice);
  }
  get isClickable() {
    return this.clickable || this.choice || this.filter;
  }
  get chipClass() {
    let str = 'h-32 inline-grid items-center outline-none leading-none gap-8 grid-flow-col relative rounded-full text-4 overflow-hidden';
    if (this.choice)
      str += ' choice';
    if (this.filter)
      str += ' filter';
    if (this.outlined)
      str += ' outlined border';
    if (this.isClickable)
      str += ' clickable transform cursor-pointer disabled:cursor-auto';
    str += this.hasLeftIcon ? ' pl-6' : ' pl-12';
    if (!this.removable)
      str += ' pr-12';
    else
      str += this.hasLeftIcon ? ' pr-2' : ' pr-8';
    return str;
  }
  get ariaRole() {
    if (this.choice)
      return 'radio';
    if (this.filter)
      return 'checkbox';
    if (this.clickable)
      return 'button';
    return null;
  }
  get avatarStyle() {
    if (!this.avatarUrl)
      return null;
    const background = `url(${this.avatarUrl}) no-repeat center center`;
    return { background, backgroundSize: 'cover' };
  }
  render() {
    return (h(Host, { class: "mx-chip inline-block" }, h("div", { ref: el => (this.chipElem = el), class: this.chipClass, "aria-checked": this.selected, "aria-disabled": this.disabled, role: this.ariaRole, tabindex: this.isClickable ? '0' : '-1', onClick: this.onClick.bind(this), onKeyDown: this.onKeyDown.bind(this) }, this.hasLeftIcon && (h("div", { style: this.avatarStyle, role: "presentation", "data-testid": "left-icon", class: "left-icon flex items-center justify-center w-24 h-24 rounded-full relative overflow-hidden" }, this.icon && h("i", { class: this.icon + ' text-1' }), this.selected && (h("div", { "data-testid": "check", class: "check flex absolute inset-0 items-center justify-center" }, h("span", { innerHTML: checkSvg }))))), h("span", null, h("slot", null)), this.removable && (h("button", { type: "button", "data-testid": "remove", "aria-label": "Remove", class: "remove inline-flex items-center justify-center w-24 h-24 cursor-pointer", innerHTML: removeSvg, onClick: this.onRemove.bind(this) })))));
  }
};

const MxChipGroup$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxInput = createEvent(this, "mxInput", 7);
  }
  onValueChange() {
    this.updateChildChips();
  }
  connectedCallback() {
    this.updateChildChips();
  }
  onChipClick(e) {
    const chip = e.target.closest('mx-chip');
    if (!chip)
      return;
    this.toggleValue(chip.value);
    this.mxInput.emit(this.value);
  }
  toggleValue(value) {
    if (this.value !== value)
      this.value = value;
    else
      this.value = null;
  }
  updateChildChips() {
    const chips = this.element.querySelectorAll('mx-chip');
    chips.forEach(chip => {
      chip.choice = true;
      chip.clickable = true;
      chip.selected = chip.value === this.value;
    });
  }
  render() {
    return (h(Host, { class: "inline-flex", role: "radio-group" }, h("slot", null)));
  }
  get element() { return this; }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

const DIAMETER = 44;
const THICKNESS = 3.6;
const RADIUS = (DIAMETER - THICKNESS) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const MxCircularProgress$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. */
    this.value = null;
    /** The value to use for the width and height */
    this.size = '3rem';
    /** Delay the appearance of the indicator for this many milliseconds */
    this.appearDelay = 0;
  }
  connectedCallback() {
    if (!this.appearDelay)
      return;
    // Hide indicator until appearDelay duration has passed
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
  get hostStyle() {
    const style = { width: this.size, height: this.size };
    // Determinate
    if (this.value != null)
      style.transform = 'rotate(-90deg)';
    // Indeterminate
    else
      style.animation = 'spin 1.4s linear infinite';
    return style;
  }
  get circleStyle() {
    const style = { stroke: 'currentColor' };
    if (this.value != null) {
      // Determinate
      style.transition = 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      style.strokeDasharray = CIRCUMFERENCE.toFixed(3);
      style.strokeDashoffset = (((100 - this.value) / 100) * CIRCUMFERENCE).toFixed(3) + 'px';
    }
    else {
      // Indeterminate
      style.strokeDasharray = '80px, 200px';
      style.strokeDashoffset = '0';
      style.animation = 'indeterminate 1.4s ease-in-out infinite';
    }
    return style;
  }
  render() {
    return (h(Host, { style: this.hostStyle, class: "mx-circular-progress inline-block pointer-events-none", role: "progressbar", "aria-valuenow": this.value != null ? Math.round(this.value) : null, "aria-valuemin": this.value != null ? 0 : null, "aria-valuemax": this.value != null ? 100 : null }, h("div", { class: "flex items-center justify-center relative h-full p-2" }, h("svg", { class: "absolute", viewBox: [DIAMETER / 2, DIAMETER / 2, DIAMETER, DIAMETER].join(' ') }, h("circle", { style: this.circleStyle, cx: DIAMETER, cy: DIAMETER, r: RADIUS, "stroke-width": THICKNESS, fill: "none" })))));
  }
  get element() { return this; }
};

const arrowSvg$1 = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M9.9654 0.757212C9.93099 0.681077 9.87273 0.616004 9.79798 0.57022C9.72323 0.524437 9.63535 0.5 9.54545 0.5H0.454547C0.364646 0.5 0.276763 0.524437 0.202012 0.570222C0.127262 0.616007 0.0690015 0.681082 0.0345985 0.757219C0.000195557 0.833357 -0.00880479 0.917136 0.00873577 0.997962C0.0262763 1.07879 0.0695701 1.15303 0.133142 1.2113L4.67859 5.37795C4.7208 5.41665 4.77091 5.44734 4.82605 5.46828C4.8812 5.48922 4.94031 5.5 5 5.5C5.05969 5.5 5.1188 5.48922 5.17394 5.46828C5.22909 5.44734 5.2792 5.41665 5.3214 5.37795L9.86686 1.2113C9.93043 1.15303 9.97372 1.07879 9.99126 0.997958C10.0088 0.917131 9.9998 0.833351 9.9654 0.757212Z"
    fill="currentColor"
  />
</svg>
`;

const MxDropdownMenu$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dense = false;
    /** Style as a filter dropdown with a 1dp elevation */
    this.elevated = false;
    /** Style as a filter dropdown with a "flat" border color */
    this.flat = false;
    this.isFocused = false;
  }
  onClick(e) {
    // Resize the menu width to match the input.  This is done every click in case the input is resized after initial load.
    this.menu.style.width = this.dropdownWrapper.getBoundingClientRect().width + 'px';
    const clickedMenuItem = e.target.closest('mx-menu-item');
    if (!clickedMenuItem)
      return;
    this.value = clickedMenuItem.innerText;
    // Fire native input event for consistency with mx-select
    this.inputElem.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }
  componentDidLoad() {
    this.updateInputValue();
    this.menu.anchorEl = this.dropdownWrapper;
  }
  onValueChange() {
    this.updateInputValue();
  }
  onBlur() {
    if (this.menu && this.menu.isOpen)
      return; // Style as focused/active while menu is open
    this.isFocused = false;
  }
  onFocus() {
    this.isFocused = true;
  }
  onMenuClose() {
    if (!this.inputElem.contains(document.activeElement))
      this.isFocused = false;
  }
  updateInputValue() {
    this.inputElem.value = this.value;
  }
  get dropdownWrapperClass() {
    let str = 'dropdown-wrapper flex items-center relative border rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    if (this.elevated)
      str += ' elevated shadow-1';
    if (this.flat)
      str += ' flat';
    if (this.isFocused)
      str += ' focused border-2';
    return str;
  }
  get inputClass() {
    let str = 'absolute inset-0 w-full h-full pl-16 overflow-hidden outline-none appearance-none select-none bg-transparent cursor-pointer disabled:cursor-auto';
    if (this.isFocused)
      str += ' -ml-1'; // prevent shifting due to border-width change
    return str;
  }
  get suffixClass() {
    let str = 'icon-suffix absolute flex items-center h-full right-16 space-x-8 pointer-events-none';
    if (this.isFocused)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  render() {
    return (h(Host, { class: "mx-dropdown-menu" }, h("div", { ref: el => (this.dropdownWrapper = el), class: this.dropdownWrapperClass }, h("input", { "aria-label": this.ariaLabel || this.label, class: this.inputClass, id: this.dropdownId, name: this.name, onBlur: this.onBlur.bind(this), onFocus: this.onFocus.bind(this), placeholder: this.label, readonly: true, ref: el => (this.inputElem = el), tabindex: "0", type: "text" }), h("span", { class: this.suffixClass }, this.suffix && h("span", { class: "suffix flex items-center h-full px-4" }, this.suffix), h("span", { "data-testid": "arrow", innerHTML: arrowSvg$1 }))), h("mx-menu", { ref: el => (this.menu = el), placement: "bottom", offset: [0, 1], onMxClose: this.onMenuClose.bind(this) }, h("slot", null))));
  }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

const SCREENS = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
};
/** A key-value pair of breakpoint abbreviations and a boolean for whether the `min-width` meets or exceeds it.
For example, `MinWidths.md` will be true for windows that are tablet-sized or larger */
class MinWidths {
  constructor() {
    this['sm'] = false;
    this['md'] = false;
    this['lg'] = false;
    this['xl'] = false;
    this['2xl'] = false;
  }
}
class MinWidthSync {
  constructor() {
    this.componentRefs = [];
    this.minWidths = new MinWidths();
    this.listeners = new Map();
  }
  subscribeComponent(componentRef) {
    // If this is the first subscribed component, set up listeners.
    if (this.componentRefs.length === 0)
      this.addListeners();
    this.componentRefs.push(componentRef);
    // Immediately sync minWidths to component.
    componentRef.minWidths = Object.assign({}, this.minWidths);
  }
  addListeners() {
    Object.keys(SCREENS).forEach(screen => {
      const mql = window.matchMedia(`(min-width: ${SCREENS[screen]})`);
      const listener = (e) => {
        this.minWidths[screen] = e.matches;
        // Sync minWidths to all subscribed components
        this.componentRefs.forEach(componentRef => {
          componentRef.minWidths = Object.assign({}, this.minWidths);
        });
      };
      listener(mql);
      mql.addListener(listener);
      this.listeners.set(mql, listener); // Store listener so it can be removed later
    });
  }
  unsubscribeComponent(componentRef) {
    this.componentRefs = this.componentRefs.filter(c => c !== componentRef);
    // If no more subscribed components, remove listeners to prevent memory leaks.
    if (this.componentRefs.length === 0)
      this.removeListeners();
  }
  removeListeners() {
    this.listeners.forEach((listener, mql) => {
      mql.removeListener(listener);
    });
  }
}
/** Update subscribed components' `minWidths` state object based on `min-width` media query listeners. */
const minWidthSync = new MinWidthSync();

const MxFab$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** Style as a secondary action */
    this.secondary = false;
    this.minWidths = new MinWidths();
    this.isExtended = false;
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  componentWillLoad() {
    this.isExtended = !!this.element.textContent;
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  onClick(e) {
    ripple(e, this.buttonElem);
  }
  get buttonClass() {
    let str = 'flex min-w-full items-center justify-center rounded-full shadow-4 relative overflow-hidden';
    if (this.secondary)
      str += ' secondary';
    if (this.isExtended)
      str += ' h-48 py-16 px-24';
    else
      str += this.minWidths.md ? ' h-56' : ' h-40';
    return str;
  }
  get slotWrapperClass() {
    let str = 'flex items-center text-4 tracking-1-25 leading-4 uppercase font-semibold';
    if (this.isExtended && this.icon)
      str += ' ml-12';
    return str;
  }
  render() {
    return (h(Host, { class: 'mx-fab inline-block min-w-max' + (this.minWidths.md ? ' w-56' : ' w-40') }, h("button", { ref: el => (this.buttonElem = el), type: "button", value: this.value, class: this.buttonClass, "aria-label": this.ariaLabel, onClick: this.onClick.bind(this) }, this.icon && h("i", { class: this.icon + ' text-1' }), h("div", { class: this.slotWrapperClass }, h("slot", null)))));
  }
  get element() { return this; }
};

const MxIconButton$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dataAttributes = {};
    this.type = 'button';
    this.disabled = false;
    /** Show downward chevron icon */
    this.chevronDown = false;
    /** Show left-pointing chevron icon */
    this.chevronLeft = false;
    /** Show right-pointing chevron icon */
    this.chevronRight = false;
    this.componentWillRender = propagateDataAttributes;
  }
  onClick(e) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
  }
  get isChevron() {
    return this.chevronDown || this.chevronLeft || this.chevronRight;
  }
  render() {
    const buttonContent = (h("div", { class: "flex justify-center items-center content-center relative" }, this.icon && h("i", { class: ['text-1', this.icon].join(' ') }), h("span", { class: "slot-content" }, h("slot", null)), this.isChevron && (h("span", { class: "chevron-wrapper inline-flex w-24 h-24 rounded-full items-center justify-center shadow-1" }, h("span", { "data-testid": "chevron", class: this.chevronLeft ? 'transform rotate-90' : this.chevronRight ? 'transform -rotate-90' : '', innerHTML: chevronSvg })))));
    return (h(Host, { class: "mx-icon-button inline-block" }, h("button", Object.assign({ type: this.type, formaction: this.formaction, value: this.value, class: "flex items-center w-48 h-48 rounded-full justify-center relative overflow-hidden cursor-pointer disabled:cursor-auto", ref: el => (this.btnElem = el), onClick: this.onClick.bind(this), "aria-disabled": this.disabled, "aria-label": this.ariaLabel }, this.dataAttributes), buttonContent)));
  }
  get element() { return this; }
};

const imageSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19.5 21H4.5C3.67 21 3 20.33 3 19.5V4.5C3 3.67 3.67 3 4.5 3H19.5C20.33 3 21 3.67 21 4.5V19.5C21 20.33 20.33 21 19.5 21ZM4.5 4.5V19.5H19.5V4.5H4.5Z" fill="currentColor"/>
  <path d="M3.74994 17.2498C3.55994 17.2498 3.36994 17.1798 3.21994 17.0298C2.92994 16.7398 2.92994 16.2598 3.21994 15.9698L6.43994 12.7498C6.99994 12.1898 7.99994 12.1898 8.55994 12.7498L10.4999 14.6898L14.6899 10.4998C15.2599 9.92977 16.2399 9.92977 16.8099 10.4998L20.7799 14.4698C21.0699 14.7598 21.0699 15.2398 20.7799 15.5298C20.4899 15.8198 20.0099 15.8198 19.7199 15.5298L15.7499 11.5598L11.5599 15.7498C10.9999 16.3098 9.99994 16.3098 9.43994 15.7498L7.49994 13.8098L4.27994 17.0298C4.12994 17.1798 3.93994 17.2498 3.74994 17.2498Z" fill="currentColor"/>
  <path d="M9.37994 9.55994C9.89994 9.55994 10.3199 9.13994 10.3199 8.61994C10.3199 8.09994 9.88994 7.68994 9.37994 7.68994C8.86994 7.68994 8.43994 8.10994 8.43994 8.61994C8.43994 9.12994 8.85994 9.55994 9.37994 9.55994Z" fill="currentColor"/>
</svg>
`;

const userCircleSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C10.3431 8.25 9 9.59315 9 11.25C9 12.9069 10.3431 14.25 12 14.25C13.6569 14.25 15 12.9069 15 11.25C15 9.59315 13.6569 8.25 12 8.25ZM7.5 11.25C7.5 8.76472 9.51472 6.75 12 6.75C14.4853 6.75 16.5 8.76472 16.5 11.25C16.5 13.7353 14.4853 15.75 12 15.75C9.51472 15.75 7.5 13.7353 7.5 11.25Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 15.75C10.8922 15.75 9.80605 16.0565 8.86175 16.6357C7.91744 17.2148 7.15182 18.044 6.64962 19.0313C6.46183 19.4005 6.01031 19.5476 5.6411 19.3598C5.2719 19.172 5.12483 18.7205 5.31262 18.3513C5.94031 17.1172 6.89726 16.0809 8.07754 15.357C9.25782 14.6331 10.6154 14.25 11.9999 14.25C13.3845 14.25 14.7421 14.6331 15.9223 15.357C17.1026 16.0808 18.0596 17.1172 18.6873 18.3513C18.8751 18.7205 18.728 19.172 18.3588 19.3598C17.9896 19.5476 17.5381 19.4005 17.3503 19.0313C16.8481 18.0439 16.0824 17.2148 15.1381 16.6357C14.1938 16.0565 13.1077 15.75 11.9999 15.75Z" fill="currentColor"/>
</svg>
`;

const MxImageUpload$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.hasInstructions = false;
    this.hasSuccess = false;
    this.hasError = false;
    /** Set `acceptImage` to `false` and `acceptPdf` to `true` to only accept PDF files.  Set both to `false` to accept any file. */
    this.acceptImage = true;
    /** Set `acceptImage` to `false` and `acceptPdf` to `true` to only accept PDF files.  Set both to `false` to accept any file. */
    this.acceptPdf = false;
    /** Replaces the word "image" in the default dropzone text (i.e. "No image to show"). */
    this.assetName = 'image';
    /** Sets the width and height to 80px and changes the icon. */
    this.avatar = false;
    /** Sets the thumbnail sizing strategy relative to the container. */
    this.thumbnailSize = 'cover';
    /** Set to `true` to show the Remove button, thumbnail, and `uploaded` slot content. */
    this.isUploaded = false;
    /** Set to `true` to disable the button and show the circular progress indicator. */
    this.isUploading = false;
    /** The text to display on the Remove button */
    this.removeButtonLabel = 'Remove';
    /** Set to `false` to hide the default Upload/Remove button. */
    this.showButton = true;
    /** Set to `false` to hide the dropzone icon. */
    this.showIcon = true;
    /** Set to `false` to hide the dropzone text. */
    this.showDropzoneText = true;
    /** The text to display on the Upload button */
    this.uploadButtonLabel = 'Upload';
    this.isDraggingOver = false;
    this.isFileSelected = false;
  }
  onThumbnailUrlChange() {
    if (this.thumbnailUrl)
      this.isUploaded = true;
  }
  connectedCallback() {
    this.onThumbnailUrlChange();
  }
  componentWillRender() {
    this.hasInstructions = !!this.element.querySelector('[slot="instructions"]');
    this.hasSuccess = !!this.element.querySelector('[slot="success"]');
    this.hasError = !!this.element.querySelector('[slot="error"]');
  }
  async removeFile() {
    if (!this.hasFile || this.isUploading)
      return;
    this.isFileSelected = false;
    this.isUploaded = false;
    this.isUploading = false;
    this.fileInput.value = '';
    this.fileInput.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    this.fileInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }
  async selectFile() {
    if (this.hasFile)
      return;
    this.isFileSelected = false;
    this.fileInput.value = '';
    this.fileInput.click();
  }
  onButtonClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.isUploading)
      return;
    if (!this.hasFile) {
      this.selectFile();
    }
    else {
      this.removeFile();
    }
  }
  onInput(e) {
    this.isFileSelected = e.target.files && e.target.files.length > 0;
    if (this.isFileSelected)
      this.setThumnailDataUri(e.target.files[0]);
    else
      this.thumbnailDataUri = null;
  }
  setThumnailDataUri(file) {
    this.thumbnailDataUri = null;
    if (!/\.(jpe?g|png|gif)$/i.test(file.name))
      return;
    const reader = new FileReader();
    reader.onload = () => {
      this.thumbnailDataUri = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onDragOver() {
    this.isDraggingOver = true;
  }
  onDragLeave() {
    this.isDraggingOver = false;
  }
  get accept() {
    let accept = [];
    if (this.acceptImage)
      accept.push('image/*');
    if (this.acceptPdf)
      accept.push('.pdf');
    return accept.join(',') || null;
  }
  /** The width is applied to the host element in order to support percent-based widths */
  get dropzoneWidth() {
    if (this.width)
      return this.width;
    return this.avatar ? '80px' : '308px';
  }
  get dropzoneHeight() {
    if (this.height)
      return this.height;
    return this.avatar ? '80px' : 'auto';
  }
  get dropzoneClass() {
    let str = 'dropzone relative w-full h-full px-16 rounded-2xl overflow-hidden';
    if (this.hasFile)
      str += ' opacity-0';
    if (this.isDraggingOver)
      str += ' drag-over';
    str += this.showIcon && this.showDropzoneText ? ' py-24' : ' py-16';
    return str;
  }
  get hasFile() {
    return this.isFileSelected || this.isUploaded;
  }
  get thumbnailBackgroundImage() {
    let url = this.thumbnailUrl;
    if (this.isFileSelected)
      url = this.thumbnailDataUri;
    if (!url)
      return null;
    return `url(${url})`;
  }
  get thumbnailBackgroundSize() {
    if (!['contain', 'cover', 'auto', 'stretch'].includes(this.thumbnailSize))
      return 'cover';
    if (this.thumbnailSize === 'stretch')
      return '100% 100%';
    return this.thumbnailSize;
  }
  render() {
    let iconJsx;
    if (this.icon) {
      iconJsx = h("i", { "data-testid": "upload-icon", class: 'dropzone-icon ' + this.icon });
    }
    else if (this.avatar) {
      iconJsx = h("span", { "data-testid": "avatar-icon", innerHTML: userCircleSvg });
    }
    else {
      iconJsx = h("span", { "data-testid": "image-icon", class: this.showDropzoneText ? 'mb-8' : '', innerHTML: imageSvg });
    }
    return (h(Host, { class: "mx-image-upload inline-block", style: { width: this.dropzoneWidth } }, h("div", { "data-testid": "dropzone-wrapper", class: "dropzone-wrapper flex w-full items-center justify-center relative rounded-2xl text-3 overflow-hidden", style: { height: this.dropzoneHeight } }, h("div", { class: this.dropzoneClass }, h("div", { class: "flex flex-col items-center justify-center w-full h-full" }, this.showIcon && iconJsx, h("slot", { name: "dropzone-text" }, h("div", { "data-testid": "dropzone-text", class: 'text-center' + (this.showDropzoneText && !this.avatar ? '' : ' hidden') }, h("p", { class: "subtitle1 my-0" }, "No ", this.assetName, " to show"), h("p", { class: "text-4 my-0 mt-4" }, "Click to add ", this.assetName)))), h("svg", { class: "dashed-border absolute inset-0 pointer-events-none", width: "100%", height: "100%" }, h("rect", { width: "100%", height: "100%", fill: "none", rx: "16", ry: "16", "stroke-width": "1", "stroke-dasharray": "4,8" })), h("input", { ref: el => (this.fileInput = el), id: this.inputId, name: this.name, type: "file", accept: this.accept, class: "absolute inset-0 opacity-0 cursor-pointer", onInput: this.onInput.bind(this), onDragOver: this.onDragOver.bind(this), onDragLeave: this.onDragLeave.bind(this), onDrop: this.onDragLeave.bind(this) })), this.hasFile && this.thumbnailBackgroundImage && (h("div", { "data-testid": "thumbnail", class: "thumbnail absolute inset-0 bg-center bg-no-repeat pointer-events-none", style: { backgroundImage: this.thumbnailBackgroundImage, backgroundSize: this.thumbnailBackgroundSize } })), h("div", { "data-testid": "uploaded", class: 'flex items-center justify-center absolute inset-0 pointer-events-none ' +
        (this.isUploaded ? '' : ' hidden') }, h("slot", { name: "uploaded" })), this.isUploading && (h("div", { "data-testid": "progress", class: "uploading-progress flex items-center justify-center opacity-50 absolute inset-0" }, h("mx-circular-progress", { size: "2rem" })))), this.showButton && (h("mx-button", { "data-testid": "upload-button", class: "mt-16", btnType: this.hasFile && !this.isUploading ? 'outlined' : 'contained', onClick: this.onButtonClick.bind(this), disabled: this.isUploading }, this.hasFile && !this.isUploading ? this.removeButtonLabel : this.uploadButtonLabel)), this.hasInstructions && (h("p", { class: "caption1 my-16" }, h("slot", { name: "instructions" }))), this.hasSuccess && (h("p", { class: "upload-success caption1 my-16" }, h("slot", { name: "success" }))), this.hasError && (h("p", { class: "upload-error caption1 my-16" }, h("slot", { name: "error" })))));
  }
  get element() { return this; }
  static get watchers() { return {
    "thumbnailUrl": ["onThumbnailUrlChange"]
  }; }
};

const warningCircleSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.75C12.4142 6.75 12.75 7.08579 12.75 7.5V12.75C12.75 13.1642 12.4142 13.5 12 13.5C11.5858 13.5 11.25 13.1642 11.25 12.75V7.5C11.25 7.08579 11.5858 6.75 12 6.75Z" fill="currentColor"/>
  <path d="M12 17.0625C12.5178 17.0625 12.9375 16.6428 12.9375 16.125C12.9375 15.6072 12.5178 15.1875 12 15.1875C11.4822 15.1875 11.0625 15.6072 11.0625 16.125C11.0625 16.6428 11.4822 17.0625 12 17.0625Z" fill="currentColor"/>
</svg>
`;

const MxInput$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dataAttributes = {};
    this.uuid = uuidv4();
    /** The `type` attribute for the text input */
    this.type = 'text';
    this.dense = false;
    this.disabled = false;
    this.readonly = false;
    this.outerContainerClass = '';
    this.labelClass = '';
    this.error = false;
    this.floatLabel = false;
    /** Display a multi-line `textarea` instead of an `input` */
    this.textarea = false;
    this.textareaHeight = '250px';
    this.isFocused = false;
    this.characterCount = 0;
    this.componentWillRender = propagateDataAttributes;
  }
  connectedCallback() {
    this.characterCount = this.hasValue ? this.value.length : 0;
  }
  componentDidLoad() {
    this.updateValue();
  }
  onValueChange() {
    this.updateValue();
    this.characterCount = this.hasValue ? this.value.length : 0;
  }
  updateValue() {
    this.workingElem.value = this.hasValue ? this.value : '';
  }
  onFocus() {
    this.isFocused = true;
    this.error = false;
  }
  onBlur() {
    this.isFocused = false;
  }
  onInput(e) {
    this.characterCount = e.target.value.length;
    this.value = e.target.value;
  }
  get workingElem() {
    return this.textarea ? this.textArea : this.textInput;
  }
  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }
  get containerClass() {
    let str = 'mx-input-wrapper flex items-center relative border rounded-lg';
    if (!this.textarea) {
      str += this.dense ? ' h-36' : ' h-48';
    }
    if (this.error || this.isFocused)
      str += ' border-2';
    if (this.error)
      str += ' error';
    if (this.disabled)
      str += ' disabled';
    if (this.readonly)
      str += ' readonly';
    return str;
  }
  get inputClass() {
    let str = 'flex-1 overflow-hidden outline-none appearance-none bg-transparent';
    if (!this.textarea) {
      str += ' px-16';
    }
    else {
      str += ' p-16 resize-none';
    }
    if (this.isFocused || this.error)
      str += this.leftIcon ? ' -mr-1' : ' -m-1'; // prevent shifting due to border-width change
    return str;
  }
  get labelClassNames() {
    let str = 'block pointer-events-none';
    if (this.floatLabel) {
      str += ' absolute mt-0 px-4';
      if (this.textarea)
        str += ' top-12';
      str += this.leftIcon && !this.textarea ? ' left-48 has-left-icon' : ' left-12';
      if (this.dense && !this.textarea)
        str += ' dense text-4';
      if (this.isFocused || this.characterCount > 0)
        str += ' floating';
      if (this.isFocused || this.error)
        str += ' -ml-1'; // prevent shifting due to border-width change
      if ((this.isFocused || this.error) && this.textarea)
        str += ' -mt-1';
    }
    else {
      str += ' subtitle2 mb-4';
    }
    if (this.labelClass)
      str += this.labelClass;
    return str;
  }
  get leftIconWrapperClass() {
    let str = 'flex items-center h-full pointer-events-none pl-16';
    if (this.isFocused || this.error)
      str += ' -ml-1'; // prevent shifting due to border-width change
    return str;
  }
  get rightContentClass() {
    let str = 'icon-suffix flex items-center h-full pr-16 space-x-8 pointer-events-none';
    if (this.isFocused || this.error)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  get textareaClass() {
    return this.textarea ? ' textarea items-start' : '';
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.inputId || this.uuid, class: this.labelClassNames }, this.label));
    return (h(Host, { class: 'mx-input block' + (this.disabled ? ' disabled' : '') }, this.label && !this.floatLabel && labelJsx, h("div", { class: this.containerClass }, this.leftIcon && (h("div", { class: this.leftIconWrapperClass }, h("i", { class: this.leftIcon }))), this.label && this.floatLabel && labelJsx, !this.textarea ? (h("input", Object.assign({ type: this.type, class: this.inputClass, name: this.name, id: this.inputId || this.uuid, value: this.value, placeholder: this.floatLabel ? null : this.placeholder, maxlength: this.maxlength, disabled: this.disabled, readonly: this.readonly, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.textInput = el) }, this.dataAttributes))) : (h("textarea", Object.assign({ class: this.inputClass, style: { height: this.textareaHeight }, name: this.name, id: this.inputId || this.uuid, placeholder: this.floatLabel ? null : this.placeholder, maxlength: this.maxlength, disabled: this.disabled, readonly: this.readonly, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.textArea = el) }, this.dataAttributes), this.value)), !this.textarea && (this.maxlength || this.suffix || this.error || this.rightIcon) && (h("span", { class: this.rightContentClass }, this.maxlength && (h("span", { "data-testid": "character-count", class: "character-count" }, this.characterCount, "/", this.maxlength)), this.suffix && (h("span", { "data-testid": "suffix", class: "suffix flex items-center h-full px-4" }, this.suffix)), this.error && h("span", { innerHTML: warningCircleSvg }), this.rightIcon && !this.error && h("i", { class: this.rightIcon })))), (this.assistiveText || (this.textarea && this.maxlength)) && (h("div", { class: "flex justify-between caption1 mt-4 ml-16 space-x-32" }, h("span", { "data-testid": "assistive-text", class: "assistive-text" }, this.assistiveText), this.textarea && this.maxlength && (h("span", { "data-testid": "character-count", class: "character-count" }, this.characterCount, "/", this.maxlength))))));
  }
  get element() { return this; }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

const MxLinearProgress$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** The progress percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress indicator will be displayed. */
    this.value = null;
    /** Delay the appearance of the indicator for this many milliseconds */
    this.appearDelay = 0;
  }
  connectedCallback() {
    if (!this.appearDelay)
      return;
    // Hide indicator until appearDelay duration has passed
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
    return (h(Host, { class: "mx-linear-progress block h-4 w-full rounded-sm overflow-hidden pointer-events-none", role: "progressbar", "aria-valuenow": this.value != null ? Math.round(this.value) : null, "aria-valuemin": this.value != null ? 0 : null, "aria-valuemax": this.value != null ? 100 : null }, h("div", { class: "relative h-full" }, this.value != null ? (
    // Determinate
    h("div", { "data-testid": "determinate", class: "fill h-4 absolute inset-0 rounded-sm", style: this.determinateBarStyle })) : (
    // Indeterminate has two animated bars with nested animations
    [
      h("div", { "data-testid": "indeterminate1", class: "indeterminate1 absolute h-full w-full" }, h("div", { class: "fill absolute w-full h-full rounded-sm" })),
      h("div", { "data-testid": "indeterminate2", class: "indeterminate2 absolute h-full w-full" }, h("div", { class: "fill absolute w-full h-full rounded-sm" })),
    ]))));
  }
  get element() { return this; }
};

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement$1(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


const applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle$1(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


const arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle$1(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top) {
      sideY = bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


const computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


const eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement$1(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle$1(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle$1(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement$1(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getVariation(placement) {
  return placement.split('-')[1];
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement$1(placement), oppositePlacement, getOppositeVariationPlacement$1(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


const flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


const hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


const offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


const popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
    var max$1 = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


const preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

/** Create a popover that is anchored to another element or, if not specified, the body.
 * Returns a Promise that resolves once the popover is rendered and positioned. */
async function createPopover(anchorEl, popoverEl, placement, offset) {
  if ('componentOnReady' in popoverEl)
    await popoverEl.componentOnReady();
  const instance = createPopper(anchorEl, popoverEl, {
    placement,
    modifiers: getModifiers(placement, offset),
  });
  return new Promise(resolve => {
    // Wait a frame for the element's width and height to be accurate and then update
    // its placement to ensure it is positioned/centered correctly.
    requestAnimationFrame(() => {
      instance.update();
      resolve(instance);
    });
  });
}
function getModifiers(placement, offset) {
  const modifiers = [
    {
      name: 'flip',
      options: {
        fallbackPlacements: [getOppositeVariationPlacement(placement), 'auto'],
        boundary: document.body,
      },
    },
    {
      name: 'preventOverflow',
      options: {
        padding: { top: 32, bottom: 32 },
        boundary: document.body,
      },
    },
  ];
  if (offset)
    modifiers.push({
      name: 'offset',
      options: {
        offset, // Apply specified offset
      },
    });
  return modifiers;
}
/** Returns the appropriate transform-origin relative to a PopoverPlacement
 * (e.g. a menu with "bottom-start" placement should scale from the top left) */
function convertPlacementToOrigin(placement) {
  const origins = {
    'bottom-end': 'top right',
    'bottom-start': 'top left',
    'bottom': 'top',
    'left-end': 'bottom right',
    'left-start': 'top right',
    'left': 'right',
    'right-end': 'bottom left',
    'right-start': 'top left',
    'right': 'left',
    'top-end': 'bottom right',
    'top-start': 'bottom left',
    'top': 'bottom',
  };
  return origins[placement] || 'center';
}
/** Return the opposite placement that is aligned to the same edge of the anchor
 * https://github.com/popperjs/popper-core/blob/master/src/utils/getOppositeVariationPlacement.js */
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, matched => (matched === 'start' ? 'end' : 'start'));
}

const FADE_IN = {
  property: 'opacity',
  startValue: '0',
  endValue: '1',
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};
const FADE_OUT = {
  property: 'opacity',
  startValue: '1',
  endValue: '0',
  timing: 'ease',
};
const SCALE_IN = {
  property: 'transform',
  startValue: 'scale(0.8)',
  endValue: 'scale(1)',
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};
const fadeIn = (el, duration = 180) => {
  return executeTransition(el, [FADE_IN], duration);
};
const fadeOut = (el, duration = 150) => {
  return executeTransition(el, [FADE_OUT], duration);
};
/** Fade in and scale from 80% to 100% (Material Fade) */
const fadeScaleIn = (el, duration = 150, transformOrigin) => {
  return executeTransition(el, [FADE_IN, SCALE_IN], duration, transformOrigin);
};
/** Executes a CSS transition on an element using the provided options and
 * Returns a Promise that resolves once the transition has ended. */
function executeTransition(el, transitionOptions, duration, transformOrigin) {
  return new Promise(async (resolve) => {
    if (queryPrefersReducedMotion() || typeof jest !== 'undefined')
      return resolve();
    // Set the start value for each property
    transitionOptions.forEach(transition => {
      setStyleProperty(el, transition.property, transition.startValue);
    });
    if (transformOrigin)
      el.style.transformOrigin = transformOrigin;
    requestAnimationFrame(() => {
      // After a tick, change each property and start the transition
      if (!el)
        return;
      el.style.transition = transitionOptions
        .map(transition => {
        return `${transition.property} ${duration}ms ${transition.timing}`;
      })
        .join(', ');
      requestAnimationFrame(() => {
        transitionOptions.forEach(transition => {
          setStyleProperty(el, transition.property, transition.endValue);
        });
      });
    });
    // Resolve once the duration passes (setTimeout is safer than transition events)
    setTimeout(resolve, duration);
  });
}
function setStyleProperty(el, property, value) {
  if (property !== 'transform') {
    // Set typical style property (e.g. opacity)
    el.style[property] = value;
  }
  else {
    // For transforms, we do not want to overwrite the entire transform property.
    // Instead, we need to remove any conflicting transform values and then add the new value.
    // First, parse out an array of transforms (e.g. ['translate(532px, 311px)', 'scale(0.8)'])
    const matchTransforms = /\w*\((-?((\d+)|(\d*\.\d+))\w*,\s*)*(-?(\d+)|(\d*\.\d+))\w*\)/gi;
    let transforms = el.style.transform.match(matchTransforms) || [];
    // Parse out the name of our new transform (e.g. 'scale')
    let transformName = /^(\w*)\(/.exec(value)[1];
    // Remove existing transforms with the same name
    transforms = transforms.filter(t => !t.startsWith(transformName));
    // Add our new transform
    transforms.push(value);
    el.style.transform = transforms.join(' ');
  }
}

const MxMenu$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxClose = createEvent(this, "mxClose", 7);
    this.mxOpen = createEvent(this, "mxOpen", 7);
    /** The placement of the menu, relative to the `anchorEl`. */
    this.placement = 'bottom-start';
    /** This is set to true automatically when the `anchorEl` is clicked.  Dropdown menus read this prop internally for styling purposes. */
    this.isOpen = false;
  }
  onMenuItemClick() {
    // Close menu when a descendent menu item is clicked
    this.closeMenu();
  }
  onClick(e) {
    const triggerEl = this.triggerEl || this.anchorEl;
    const triggerElWasClicked = triggerEl && triggerEl.contains(e.target);
    if (triggerElWasClicked)
      e.preventDefault();
    if (!this.isOpen && triggerElWasClicked) {
      // Open closed menu when the anchorEl is clicked
      this.openMenu();
      e.preventDefault();
    }
    else if (this.isOpen && this.element && !this.element.contains(e.target)) {
      if (this.isSubMenu && triggerElWasClicked)
        return; // Do not close submenu when its anchor is clicked
      // Otherwise, close menu when a click occurs outside the menu
      this.closeMenu();
    }
  }
  onDocumentKeyDown(e) {
    // Open menu if Enter or Space is pressed while anchor is focused
    if (['Enter', ' '].includes(e.key) && this.anchorEl && this.anchorEl.contains(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      document.activeElement.click();
      return;
    }
    if (!this.isOpen)
      return;
    // Close menus on Escape key
    if (e.key === 'Escape')
      this.closeMenu();
    else if (e.key === 'ArrowDown' && this.anchorEl.contains(e.target)) {
      // If focus is still on anchor, switch focus to first menu item on arrow down
      e.preventDefault();
      e.stopPropagation();
      const enabledMenuItems = this.menuItems.filter(m => !m.disabled);
      enabledMenuItems.length && enabledMenuItems[0].focusMenuItem();
    }
  }
  onKeydown(e) {
    if (!this.isOpen)
      return;
    if (!['ArrowDown', 'ArrowUp'].includes(e.key))
      return;
    // Menu item keyboard navigation
    e.preventDefault(); // Prevent scrolling
    e.stopPropagation();
    const menuItems = this.menuItems.filter(m => !m.disabled);
    const focusedIndex = menuItems.findIndex(m => m.contains(document.activeElement));
    if (e.key === 'ArrowDown' && focusedIndex !== menuItems.length - 1) {
      menuItems[focusedIndex + 1].focusMenuItem();
    }
    else if (e.key === 'ArrowUp' && focusedIndex !== 0) {
      menuItems[focusedIndex - 1].focusMenuItem();
    }
  }
  /** Open the menu.  Returns a promise that resolves to false if the menu was already open. */
  async openMenu() {
    if (this.isOpen || !this.anchorEl)
      return false;
    this.isOpen = true;
    this.mxOpen.emit();
    const offset = this.offset || (this.isSubMenu ? [-8, 0] : null); // Offset submenus by -8px to line up menu items
    this.popoverInstance = await createPopover(this.anchorEl, this.element, this.placement, offset);
    await fadeScaleIn(this.menuElem, undefined, convertPlacementToOrigin(this.popoverInstance.state.placement));
    return true;
  }
  /** Close the menu.  Returns a promise that resolves to false if the menu was already closed. */
  async closeMenu() {
    if (!this.isOpen)
      return false;
    this.menuItems.forEach(m => m.closeSubMenu());
    await fadeOut(this.menuElem);
    this.mxClose.emit();
    this.isOpen = false;
    if (!this.popoverInstance)
      return true;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
    return true;
  }
  connectedCallback() {
    this.anchorEl && this.anchorEl.setAttribute('aria-haspopup', 'true');
  }
  componentWillUpdate() {
    // If any menu item has an icon, ensure that all menu items at least have a null icon.
    // This will ensure the inner text of all the menu items is aligned.
    const anyMenuItemHasIcon = this.menuItems.some(m => !!m.icon);
    if (anyMenuItemHasIcon) {
      this.menuItems.forEach(m => {
        if (m.icon === undefined)
          m.icon = null;
      });
    }
  }
  get menuItems() {
    return (Array.from(this.scrollElem.children).filter(e => e.tagName === 'MX-MENU-ITEM') ||
      []);
  }
  get isSubMenu() {
    return this.element.hasAttribute('slot') && this.element.getAttribute('slot') === 'submenu';
  }
  render() {
    return (h(Host, { class: 'mx-menu block z-50 w-screen sm:w-auto' + (this.isOpen ? '' : ' hidden'), role: "menu" }, h("div", { ref: el => (this.menuElem = el), class: "flex flex-col py-8 shadow-9 rounded-lg" }, h("div", { ref: el => (this.scrollElem = el), class: "scroll-wrapper overflow-y-auto overflow-x-hidden max-h-216 overscroll-contain" }, h("slot", null)))));
  }
  get element() { return this; }
};

const MxMenuItem$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxClick = createEvent(this, "mxClick", 7);
    /** If `multiSelect` is false, this will render a checkmark on the right side of the menu item.  If both `multiSelect` and `checked` are `true`, then the rendered multi-select checkbox will be checked. */
    this.checked = false;
    this.disabled = false;
    /** Render a checkbox as part of the menu item.  On small screens, the checkbox will appear on the left; otherwise, it will be on the right. */
    this.multiSelect = false;
    this.minWidths = new MinWidths();
  }
  onMouseEnter() {
    this.closeSiblingSubMenus();
    // Focus menu item on hover for consistent keyboard navigation
    this.focusMenuItem();
    if (this.submenu) {
      // Delay opening the submenu when hovering
      clearTimeout(this.submenuDelayTimeout);
      this.submenuDelayTimeout = setTimeout(this.openSubMenu.bind(this), 150);
    }
  }
  onMouseLeave() {
    clearTimeout(this.submenuDelayTimeout);
    document.activeElement.blur();
  }
  onFocus() {
    this.closeSiblingSubMenus();
  }
  onKeyDown(e) {
    if (this.submenu)
      return this.onKeyDownSubMenu(e);
    // Treat Enter or Space as a click
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      document.activeElement.click();
    }
  }
  componentWillLoad() {
    this.submenu = this.element.querySelector('[slot="submenu"]');
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  /** Close the item's submenu. */
  async closeSubMenu() {
    if (this.submenu) {
      clearTimeout(this.submenuDelayTimeout);
      return await this.submenu.closeMenu();
    }
  }
  /** Focuses the menu item. */
  async focusMenuItem() {
    if (this.multiSelect) {
      const label = this.menuItemElem.querySelector('mx-checkbox label');
      label && label.focus();
    }
    else {
      this.menuItemElem.focus();
    }
  }
  async onKeyDownSubMenu(e) {
    if (['Enter', ' ', 'ArrowRight'].includes(e.key)) {
      // Open submenu and focus its first item when pressing Enter, Space, or right arrow
      e.preventDefault();
      e.stopPropagation();
      const didOpen = await this.openSubMenu();
      if (didOpen) {
        const firstMenuItem = this.element.querySelector('mx-menu-item:not(:disabled)');
        firstMenuItem && firstMenuItem.focusMenuItem();
      }
    }
    else if (e.key === 'ArrowLeft') {
      // Close submenu when pressing left arrow
      e.preventDefault();
      e.stopPropagation();
      const didClose = await this.closeSubMenu();
      if (didClose) {
        this.focusMenuItem();
      }
      else {
        // If submenu was already closed, propagate event to parent (to close next parent menu).
        // We have to manually propagate the event because we are awaiting a promise beforehand.
        this.element.parentElement.dispatchEvent(new KeyboardEvent(e.type, e));
      }
    }
  }
  closeSiblingSubMenus() {
    const siblingMenuItems = Array.from(this.element.parentElement.children).filter(e => e !== this.element && e.tagName === 'MX-MENU-ITEM');
    siblingMenuItems.forEach((m) => m.closeSubMenu());
  }
  openSubMenu() {
    if (this.submenu) {
      this.submenu.placement = 'right-start';
      this.submenu.anchorEl = this.element;
      return this.submenu.openMenu();
    }
  }
  onClick(e) {
    if (this.disabled || !!this.submenu) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (!this.multiSelect)
      this.mxClick.emit(e);
  }
  get checkboxLabel() {
    // After initial render, the text must be read from the slotWrapper because
    // this.element.innerText will include both the slot text AND the checkbox label.
    return (this.slotWrapper || this.element).innerText;
  }
  render() {
    return (h(Host, { class: 'mx-menu-item block' + (!!this.submenu ? ' has-submenu' : '') }, h("div", { ref: el => (this.menuItemElem = el), role: "menuitem", "aria-selected": this.checked, "aria-disabled": this.disabled, tabindex: this.disabled || this.multiSelect ? '-1' : '0', class: "block w-full cursor-pointer select-none text-4 outline-none", onClick: this.onClick.bind(this) }, this.label && (h("p", { class: "item-label flex items-end py-0 px-12 my-0 h-18 uppercase subtitle5" }, h("span", { class: "block -mb-4" }, this.label))), h("div", { class: 'flex items-center w-full justify-between px-12 h-48 sm:h-32 whitespace-nowrap' +
        (this.multiSelect ? ' hidden' : '') }, h("div", { class: "flex items-center w-full h-full" }, this.icon !== undefined && (h("i", { class: 'inline-flex items-center justify-center text-1 w-20 mr-8 ' + this.icon })), h("span", { ref: el => (this.slotWrapper = el), class: "overflow-hidden overflow-ellipsis" }, h("slot", null))), this.checked && !this.multiSelect && (h("span", { class: "check ml-12", "data-testid": "check", innerHTML: checkSvg })), !!this.submenu && h("span", { class: "transform -rotate-90", "data-testid": "arrow", innerHTML: arrowSvg$1 })), this.multiSelect && (h("mx-checkbox", { class: "flex items-stretch w-full overflow-hidden h-48 sm:h-32", "label-class": "pl-12 pr-16", checked: this.checked, "label-name": this.checkboxLabel, "label-left": !this.minWidths.sm }))), h("slot", { name: "submenu" })));
  }
  get element() { return this; }
};

function moveToPortal(overlayEl) {
  const portal = getPortal();
  portal.appendChild(overlayEl);
}
function getPortal() {
  let portal = document.querySelector('.mds-portal');
  if (!portal) {
    portal = document.createElement('div');
    portal.classList.add('mds', 'mds-portal');
    portal.style.position = 'relative';
    portal.style.zIndex = '9999';
    document.body.appendChild(portal);
  }
  return portal;
}

const arrowSvg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M11.3327 5.33317H3.21935L6.94602 1.6065L5.99935 0.666504L0.666016 5.99984L5.99935 11.3332L6.93935 10.3932L3.21935 6.6665H11.3327V5.33317Z"
    fill="currentColor"
  />
</svg>
`;

const MxModal$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxClose = createEvent(this, "mxClose", 7);
    this.hasCard = false;
    this.hasHeader = false;
    this.hasHeaderBottom = false;
    /** An array of prop objects for buttons to display in the button tray.  Use the `label` property to specify the button's inner text. */
    this.buttons = [];
    /** If set to false, pressing Escape will not close the modal. */
    this.closeOnEscape = true;
    /** If set to false, clicking the backdrop will not close the modal. */
    this.closeOnOutsideClick = true;
    /** Additional classes for the inner scrolling container. */
    this.contentClass = '';
    /** Toggle the modal */
    this.isOpen = false;
    /** The text to display for the previous page link */
    this.previousPageTitle = 'Back';
    /** The URL for the previous page link */
    this.previousPageUrl = '';
    /** Set to true to stretch the modal to nearly fill the width and height of the page
     * (on desktop-sized screens).  Otherwise, the maximum dimensions are 800x600px. */
    this.large = false;
    this.minWidths = new MinWidths();
    this.isVisible = false;
  }
  toggleModal() {
    this.isOpen ? this.openModal() : this.closeModal();
  }
  onKeyDown(e) {
    if (!this.isOpen)
      return;
    if (e.key === 'Tab') {
      // // Trap focus inside modal
      if (e.shiftKey && document.activeElement === this.firstFocusElement) {
        this.lastFocusElement.focus();
        e.preventDefault();
      }
      else if (document.activeElement === this.lastFocusElement) {
        this.firstFocusElement.focus();
        e.preventDefault();
      }
    }
  }
  onDocumentKeyDown(e) {
    if (this.isOpen && this.closeOnEscape && e.key === 'Escape') {
      const modals = document.querySelectorAll('mx-modal[is-open]');
      const isTopModal = this.element === modals[modals.length - 1];
      if (isTopModal)
        this.mxClose.emit();
    }
  }
  componentWillRender() {
    this.hasHeader =
      !!this.element.querySelector('[slot="header-left"]') || !!this.element.querySelector('[slot="header-right"]');
    this.hasCard = !!this.element.querySelector('[slot="card"]');
    this.hasHeaderBottom = !!this.element.querySelector('[slot="header-bottom"]');
    const tabs = this.element.querySelector('mx-tabs');
    // Place mx-tabs in either the header-bottom slot OR the mobile mx-page-header tabs slot
    if (tabs && this.headerBottomSlotWrapper && this.mobilePageHeader) {
      if (this.minWidths.md)
        this.headerBottomSlotWrapper.appendChild(tabs);
      else
        this.mobilePageHeader.appendChild(tabs);
    }
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  async openModal() {
    moveToPortal(this.element);
    this.isVisible = true;
    requestAnimationFrame(async () => {
      this.getFocusElements();
      await Promise.all([fadeIn(this.backdrop, 250), fadeScaleIn(this.modal, 250)]);
      this.mobilePageHeader.resetResizeObserver();
    });
  }
  getFocusElements() {
    this.ancestorFocusedElement = document.activeElement;
    const isVisible = (el) => !!el.offsetParent;
    this.focusElements = Array.from(this.element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(isVisible);
    if (this.focusElements.length) {
      this.firstFocusElement = this.focusElements[0];
      this.lastFocusElement = this.focusElements[this.focusElements.length - 1];
      this.focusElements[0].focus();
    }
  }
  async closeModal() {
    await Promise.all([fadeOut(this.backdrop), fadeOut(this.modal)]);
    this.isVisible = false;
    // Restore focus to the element that was focused before the modal was opened
    this.ancestorFocusedElement && this.ancestorFocusedElement.focus();
  }
  onBackdropClick() {
    if (this.closeOnOutsideClick)
      this.mxClose.emit();
  }
  get hostClass() {
    let str = 'mx-modal fixed inset-0 flex pt-24 sm:pt-0 items-stretch sm:items-center justify-center';
    if (!this.isVisible)
      str += ' hidden';
    if (this.minWidths.sm) {
      str += this.large ? ' modal-large' : ' modal-medium';
    }
    return str;
  }
  get hasFooter() {
    return ((this.minWidths.md && (!!this.previousPageUrl || this.buttons.length > 0)) ||
      !!this.element.querySelector('[slot="footer-left"]') ||
      !!this.element.querySelector('[slot="footer-right"]'));
  }
  get buttonsJsx() {
    return (h("div", { class: "flex py-1 space-x-24 justify-end flex-row-reverse space-x-reverse items-center max-w-full", "data-testid": "buttons" }, this.buttons.map((button, index) => {
      // If not specified, set btnType automatically for primary, secondary, and tertiary buttons
      let { btnType } = button;
      if (!btnType)
        btnType = index === 0 ? 'contained' : index === 1 ? 'outlined' : 'text';
      return (h("mx-button", Object.assign({}, button, { xl: true, "btn-type": btnType }), button.label));
    })));
  }
  get modalContentClasses() {
    let str = 'bg-modal-content order-2 flex-1 px-24 sm:px-40 py-16 sm:py-24 overflow-auto overscroll-none border-b';
    if (this.contentClass)
      str += ' ' + this.contentClass;
    return str;
  }
  render() {
    return (h(Host, { class: this.hostClass, "aria-labelledby": this.hasHeader ? 'headerText' : null, "aria-modal": "true", role: "dialog" }, h("div", { ref: el => (this.backdrop = el), class: 'bg-modal-backdrop absolute inset-0 z-0' + (this.closeOnOutsideClick ? ' cursor-pointer' : ''), "data-testid": "backdrop", onClick: this.onBackdropClick.bind(this) }), h("div", { ref: el => (this.modal = el), class: "modal flex flex-col rounded-lg shadow-9 relative overflow-hidden" }, h("div", { class: this.modalContentClasses, "data-testid": "modal-content" }, this.description && (h("p", { class: "text-4 my-0 mb-16 sm:mb-24", "data-testid": "modal-description" }, this.description)), h("slot", null), this.hasCard && (h("div", null, h("div", { class: "bg-modal-card min-h-full px-24 sm:px-40 py-16 sm:py-24 rounded-2xl", "data-testid": "modal-card" }, h("slot", { name: "card" }))))), h("footer", { class: 'bg-modal-footer order-3 flex items-center justify-between h-80 py-20 px-40' +
        (this.hasFooter ? '' : ' hidden') }, h("div", null, h("slot", { name: "footer-left" }, this.previousPageUrl && (h("a", { href: this.previousPageUrl, class: "flex items-center uppercase text-4 font-semibold tracking-1-25", "data-testid": "previous-page" }, h("span", { class: "mr-10", innerHTML: arrowSvg }), this.previousPageTitle)))), h("div", { class: "ml-16" }, h("slot", { name: "footer-right" }, this.buttons.length > 0 && this.buttonsJsx))), h("mx-page-header", { ref: el => (this.mobilePageHeader = el), class: "order-1", buttons: this.buttons, modal: true, "previous-page-title": this.previousPageTitle, "previous-page-url": this.previousPageUrl }, h("span", { id: "headerText", "data-testid": "header-text" }, h("slot", { name: "header-left" })), this.hasHeaderBottom && (h("div", { slot: "tabs" }, h("slot", { name: "header-bottom" }))), h("div", { slot: "modal-header-center", class: "flex items-center justify-center" }, h("slot", { name: "header-center" })), h("div", { slot: "modal-header-right" }, h("slot", { name: "header-right" }, h("mx-button", { "btn-type": "text", "data-testid": "close-button", onClick: this.mxClose.emit }, "Close")))))));
  }
  get element() { return this; }
  static get watchers() { return {
    "isOpen": ["toggleModal"]
  }; }
};

var resizeObservers = [];

var hasActiveObservations = function () {
    return resizeObservers.some(function (ro) { return ro.activeTargets.length > 0; });
};

var hasSkippedObservations = function () {
    return resizeObservers.some(function (ro) { return ro.skippedTargets.length > 0; });
};

var msg = 'ResizeObserver loop completed with undelivered notifications.';
var deliverResizeLoopError = function () {
    var event;
    if (typeof ErrorEvent === 'function') {
        event = new ErrorEvent('error', {
            message: msg
        });
    }
    else {
        event = document.createEvent('Event');
        event.initEvent('error', false, false);
        event.message = msg;
    }
    window.dispatchEvent(event);
};

var ResizeObserverBoxOptions;
(function (ResizeObserverBoxOptions) {
    ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
    ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
    ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));

var freeze = function (obj) { return Object.freeze(obj); };

var ResizeObserverSize = (function () {
    function ResizeObserverSize(inlineSize, blockSize) {
        this.inlineSize = inlineSize;
        this.blockSize = blockSize;
        freeze(this);
    }
    return ResizeObserverSize;
}());

var DOMRectReadOnly = (function () {
    function DOMRectReadOnly(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.top = this.y;
        this.left = this.x;
        this.bottom = this.top + this.height;
        this.right = this.left + this.width;
        return freeze(this);
    }
    DOMRectReadOnly.prototype.toJSON = function () {
        var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
        return { x: x, y: y, top: top, right: right, bottom: bottom, left: left, width: width, height: height };
    };
    DOMRectReadOnly.fromRect = function (rectangle) {
        return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    };
    return DOMRectReadOnly;
}());

var isSVG = function (target) { return target instanceof SVGElement && 'getBBox' in target; };
var isHidden = function (target) {
    if (isSVG(target)) {
        var _a = target.getBBox(), width = _a.width, height = _a.height;
        return !width && !height;
    }
    var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
    return !(offsetWidth || offsetHeight || target.getClientRects().length);
};
var isElement = function (obj) {
    var _a, _b;
    if (obj instanceof Element) {
        return true;
    }
    var scope = (_b = (_a = obj) === null || _a === void 0 ? void 0 : _a.ownerDocument) === null || _b === void 0 ? void 0 : _b.defaultView;
    return !!(scope && obj instanceof scope.Element);
};
var isReplacedElement = function (target) {
    switch (target.tagName) {
        case 'INPUT':
            if (target.type !== 'image') {
                break;
            }
        case 'VIDEO':
        case 'AUDIO':
        case 'EMBED':
        case 'OBJECT':
        case 'CANVAS':
        case 'IFRAME':
        case 'IMG':
            return true;
    }
    return false;
};

var global = typeof window !== 'undefined' ? window : {};

var cache = new WeakMap();
var scrollRegexp = /auto|scroll/;
var verticalRegexp = /^tb|vertical/;
var IE = (/msie|trident/i).test(global.navigator && global.navigator.userAgent);
var parseDimension = function (pixel) { return parseFloat(pixel || '0'); };
var size = function (inlineSize, blockSize, switchSizes) {
    if (inlineSize === void 0) { inlineSize = 0; }
    if (blockSize === void 0) { blockSize = 0; }
    if (switchSizes === void 0) { switchSizes = false; }
    return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
};
var zeroBoxes = freeze({
    devicePixelContentBoxSize: size(),
    borderBoxSize: size(),
    contentBoxSize: size(),
    contentRect: new DOMRectReadOnly(0, 0, 0, 0)
});
var calculateBoxSizes = function (target, forceRecalculation) {
    if (forceRecalculation === void 0) { forceRecalculation = false; }
    if (cache.has(target) && !forceRecalculation) {
        return cache.get(target);
    }
    if (isHidden(target)) {
        cache.set(target, zeroBoxes);
        return zeroBoxes;
    }
    var cs = getComputedStyle(target);
    var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
    var removePadding = !IE && cs.boxSizing === 'border-box';
    var switchSizes = verticalRegexp.test(cs.writingMode || '');
    var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || '');
    var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || '');
    var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
    var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
    var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
    var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
    var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
    var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
    var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
    var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
    var horizontalPadding = paddingLeft + paddingRight;
    var verticalPadding = paddingTop + paddingBottom;
    var horizontalBorderArea = borderLeft + borderRight;
    var verticalBorderArea = borderTop + borderBottom;
    var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
    var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
    var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
    var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
    var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
    var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
    var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
    var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
    var boxes = freeze({
        devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
        borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
        contentBoxSize: size(contentWidth, contentHeight, switchSizes),
        contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
    });
    cache.set(target, boxes);
    return boxes;
};
var calculateBoxSize = function (target, observedBox, forceRecalculation) {
    var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
    switch (observedBox) {
        case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
            return devicePixelContentBoxSize;
        case ResizeObserverBoxOptions.BORDER_BOX:
            return borderBoxSize;
        default:
            return contentBoxSize;
    }
};

var ResizeObserverEntry = (function () {
    function ResizeObserverEntry(target) {
        var boxes = calculateBoxSizes(target);
        this.target = target;
        this.contentRect = boxes.contentRect;
        this.borderBoxSize = freeze([boxes.borderBoxSize]);
        this.contentBoxSize = freeze([boxes.contentBoxSize]);
        this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
    }
    return ResizeObserverEntry;
}());

var calculateDepthForNode = function (node) {
    if (isHidden(node)) {
        return Infinity;
    }
    var depth = 0;
    var parent = node.parentNode;
    while (parent) {
        depth += 1;
        parent = parent.parentNode;
    }
    return depth;
};

var broadcastActiveObservations = function () {
    var shallowestDepth = Infinity;
    var callbacks = [];
    resizeObservers.forEach(function processObserver(ro) {
        if (ro.activeTargets.length === 0) {
            return;
        }
        var entries = [];
        ro.activeTargets.forEach(function processTarget(ot) {
            var entry = new ResizeObserverEntry(ot.target);
            var targetDepth = calculateDepthForNode(ot.target);
            entries.push(entry);
            ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
            if (targetDepth < shallowestDepth) {
                shallowestDepth = targetDepth;
            }
        });
        callbacks.push(function resizeObserverCallback() {
            ro.callback.call(ro.observer, entries, ro.observer);
        });
        ro.activeTargets.splice(0, ro.activeTargets.length);
    });
    for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
        var callback = callbacks_1[_i];
        callback();
    }
    return shallowestDepth;
};

var gatherActiveObservationsAtDepth = function (depth) {
    resizeObservers.forEach(function processObserver(ro) {
        ro.activeTargets.splice(0, ro.activeTargets.length);
        ro.skippedTargets.splice(0, ro.skippedTargets.length);
        ro.observationTargets.forEach(function processTarget(ot) {
            if (ot.isActive()) {
                if (calculateDepthForNode(ot.target) > depth) {
                    ro.activeTargets.push(ot);
                }
                else {
                    ro.skippedTargets.push(ot);
                }
            }
        });
    });
};

var process = function () {
    var depth = 0;
    gatherActiveObservationsAtDepth(depth);
    while (hasActiveObservations()) {
        depth = broadcastActiveObservations();
        gatherActiveObservationsAtDepth(depth);
    }
    if (hasSkippedObservations()) {
        deliverResizeLoopError();
    }
    return depth > 0;
};

var trigger;
var callbacks = [];
var notify = function () { return callbacks.splice(0).forEach(function (cb) { return cb(); }); };
var queueMicroTask = function (callback) {
    if (!trigger) {
        var toggle_1 = 0;
        var el_1 = document.createTextNode('');
        var config = { characterData: true };
        new MutationObserver(function () { return notify(); }).observe(el_1, config);
        trigger = function () { el_1.textContent = "" + (toggle_1 ? toggle_1-- : toggle_1++); };
    }
    callbacks.push(callback);
    trigger();
};

var queueResizeObserver = function (cb) {
    queueMicroTask(function ResizeObserver() {
        requestAnimationFrame(cb);
    });
};

var watching = 0;
var isWatching = function () { return !!watching; };
var CATCH_PERIOD = 250;
var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
var events = [
    'resize',
    'load',
    'transitionend',
    'animationend',
    'animationstart',
    'animationiteration',
    'keyup',
    'keydown',
    'mouseup',
    'mousedown',
    'mouseover',
    'mouseout',
    'blur',
    'focus'
];
var time = function (timeout) {
    if (timeout === void 0) { timeout = 0; }
    return Date.now() + timeout;
};
var scheduled = false;
var Scheduler = (function () {
    function Scheduler() {
        var _this = this;
        this.stopped = true;
        this.listener = function () { return _this.schedule(); };
    }
    Scheduler.prototype.run = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = CATCH_PERIOD; }
        if (scheduled) {
            return;
        }
        scheduled = true;
        var until = time(timeout);
        queueResizeObserver(function () {
            var elementsHaveResized = false;
            try {
                elementsHaveResized = process();
            }
            finally {
                scheduled = false;
                timeout = until - time();
                if (!isWatching()) {
                    return;
                }
                if (elementsHaveResized) {
                    _this.run(1000);
                }
                else if (timeout > 0) {
                    _this.run(timeout);
                }
                else {
                    _this.start();
                }
            }
        });
    };
    Scheduler.prototype.schedule = function () {
        this.stop();
        this.run();
    };
    Scheduler.prototype.observe = function () {
        var _this = this;
        var cb = function () { return _this.observer && _this.observer.observe(document.body, observerConfig); };
        document.body ? cb() : global.addEventListener('DOMContentLoaded', cb);
    };
    Scheduler.prototype.start = function () {
        var _this = this;
        if (this.stopped) {
            this.stopped = false;
            this.observer = new MutationObserver(this.listener);
            this.observe();
            events.forEach(function (name) { return global.addEventListener(name, _this.listener, true); });
        }
    };
    Scheduler.prototype.stop = function () {
        var _this = this;
        if (!this.stopped) {
            this.observer && this.observer.disconnect();
            events.forEach(function (name) { return global.removeEventListener(name, _this.listener, true); });
            this.stopped = true;
        }
    };
    return Scheduler;
}());
var scheduler = new Scheduler();
var updateCount = function (n) {
    !watching && n > 0 && scheduler.start();
    watching += n;
    !watching && scheduler.stop();
};

var skipNotifyOnElement = function (target) {
    return !isSVG(target)
        && !isReplacedElement(target)
        && getComputedStyle(target).display === 'inline';
};
var ResizeObservation = (function () {
    function ResizeObservation(target, observedBox) {
        this.target = target;
        this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
        this.lastReportedSize = {
            inlineSize: 0,
            blockSize: 0
        };
    }
    ResizeObservation.prototype.isActive = function () {
        var size = calculateBoxSize(this.target, this.observedBox, true);
        if (skipNotifyOnElement(this.target)) {
            this.lastReportedSize = size;
        }
        if (this.lastReportedSize.inlineSize !== size.inlineSize
            || this.lastReportedSize.blockSize !== size.blockSize) {
            return true;
        }
        return false;
    };
    return ResizeObservation;
}());

var ResizeObserverDetail = (function () {
    function ResizeObserverDetail(resizeObserver, callback) {
        this.activeTargets = [];
        this.skippedTargets = [];
        this.observationTargets = [];
        this.observer = resizeObserver;
        this.callback = callback;
    }
    return ResizeObserverDetail;
}());

var observerMap = new WeakMap();
var getObservationIndex = function (observationTargets, target) {
    for (var i = 0; i < observationTargets.length; i += 1) {
        if (observationTargets[i].target === target) {
            return i;
        }
    }
    return -1;
};
var ResizeObserverController = (function () {
    function ResizeObserverController() {
    }
    ResizeObserverController.connect = function (resizeObserver, callback) {
        var detail = new ResizeObserverDetail(resizeObserver, callback);
        observerMap.set(resizeObserver, detail);
    };
    ResizeObserverController.observe = function (resizeObserver, target, options) {
        var detail = observerMap.get(resizeObserver);
        var firstObservation = detail.observationTargets.length === 0;
        if (getObservationIndex(detail.observationTargets, target) < 0) {
            firstObservation && resizeObservers.push(detail);
            detail.observationTargets.push(new ResizeObservation(target, options && options.box));
            updateCount(1);
            scheduler.schedule();
        }
    };
    ResizeObserverController.unobserve = function (resizeObserver, target) {
        var detail = observerMap.get(resizeObserver);
        var index = getObservationIndex(detail.observationTargets, target);
        var lastObservation = detail.observationTargets.length === 1;
        if (index >= 0) {
            lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
            detail.observationTargets.splice(index, 1);
            updateCount(-1);
        }
    };
    ResizeObserverController.disconnect = function (resizeObserver) {
        var _this = this;
        var detail = observerMap.get(resizeObserver);
        detail.observationTargets.slice().forEach(function (ot) { return _this.unobserve(resizeObserver, ot.target); });
        detail.activeTargets.splice(0, detail.activeTargets.length);
    };
    return ResizeObserverController;
}());

var ResizeObserver = (function () {
    function ResizeObserver(callback) {
        if (arguments.length === 0) {
            throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
        }
        if (typeof callback !== 'function') {
            throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
        }
        ResizeObserverController.connect(this, callback);
    }
    ResizeObserver.prototype.observe = function (target, options) {
        if (arguments.length === 0) {
            throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
        }
        if (!isElement(target)) {
            throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
        }
        ResizeObserverController.observe(this, target, options);
    };
    ResizeObserver.prototype.unobserve = function (target) {
        if (arguments.length === 0) {
            throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
        }
        if (!isElement(target)) {
            throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
        }
        ResizeObserverController.unobserve(this, target);
    };
    ResizeObserver.prototype.disconnect = function () {
        ResizeObserverController.disconnect(this);
    };
    ResizeObserver.toString = function () {
        return 'function ResizeObserver () { [polyfill code] }';
    };
    return ResizeObserver;
}());

const dotsSvg = `<svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M2 12C3.10457 12 4 11.1046 4 10C4 8.89543 3.10457 8 2 8C0.89543 8 0 8.89543 0 10C0 11.1046 0.89543 12 2 12Z"
    fill="currentColor"
  />
  <path
    d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
    fill="currentColor"
  />
  <path
    d="M2 20C3.10457 20 4 19.1046 4 18C4 16.8954 3.10457 16 2 16C0.89543 16 0 16.8954 0 18C0 19.1046 0.89543 20 2 20Z"
    fill="currentColor"
  />
</svg>
`;

var __rest = (undefined && undefined.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const MxPageHeader$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.hasTabs = false;
    this.hasModalHeaderCenter = false;
    /** An array of prop objects for each button.  Use the `label` property to specify the button's inner text. */
    this.buttons = [];
    /** This flag is set by the Modal component to adjust the page header styling when used internally. */
    this.modal = false;
    /** The URL for the previous page link */
    this.previousPageUrl = '';
    /** The text to display for the previous page link */
    this.previousPageTitle = 'Back';
    /** When set to true, the Page Header will use the themed background pattern. */
    this.pattern = false;
    this.minWidths = new MinWidths();
    this.renderTertiaryButtonAsMenu = false;
  }
  /** Attach a new ResizeObserver that calls `updateRenderTertiaryButtonAsMenu` */
  async resetResizeObserver() {
    if (this.resizeObserver)
      this.resizeObserver.disconnect();
    this.resizeObserver = new ResizeObserver(() => this.updateRenderTertiaryButtonAsMenu());
    this.resizeObserver.observe(this.element);
    // Wait one tick for layout shifts in order to detect overflow correctly.
    requestAnimationFrame(this.updateRenderTertiaryButtonAsMenu.bind(this));
  }
  componentWillLoad() {
    this.hasTabs = !!this.element.querySelector('[slot="tabs"]');
    this.hasModalHeaderCenter = !!this.element.querySelector('[slot="modal-header-center"]');
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
    this.resizeObserver.disconnect();
  }
  updateRenderTertiaryButtonAsMenu() {
    // Only move tertiary button to menu, and only for small screens
    if (this.minWidths.md || this.buttons.length < 3) {
      this.renderTertiaryButtonAsMenu = false;
      return;
    }
    if (!this.tertiaryButtonWrapper)
      return;
    const { left } = this.tertiaryButtonWrapper.getBoundingClientRect();
    const buttonRight = Math.floor(left + this.tertiaryButtonWrapper.offsetWidth);
    const { right: containerRight } = this.buttonRow.getBoundingClientRect();
    const isOverflowing = buttonRight > containerRight;
    this.renderTertiaryButtonAsMenu = isOverflowing;
    if (isOverflowing) {
      requestAnimationFrame(() => {
        if (this.tertiaryMenu)
          this.tertiaryMenu.anchorEl = this.menuButton;
      });
    }
  }
  componentDidLoad() {
    this.resetResizeObserver();
  }
  get hostClass() {
    let str = 'mx-page-header flex flex-col';
    if (this.pattern)
      str += ' bg-pattern';
    if (this.minWidths.md && this.modal) {
      str += ' px-40';
      str += this.hasTabs ? ' min-h-128' : ' min-h-80';
      return str;
    }
    else {
      str += ' px-24 lg:px-72';
    }
    if (this.hasTabs)
      str += ' pb-12 md:pb-0';
    if (this.buttons.length && this.hasTabs)
      str += ' min-h-176 md:min-h-164';
    else if (this.buttons.length)
      str += ' min-h-128';
    else
      str += ' min-h-80 md:min-h-128';
    return str;
  }
  get headingClass() {
    let str = '!my-0 pr-20 emphasis ';
    if (!this.minWidths.md)
      str += this.previousPageUrl ? 'text-h6' : 'text-h5';
    else
      str += this.previousPageUrl || this.modal ? 'text-h5' : 'text-h3';
    return str;
  }
  get previousPageClass() {
    let str = 'flex items-center pt-16 md:pt-20 uppercase caption1 font-semibold tracking-1-25';
    if (this.modal)
      str += ' md:hidden';
    return str;
  }
  get buttonsJsx() {
    return (h("div", { ref: el => (this.buttonRow = el), class: "flex py-1 space-x-8 md:space-x-24 md:justify-end md:flex-row-reverse md:space-x-reverse items-center max-w-full" }, this.buttons.map((button, index) => {
      // If not specified, set btnType automatically for primary, secondary, and tertiary buttons
      let { btnType } = button;
      if (!btnType)
        btnType = index === 0 ? 'contained' : index === 1 ? 'outlined' : 'text';
      const isTertiary = index === 2;
      const menuItemProps = __rest(button, ["label"]); // Do not use button label as menu item label (use in slot instead)
      return (h("div", { ref: el => isTertiary && (this.tertiaryButtonWrapper = el), class: isTertiary ? 'relative !ml-auto md:!ml-0' : '' }, isTertiary && this.renderTertiaryButtonAsMenu && (h("div", { class: "absolute !ml-auto -top-6" }, h("mx-icon-button", { ref: el => (this.menuButton = el), innerHTML: dotsSvg }), h("mx-menu", { ref: el => (this.tertiaryMenu = el), "anchor-el": this.menuButton }, h("mx-menu-item", Object.assign({}, menuItemProps), button.label)))), h("mx-button", Object.assign({}, button, { xl: this.minWidths.lg, "btn-type": btnType, "aria-hidden": isTertiary && this.renderTertiaryButtonAsMenu, class: isTertiary && this.renderTertiaryButtonAsMenu ? 'opacity-0 pointer-events-none' : '' }), button.label)));
    })));
  }
  render() {
    return (h(Host, { class: this.hostClass }, h("div", { class: "absolute top-16 md:top-20 md:mt-2 right-24 md:right-40" }, h("slot", { name: "modal-header-right" })), h("slot", { name: "previous-page" }, this.previousPageUrl && (h("a", { href: this.previousPageUrl, class: this.previousPageClass }, h("span", { class: "mr-10", innerHTML: arrowSvg }), this.previousPageTitle))), h("div", { class: "flex flex-col py-10 space-y-14 md:space-y-0 md:flex-row flex-grow md:items-center justify-center md:justify-between flex-wrap" }, h("div", { class: 'grid grid-cols-1 flex-1 items-center' + (this.hasModalHeaderCenter ? ' sm:grid-cols-3' : '') }, h("h1", { class: this.headingClass }, h("slot", null)), h("slot", { name: "modal-header-center" })), !(this.modal && this.minWidths.md) && this.buttons.length > 0 && this.buttonsJsx, h("slot", { name: "buttons" })), h("slot", { name: "tabs" })));
  }
  get element() { return this; }
};

const chevronLeftSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 7.41L10.42 12L15 16.59L13.59 18L7.59 12L13.59 6L15 7.41Z" fill="currentColor"/>
</svg>
`;

const chevronRightSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.58997 16.59L13.17 12L8.58997 7.41L9.99997 6L16 12L9.99997 18L8.58997 16.59Z" fill="currentColor"/>
</svg>
`;

const pageFirstSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.41 16.59L13.82 12L18.41 7.41L17 6L11 12L17 18L18.41 16.59ZM6 6H8V18H6V6Z" fill="currentColor" />
</svg>
`;

const pageLastSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.58997 7.41L10.18 12L5.58997 16.59L6.99997 18L13 12L6.99997 6L5.58997 7.41ZM16 6H18V18H16V6Z" fill="currentColor"/>
</svg>
`;

const MxPagination$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxPageChange = createEvent(this, "mxPageChange", 7);
    this.hasStatus = false;
    this.page = 1;
    this.rowsPerPageOptions = [10, 25, 50, 100];
    this.rowsPerPage = 100;
    /** Reduce the UI to only a page */
    this.simple = false;
    /** Disable the page buttons (i.e. when loading results) */
    this.disabled = false;
    /** Disable the next page button (i.e. when the last page was loaded from an API) */
    this.disableNextPage = false;
    this.hideRowsPerPage = false;
    this.moveStatusToBottom = false;
    /** Whether the component width (not viewport width) is >= 320px */
    this.isXSmallMinWidth = false;
    /** Whether the component width (not viewport width) is >= 640px */
    this.isSmallMinWidth = false;
  }
  componentWillRender() {
    this.hasStatus = !!this.element.querySelector('[slot="status"]');
  }
  componentDidLoad() {
    if (this.rowsMenu && this.rowsMenuAnchor)
      this.rowsMenu.anchorEl = this.rowsMenuAnchor;
    this.resizeObserver = new ResizeObserver(() => this.updateResponsiveElements());
    this.resizeObserver.observe(this.element);
    // Wait one tick for layout shifts in order to detect overflow correctly.
    requestAnimationFrame(this.updateResponsiveElements.bind(this));
  }
  updateResponsiveElements() {
    if (!this.paginationWrapper)
      return;
    let totalNeededWidth = Array.from(this.paginationWrapper.children).reduce((total, child) => {
      return total + child.scrollWidth;
    }, 0);
    if (this.hideRowsPerPage && this.rowsPerPageWrapper)
      totalNeededWidth += this.rowsPerPageWrapper.scrollWidth;
    const excessWidth = totalNeededWidth - this.element.offsetWidth;
    this.hideRowsPerPage = excessWidth > 0;
    this.moveStatusToBottom = excessWidth > this.rowsPerPageWrapper.scrollWidth;
    this.isXSmallMinWidth = this.element.offsetWidth >= 320;
    this.isSmallMinWidth = this.element.offsetWidth >= 640;
  }
  onClickFirstPage() {
    this.mxPageChange.emit({ page: 1, rowsPerPage: this.rowsPerPage });
  }
  onClickPreviousPage() {
    this.mxPageChange.emit({ page: this.page - 1, rowsPerPage: this.rowsPerPage });
  }
  onClickNextPage() {
    this.mxPageChange.emit({ page: this.page + 1, rowsPerPage: this.rowsPerPage });
  }
  onClickLastPage() {
    this.mxPageChange.emit({ page: this.lastPage, rowsPerPage: this.rowsPerPage });
  }
  onChangeRowsPerPage(rowsPerPage) {
    // Return to first page whenever the results-per-page changes
    this.mxPageChange.emit({ page: 1, rowsPerPage });
  }
  get lastPage() {
    if (this.totalRows === 0)
      return 1;
    if (this.totalRows == null)
      return null;
    return Math.ceil(this.totalRows / this.rowsPerPage);
  }
  get currentRange() {
    let start = this.rowsPerPage * (this.page - 1) + 1;
    let end = Math.min(this.totalRows, start + this.rowsPerPage - 1);
    return start + '–' + end;
  }
  get rowRangeClass() {
    let str = 'text-center flex-shrink min-w-0';
    str += this.isSmallMinWidth ? ' px-24' : ' px-16';
    if (!this.isXSmallMinWidth)
      str += ' whitespace-normal';
    return str;
  }
  get paginationWrapperClass() {
    let str = 'flex relative';
    if (this.moveStatusToBottom) {
      str += ' flex-col-reverse items-end';
    }
    else {
      str += ' items-center';
      str += this.hasStatus ? ' justify-between' : ' justify-end';
    }
    return str;
  }
  render() {
    return (h(Host, { class: "mx-pagination relative block text-4 whitespace-nowrap select-none" }, !this.simple && h("div", { class: "pagination-bg absolute top-0 left-0 w-full h-56 rounded-b-2xl" }), this.simple ? (
    // Simple pagination
    h("div", { class: "simple flex items-center justify-center h-48" }, h("mx-icon-button", { "aria-label": "Previous page", "chevron-left": true, disabled: this.page === 1 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }), this.lastPage !== null ? this.page + ' of ' + this.lastPage : '', h("mx-icon-button", { "aria-label": "Next page", "chevron-right": true, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }))) : (
    // Standard pagination
    h("div", { ref: el => (this.paginationWrapper = el), class: this.paginationWrapperClass }, this.hasStatus && (h("div", { "data-testid": "status", class: "px-24 py-10 flex relative items-center justify-self-start" }, h("slot", { name: "status" }))), h("div", { class: 'flex flex-grow-0 items-center justify-end h-56 pr-4' + (this.hideRowsPerPage ? ' relative' : '') }, this.rowsPerPageOptions && this.rowsPerPageOptions.length > 1 && (h("div", { ref: el => (this.rowsPerPageWrapper = el), "aria-hidden": this.hideRowsPerPage, class: 'flex items-center px-24' + (this.hideRowsPerPage ? ' absolute opacity-0 pointer-events-none' : '') }, "Rows per page: \u00A0", h("div", { "data-testid": "rows-per-page", ref: el => (this.rowsMenuAnchor = el), class: "flex items-center cursor-pointer" }, this.rowsPerPage, h("span", { class: "ml-12", innerHTML: arrowSvg$1 })), h("mx-menu", { ref: el => (this.rowsMenu = el) }, this.rowsPerPageOptions.map(option => (h("mx-menu-item", { disabled: this.disabled, onClick: this.onChangeRowsPerPage.bind(this, option) }, option)))))), this.totalRows > 0 && (h("div", { "data-testid": "row-range", class: this.rowRangeClass }, this.currentRange, " of ", this.totalRows)), h("div", { class: "flex items-center sm:space-x-8" }, h("mx-icon-button", { "aria-label": "First page", innerHTML: pageFirstSvg, disabled: this.page === 1 || this.disabled, onClick: this.onClickFirstPage.bind(this) }), h("mx-icon-button", { "aria-label": "Previous page", innerHTML: chevronLeftSvg, disabled: this.page === 1 || this.disabled, onClick: this.onClickPreviousPage.bind(this) }), h("mx-icon-button", { "aria-label": "Next page", innerHTML: chevronRightSvg, disabled: this.page === this.lastPage || this.disabled || this.disableNextPage, onClick: this.onClickNextPage.bind(this) }), this.lastPage !== null && (h("mx-icon-button", { "aria-label": "Last page", innerHTML: pageLastSvg, disabled: this.page === this.lastPage || this.disabled, onClick: this.onClickLastPage.bind(this) }))))))));
  }
  get element() { return this; }
};

const MxRadio$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
    this.componentWillRender = propagateDataAttributes;
  }
  /** Keep checked prop in sync with input element attribute */
  onInput(e) {
    this.checked = e.target.checked;
  }
  render() {
    return (h(Host, { class: "mx-radio" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4" }, h("input", Object.assign({ class: "absolute h-0 w-0 opacity-0", type: "radio", name: this.name, value: this.value, checked: this.checked }, this.dataAttributes, { onInput: this.onInput.bind(this) })), h("span", { class: "flex h-20 w-20 cursor-pointer flex-shrink-0 rounded-full" }), h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return this; }
};

const searchSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8748 3.75C6.93979 3.75 3.74982 6.93997 3.74982 10.875C3.74982 14.81 6.93979 18 10.8748 18C14.8098 18 17.9998 14.81 17.9998 10.875C17.9998 6.93997 14.8098 3.75 10.8748 3.75ZM2.24982 10.875C2.24982 6.11154 6.11136 2.25 10.8748 2.25C15.6383 2.25 19.4998 6.11154 19.4998 10.875C19.4998 15.6385 15.6383 19.5 10.8748 19.5C6.11136 19.5 2.24982 15.6385 2.24982 10.875Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9126 15.913C16.2055 15.6201 16.6804 15.6201 16.9733 15.913L21.5296 20.4693C21.8225 20.7622 21.8225 21.2371 21.5296 21.53C21.2367 21.8229 20.7618 21.8229 20.4689 21.53L15.9126 16.9737C15.6197 16.6808 15.6197 16.2059 15.9126 15.913Z" fill="currentColor"/>
</svg>
`;

const MxSearch$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dataAttributes = {};
    this.dense = false;
    this.flat = false;
    this.componentWillRender = propagateDataAttributes;
  }
  onInput(e) {
    this.value = e.target.value;
  }
  get inputClass() {
    let str = 'w-full pl-56 pr-16 rounded-lg outline-none border focus:border-2';
    str += this.flat ? ' flat' : ' shadow-1';
    str += this.dense ? ' h-36 py-8 text-4' : ' h-48 py-12';
    return str;
  }
  render() {
    return (h(Host, { class: "mx-search flex items-center relative" }, h("input", Object.assign({ type: "search", "aria-label": this.ariaLabel || this.placeholder || 'Search', name: this.name, placeholder: this.placeholder, value: this.value, class: this.inputClass }, this.dataAttributes, { onInput: this.onInput.bind(this) })), h("span", { innerHTML: searchSvg, class: "absolute left-16 pointer-events-none" })));
  }
  get element() { return this; }
};

const MxSelect$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.uuid = uuidv4();
    this.dataAttributes = {};
    this.dense = false;
    this.disabled = false;
    /** Style with a 1dp elevation */
    this.elevated = false;
    /** Style with a "flat" border color */
    this.flat = false;
    this.floatLabel = false;
    this.error = false;
    /** Additional classes for the label */
    this.labelClass = '';
    this.isFocused = false;
    this.componentWillRender = propagateDataAttributes;
  }
  componentDidLoad() {
    this.updateSelectValue();
  }
  onValueChange() {
    this.updateSelectValue();
  }
  updateSelectValue() {
    this.selectElem.value = this.value;
  }
  onFocus() {
    this.isFocused = true;
    this.error = false;
  }
  onBlur() {
    this.isFocused = false;
  }
  onInput(e) {
    this.value = e.target.value;
  }
  get hasValue() {
    return this.value !== null && this.value !== '' && this.value !== undefined;
  }
  get selectWrapperClass() {
    let str = 'mx-select-wrapper flex items-center relative border rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    if (this.elevated)
      str += ' elevated shadow-1';
    if (this.flat)
      str += ' flat';
    if (this.error || this.isFocused)
      str += ' border-2';
    if (this.error)
      str += ' error';
    if (this.disabled)
      str += ' disabled';
    return str;
  }
  get selectClass() {
    let str = 'absolute inset-0 w-full pl-16 overflow-hidden outline-none appearance-none bg-transparent cursor-pointer disabled:cursor-auto';
    if (this.isFocused)
      str += ' -m-1'; // prevent shifting due to border-width change
    return str;
  }
  get labelClassNames() {
    let str = 'block pointer-events-none';
    if (this.floatLabel) {
      str += ' absolute mt-0 left-12 px-4';
      if (this.dense)
        str += ' dense text-4';
      if (this.isFocused || this.hasValue)
        str += ' floating';
      if (this.isFocused)
        str += ' -ml-1'; // prevent shifting due to border-width change
    }
    else {
      str += ' subtitle2 mb-4';
    }
    return (str += ' ' + this.labelClass);
  }
  get iconSuffixClass() {
    let str = 'icon-suffix absolute flex items-center h-full right-16 space-x-8 pointer-events-none';
    if (this.isFocused)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  get iconEl() {
    let icon = h("span", { "data-testid": "arrow", innerHTML: arrowSvg$1 });
    if (this.error)
      icon = h("span", { "data-testid": "error-icon", innerHTML: warningCircleSvg });
    return icon;
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.selectId || this.uuid, class: this.labelClassNames }, this.label));
    return (h(Host, { class: 'mx-select' + (this.disabled ? ' disabled' : '') }, this.label && !this.floatLabel && labelJsx, h("div", { "data-testid": "select-wrapper", class: this.selectWrapperClass }, h("select", Object.assign({ "aria-label": this.label || this.ariaLabel, class: this.selectClass, disabled: this.disabled, id: this.selectId || this.uuid, name: this.name, onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onInput: this.onInput.bind(this), ref: el => (this.selectElem = el) }, this.dataAttributes), h("slot", null)), this.label && this.floatLabel && labelJsx, h("span", { class: this.iconSuffixClass }, this.suffix && h("span", { class: "suffix flex items-center h-full px-4" }, this.suffix), this.iconEl)), this.assistiveText && h("div", { class: "assistive-text caption1 mt-4 ml-16" }, this.assistiveText)));
  }
  get element() { return this; }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};

const snackbarQueue = []; // Deferred promises
const MxSnackbar$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxClose = createEvent(this, "mxClose", 7);
    this.duration = 6000;
    this.isOpen = false;
    this.isVisible = false;
  }
  async toggleSnackbar() {
    clearTimeout(this.durationTimer);
    if (this.isOpen) {
      try {
        await this.waitForOtherSnackbars();
        this.durationTimer = setTimeout(this.close.bind(this), this.duration);
        moveToPortal(this.element);
        this.isVisible = true;
        fadeScaleIn(this.alertEl, undefined, 'center');
      }
      catch (err) {
        // Snackbar was closed programmatically before leaving the queue; do nothing.
      }
    }
    else {
      this.removeFromQueue();
      this.isVisible = false;
      this.mxClose.emit();
    }
  }
  waitForOtherSnackbars() {
    return new Promise((resolve, reject) => {
      this.queueItem = { resolve, reject };
      snackbarQueue.push(this.queueItem);
      if (snackbarQueue.length === 1)
        return resolve();
    });
  }
  removeFromQueue() {
    if (!this.queueItem)
      return;
    const queueIndex = snackbarQueue.indexOf(this.queueItem);
    snackbarQueue.splice(snackbarQueue.indexOf(this.queueItem), 1);
    if (queueIndex === 0 && snackbarQueue.length > 0)
      snackbarQueue[0].resolve(); // Show next snackbar in queue
  }
  async close() {
    if (!this.isOpen)
      return;
    await fadeOut(this.alertEl);
    this.isOpen = false;
  }
  get alertClass() {
    let str = 'mx-snackbar-alert flex flex-wrap items-center justify-between rounded-lg text-4 max-w-360 sm:w-360 shadow-6 px-16 py-14';
    return str;
  }
  render() {
    return (h(Host, { class: 'flex fixed w-full z-50 left-0 bottom-40 px-16 justify-center' + (this.isVisible ? '' : ' hidden') }, h("div", { ref: el => (this.alertEl = el), role: "alert", class: this.alertClass }, h("p", { class: "my-0" }, h("slot", null)), h("div", { class: "ml-auto", onClick: this.close.bind(this) }, h("slot", { name: "action" })))));
  }
  get element() { return this; }
  static get watchers() { return {
    "isOpen": ["toggleSnackbar"]
  }; }
};

const MxSwitch$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dataAttributes = {};
    this.name = '';
    this.value = '';
    this.labelName = '';
    this.checked = false;
    this.componentWillRender = propagateDataAttributes;
  }
  /** Keep checked prop in sync with input element attribute */
  onInput(e) {
    this.checked = e.target.checked;
  }
  render() {
    return (h(Host, { class: "mx-switch" }, h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer text-4" }, h("input", Object.assign({ class: "absolute h-0 w-0 opacity-0", role: "switch", type: "checkbox", name: this.name, value: this.value, checked: this.checked }, this.dataAttributes, { onInput: this.onInput.bind(this) })), h("div", { class: "slider relative cursor-pointer round w-36 h-14 flex-shrink-0" }), h("div", { class: "ml-16 inline-block", "data-testid": "labelName" }, this.labelName))));
  }
  get element() { return this; }
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
    /** Do not set this manually. It will be set automatically based on the `mx-tabs` `value` prop */
    this.selected = false;
    /** Display a circular badge */
    this.badge = false;
    /** Additional classes for the badge */
    this.badgeClass = '';
  }
  componentDidLoad() {
    if (!this.label && !this.ariaLabel) {
      throw new Error('Please provide either a label or an aria-label for each tab.');
    }
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
    return h("mx-badge", { indicator: true, badgeClass: ['w-8 h-8', this.badgeClass].join(' ') });
  }
  get isTextOnly() {
    return this.label && !this.icon;
  }
  render() {
    return (h(Host, { class: this.tabClass }, h("button", { ref: el => (this.btnElem = el), role: "tab", type: "button", "aria-selected": this.selected, "aria-label": this.label || this.ariaLabel, class: "relative overflow-hidden w-full h-full border border-transparent", onClick: this.onClick.bind(this) }, h("div", { class: "relative flex flex-col items-center justify-center space-y-6 pointer-events-none" }, !this.isTextOnly && (h("span", { class: "flex items-center space-x-6" }, !this.label && this.badge && this.badgeEl, this.icon && h("i", { class: this.icon + ' text-1' + (!this.label ? ' icon-only' : '') }))), this.label && (h("span", { class: "flex items-center uppercase text-4 font-semibold leading-4 tracking-1-25 space-x-6" }, this.badge && this.badgeEl, h("span", null, this.label))))), h("span", { class: 'active-tab-indicator absolute bottom-0 left-0 w-full h-2 pointer-events-none' +
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

const gearSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" fill="#333333"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.95058 1.96137C9.16383 1.8994 9.38813 1.88522 9.6075 1.91982C9.82576 1.95425 10.0338 2.03613 10.2169 2.15968L11.4772 2.9998H12.523L13.7833 2.15968C13.9664 2.03615 14.1744 1.95428 14.3927 1.91986C14.6121 1.88527 14.8364 1.89946 15.0496 1.96144L15.0535 1.96257C16.5923 2.41876 18.0015 3.23235 19.166 4.33691L19.1689 4.33971C19.3292 4.49341 19.4537 4.68057 19.5334 4.88785C19.6127 5.09406 19.6458 5.31514 19.6304 5.5355C19.6303 5.53664 19.6302 5.53779 19.6301 5.53894L19.5329 7.04702L20.0558 7.95276L21.4104 8.62261C21.4115 8.6231 21.4125 8.62359 21.4135 8.62409C21.612 8.72093 21.787 8.86015 21.9259 9.03197C22.0656 9.20465 22.1654 9.406 22.2184 9.62167L22.2193 9.62558C22.5937 11.1864 22.5937 12.8135 22.2193 14.3743L22.2184 14.3782C22.1654 14.5939 22.0656 14.7952 21.9259 14.9679C21.787 15.1397 21.612 15.279 21.4134 15.3758C21.4124 15.3763 21.4114 15.3768 21.4104 15.3773L20.0558 16.0471L19.5329 16.9529L19.6301 18.4609C19.6301 18.4621 19.6302 18.4632 19.6303 18.4644C19.6457 18.6847 19.6126 18.9058 19.5333 19.112C19.4536 19.3193 19.3291 19.5064 19.1688 19.6601L19.1659 19.6629C18.0014 20.7675 16.5922 21.5811 15.0534 22.0373L15.0495 22.0384C14.8363 22.1004 14.612 22.1146 14.3926 22.08C14.1743 22.0455 13.9663 21.9637 13.7832 21.8401C13.7822 21.8395 13.7813 21.8388 13.7803 21.8382L12.5229 21H11.4771L10.2197 21.8382C10.2188 21.8388 10.2179 21.8394 10.217 21.84C10.0338 21.9636 9.8257 22.0455 9.6074 22.0799C9.38804 22.1145 9.16374 22.1003 8.95047 22.0383L8.94661 22.0372C7.40778 21.581 5.99861 20.7674 4.83411 19.6629L4.83117 19.6601C4.67087 19.5064 4.54643 19.3192 4.46672 19.1119C4.38741 18.9057 4.3543 18.6846 4.36972 18.4642L4.46717 16.9528L3.94424 16.047L2.58663 15.3757C2.38804 15.2789 2.21311 15.1396 2.07417 14.9678C1.93452 14.7951 1.83467 14.5938 1.78171 14.3781L1.78075 14.3742C1.40642 12.8134 1.40642 11.1863 1.78074 9.62551L1.78169 9.62155C1.83466 9.40588 1.93453 9.20454 2.07418 9.03187C2.21312 8.86007 2.38804 8.72086 2.5866 8.62402L3.9443 7.95267L4.46723 7.04693L4.3698 5.53551C4.35438 5.31512 4.38749 5.09402 4.46681 4.8878C4.54653 4.68052 4.67098 4.49336 4.83128 4.33967L4.83419 4.33688C5.99868 3.23231 7.40784 2.41873 8.94667 1.96252L8.95058 1.96137ZM9.36956 3.40168C8.05996 3.79052 6.86062 4.48298 5.86908 5.42272C5.8681 5.42374 5.86733 5.42495 5.86682 5.42627C5.86626 5.42773 5.86603 5.4293 5.86614 5.43086L5.86656 5.43663L5.97873 7.17704C5.98826 7.32479 5.95383 7.47206 5.8798 7.60028L5.1298 8.89932C5.05577 9.02755 4.94544 9.131 4.81272 9.19662L3.24415 9.97224C3.24273 9.97293 3.24148 9.9739 3.24049 9.97512C3.2396 9.97622 3.23893 9.97749 3.23854 9.97886C2.9205 11.3074 2.92049 12.6922 3.23853 14.0207C3.23892 14.0222 3.23959 14.0235 3.24051 14.0246C3.2415 14.0258 3.24274 14.0268 3.24415 14.0275L3.24935 14.03L4.81266 14.8031C4.94539 14.8687 5.05571 14.9721 5.12974 15.1004L5.87974 16.3994C5.95378 16.5276 5.9882 16.6749 5.97867 16.8227L5.86609 18.5689C5.86598 18.5705 5.86619 18.572 5.86675 18.5735C5.86726 18.5748 5.86802 18.576 5.869 18.5771C6.86059 19.5168 8.06 20.2093 9.36967 20.5981C9.37099 20.5984 9.37237 20.5984 9.37373 20.5982C9.37457 20.5981 9.37539 20.5979 9.37617 20.5975C9.37683 20.5973 9.37745 20.5969 9.37805 20.5965L9.38283 20.5933L10.834 19.6259C10.9572 19.5438 11.1019 19.5 11.25 19.5H12.75C12.8981 19.5 13.0428 19.5438 13.166 19.6259L14.622 20.5966C14.6233 20.5974 14.6248 20.598 14.6263 20.5983C14.6277 20.5985 14.6291 20.5984 14.6305 20.5981C15.9401 20.2093 17.1394 19.5169 18.1309 18.5772C18.1319 18.5761 18.1327 18.5749 18.1333 18.5735C18.1338 18.5721 18.1341 18.5705 18.1339 18.5689L18.1335 18.5632L18.0214 16.8228C18.0118 16.675 18.0463 16.5277 18.1203 16.3995L18.8703 15.1005C18.9443 14.9722 19.0546 14.8688 19.1874 14.8032L20.7559 14.0276C20.7574 14.0269 20.7586 14.0259 20.7596 14.0247C20.7602 14.024 20.7606 14.0232 20.761 14.0225M20.7616 14.0209C21.0799 12.6912 21.0796 11.3051 20.7607 9.97543L21.49 9.80051L20.7616 9.97934C20.7613 9.97782 20.7606 9.97639 20.7596 9.97518C20.7586 9.97396 20.7574 9.97297 20.7559 9.97229L20.7507 9.96977L19.1874 9.19671C19.0547 9.13108 18.9444 9.02764 18.8703 8.89941L18.1203 7.60037C18.0463 7.47214 18.0119 7.32487 18.0214 7.17712L18.134 5.43088C18.1341 5.42931 18.1339 5.42774 18.1333 5.42628C18.1328 5.42495 18.1321 5.42374 18.1311 5.42272C17.1387 4.48217 15.9381 3.78935 14.6271 3.40071L14.8403 2.68164L14.631 3.40184C14.6295 3.40141 14.6279 3.40131 14.6264 3.40155C14.6248 3.40179 14.6233 3.40238 14.622 3.40326L14.6173 3.4065L13.1661 4.37384C13.0429 4.45597 12.8982 4.4998 12.7501 4.4998H11.2501C11.102 4.4998 10.9573 4.45597 10.8341 4.37384L9.3781 3.40323C9.37679 3.40234 9.37533 3.40174 9.37378 3.4015C9.37237 3.40128 9.37094 3.40134 9.36956 3.40168" fill="currentColor"/>
</svg>
`;

const MxTable$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxSortChange = createEvent(this, "mxSortChange", 7);
    this.mxRowCheck = createEvent(this, "mxRowCheck", 7);
    this.mxVisibleRowsChange = createEvent(this, "mxVisibleRowsChange", 7);
    this.mxRowMove = createEvent(this, "mxRowMove", 7);
    this.hasDefaultSlot = false;
    this.hasSearch = false;
    this.hasFilter = false;
    this.showOperationsBar = false;
    /** An array of objects that defines the table's dataset. */
    this.rows = [];
    /** An array of column definitions.  If not specified, a column will be generated for each property on the row object. */
    this.columns = [];
    /** Make rows checkable.  You must either provide a `getRowId` getter (for generated rows), or
     * provide a `rowId` for every `mx-table-row` if creating the rows manually in the table's slot. */
    this.checkable = false;
    /** Set to `false` to prevent checking rows by clicking on them (outside the checkboxes). */
    this.checkOnRowClick = true;
    /** Set to `false` to hide the (un)check all checkbox at the top of the table. */
    this.showCheckAll = true;
    /** Enables reordering of rows via drag and drop. */
    this.draggableRows = false;
    this.hoverable = true;
    /** Set to `true` to allow smaller tables to shrink to less than 100% width on larger screens */
    this.autoWidth = false;
    this.sortAscending = true;
    /** Show the pagination component.  Setting this to `false` will show all rows. */
    this.paginate = true;
    /** The page to display */
    this.page = 1;
    this.rowsPerPage = 10;
    /** Disable the next-page button.  Useful when using server-side pagination and the total number of rows is unknown. */
    this.disableNextPage = false;
    /** Do not sort or paginate client-side. Use events to send server requests instead. */
    this.serverPaginate = false;
    /** Show a progress bar below the header row */
    this.showProgressBar = false;
    /** Disable the pagination buttons (i.e. while loading results) */
    this.disablePagination = false;
    /** The progress bar percentage from 0 to 100. If not provided (or set to `null`), an indeterminate progress bar will be displayed. */
    this.progressValue = null;
    /** Delay the appearance of the progress bar for this many milliseconds */
    this.progressAppearDelay = 0;
    this.minWidths = new MinWidths();
    this.checkedRowIds = [];
    this.exposedMobileColumnIndex = 0;
    this.hasActionsColumnFromSlot = false;
  }
  onMxCheck(e) {
    const { rowId, checked } = e.detail;
    if (!checked && this.checkedRowIds.includes(rowId)) {
      this.checkedRowIds = this.checkedRowIds.filter(id => id !== rowId);
    }
    else if (checked && !this.checkedRowIds.includes(rowId)) {
      this.checkedRowIds = [...this.checkedRowIds, rowId];
    }
    this.mxRowCheck.emit(this.checkedRowIds);
  }
  async onMxRowDragStart(e) {
    this.dragRow = e.target.closest('mx-table-row');
    // Cache height of row (including any nested rows)
    this.dragRowHeight = await this.dragRow.getHeight();
    // Get all rows that are affected by dragging this one (i.e. the same parent node)
    this.dragRowSiblings = Array.from(this.dragRow.parentNode.children).filter(c => c.tagName === 'MX-TABLE-ROW');
    this.dragRowIndex = this.dragRowSiblings.indexOf(this.dragRow);
    this.dragOverRowIndex = this.dragRowIndex;
    this.dragMoveHandler = this.onDragMove.bind(this);
    // Add transitions to the rows
    this.dragRowSiblings.forEach(async (row) => {
      if (!e.detail.isKeyboard && row === this.dragRow)
        return; // Do not transition a row dragged with a mouse
      (await row.getChildren()).forEach((rowChild) => {
        rowChild.classList.add('transition-transform', 'pointer-events-none');
      });
    });
    if (!e.detail.isKeyboard) {
      document.addEventListener('touchmove', this.dragMoveHandler);
      document.addEventListener('mousemove', this.dragMoveHandler);
    }
  }
  async onDragKeyDown(e) {
    let direction;
    const key = e.detail;
    if (['ArrowUp', 'ArrowLeft'].includes(key))
      direction = -1;
    if (['ArrowDown', 'ArrowRight'].includes(key))
      direction = 1;
    if (!direction)
      return;
    if (direction === -1 && this.dragOverRowIndex === 0)
      return; // Row is at the top
    if (direction === 1 && this.dragOverRowIndex === this.dragRowSiblings.length - 1)
      return; // Row is at the bottom
    this.dragOverRowIndex += direction;
    // Determine the translate distance based on sibling row heights
    let translateY = 0;
    let rowIndex = this.dragOverRowIndex;
    while (rowIndex !== this.dragRowIndex) {
      const translateDir = this.dragOverRowIndex > this.dragRowIndex ? 1 : -1;
      translateY += (await this.dragRowSiblings[rowIndex].getHeight()) * translateDir;
      rowIndex -= translateDir;
    }
    this.dragRow.translateRow(0, translateY);
    this.onDragMove();
  }
  onMxRowDragEnd(e) {
    document.removeEventListener('mousemove', this.dragMoveHandler);
    document.removeEventListener('touchmove', this.dragMoveHandler);
    if (!e.detail.isCancel && this.dragOverRowIndex !== this.dragRowIndex) {
      // If row was dragged to a new position AND dragging wasn't cancelled, emit the mxRowMove event
      this.mxRowMove.emit({
        rowId: e.target.rowId,
        oldIndex: this.dragRowIndex,
        newIndex: this.dragOverRowIndex,
      });
      if (e.detail.isKeyboard)
        this.dragRowSiblings[this.dragOverRowIndex].focusDragHandle(); // Focus the handle at the new index
    }
    this.dragRowIndex = null;
    // Remove transitions and transforms from rows
    requestAnimationFrame(() => {
      this.dragRowSiblings.forEach(async (row) => {
        (await row.getChildren()).forEach((rowChild) => {
          rowChild.classList.remove('transition-transform', 'pointer-events-none');
          rowChild.style.transform = '';
        });
      });
    });
    document.body.style.cursor = '';
  }
  onVisibleRowsChange() {
    this.getTableRows().forEach(row => row.collapse());
    this.mxVisibleRowsChange.emit(this.visibleRows);
  }
  onPageChange() {
    // Scroll back to the top of the table on page change (if necessary)
    if (this.element.getBoundingClientRect().top < 0)
      this.element.scrollIntoView();
  }
  resetPage() {
    if (!this.serverPaginate)
      this.page = 1;
  }
  async getCheckedRowIds() {
    return this.checkedRowIds;
  }
  async setCheckedRowIds(checkedRowIds = []) {
    this.checkedRowIds = checkedRowIds;
  }
  async checkAll() {
    if (this.getRowId) {
      this.checkedRowIds = this.rows.map(this.getRowId).map(id => id.toString());
    }
    else {
      this.checkedRowIds = this.getTableRows().map(row => row.rowId);
    }
  }
  async checkNone() {
    this.checkedRowIds = [];
  }
  getTableRows() {
    return Array.from(this.element.querySelectorAll('mx-table-row'));
  }
  onCheckAllClick(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering a sort when checkbox is in first column header
    if (this.checkedRowIds.length === 0) {
      this.checkAll();
    }
    else {
      this.checkNone();
    }
  }
  /** Animate table rows while dragging a row */
  onDragMove(e) {
    requestAnimationFrame(() => {
      if (this.dragRow == null)
        return;
      this.dragRowSiblings.forEach(async (row, rowIndex) => {
        const rowChildren = await row.getChildren();
        const { top } = getPageRect(rowChildren[0]);
        const { bottom } = getPageRect(rowChildren[rowChildren.length - 1]);
        if (e) {
          const { pageY } = getCursorCoords(e);
          if (pageY >= top && pageY <= bottom)
            this.dragOverRowIndex = rowIndex;
        }
        if (row === this.dragRow)
          return; // Do not shift row that is being dragged
        if (rowIndex <= this.dragOverRowIndex && rowIndex > this.dragRowIndex) {
          // Shift rows that are below the dragged row UP
          rowChildren.forEach(child => (child.style.transform = `translateY(-${this.dragRowHeight}px)`));
        }
        else if (rowIndex >= this.dragOverRowIndex && rowIndex < this.dragRowIndex) {
          // Shift rows that are above the dragged row DOWN
          rowChildren.forEach(child => (child.style.transform = `translateY(${this.dragRowHeight}px)`));
        }
        else {
          rowChildren.forEach(child => (child.style.transform = ''));
        }
      });
    });
  }
  setCellProps() {
    const rows = this.getTableRows();
    rows.forEach((row) => {
      if (row.subheader)
        return;
      const cells = row.querySelectorAll('mx-table-cell');
      let colIndex = 0;
      cells.forEach((cell) => {
        cell.columnIndex = colIndex;
        cell.isExposedMobileColumn = colIndex === this.exposedMobileColumnIndex;
        cell.heading = this.cols[colIndex].heading;
        cell.classList.add(...this.getAlignClass(this.cols[colIndex]).split(' '));
        if (colIndex === this.cols.length - 1)
          colIndex = 0;
        else
          colIndex++;
      });
    });
  }
  setRowsChecked() {
    this.getTableRows().forEach(row => (row.checked = this.checkedRowIds.includes(row.rowId)));
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  componentWillLoad() {
    this.hasDefaultSlot = Array.from(this.element.children).some(el => !el.getAttribute('slot'));
  }
  componentWillRender() {
    this.hasFilter = !!this.element.querySelector('[slot="filter"]');
    this.hasSearch = !!this.element.querySelector('[slot="search"]');
    this.showOperationsBar = !!this.getMultiRowActions || this.hasFilter || this.hasSearch;
    this.hasActionsColumnFromSlot =
      this.hasDefaultSlot && this.getTableRows().some(row => row.actions && row.actions.length);
    const rows = this.getTableRows();
    if (!this.paginate) {
      rows.forEach((row, i) => {
        const addOrRemove = i === rows.length - 1 ? 'add' : 'remove';
        row.classList[addOrRemove]('last-row');
      });
    }
    requestAnimationFrame(this.setCellProps.bind(this));
  }
  componentDidRender() {
    if (this.actionMenu && !this.actionMenu.anchorEl) {
      this.actionMenu.anchorEl = this.actionMenuButton;
    }
    if (this.checkable)
      this.setRowsChecked();
  }
  componentDidLoad() {
    // Emit paginated rows right away.
    this.onVisibleRowsChange();
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  get cols() {
    // If `columns` prop is not provided, create a column for each row object property
    if (!this.columns.length && this.rows.length) {
      return Object.keys(this.rows[0]).map(property => ({ property, heading: capitalize(property), sortable: true }));
    }
    return this.columns.map(col => (Object.assign(Object.assign({}, col), { sortable: col.sortable === false ? false : true })));
  }
  get exposedMobileColumn() {
    return this.cols[this.exposedMobileColumnIndex] || {};
  }
  get visibleRows() {
    if (this.serverPaginate || (!this.paginate && !this.sortBy))
      return this.rows;
    const offset = (this.page - 1) * this.rowsPerPage;
    let rows = this.rows.slice();
    if (this.sortBy)
      this.sortRows(rows);
    rows = rows.slice(offset, offset + this.rowsPerPage);
    return rows;
  }
  get allRowsChecked() {
    return this.rows.length && this.rows.length === this.checkedRowIds.length;
  }
  get someRowsChecked() {
    return this.checkedRowIds.length > 0 && this.checkedRowIds.length < this.rows.length;
  }
  get multiRowActions() {
    if (!this.getMultiRowActions)
      return [];
    return this.getMultiRowActions(this.checkedRowIds);
  }
  get hasActionsColumn() {
    return !!this.getRowActions || this.hasActionsColumnFromSlot;
  }
  get operationsBarStyle() {
    if (this.minWidths.sm) {
      // On larger screens, use a three-column grid
      return {
        gridTemplateColumns: 'max-content 1fr max-content',
      };
    }
    else if (this.checkable && this.showCheckAll) {
      // If checkbox on mobile, use a two-column grid
      return {
        gridTemplateColumns: 'minmax(0, max-content) 1fr',
      };
    }
    else {
      // If no checkbox on mobile, use a single column
      return {
        gridTemplateColumns: '1fr',
      };
    }
  }
  get searchStyle() {
    if (this.minWidths.sm) {
      // On larger screens, place in last column of first grid row
      return { width: '240px', gridColumnStart: '-1' };
    }
    else if (!(this.checkable && this.showCheckAll)) {
      // If no checkbox on mobile, span the entire first grid row
      return { width: '100%', gridColumnStart: '1' };
    }
    else {
      // If checkbox on mobile, span remaining space in first grid row (up to 240px)
      return { width: '100%', maxWidth: '240px', gridColumnStart: '2' };
    }
  }
  get gridStyle() {
    if (!this.minWidths.sm)
      return { display: 'flex', flexDirection: 'column' };
    const display = this.autoWidth ? 'inline-grid' : 'grid';
    const autoColumnCount = this.cols.length + (this.hasActionsColumn ? 1 : 0);
    const gridTemplateColumns = `repeat(${autoColumnCount}, minmax(0, auto))`;
    return { display, gridTemplateColumns };
  }
  get emptyStateClass() {
    let str = 'empty-state';
    if (this.rows.length > 0 || this.getTableRows().length > 0)
      str += ' hidden';
    return str;
  }
  sortRows(rows) {
    const sortByColumn = this.cols.find(c => c.property === this.sortBy);
    if (!sortByColumn)
      return;
    let sortCompare = sortByColumn.sortCompare;
    if (!sortCompare) {
      sortCompare = (a, b) => {
        const valueA = this.getCellSortableValue(a, sortByColumn);
        const valueB = this.getCellSortableValue(b, sortByColumn);
        if (typeof valueA === 'number' && typeof valueB === 'number')
          return valueA - valueB;
        return valueA.localeCompare(valueB);
      };
    }
    rows.sort(sortCompare);
    if (!this.sortAscending)
      rows.reverse();
  }
  getCellSortableValue(row, col) {
    if (col.getValue)
      return col.getValue(row);
    const val = row[col.property];
    if (['date', 'dateTime'].includes(col.type) || isDateObject(val))
      return -new Date(val).getTime();
    if (col.type === 'boolean')
      return val ? 1 : 0;
    return val;
  }
  getCellValue(row, col, rowIndex) {
    if (col.getValue)
      return col.getValue(row, rowIndex);
    const val = row[col.property];
    if (col.type === 'date' || isDateObject(val))
      return new Date(val).toLocaleDateString();
    if (col.type === 'dateTime' || isDateObject(val))
      return new Date(val).toLocaleString();
    if (col.type === 'boolean')
      return val ? 'Yes' : '';
    return val;
  }
  getHeaderClass(col, colIndex) {
    if (!col)
      return '';
    let str = 'flex items-center subtitle2 py-18 ' + this.getAlignClass(col);
    str += this.minWidths.sm ? ' px-16' : ' flex-1';
    const isCheckAllInHeader = this.showCheckAll && !this.showOperationsBar;
    if (this.minWidths.sm && colIndex === 0)
      str += ' space-x-16';
    if (!this.minWidths.sm && colIndex === this.exposedMobileColumnIndex && this.checkable && isCheckAllInHeader)
      str += ' px-16';
    if (!this.draggableRows && col.sortable && col.property)
      str += ' group cursor-pointer';
    if (col.headerClass)
      str += col.headerClass;
    return str;
  }
  getHeaderArrowClass(col) {
    let str = 'ml-12 transform scale-75';
    if (col.property !== this.sortBy)
      str += ' opacity-30 sm:opacity-0 sm:group-hover:opacity-30 rotate-180';
    else if (this.sortAscending)
      str += ' rotate-180';
    return str;
  }
  getAlignClass(col) {
    let str = 'justify-start';
    let alignment = col.align || (col.type === 'number' ? 'right' : 'left');
    str += alignment === 'right' ? ' sm:justify-end' : alignment === 'center' ? ' sm:justify-center' : '';
    return str;
  }
  onHeaderClick(col) {
    if (this.draggableRows || !col || !col.sortable || !col.property)
      return;
    if (this.sortBy !== col.property) {
      this.sortBy = col.property;
      this.sortAscending = true;
    }
    else {
      if (this.sortAscending)
        this.sortAscending = false;
      else {
        this.sortBy = null;
        this.sortAscending = true;
      }
    }
    this.mxSortChange.emit({ sortBy: this.sortBy, sortAscending: this.sortAscending });
  }
  changeExposedColumnIndex(delta) {
    const newColumnIndex = this.exposedMobileColumnIndex + delta;
    if (newColumnIndex < 0 || newColumnIndex >= this.cols.length)
      return;
    this.exposedMobileColumnIndex = newColumnIndex;
  }
  onMxPageChange(e) {
    if (this.serverPaginate)
      return;
    this.page = e.detail.page;
    this.rowsPerPage = e.detail.rowsPerPage;
  }
  render() {
    const checkAllCheckbox = this.checkable && this.showCheckAll && (h("mx-checkbox", { checked: this.allRowsChecked, class: this.showOperationsBar ? 'ml-24' : 'pr-4', indeterminate: this.someRowsChecked, onClick: this.onCheckAllClick.bind(this), "label-name": "Select all rows", "hide-label": true }));
    let multiRowActionUI;
    if (this.checkable) {
      multiRowActionUI =
        this.multiRowActions.length === 1 ? (
        // Multi-Row Action Button
        h("mx-button", Object.assign({ "data-testid": "multi-action-button", "btn-type": "outlined" }, this.multiRowActions[0], { class: 'whitespace-nowrap' + (!this.checkedRowIds.length ? ' hidden' : '') }), this.multiRowActions[0].value)) : (
        // Multi-Row Action Menu
        h("span", { class: !this.checkedRowIds.length ? 'hidden' : null }, h("mx-button", { ref: el => (this.actionMenuButton = el), "btn-type": "text", dropdown: true }, h("span", { class: "h-full flex items-center px-2" }, h("span", { innerHTML: gearSvg }))), h("mx-menu", { "data-testid": "multi-action-menu", ref: el => (this.actionMenu = el) }, this.multiRowActions.map(action => (h("mx-menu-item", Object.assign({}, action), action.value))))));
    }
    const operationsBar = (h("div", { class: "grid gap-x-16 gap-y-12 pb-12", style: this.operationsBarStyle }, this.checkable && this.showCheckAll && (h("div", { class: "col-start-1 flex items-center min-h-36 space-x-16" }, checkAllCheckbox, multiRowActionUI)), this.hasFilter && (h("div", { class: "flex items-center flex-wrap row-start-2 col-span-full sm:row-start-auto sm:col-span-1" }, h("slot", { name: "filter" }))), this.hasSearch && (h("div", { class: "justify-self-end", style: this.searchStyle }, h("slot", { name: "search" })))));
    return (h(Host, { class: 'mx-table block text-4' + (this.hoverable ? ' hoverable' : '') }, this.showOperationsBar && operationsBar, h("div", { "data-testid": "grid", class: "table-grid relative", style: this.gridStyle }, h("div", { class: "header-row" }, this.minWidths.sm ? (
    // Non-Mobile Column Headers
    this.cols.map((col, colIndex) => {
      return (h("div", { id: `column-header-${colIndex}`, role: "columnheader", class: this.getHeaderClass(col, colIndex), onClick: this.onHeaderClick.bind(this, col) }, colIndex === 0 && this.minWidths.sm && !this.showOperationsBar && checkAllCheckbox, h("div", { class: "inline-flex items-center overflow-hidden whitespace-nowrap select-none" }, h("span", { class: "truncate flex-shrink", innerHTML: col.heading }), !this.draggableRows && col.sortable && col.property && (h("div", { class: this.getHeaderArrowClass(col), "data-testid": "arrow", innerHTML: arrowSvg$1 })))));
    })) : (
    // Mobile Column Header Navigation
    h("div", { class: "flex items-stretch" }, !this.showOperationsBar && checkAllCheckbox, h("div", { id: `column-header-${this.exposedMobileColumnIndex}`, role: "columnheader", class: this.getHeaderClass(this.exposedMobileColumn, this.exposedMobileColumnIndex), onClick: this.onHeaderClick.bind(this, this.exposedMobileColumn) }, h("div", { class: "inline-flex items-center overflow-hidden whitespace-nowrap select-none" }, h("span", { class: "truncate flex-shrink", innerHTML: this.exposedMobileColumn.heading }), !this.draggableRows && this.exposedMobileColumn.sortable && this.exposedMobileColumn.property && (h("div", { class: this.getHeaderArrowClass(this.exposedMobileColumn), "data-testid": "arrow", innerHTML: arrowSvg$1 })))), this.columns.length >= 2 && (h("div", { class: "flex items-center" }, h("mx-icon-button", { "data-testid": "previous-column-button", chevronLeft: true, disabled: this.exposedMobileColumnIndex === 0, onClick: this.changeExposedColumnIndex.bind(this, -1) }), h("mx-icon-button", { "data-testid": "next-column-button", chevronRight: true, disabled: this.exposedMobileColumnIndex === this.cols.length - 1, onClick: this.changeExposedColumnIndex.bind(this, 1) }))))), this.minWidths.sm && this.hasActionsColumn && h("div", null)), this.showProgressBar && (h("div", null, h("div", { class: "block h-0 col-span-full" }, h("mx-linear-progress", { class: "transform -translate-y-1/2", value: this.progressValue, "appear-delay": this.progressAppearDelay })))), h("slot", null), !this.hasDefaultSlot && (h("div", null, this.visibleRows.map((row, rowIndex) => (
    // Generated Body Rows
    h("mx-table-row", { "row-id": this.getRowId ? this.getRowId(row) : null, actions: this.getRowActions ? this.getRowActions(row) : undefined }, this.cols.map((col) => (h("mx-table-cell", { class: col.cellClass }, h("div", { innerHTML: this.getCellValue(row, col, rowIndex) }))))))))), h("div", { "data-testid": "empty-state", class: this.emptyStateClass }, h("div", { class: "col-span-full p-16 text-4" }, h("slot", { name: "empty-state" }, h("span", null, "No results found.")))), this.paginate && (
    // Pagination Row
    h("div", { class: "pagination-row" }, h("mx-pagination", { page: this.page, "rows-per-page": this.rowsPerPage, rowsPerPageOptions: this.rowsPerPageOptions, "total-rows": this.serverPaginate ? this.totalRows : this.rows.length, class: "col-span-full p-0 rounded-b-2xl", onMxPageChange: this.onMxPageChange.bind(this), disabled: this.disablePagination, disableNextPage: this.disableNextPage }))))));
  }
  get element() { return this; }
  static get watchers() { return {
    "sortBy": ["onVisibleRowsChange", "resetPage"],
    "sortAscending": ["onVisibleRowsChange", "resetPage"],
    "page": ["onVisibleRowsChange", "onPageChange"],
    "rowsPerPage": ["onVisibleRowsChange", "resetPage"],
    "rows": ["onVisibleRowsChange", "resetPage"]
  }; }
};

const MxTableCell$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /** This is automatically set by the parent `mx-table`. */
    this.isExposedMobileColumn = true;
    this.minWidths = new MinWidths();
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  get cellClass() {
    let str = 'mx-table-cell flex flex-1 items-center overflow-hidden';
    if (!this.minWidths.sm && this.isExposedMobileColumn)
      str += ' row-start-1 exposed-cell';
    else if (!this.minWidths.sm)
      str += ' py-0 pb-12 col-start-2 col-span-4';
    return str;
  }
  render() {
    return (h(Host, { role: "gridcell", "aria-describedby": this.columnIndex != null ? `column-header-${this.columnIndex}` : null, class: this.cellClass }, h("div", { class: "min-h-16 max-w-full break-words", role: this.columnIndex == null ? 'heading' : null }, !this.minWidths.sm && !this.isExposedMobileColumn && this.heading != null && (h("p", { class: "subtitle5 my-0 mb-4", innerHTML: this.heading })), h("slot", null))));
  }
  get element() { return this; }
};

const dragDotsSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 13C14.5523 13 15 12.5523 15 12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12C13 12.5523 13.4477 13 14 13Z" fill="currentColor"/>
  <path d="M14 5C14.5523 5 15 4.55228 15 4C15 3.44772 14.5523 3 14 3C13.4477 3 13 3.44772 13 4C13 4.55228 13.4477 5 14 5Z" fill="currentColor"/>
  <path d="M14 21C14.5523 21 15 20.5523 15 20C15 19.4477 14.5523 19 14 19C13.4477 19 13 19.4477 13 20C13 20.5523 13.4477 21 14 21Z" fill="currentColor"/>
  <path d="M10 13C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11C9.44772 11 9 11.4477 9 12C9 12.5523 9.44772 13 10 13Z" fill="currentColor"/>
  <path d="M10 5C10.5523 5 11 4.55228 11 4C11 3.44772 10.5523 3 10 3C9.44772 3 9 3.44772 9 4C9 4.55228 9.44772 5 10 5Z" fill="currentColor"/>
  <path d="M14 9C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7C13.4477 7 13 7.44772 13 8C13 8.55228 13.4477 9 14 9Z" fill="currentColor"/>
  <path d="M14 17C14.5523 17 15 16.5523 15 16C15 15.4477 14.5523 15 14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17Z" fill="currentColor"/>
  <path d="M10 9C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7C9.44772 7 9 7.44772 9 8C9 8.55228 9.44772 9 10 9Z" fill="currentColor"/>
  <path d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17Z" fill="currentColor"/>
  <path d="M10 21C10.5523 21 11 20.5523 11 20C11 19.4477 10.5523 19 10 19C9.44772 19 9 19.4477 9 20C9 20.5523 9.44772 21 10 21Z" fill="currentColor"/>
</svg>
`;

const SCROLL_PX = 5; // Scroll by 5px ...
const SCROLL_INTERVAL_MS = 5; // ... every 5ms
class DragScroller {
  constructor(dragEl) {
    this.scrollingContainer = getScrollingParent(dragEl);
  }
  /** Start/stop auto-scrolling based on cursor coordinates */
  update(e) {
    clearInterval(this.interval);
    const { clientX, clientY } = getCursorCoords(e);
    const bounds = getBounds(this.scrollingContainer);
    // If not dragging outside bounds, stop
    if (clientY >= bounds.top && clientY <= bounds.bottom && clientX >= bounds.left && clientX <= bounds.right)
      return;
    const directionX = clientX < bounds.left ? -1 : 1;
    const directionY = clientY < bounds.top ? -1 : 1;
    this.interval = setInterval(window.scrollBy, SCROLL_INTERVAL_MS, SCROLL_PX * directionX, SCROLL_PX * directionY);
  }
  stop() {
    clearInterval(this.interval);
  }
}

const DEFAULT_MAX_HEIGHT = 'calc(3.25rem + 1px)'; // 52px + 1px bottom border
const MxTableRow$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxCheck = createEvent(this, "mxCheck", 7);
    this.mxRowDragStart = createEvent(this, "mxRowDragStart", 7);
    this.mxRowDragEnd = createEvent(this, "mxRowDragEnd", 7);
    this.mxDragKeyDown = createEvent(this, "mxDragKeyDown", 7);
    this.dragOrigin = { x: 0, y: 0 };
    this.indentLevel = 0;
    this.columnCount = 1;
    /** An array of Menu Item props to create the actions menu, including a `value` property for each menu item's inner text. */
    this.actions = [];
    this.checked = false;
    /** Style the row as a subheader. */
    this.subheader = false;
    this.minWidths = new MinWidths();
    this.checkable = false;
    this.checkOnRowClick = false;
    this.isDraggable = false;
    this.isDragging = false;
    this.isMobileExpanded = false;
    this.isMobileCollapsing = false;
  }
  /** Apply a CSS transform to translate the row by `x` and `y` pixels */
  async translateRow(x, y) {
    const transform = `translate3d(${x}px, ${y}px, 0)`;
    if (this.dragShadowEl)
      this.dragShadowEl.style.transform = transform;
    (await this.getChildren()).forEach((child) => (child.style.transform = transform));
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
    if (this.actions.some(action => !action.value))
      throw new Error('Table row actions must have a value property!');
    this.setIndentLevel();
  }
  componentWillRender() {
    // Determine `checkable` and `isDraggable` by pulling props from parent table.
    // This avoids having to manually pass these as props when using mx-table-row inside the table's
    // default slot.
    const table = this.element.closest('mx-table');
    this.checkable = table && table.checkable;
    this.isDraggable = table && table.draggableRows;
    this.columnCount = (table && table.columns.length) + (this.actions.length ? 1 : 0);
    if (this.checkable && this.rowId == null)
      throw new Error('Checkable rows require either a getRowId prop on the table, or a rowId on the row!');
    if (this.checkable)
      this.checkOnRowClick = table.checkOnRowClick;
  }
  componentDidRender() {
    // Anchor the action menu to the action menu button.
    // We cannot use `componentDidLoad` for this because these elements sometimes get destroyed
    // during render when the viewport is resized across breakpoints.
    if (this.actions.length > 1 && this.actionMenu && this.actionMenuButton)
      this.actionMenu.anchorEl = this.actionMenuButton;
    this.wrapFirstColumn();
    this.moveNestedRows();
    // Render collapsed mobile row
    if (!this.minWidths.sm && !this.isMobileExpanded)
      this.rowEl.style.maxHeight = this.getCollapsedHeight();
  }
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  setIndentLevel() {
    let parentRow = this.element.parentElement.closest('mx-table-row');
    this.indentLevel = 0;
    while (parentRow) {
      if (!parentRow.subheader)
        this.indentLevel++;
      parentRow = parentRow.parentElement.closest('mx-table-row');
    }
  }
  /** Move first cell into same container as checkbox and drag handle. */
  wrapFirstColumn() {
    const firstCell = this.element.querySelector('mx-table-cell');
    if (this.firstColumnWrapper && firstCell)
      this.firstColumnWrapper.appendChild(firstCell);
  }
  /** Move nested rows from the default slot to a container outside the collapsible row. */
  moveNestedRows() {
    const nestedRows = Array.from(this.rowEl.children).filter(c => c.tagName === 'MX-TABLE-ROW');
    nestedRows.forEach(childRow => this.childRowWrapper.appendChild(childRow));
  }
  onClick(e) {
    if (!!e.target.closest('button, input, mx-menu'))
      return; // Ignore clicks on buttons, etc.
    if (!this.minWidths.sm) {
      // Collapse/expand row when the exposed column cell is clicked
      const exposedCell = this.getExposedCell();
      if (!exposedCell || this.subheader || this.columnCount < 2)
        return;
      if (e.target.closest('mx-table-cell') === exposedCell)
        this.accordion();
    }
    else if (this.checkable && this.checkOnRowClick) {
      // (Un)check row
      this.checked = !this.checked;
      this.mxCheck.emit({ rowId: this.rowId, checked: this.checked });
    }
  }
  /** Add hover styling to this row, but not the parent row(s) */
  onMouseOver(e) {
    e.stopPropagation();
    const isDraggingChildRow = e.buttons > 0;
    if (!isDraggingChildRow)
      this.rowEl.classList.add('hovered-row');
  }
  onMouseOut(e) {
    e.stopPropagation();
    this.rowEl.classList.remove('hovered-row');
  }
  onKeyboardHandleKeyDown(e) {
    // Start keyboard dragging on Space/Enter if not already dragging
    if (!this.isDragging && [' ', 'Enter'].includes(e.key))
      this.startDragging(e);
  }
  async startDragging(e) {
    e.stopPropagation();
    e.preventDefault();
    this.isDragging = true;
    if (e.type !== 'keydown') {
      // If using a mouse or touch, set drag origin to current cursor coordinates
      const { pageX, pageY } = getCursorCoords(e);
      this.dragOrigin.x = pageX;
      this.dragOrigin.y = pageY;
    }
    else {
      // If using a keyboard, set drag origin to the row's coordinates on the page
      const { top, left } = getPageRect(this.rowEl.children[0]);
      this.dragOrigin.x = left;
      this.dragOrigin.y = top;
    }
    this.rowEl.classList.add('pointer-events-none');
    this.createDragShadowEl();
    const children = await this.getChildren();
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.style.zIndex = '9999';
    }
    this.addDragListeners(e);
    this.mxRowDragStart.emit({ isKeyboard: e.type === 'keydown' });
  }
  addDragListeners(startEvent) {
    /** Move all the row children and dragShadowEl with the mouse cursor (via CSS transform) */
    const onMouseMove = (e) => {
      requestAnimationFrame(() => {
        if (!this.isDragging)
          return;
        const { pageX, pageY } = getCursorCoords(e);
        const x = pageX - this.dragOrigin.x;
        const y = pageY - this.dragOrigin.y;
        this.translateRow(x, y);
        this.dragScroller && this.dragScroller.update(e);
      });
    };
    /** Stop dragging when the mouse button is released or touch ends */
    const onMouseUp = (e) => {
      e.stopPropagation();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
      document.removeEventListener('touchcancel', onMouseUp);
      this.dragScroller.stop();
      this.dragScroller = null;
      this.stopDragging(e.type === 'touchcancel');
    };
    /** Move row or cancel dragging based on keypress */
    const onKeyDown = (e) => {
      if ([' ', 'Enter'].includes(e.key)) {
        document.removeEventListener('keydown', onKeyDown);
        this.stopDragging(true);
      }
      else if (['Escape', 'Tab'].includes(e.key)) {
        document.removeEventListener('keydown', onKeyDown);
        this.stopDragging(true, true);
      }
      else if (e.key.includes('Arrow')) {
        this.mxDragKeyDown.emit(e.key);
      }
      else {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
    };
    // Add the above listeners based on the type of input device being used
    if (startEvent.type === 'keydown') {
      document.addEventListener('keydown', onKeyDown);
    }
    else if (startEvent.type === 'touchstart') {
      this.dragScroller = new DragScroller(this.rowEl);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);
      document.addEventListener('touchcancel', onMouseUp);
    }
    else {
      this.dragScroller = new DragScroller(this.rowEl);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }
  /** Clear transforms and remove dragShadowEl */
  async stopDragging(isKeyboard = false, isCancel = false) {
    this.isDragging = false;
    this.rowEl.classList.remove('drag-row', 'pointer-events-none');
    if (this.dragShadowEl)
      this.dragShadowEl.remove();
    this.dragShadowEl = undefined;
    const children = await this.getChildren();
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.style.transform = '';
      child.style.zIndex = '';
    }
    this.mxRowDragEnd.emit({ isKeyboard, isCancel });
  }
  /** When dragging, add an element behind the row children that has a box shadow.
   * This is simpler than trying to change the row to `display: flex` to add a box shadow to it. */
  async createDragShadowEl() {
    this.dragShadowEl = document.createElement('div');
    this.dragShadowEl.classList.add('absolute', 'w-full', 'shadow-24');
    this.dragShadowEl.style.zIndex = '9998';
    this.dragShadowEl.style.height = (await this.getHeight()) + 'px';
    const firstChild = (await this.getChildren())[0];
    this.dragShadowEl.style.top = firstChild.offsetTop + 'px';
    this.dragShadowEl.style.left = firstChild.offsetLeft + 'px';
    this.element.parentNode.insertBefore(this.dragShadowEl, this.element);
  }
  accordion() {
    if (this.minWidths.sm)
      return;
    this.rowEl.style.transition = 'max-height 150ms ease';
    this.isMobileExpanded ? this.collapse() : this.expand();
  }
  async collapse() {
    if (!this.isMobileExpanded)
      return;
    this.isMobileCollapsing = true;
    this.rowEl.style.maxHeight = this.rowEl.scrollHeight + 'px';
    requestAnimationFrame(() => {
      this.rowEl.style.maxHeight = this.getCollapsedHeight();
    });
    if (!this.rowEl.style.transition) {
      this.isMobileExpanded = false;
      this.isMobileCollapsing = false;
    }
  }
  async expand() {
    if (this.isMobileExpanded)
      return;
    this.rowEl.style.maxHeight = this.rowEl.scrollHeight + 'px';
    this.isMobileExpanded = true;
    requestAnimationFrame(() => {
      this.rowEl.style.maxHeight = this.rowEl.scrollHeight + 'px';
    });
  }
  async focusDragHandle() {
    if (this.keyboardDragHandle)
      this.keyboardDragHandle.focus();
  }
  /** Returns the immediate children of the row, as well as the immediate children of all nested
   * rows.  If a child is `display: contents` (i.e. the first column wrapper), then its children
   * are added. */
  async getChildren() {
    let children = [];
    if (!this.minWidths.sm)
      children.push(this.rowEl);
    else
      Array.from(this.rowEl.children).forEach(child => {
        if (!child.offsetParent)
          children.push(...Array.from(child.children));
        else
          children.push(child);
      });
    const nestedRows = Array.from(this.childRowWrapper.children);
    await Promise.all(nestedRows.map(childRow => childRow.getChildren().then(grandchildren => children.push(...grandchildren))));
    return children;
  }
  /** Calculate the height of the row, including the height of nested rows */
  async getHeight() {
    let height = (await this.getChildren())[0].offsetHeight;
    const nestedRows = Array.from(this.childRowWrapper.children);
    await Promise.all(nestedRows.map(childRow => childRow.getHeight().then(childHeight => (height += childHeight))));
    return height;
  }
  onTransitionEnd(e) {
    if (e.target === this.rowEl) {
      this.rowEl.style.transition = '';
      if (this.isMobileCollapsing) {
        this.isMobileExpanded = false;
        this.isMobileCollapsing = false;
      }
      // Remove explicit max-height after expanding to avoid issues with window resizing, etc.
      this.rowEl.style.maxHeight = '';
    }
    // When keyboard dragging, scroll the first element into view if moved out of bounds
    if (e.target === this.rowEl.children[0] && isScrolledOutOfView(this.rowEl.children[0]))
      this.rowEl.children[0].scrollIntoView();
  }
  onCheckboxInput(e) {
    this.mxCheck.emit({ rowId: this.rowId, checked: e.target.checked });
  }
  getExposedCell() {
    const cells = Array.from(this.element.querySelectorAll('mx-table-cell')) || [];
    return cells.find((cell) => cell.isExposedMobileColumn);
  }
  getCollapsedHeight() {
    const exposedCell = this.getExposedCell();
    if (!exposedCell || !exposedCell.offsetHeight)
      return DEFAULT_MAX_HEIGHT;
    return exposedCell.offsetHeight + 1 + 'px';
  }
  get rowEl() {
    return this.element.firstElementChild;
  }
  get rowClass() {
    let str = 'table-row overflow-hidden';
    str += this.minWidths.sm ? ' contents' : ' grid';
    if (this.checkable)
      str += ' checkable-row';
    if (this.checkable && this.checkOnRowClick)
      str += ' cursor-pointer';
    if (!this.minWidths.sm && !this.isMobileExpanded)
      str += ' mobile-collapsed';
    if (this.subheader)
      str += ' subheader overline2';
    return str;
  }
  get rowStyle() {
    if (this.minWidths.sm)
      return {};
    let gridTemplateColumns = this.indentLevel > 0 ? 'minmax(0, min-content)' : '0';
    gridTemplateColumns += this.checkable ? ' minmax(0, min-content)' : ' 0';
    gridTemplateColumns += this.isDraggable ? ' minmax(0, min-content)' : ' 0';
    gridTemplateColumns += ' minmax(0, auto) minmax(0, min-content)';
    return {
      gridTemplateColumns,
      maxHeight: '',
    };
  }
  get indentClass() {
    let str = 'table-row-indent h-full';
    if (this.minWidths.sm)
      return str;
    str += ' col-start-1 row-start-1';
    return (str += ' row-span-' + this.columnCount);
  }
  get indentStyle() {
    return { width: 2 * this.indentLevel + 'rem', minWidth: this.indentLevel + 'rem' };
  }
  render() {
    return (h(Host, { class: "mx-table-row contents" }, h("div", { role: "row", class: this.rowClass, style: this.rowStyle, onClick: this.onClick.bind(this), onTransitionEnd: this.onTransitionEnd.bind(this), onMouseOver: this.onMouseOver.bind(this), onMouseOut: this.onMouseOut.bind(this) }, h("div", { ref: el => (this.firstColumnWrapper = el), class: 'first-column-wrapper contents sm:flex sm:items-center min-w-0 overflow-hidden' +
        (this.subheader ? ' sm:col-span-full' : '') }, h("div", { class: this.indentClass, style: this.indentStyle, "data-testid": 'indent-' + this.indentLevel }), this.checkable && (h("div", { class: "flex items-center pr-4 col-start-2 row-start-1 sm:row-start-auto sm:col-start-auto", onClick: this.accordion.bind(this) }, h("mx-checkbox", { ref: el => (this.checkbox = el), checked: this.checked, onInput: this.onCheckboxInput.bind(this), onClick: e => e.stopPropagation(), "label-name": "Select row", "hide-label": true }))), this.isDraggable && (h("div", { class: "drag-handle flex items-center col-start-3 row-start-1 sm:row-start-auto sm:col-start-auto cursor-move", "data-testid": "drag-handle", onMouseDown: this.startDragging.bind(this), onTouchStart: this.startDragging.bind(this) }, h("span", { "aria-label": "Press Space or Enter to move this row", ref: el => (this.keyboardDragHandle = el), tabindex: "0", class: 'pointer-events-none' + (this.checkable ? ' mx-8' : ''), innerHTML: dragDotsSvg, onKeyDown: this.onKeyboardHandleKeyDown.bind(this) }), this.isDragging && (h("p", { class: "sr-only", role: "alert" }, "Use the arrow keys to move the row up and down. Press Space or Enter to accept. Press Escape to cancel."))))), h("slot", null), !this.checkable && !this.minWidths.sm && h("div", { class: "row-start-1 col-start-2 w-0" }), !this.isDraggable && !this.minWidths.sm && h("div", { class: "row-start-1 col-start-3 w-0" }), !this.minWidths.sm && !this.subheader && this.columnCount > 1 && (h("button", { class: "flex border-0 items-center justify-end px-16 row-start-1", "aria-hidden": "true", onClick: this.accordion.bind(this), onMouseDown: e => e.preventDefault() /* Do not focus on click */ }, h("span", { class: 'mobile-row-chevron text-1 transform' +
        (this.isMobileExpanded && !this.isMobileCollapsing ? ' rotate-180' : ''), innerHTML: chevronSvg }))), this.actions.length === 1 && (h("div", { class: "action-cell flex items-center p-16 sm:p-0 justify-end col-start-2 col-span-4 sm:col-span-1" }, h("mx-button", Object.assign({ "data-testid": "action-button", "btn-type": "text" }, this.actions[0]), this.actions[0].value))), this.actions.length > 1 && (h("div", { class: "action-cell flex items-center p-0 justify-end col-start-2 col-span-4 sm:col-span-1" }, h("mx-icon-button", { ref: el => (this.actionMenuButton = el), innerHTML: dotsSvg }), h("mx-menu", { "data-testid": "action-menu", ref: el => (this.actionMenu = el) }, this.actions.map(action => (h("mx-menu-item", Object.assign({}, action), action.value))))))), h("div", { ref: el => (this.childRowWrapper = el), class: "contents" })));
  }
  get element() { return this; }
};

const MxTabs$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.mxChange = createEvent(this, "mxChange", 7);
    /** Stretch tabs to fill the entire width */
    this.fill = false;
    /** The index of the selected tab */
    this.value = null;
    this.minWidths = new MinWidths();
  }
  connectedCallback() {
    minWidthSync.subscribeComponent(this);
  }
  animateIndicator(tabIndex, previousTabIndex) {
    if (queryPrefersReducedMotion())
      return;
    if (tabIndex == null || previousTabIndex == null)
      return;
    // Find the distance between the clicked tab and the soon-to-be-deselected tab
    const tabEls = this.element.querySelectorAll('.mx-tab');
    const previousSelectedTab = tabEls[previousTabIndex];
    const newSelectedTab = tabEls[tabIndex];
    if (!previousSelectedTab || !newSelectedTab)
      return;
    const distance = previousSelectedTab.offsetLeft - newSelectedTab.offsetLeft;
    const indicator = newSelectedTab.querySelector('.active-tab-indicator');
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
  disconnectedCallback() {
    minWidthSync.unsubscribeComponent(this);
  }
  // Get the clicked tab's index and emit it via the mxChange event
  onClick(e) {
    const tab = e.target.closest('.mx-tab');
    if (!tab)
      return;
    const tabs = this.element.querySelectorAll('.mx-tab');
    const tabIndex = Array.prototype.indexOf.call(tabs, tab);
    if (tabIndex >= 0)
      this.mxChange.emit(tabIndex);
  }
  // When rendered as an mx-select, emit the select element's value via the mxChange event
  onInput(e) {
    this.mxChange.emit(+e.target.value);
  }
  // When true, render the tabs as an mx-select
  get renderAsSelect() {
    return !this.minWidths.md && this.tabs && this.tabs.length > 2;
  }
  get gridClass() {
    let str = this.fill ? 'grid' : 'inline-grid';
    str += ' grid-flow-col auto-cols-fr';
    return str;
  }
  render() {
    return (h(Host, { class: "mx-tabs relative block", role: "tablist" }, this.renderAsSelect ? (h("mx-select", { value: this.value, onInput: this.onInput.bind(this), dense: true }, this.tabs.map((tab, index) => (h("option", { value: index }, tab.label || tab.ariaLabel))))) : (this.tabs && (h("div", { class: this.gridClass }, this.tabs.map((tab, index) => (h("mx-tab", Object.assign({ selected: this.value === index }, tab)))))))));
  }
  get element() { return this; }
  static get watchers() { return {
    "value": ["animateIndicator"]
  }; }
};

const clockSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z" fill="currentColor" fill-opacity="0.87" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C12.4142 6 12.75 6.33579 12.75 6.75V11.25H17.25C17.6642 11.25 18 11.5858 18 12C18 12.4142 17.6642 12.75 17.25 12.75H12C11.5858 12.75 11.25 12.4142 11.25 12V6.75C11.25 6.33579 11.5858 6 12 6Z" fill="currentColor" fill-opacity="0.87"/>
</svg>
`;

const timeOptions = [];
for (let i = 0; i < 24; i++) {
  timeOptions.push({ hours: i, minutes: 0 });
  timeOptions.push({ hours: i, minutes: 30 });
}
const MxTimePicker$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.dataAttributes = {};
    this.isTimeInputSupported = false;
    this.uuid = uuidv4();
    this.dense = false;
    this.disabled = false;
    this.error = false;
    this.floatLabel = false;
    this.isFocused = false;
    this.isInputDirty = false;
    this.componentWillRender = propagateDataAttributes;
  }
  onClick(e) {
    e.stopPropagation();
    // Resize the menu width to match the input.  This is done every click in case the input is resized after initial load.
    this.menu.style.width = this.pickerWrapper.getBoundingClientRect().width + 'px';
  }
  onValueChange() {
    this.updateInputValue();
  }
  componentDidLoad() {
    this.menu.anchorEl = this.pickerWrapper;
    this.menu.triggerEl = this.menuButton;
    // HTMLInputElement.type will return "text" if the "time" value is not supported (i.e. Safari <14.1)
    this.isTimeInputSupported = this.inputElem.type === 'time';
    this.updateInputValue();
  }
  onInput(e) {
    if (!this.isTimeInputSupported) {
      e.stopPropagation(); // For <input type="text">, the input event will be dispatched on blur
      if (this.isFocused)
        this.isInputDirty = true;
    }
  }
  onBlur() {
    if (!this.menu || !this.menu.isOpen) {
      // Style as focused/active while menu is open
      this.isFocused = false;
    }
    if (!this.isTimeInputSupported && this.isInputDirty) {
      const time = parseTimeString(this.inputElem.value);
      if (time === null)
        return; // Invalid time
      this.setValue(time);
      this.updateInputValue();
    }
  }
  onFocus() {
    this.isFocused = true;
    this.error = false;
    this.isInputDirty = false;
  }
  /** Focus the input when clicking the floating label.
   * Using `pointer-events: none` on the label could cause the user to unknowingly click on
   * the minutes/AM/PM entry, which would be annoying. */
  onClickLabel() {
    this.inputElem.focus();
  }
  onMenuClose() {
    if (!this.inputElem.contains(document.activeElement))
      this.isFocused = false;
  }
  onMenuOpen() {
    this.isFocused = true;
  }
  /** This is only called if <input type="time"> is not supported. */
  setValue({ hours, minutes }) {
    if (this.disabled)
      return;
    this.error = false;
    this.value = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);
    this.updateInputValue();
    this.inputElem.dispatchEvent(new Event('input', { cancelable: true, bubbles: true }));
  }
  updateInputValue() {
    if (this.value == null) {
      this.inputElem.value = '';
      return;
    }
    this.inputElem.value = this.value;
    if (!this.isTimeInputSupported) {
      this.inputElem.dispatchEvent(new Event('input', { cancelable: true, bubbles: true }));
      // If time input is not supported, format text input value for locale
      const [hours, minutes] = this.value.split(':').map(Number);
      this.inputElem.value = this.getLocalizedTimeString({ hours, minutes });
    }
  }
  getLocalizedTimeString({ hours, minutes }) {
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  get labelClassNames() {
    let str = 'block';
    if (this.floatLabel) {
      str += ' absolute mt-0 left-12 px-4';
      if (this.dense)
        str += ' dense text-4';
      if (this.isFocused || this.inputHasText)
        str += ' floating';
      if (this.isFocused)
        str += ' -ml-1'; // prevent shifting due to border-width change
    }
    else {
      str += ' subtitle2 mb-4 pointer-events-none';
    }
    return str;
  }
  get inputHasText() {
    // HTMLInputElement.validity.badInput is true if a partial time has been typed.
    return this.value || (this.inputElem && this.inputElem.validity.badInput);
  }
  get pickerWrapperClass() {
    let str = 'picker-wrapper flex items-center relative border rounded-lg';
    str += this.dense ? ' h-36' : ' h-48';
    if (this.error || this.isFocused)
      str += ' border-2';
    if (this.disabled)
      str += ' disabled';
    if (this.isFocused)
      str += ' focused';
    return str;
  }
  get inputClass() {
    let str = 'absolute inset-0 w-full h-full pl-12 overflow-hidden outline-none appearance-none select-none bg-transparent';
    if (this.isFocused || this.error)
      str += ' -ml-1'; // prevent shifting due to border-width change
    if (this.floatLabel && !this.isFocused && !this.inputHasText)
      str += ' opacity-0'; // Hide input placeholder while floating label is inside input
    return str;
  }
  get menuButtonClass() {
    let str = 'menu-button cursor-pointer border-0 absolute flex items-center h-full right-12 space-x-8';
    if (this.disabled)
      str += ' pointer-events-none';
    if (this.isFocused || this.error)
      str += ' -mr-1'; // prevent shifting due to border-width change
    return str;
  }
  render() {
    const labelJsx = (h("label", { htmlFor: this.inputId || this.uuid, class: this.labelClassNames, onClick: this.onClickLabel.bind(this) }, this.label));
    return (h(Host, { class: 'mx-time-picker block w-152' + (this.error ? ' error' : '') }, this.label && !this.floatLabel && labelJsx, h("div", { ref: el => (this.pickerWrapper = el), class: this.pickerWrapperClass }, h("input", Object.assign({ "aria-label": this.ariaLabel || this.label, class: this.inputClass, id: this.inputId || this.uuid, name: this.name, onBlur: this.onBlur.bind(this), onFocus: this.onFocus.bind(this), onInput: this.onInput.bind(this), ref: el => (this.inputElem = el), tabindex: "0", type: "time", disabled: this.disabled, required: true }, this.dataAttributes)), this.label && this.floatLabel && labelJsx, h("button", { ref: el => (this.menuButton = el), class: this.menuButtonClass, "data-testid": "menu-button", innerHTML: this.error ? warningCircleSvg : clockSvg, disabled: this.disabled })), this.assistiveText && (h("div", { class: "caption1 mt-4 ml-16" }, h("span", { "data-testid": "assistive-text", class: "assistive-text" }, this.assistiveText))), h("mx-menu", { ref: el => (this.menu = el), placement: "bottom", offset: [0, 1], onMxClose: this.onMenuClose.bind(this), onMxOpen: this.onMenuOpen.bind(this) }, timeOptions.map(timeOption => (h("mx-menu-item", { onClick: this.setValue.bind(this, timeOption) }, this.getLocalizedTimeString(timeOption)))))));
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
    this.dataAttributes = {};
    this.selected = false;
    this.disabled = false;
    this.componentWillRender = propagateDataAttributes;
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
    return (h(Host, { class: "mx-toggle-button inline-flex overflow-hidden border-l\n      first-of-type:border-l-0 first-of-type:rounded-tl first-of-type:rounded-bl\n      last-of-type:rounded-tr last-of-type:rounded-br" }, h("button", Object.assign({ class: 'btn-toggle inline-flex relative items-center justify-center w-48 h-48 text-1 overflow-hidden cursor-pointer' +
        (this.selected ? ' selected' : ''), ref: el => (this.btnElem = el), "aria-disabled": this.disabled, role: this.value === undefined ? 'switch' : 'radio', "aria-checked": this.selected, "aria-label": this.ariaLabel, onClick: this.onClick.bind(this) }, this.dataAttributes), h("i", { class: this.icon }))));
  }
  get element() { return this; }
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

const MxTooltip$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.uuid = uuidv4();
    /** Delay showing the tooltip for this many milliseconds */
    this.appearDelay = 0;
    /** Increase the padding, add a shadow, and make the corners less rounded (typically for multi-line text) */
    this.extended = false;
    /** Invert the default colors (i.e. dark text on a light background) */
    this.inverted = false;
    /** The maximum width of the tooltip (e.g. '20rem') */
    this.maxWidth = '10rem';
    /** This is typically updated automatically based on events, but may be changed programmatically if necessary. */
    this.isOpen = false;
    /** The preferred placement of the tooltip, relative to the anchor element. */
    this.placement = 'bottom';
  }
  onIsOpenChange() {
    this.isOpen ? this.show() : this.hide();
  }
  componentDidLoad() {
    let anchorEl = this.element.firstElementChild;
    // For custom elements that wrap buttons, inputs, attach event listeners to the native element
    anchorEl = this.element.firstElementChild.querySelector('button, input, [role="button"]') || anchorEl;
    anchorEl.setAttribute('aria-describedby', this.uuid);
    anchorEl.addEventListener('mouseenter', this.show.bind(this));
    anchorEl.addEventListener('mouseleave', this.hide.bind(this));
    if (anchorEl.tabIndex === -1)
      anchorEl.tabIndex = 0;
    anchorEl.addEventListener('focus', this.show.bind(this));
    anchorEl.addEventListener('blur', this.hide.bind(this));
  }
  async show() {
    clearTimeout(this.openTimeout);
    if (this.isOpen)
      return;
    this.openTimeout = setTimeout(async () => {
      this.isOpen = true;
      this.popoverInstance = await createPopover(this.element.firstElementChild, this.tooltipElem, this.placement, [0, 4]);
      fadeScaleIn(this.tooltipElem, undefined, convertPlacementToOrigin(this.popoverInstance.state.placement));
    }, this.appearDelay);
  }
  async hide() {
    clearTimeout(this.openTimeout);
    if (!this.isOpen)
      return;
    await fadeOut(this.tooltipElem);
    this.isOpen = false;
    if (!this.popoverInstance)
      return;
    this.popoverInstance.destroy();
    this.popoverInstance = null;
  }
  get tooltipClasses() {
    let str = 'mx-tooltip caption1 absolute pointer-events-none z-50';
    if (!this.isOpen)
      str += ' hidden';
    if (this.inverted)
      str += ' inverted';
    if (this.extended) {
      str += ' p-16 rounded-lg shadow-4';
    }
    else {
      str += ' px-12 py-4 rounded-2xl';
    }
    if (this.tooltipClass)
      str += ' ' + this.tooltipClass;
    return str;
  }
  render() {
    return (h(Host, { class: "inline-block" }, h("slot", null), h("div", { ref: el => (this.tooltipElem = el), id: this.uuid, role: "tooltip", class: this.tooltipClasses, style: { maxWidth: this.maxWidth }, "data-testid": "tooltip" }, h("slot", { name: "tooltip" }, this.value))));
  }
  get element() { return this; }
  static get watchers() { return {
    "isOpen": ["onIsOpenChange"]
  }; }
};

const MxBadge = /*@__PURE__*/proxyCustomElement(MxBadge$1, [4,"mx-badge",{"value":[8],"squared":[4],"indicator":[8],"badgeClass":[1,"badge-class"],"icon":[1],"offset":[2],"bottom":[4],"left":[4]}]);
const MxButton = /*@__PURE__*/proxyCustomElement(MxButton$1, [4,"mx-button",{"btnType":[1,"btn-type"],"type":[1],"value":[1],"formaction":[1],"disabled":[4],"xl":[4],"href":[1],"target":[1],"full":[4],"dropdown":[4],"icon":[1]}]);
const MxCheckbox = /*@__PURE__*/proxyCustomElement(MxCheckbox$1, [0,"mx-checkbox",{"name":[1],"value":[1],"labelLeft":[4,"label-left"],"labelName":[1,"label-name"],"labelClass":[1,"label-class"],"hideLabel":[4,"hide-label"],"checked":[1028],"disabled":[4],"indeterminate":[4]}]);
const MxChip = /*@__PURE__*/proxyCustomElement(MxChip$1, [4,"mx-chip",{"outlined":[4],"disabled":[4],"selected":[516],"clickable":[4],"removable":[4],"avatarUrl":[1,"avatar-url"],"icon":[1],"value":[8],"choice":[4],"filter":[4]}]);
const MxChipGroup = /*@__PURE__*/proxyCustomElement(MxChipGroup$1, [4,"mx-chip-group",{"value":[1032]},[[0,"click","onChipClick"]]]);
const MxCircularProgress = /*@__PURE__*/proxyCustomElement(MxCircularProgress$1, [0,"mx-circular-progress",{"value":[2],"size":[1],"appearDelay":[2,"appear-delay"]}]);
const MxDropdownMenu = /*@__PURE__*/proxyCustomElement(MxDropdownMenu$1, [4,"mx-dropdown-menu",{"ariaLabel":[1,"aria-label"],"dense":[4],"elevated":[4],"flat":[4],"label":[1],"dropdownId":[1,"dropdown-id"],"name":[1],"suffix":[1],"value":[1032],"isFocused":[32]},[[0,"click","onClick"]]]);
const MxFab = /*@__PURE__*/proxyCustomElement(MxFab$1, [4,"mx-fab",{"icon":[1],"secondary":[4],"ariaLabel":[1,"aria-label"],"value":[1],"minWidths":[32],"isExtended":[32]}]);
const MxIconButton = /*@__PURE__*/proxyCustomElement(MxIconButton$1, [4,"mx-icon-button",{"type":[1],"formaction":[1],"value":[1],"disabled":[516],"ariaLabel":[1,"aria-label"],"chevronDown":[4,"chevron-down"],"chevronLeft":[4,"chevron-left"],"chevronRight":[4,"chevron-right"],"icon":[1]}]);
const MxImageUpload = /*@__PURE__*/proxyCustomElement(MxImageUpload$1, [4,"mx-image-upload",{"acceptImage":[4,"accept-image"],"acceptPdf":[4,"accept-pdf"],"assetName":[1,"asset-name"],"avatar":[4],"thumbnailSize":[1,"thumbnail-size"],"height":[1],"icon":[1],"inputId":[1,"input-id"],"isUploaded":[1540,"is-uploaded"],"isUploading":[1540,"is-uploading"],"name":[1],"removeButtonLabel":[1,"remove-button-label"],"showButton":[4,"show-button"],"showIcon":[4,"show-icon"],"showDropzoneText":[4,"show-dropzone-text"],"thumbnailUrl":[1,"thumbnail-url"],"uploadButtonLabel":[1,"upload-button-label"],"width":[1],"isDraggingOver":[32],"isFileSelected":[32],"thumbnailDataUri":[32]}]);
const MxInput = /*@__PURE__*/proxyCustomElement(MxInput$1, [0,"mx-input",{"name":[1],"inputId":[1,"input-id"],"label":[1],"placeholder":[1],"value":[1025],"type":[1],"dense":[4],"disabled":[4],"readonly":[4],"maxlength":[2],"leftIcon":[1,"left-icon"],"rightIcon":[1,"right-icon"],"suffix":[1],"outerContainerClass":[1,"outer-container-class"],"labelClass":[1025,"label-class"],"error":[1028],"assistiveText":[1,"assistive-text"],"floatLabel":[4,"float-label"],"textarea":[4],"textareaHeight":[1025,"textarea-height"],"isFocused":[32],"characterCount":[32]}]);
const MxLinearProgress = /*@__PURE__*/proxyCustomElement(MxLinearProgress$1, [0,"mx-linear-progress",{"value":[2],"appearDelay":[2,"appear-delay"]}]);
const MxMenu = /*@__PURE__*/proxyCustomElement(MxMenu$1, [4,"mx-menu",{"anchorEl":[16],"triggerEl":[16],"offset":[16],"placement":[1],"isOpen":[1540,"is-open"]},[[0,"mxClick","onMenuItemClick"],[6,"click","onClick"],[4,"keydown","onDocumentKeyDown"],[0,"keydown","onKeydown"]]]);
const MxMenuItem = /*@__PURE__*/proxyCustomElement(MxMenuItem$1, [4,"mx-menu-item",{"checked":[4],"disabled":[4],"icon":[1],"label":[1],"multiSelect":[4,"multi-select"],"minWidths":[32]},[[1,"mouseenter","onMouseEnter"],[1,"mouseleave","onMouseLeave"],[0,"focus","onFocus"],[0,"keydown","onKeyDown"]]]);
const MxModal = /*@__PURE__*/proxyCustomElement(MxModal$1, [4,"mx-modal",{"buttons":[16],"closeOnEscape":[4,"close-on-escape"],"closeOnOutsideClick":[4,"close-on-outside-click"],"contentClass":[1,"content-class"],"description":[1],"isOpen":[4,"is-open"],"previousPageTitle":[1,"previous-page-title"],"previousPageUrl":[1,"previous-page-url"],"large":[4],"minWidths":[32],"isVisible":[32]},[[0,"keydown","onKeyDown"],[4,"keydown","onDocumentKeyDown"]]]);
const MxPageHeader = /*@__PURE__*/proxyCustomElement(MxPageHeader$1, [4,"mx-page-header",{"buttons":[16],"modal":[4],"previousPageUrl":[1,"previous-page-url"],"previousPageTitle":[1,"previous-page-title"],"pattern":[4],"minWidths":[32],"renderTertiaryButtonAsMenu":[32]}]);
const MxPagination = /*@__PURE__*/proxyCustomElement(MxPagination$1, [4,"mx-pagination",{"page":[2],"rowsPerPageOptions":[16],"rowsPerPage":[2,"rows-per-page"],"simple":[4],"totalRows":[2,"total-rows"],"disabled":[4],"disableNextPage":[4,"disable-next-page"],"hideRowsPerPage":[32],"moveStatusToBottom":[32],"isXSmallMinWidth":[32],"isSmallMinWidth":[32]}]);
const MxRadio = /*@__PURE__*/proxyCustomElement(MxRadio$1, [0,"mx-radio",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[1028]}]);
const MxSearch = /*@__PURE__*/proxyCustomElement(MxSearch$1, [0,"mx-search",{"ariaLabel":[1,"aria-label"],"dense":[4],"flat":[4],"name":[1],"placeholder":[1],"value":[1025]}]);
const MxSelect = /*@__PURE__*/proxyCustomElement(MxSelect$1, [4,"mx-select",{"assistiveText":[1,"assistive-text"],"dense":[4],"disabled":[4],"elevated":[4],"flat":[4],"label":[1],"floatLabel":[4,"float-label"],"ariaLabel":[1,"aria-label"],"selectId":[1,"select-id"],"name":[1],"suffix":[1],"error":[1028],"labelClass":[1025,"label-class"],"value":[1032],"isFocused":[32]}]);
const MxSnackbar = /*@__PURE__*/proxyCustomElement(MxSnackbar$1, [4,"mx-snackbar",{"duration":[2],"isOpen":[1540,"is-open"],"isVisible":[32]}]);
const MxSwitch = /*@__PURE__*/proxyCustomElement(MxSwitch$1, [0,"mx-switch",{"name":[1],"value":[1],"labelName":[1,"label-name"],"checked":[1028]}]);
const MxTab = /*@__PURE__*/proxyCustomElement(MxTab$1, [0,"mx-tab",{"label":[1],"ariaLabel":[1,"aria-label"],"icon":[1],"selected":[516],"badge":[4],"badgeClass":[1,"badge-class"]}]);
const MxTabContent = /*@__PURE__*/proxyCustomElement(MxTabContent$1, [4,"mx-tab-content",{"index":[2],"value":[2]}]);
const MxTable = /*@__PURE__*/proxyCustomElement(MxTable$1, [4,"mx-table",{"rows":[16],"columns":[16],"getRowId":[16],"checkable":[4],"checkOnRowClick":[4,"check-on-row-click"],"showCheckAll":[4,"show-check-all"],"draggableRows":[4,"draggable-rows"],"hoverable":[4],"autoWidth":[4,"auto-width"],"sortBy":[1025,"sort-by"],"sortAscending":[1028,"sort-ascending"],"paginate":[4],"page":[1026],"rowsPerPage":[1026,"rows-per-page"],"totalRows":[2,"total-rows"],"disableNextPage":[4,"disable-next-page"],"rowsPerPageOptions":[16],"serverPaginate":[4,"server-paginate"],"getRowActions":[16],"getMultiRowActions":[16],"showProgressBar":[4,"show-progress-bar"],"disablePagination":[4,"disable-pagination"],"progressValue":[2,"progress-value"],"progressAppearDelay":[2,"progress-appear-delay"],"minWidths":[32],"checkedRowIds":[32],"exposedMobileColumnIndex":[32],"hasActionsColumnFromSlot":[32]},[[0,"mxCheck","onMxCheck"],[0,"mxRowDragStart","onMxRowDragStart"],[0,"mxDragKeyDown","onDragKeyDown"],[0,"mxRowDragEnd","onMxRowDragEnd"]]]);
const MxTableCell = /*@__PURE__*/proxyCustomElement(MxTableCell$1, [4,"mx-table-cell",{"isExposedMobileColumn":[516,"is-exposed-mobile-column"],"columnIndex":[514,"column-index"],"heading":[1],"minWidths":[32]}]);
const MxTableRow = /*@__PURE__*/proxyCustomElement(MxTableRow$1, [4,"mx-table-row",{"rowId":[1,"row-id"],"actions":[16],"checked":[1028],"subheader":[4],"minWidths":[32],"checkable":[32],"checkOnRowClick":[32],"isDraggable":[32],"isDragging":[32],"isMobileExpanded":[32],"isMobileCollapsing":[32]}]);
const MxTabs = /*@__PURE__*/proxyCustomElement(MxTabs$1, [0,"mx-tabs",{"fill":[4],"value":[2],"tabs":[16],"minWidths":[32]},[[0,"click","onClick"]]]);
const MxTimePicker = /*@__PURE__*/proxyCustomElement(MxTimePicker$1, [0,"mx-time-picker",{"ariaLabel":[1,"aria-label"],"assistiveText":[1,"assistive-text"],"dense":[4],"disabled":[4],"error":[1028],"floatLabel":[4,"float-label"],"inputId":[1,"input-id"],"label":[1],"name":[1],"value":[1025],"isFocused":[32],"isInputDirty":[32]},[[0,"click","onClick"]]]);
const MxToggleButton = /*@__PURE__*/proxyCustomElement(MxToggleButton$1, [0,"mx-toggle-button",{"icon":[1],"selected":[516],"disabled":[4],"ariaLabel":[1,"aria-label"],"value":[8]}]);
const MxToggleButtonGroup = /*@__PURE__*/proxyCustomElement(MxToggleButtonGroup$1, [4,"mx-toggle-button-group",{"value":[1032]},[[0,"click","onToggleButtonClick"]]]);
const MxTooltip = /*@__PURE__*/proxyCustomElement(MxTooltip$1, [4,"mx-tooltip",{"appearDelay":[2,"appear-delay"],"extended":[4],"inverted":[4],"maxWidth":[1,"max-width"],"isOpen":[1540,"is-open"],"placement":[1],"tooltipClass":[1,"tooltip-class"],"value":[1]}]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      MxBadge,
  MxButton,
  MxCheckbox,
  MxChip,
  MxChipGroup,
  MxCircularProgress,
  MxDropdownMenu,
  MxFab,
  MxIconButton,
  MxImageUpload,
  MxInput,
  MxLinearProgress,
  MxMenu,
  MxMenuItem,
  MxModal,
  MxPageHeader,
  MxPagination,
  MxRadio,
  MxSearch,
  MxSelect,
  MxSnackbar,
  MxSwitch,
  MxTab,
  MxTabContent,
  MxTable,
  MxTableCell,
  MxTableRow,
  MxTabs,
  MxTimePicker,
  MxToggleButton,
  MxToggleButtonGroup,
  MxTooltip
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { MxBadge, MxButton, MxCheckbox, MxChip, MxChipGroup, MxCircularProgress, MxDropdownMenu, MxFab, MxIconButton, MxImageUpload, MxInput, MxLinearProgress, MxMenu, MxMenuItem, MxModal, MxPageHeader, MxPagination, MxRadio, MxSearch, MxSelect, MxSnackbar, MxSwitch, MxTab, MxTabContent, MxTable, MxTableCell, MxTableRow, MxTabs, MxTimePicker, MxToggleButton, MxToggleButtonGroup, MxTooltip, defineCustomElements };
