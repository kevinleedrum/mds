import { r as registerInstance, h, f as Host, g as getElement } from './index-935f3e8d.js';

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

const MxImageUpload = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, { class: "mx-image-upload inline-block", style: { width: this.dropzoneWidth } }, h("div", { "data-testid": "dropzone-wrapper", class: "dropzone-wrapper flex w-full items-center justify-center relative rounded-2xl text-3 overflow-hidden", style: { height: this.dropzoneHeight } }, h("div", { class: this.dropzoneClass }, h("div", { class: "flex flex-col items-center justify-center w-full h-full" }, this.showIcon && iconJsx, h("slot", { name: "dropzone-text" }, h("div", { "data-testid": "dropzone-text", class: 'text-center' + (this.showDropzoneText && !this.avatar ? '' : ' hidden') }, h("p", { class: "subtitle1 my-0" }, "No ", this.assetName, " to show"), h("p", { class: "text-4 my-0 mt-4" }, "Click to add ", this.assetName)))), h("svg", { class: "dashed-border absolute inset-0 pointer-events-none", width: "100%", height: "100%" }, h("rect", { width: "100%", height: "100%", fill: "none", rx: "16", ry: "16", "stroke-width": "1", "stroke-dasharray": "4,8" })), h("input", { ref: el => (this.fileInput = el), id: this.inputId, name: this.name, type: "file", accept: this.accept, class: "absolute inset-0 opacity-0 cursor-pointer", onInput: this.onInput.bind(this), onDragOver: this.onDragOver.bind(this), onDragLeave: this.onDragLeave.bind(this), onDrop: this.onDragLeave.bind(this) })), this.hasFile && this.thumbnailBackgroundImage && (h("div", { "data-testid": "thumbnail", class: "thumbnail absolute inset-0 bg-center bg-no-repeat", style: { backgroundImage: this.thumbnailBackgroundImage, backgroundSize: this.thumbnailBackgroundSize } })), h("div", { "data-testid": "uploaded", class: 'flex items-center justify-center absolute inset-0' + (this.isUploaded ? '' : ' hidden') }, h("slot", { name: "uploaded" })), this.isUploading && (h("div", { "data-testid": "progress", class: "uploading-progress flex items-center justify-center opacity-50 absolute inset-0" }, h("mx-circular-progress", { size: "2rem" })))), this.showButton && (h("mx-button", { "data-testid": "upload-button", class: "mt-16", btnType: this.hasFile && !this.isUploading ? 'outlined' : 'contained', onClick: this.onButtonClick.bind(this), disabled: this.isUploading }, this.hasFile && !this.isUploading ? this.removeButtonLabel : this.uploadButtonLabel)), this.hasInstructions && (h("p", { class: "caption1 my-16" }, h("slot", { name: "instructions" }))), this.hasSuccess && (h("p", { class: "upload-success caption1 my-16" }, h("slot", { name: "success" }))), this.hasError && (h("p", { class: "upload-error caption1 my-16" }, h("slot", { name: "error" })))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "thumbnailUrl": ["onThumbnailUrlChange"]
  }; }
};

export { MxImageUpload as mx_image_upload };
