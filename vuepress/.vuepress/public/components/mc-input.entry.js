import { r as registerInstance, h, e as Host } from './index-a1e2f5c6.js';

const McInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'text';
    this.name = '';
    this.value = '';
    this.disabled = false;
    this.readonly = false;
    this.label = '';
    this.placeholder = '';
    this.instructions = '';
    this.error = false;
    this.errorMsg = '';
  }
  render() {
    return h(Host, null);
  }
};

export { McInput as mc_input };
