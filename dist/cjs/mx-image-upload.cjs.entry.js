'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7252b109.js');

const MxImageUpload = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mxThumbnailChange = index.createEvent(this, "mxThumbnailChange", 7);
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
    /** The [`btnType` prop](/components/buttons.html) for the Upload button. */
    this.uploadBtnType = 'contained';
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
    this.mxThumbnailChange.emit(this.thumbnailUrl);
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
    this.fileInput.dispatchEvent(new window.Event('change', { bubbles: true, cancelable: true }));
    this.fileInput.dispatchEvent(new window.Event('input', { bubbles: true, cancelable: true }));
    this.mxThumbnailChange.emit(null);
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
      this.mxThumbnailChange.emit(this.thumbnailDataUri);
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
      iconJsx = index.h("i", { "data-testid": "upload-icon", class: 'dropzone-icon ' + this.icon });
    }
    else if (this.avatar) {
      iconJsx = index.h("i", { "data-testid": "avatar-icon", class: "mds-user-circle text-icon" });
    }
    else {
      iconJsx = index.h("i", { "data-testid": "image-icon", class: 'mds-image text-icon' + (this.showDropzoneText ? ' mb-8' : '') });
    }
    return (index.h(index.Host, { class: "mx-image-upload block" }, index.h("div", { "data-testid": "dropzone-wrapper", class: "dropzone-wrapper flex w-full items-center justify-center relative rounded-2xl text-3 overflow-hidden", style: { height: this.dropzoneHeight, width: this.dropzoneWidth } }, index.h("div", { class: this.dropzoneClass }, index.h("div", { class: "flex flex-col items-center justify-center w-full h-full" }, this.showIcon && iconJsx, index.h("slot", { name: "dropzone-text" }, index.h("div", { "data-testid": "dropzone-text", class: 'text-center' + (this.showDropzoneText && !this.avatar ? '' : ' hidden') }, index.h("p", { class: "subtitle1 my-0" }, "No ", this.assetName, " to show"), index.h("p", { class: "text-4 my-0 mt-4" }, "Click to add ", this.assetName)))), index.h("svg", { class: "dashed-border absolute inset-0 pointer-events-none", width: "100%", height: "100%" }, index.h("rect", { width: "100%", height: "100%", fill: "none", rx: "16", ry: "16", "stroke-width": "1", "stroke-dasharray": "4,8" })), index.h("input", { ref: el => (this.fileInput = el), id: this.inputId, name: this.name, type: "file", accept: this.accept, "aria-label": this.elAriaLabel, class: "absolute inset-0 w-full h-full opacity-0 cursor-pointer", onInput: this.onInput.bind(this), onDragOver: this.onDragOver.bind(this), onDragLeave: this.onDragLeave.bind(this), onDrop: this.onDragLeave.bind(this) })), this.hasFile && this.thumbnailBackgroundImage && (index.h("div", { "data-testid": "thumbnail", class: "thumbnail absolute inset-0 bg-center bg-no-repeat pointer-events-none", style: { backgroundImage: this.thumbnailBackgroundImage, backgroundSize: this.thumbnailBackgroundSize } })), index.h("div", { "data-testid": "uploaded", class: 'flex items-center justify-center absolute inset-0 pointer-events-none ' +
        (this.isUploaded ? '' : ' hidden') }, index.h("slot", { name: "uploaded" })), this.isUploading && (index.h("div", { "data-testid": "progress", class: "uploading-progress flex items-center justify-center opacity-50 absolute inset-0" }, index.h("mx-circular-progress", { size: "2rem" })))), this.showButton && (index.h("mx-button", { "data-testid": "upload-button", class: "mt-16", btnType: this.hasFile && !this.isUploading ? 'outlined' : this.uploadBtnType, onClick: this.onButtonClick.bind(this), disabled: this.isUploading }, this.hasFile && !this.isUploading ? this.removeButtonLabel : this.uploadButtonLabel)), (this.hasInstructions || this.assistiveText) && (index.h("p", { class: "caption1 my-16" }, index.h("slot", { name: "instructions" }, this.assistiveText))), this.hasSuccess && (index.h("p", { class: "upload-success caption1 my-16" }, index.h("slot", { name: "success" }))), this.hasError && (index.h("p", { class: "upload-error caption1 my-16" }, index.h("slot", { name: "error" })))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "thumbnailUrl": ["onThumbnailUrlChange"]
  }; }
};

exports.mx_image_upload = MxImageUpload;
