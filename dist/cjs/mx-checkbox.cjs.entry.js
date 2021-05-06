'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7a6d2fc8.js');

// This file replaces `index.js` in bundlers like webpack or Rollup,

let nanoid = (size = 21) => {
  let id = '';
  let bytes = crypto.getRandomValues(new Uint8Array(size));

  // A compact alternative for `for (var i = 0; i < step; i++)`.
  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    let byte = bytes[size] & 63;
    if (byte < 36) {
      // `0-9a-z`
      id += byte.toString(36);
    } else if (byte < 62) {
      // `A-Z`
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += '_';
    } else {
      id += '-';
    }
  }
  return id
};

const MxCheckbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.name = '';
    this.value = '';
    this.identifier = nanoid(5);
    this.labelName = '';
    this.checked = false;
  }
  render() {
    return (index.h(index.Host, { class: "mx-checkbox" }, index.h("label", { class: "relative inline-flex flex-nowrap align-center items-center cursor-pointer" }, index.h("input", { class: "absolute h-0 w-0 opacity-0", type: "checkbox", checked: this.checked }), index.h("span", { class: "flex h-18 w-18 cursor-pointer" }), index.h("div", { class: "ml-16 inline-block" }, this.labelName))));
  }
};

exports.mx_checkbox = MxCheckbox;
