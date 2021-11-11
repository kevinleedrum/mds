import { r as registerInstance, h, f as Host, g as getElement } from './index-e21e00f4.js';
import { p as propagateDataAttributes } from './utils-18e3dfde.js';

const searchSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8748 3.75C6.93979 3.75 3.74982 6.93997 3.74982 10.875C3.74982 14.81 6.93979 18 10.8748 18C14.8098 18 17.9998 14.81 17.9998 10.875C17.9998 6.93997 14.8098 3.75 10.8748 3.75ZM2.24982 10.875C2.24982 6.11154 6.11136 2.25 10.8748 2.25C15.6383 2.25 19.4998 6.11154 19.4998 10.875C19.4998 15.6385 15.6383 19.5 10.8748 19.5C6.11136 19.5 2.24982 15.6385 2.24982 10.875Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9126 15.913C16.2055 15.6201 16.6804 15.6201 16.9733 15.913L21.5296 20.4693C21.8225 20.7622 21.8225 21.2371 21.5296 21.53C21.2367 21.8229 20.7618 21.8229 20.4689 21.53L15.9126 16.9737C15.6197 16.6808 15.6197 16.2059 15.9126 15.913Z" fill="currentColor"/>
</svg>
`;

const MxSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get element() { return getElement(this); }
};

export { MxSearch as mx_search };
