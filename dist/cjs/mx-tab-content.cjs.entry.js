'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-54a36eac.js');

const MxTabContent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  get isActiveTab() {
    return this.value >= 0 && this.index === this.value;
  }
  render() {
    return (index.h(index.Host, { class: !this.isActiveTab ? 'hidden' : '' }, index.h("slot", null)));
  }
};

exports.mx_tab_content = MxTabContent;
