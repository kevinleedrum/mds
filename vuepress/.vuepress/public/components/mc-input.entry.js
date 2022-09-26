import { r as registerInstance, h, e as Host } from './index-a1e2f5c6.js';

const McInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, null, this.label && h("label", { class: "block text-secondary font-bold subtitle4 mb-10 uppercase" }, this.label), h("input", { class: "border text-4 px-15 py-12 rounded", type: this.type, name: this.name, value: this.value, placeholder: this.placeholder }), this.instructions && !this.error && h("section", { class: "instructions caption1 mt-10" }, this.instructions), this.instructions && !this.error && h("section", { class: "instructions caption1 mt-10" }, this.instructions)));
  }
};

export { McInput as mc_input };
