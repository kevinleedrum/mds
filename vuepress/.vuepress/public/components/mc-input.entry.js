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
    this.required = false;
  }
  get makeInputClasses() {
    const classArr = ['border', 'text-4', 'px-15', 'py-12', 'rounded', 'border', 'border-secondary'];
    if (this.error) {
      const index = classArr.indexOf('border-secondary');
      classArr[index] = 'border-status-error';
    }
    if (this.disabled) {
      classArr.push('bg-secondary-ultra-light');
    }
    return classArr.join(' ');
  }
  render() {
    return (h(Host, null, this.label && (h("label", { class: "block text-secondary font-bold subtitle4 mb-10 uppercase" }, this.label, this.required && h("span", { class: "text-status-error" }, "*"))), h("input", { class: this.makeInputClasses, type: this.type, name: this.name, value: this.value, placeholder: this.placeholder, disabled: this.disabled ? true : false }), this.instructions && !this.error && h("section", { class: "instructions caption1 mt-10" }, this.instructions), this.error && this.errorMsg && (h("section", { class: "flex caption1 mt-10 text-status-error items-center gap-6" }, h("i", { class: "ph-warning" }), this.errorMsg))));
  }
};

export { McInput as mc_input };
