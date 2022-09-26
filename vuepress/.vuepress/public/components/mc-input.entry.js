import { r as registerInstance, h, e as Host } from './index-a1e2f5c6.js';

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes));
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1;
  let step = -~((1.6 * mask * defaultSize) / alphabet.length);
  return (size = defaultSize) => {
    let id = '';
    while (true) {
      let bytes = getRandom(step);
      let j = step;
      while (j--) {
        id += alphabet[bytes[j] & mask] || '';
        if (id.length === size) return id
      }
    }
  }
};
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random);
let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte > 62) {
      id += '-';
    } else {
      id += '_';
    }
    return id
  }, '');

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
    this.searchLabel = 'Search';
  }
  componentWillRender() {
    this.inputId = this.inputId || nanoid(10);
    if (this.type === 'search') {
      this.leftIcon = 'ph-magnifying-glass';
    }
    else if (this.type === 'file') {
      this.leftIcon = 'ph-file';
    }
  }
  get makeInputClasses() {
    const classArr = ['border', 'text-4', 'px-15', 'py-12', 'rounded', 'border', 'border-secondary'];
    if (this.error) {
      const index = classArr.indexOf('border-secondary');
      classArr[index] = 'border-status-error';
    }
    if (this.disabled || this.readonly) {
      classArr.push('bg-secondary-ultra-light');
    }
    if (this.type === 'search') {
      classArr.push('pr-112');
      classArr.push('pl-36');
    }
    return classArr.join(' ');
  }
  handleInputFocus() {
    this.btnSearch.classList.remove('hidden');
  }
  handleInputBlur() {
    if (this.elemInput.value === '') {
      this.btnSearch.classList.add('hidden');
    }
  }
  triggerFileSelection() {
    this.elemFileInput.click();
  }
  handleFileUploadChange() {
    if (this.elemFileInput.files.length > 0) {
      this.elemFileUploadNameHolder.innerText = this.elemFileInput.files[0].name;
    }
    else {
      this.elemFileUploadNameHolder.innerText = '';
    }
  }
  render() {
    return (h(Host, null, this.label && (h("label", { htmlFor: this.inputId, class: "block text-secondary font-bold subtitle4 mb-10 uppercase" }, this.label, this.required && h("span", { class: "text-status-error" }, "*"))), h("div", { class: "flex items-center relative" }, this.leftIcon && h("i", { class: `leftIcon ${this.leftIcon}` }), this.type !== 'file' ? (h("input", { id: this.inputId, class: this.makeInputClasses, type: this.type, name: this.name, value: this.value, placeholder: this.placeholder, disabled: this.disabled ? true : false, readonly: this.readonly ? true : false, "aria-label": this.elAriaLabel, onFocus: this.handleInputFocus.bind(this), onBlur: this.handleInputBlur.bind(this), ref: el => (this.elemInput = el) })) : (h("div", { class: `w-full pl-36 h-40 pointer ${this.makeInputClasses}` }, h("div", { class: "shadowFileUploadNameHolder", onClick: this.triggerFileSelection.bind(this), ref: el => (this.elemFileUploadNameHolder = el) }), h("input", { type: "file", ref: el => (this.elemFileInput = el), onChange: this.handleFileUploadChange.bind(this), name: this.name }))), this.type === 'search' && (h("mc-button", { ref: el => (this.btnSearch = el), class: "hidden", small: true }, this.searchLabel)), this.type === 'file' && (h("mc-button", { onClick: this.triggerFileSelection.bind(this), small: true }, "Choose File"))), this.instructions && !this.error && (h("section", { class: "text-secondary caption1 mt-10" }, this.instructions)), this.error && this.errorMsg && (h("section", { class: "flex caption1 mt-10 text-status-error items-center gap-6" }, h("i", { class: "ph-warning" }), this.errorMsg))));
  }
};

export { McInput as mc_input };
