import { Component, Host, h, Prop, Element, State, Method, Watch, Event } from '@stencil/core';
export class MxImageUpload {
  constructor() {
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
      iconJsx = h("i", { "data-testid": "upload-icon", class: 'dropzone-icon ' + this.icon });
    }
    else if (this.avatar) {
      iconJsx = h("i", { "data-testid": "avatar-icon", class: "mds-user-circle text-icon" });
    }
    else {
      iconJsx = h("i", { "data-testid": "image-icon", class: 'mds-image text-icon' + (this.showDropzoneText ? ' mb-8' : '') });
    }
    return (h(Host, { class: "mx-image-upload inline-block", style: { width: this.dropzoneWidth } },
      h("div", { "data-testid": "dropzone-wrapper", class: "dropzone-wrapper flex w-full items-center justify-center relative rounded-2xl text-3 overflow-hidden", style: { height: this.dropzoneHeight } },
        h("div", { class: this.dropzoneClass },
          h("div", { class: "flex flex-col items-center justify-center w-full h-full" },
            this.showIcon && iconJsx,
            h("slot", { name: "dropzone-text" },
              h("div", { "data-testid": "dropzone-text", class: 'text-center' + (this.showDropzoneText && !this.avatar ? '' : ' hidden') },
                h("p", { class: "subtitle1 my-0" },
                  "No ",
                  this.assetName,
                  " to show"),
                h("p", { class: "text-4 my-0 mt-4" },
                  "Click to add ",
                  this.assetName)))),
          h("svg", { class: "dashed-border absolute inset-0 pointer-events-none", width: "100%", height: "100%" },
            h("rect", { width: "100%", height: "100%", fill: "none", rx: "16", ry: "16", "stroke-width": "1", "stroke-dasharray": "4,8" })),
          h("input", { ref: el => (this.fileInput = el), id: this.inputId, name: this.name, type: "file", accept: this.accept, class: "absolute inset-0 w-full h-full opacity-0 cursor-pointer", onInput: this.onInput.bind(this), onDragOver: this.onDragOver.bind(this), onDragLeave: this.onDragLeave.bind(this), onDrop: this.onDragLeave.bind(this) })),
        this.hasFile && this.thumbnailBackgroundImage && (h("div", { "data-testid": "thumbnail", class: "thumbnail absolute inset-0 bg-center bg-no-repeat pointer-events-none", style: { backgroundImage: this.thumbnailBackgroundImage, backgroundSize: this.thumbnailBackgroundSize } })),
        h("div", { "data-testid": "uploaded", class: 'flex items-center justify-center absolute inset-0 pointer-events-none ' +
            (this.isUploaded ? '' : ' hidden') },
          h("slot", { name: "uploaded" })),
        this.isUploading && (h("div", { "data-testid": "progress", class: "uploading-progress flex items-center justify-center opacity-50 absolute inset-0" },
          h("mx-circular-progress", { size: "2rem" })))),
      this.showButton && (h("mx-button", { "data-testid": "upload-button", class: "mt-16", btnType: this.hasFile && !this.isUploading ? 'outlined' : this.uploadBtnType, onClick: this.onButtonClick.bind(this), disabled: this.isUploading }, this.hasFile && !this.isUploading ? this.removeButtonLabel : this.uploadButtonLabel)),
      (this.hasInstructions || this.assistiveText) && (h("p", { class: "caption1 my-16" },
        h("slot", { name: "instructions" }, this.assistiveText))),
      this.hasSuccess && (h("p", { class: "upload-success caption1 my-16" },
        h("slot", { name: "success" }))),
      this.hasError && (h("p", { class: "upload-error caption1 my-16" },
        h("slot", { name: "error" })))));
  }
  static get is() { return "mx-image-upload"; }
  static get properties() { return {
    "acceptImage": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Set `acceptImage` to `false` and `acceptPdf` to `true` to only accept PDF files.  Set both to `false` to accept any file."
      },
      "attribute": "accept-image",
      "reflect": false,
      "defaultValue": "true"
    },
    "acceptPdf": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Set `acceptImage` to `false` and `acceptPdf` to `true` to only accept PDF files.  Set both to `false` to accept any file."
      },
      "attribute": "accept-pdf",
      "reflect": false,
      "defaultValue": "false"
    },
    "assetName": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Replaces the word \"image\" in the default dropzone text (i.e. \"No image to show\")."
      },
      "attribute": "asset-name",
      "reflect": false,
      "defaultValue": "'image'"
    },
    "assistiveText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Assistive text to display under the dropzone. To add markup, use the `instructions` slot directly instead."
      },
      "attribute": "assistive-text",
      "reflect": false
    },
    "avatar": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Sets the width and height to 80px and changes the icon."
      },
      "attribute": "avatar",
      "reflect": false,
      "defaultValue": "false"
    },
    "uploadBtnType": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "BtnType",
        "resolved": "\"action\" | \"contained\" | \"outlined\" | \"text\"",
        "references": {
          "BtnType": {
            "location": "import",
            "path": "../mx-button/mx-button"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The [`btnType` prop](/components/buttons.html) for the Upload button."
      },
      "attribute": "upload-btn-type",
      "reflect": false,
      "defaultValue": "'contained'"
    },
    "thumbnailSize": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'cover' | 'stretch' | 'contain' | 'auto'",
        "resolved": "\"auto\" | \"contain\" | \"cover\" | \"stretch\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Sets the thumbnail sizing strategy relative to the container."
      },
      "attribute": "thumbnail-size",
      "reflect": false,
      "defaultValue": "'cover'"
    },
    "height": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The height of the dropzone / thumbnail container (e.g. \"400px\" or \"50%\")."
      },
      "attribute": "height",
      "reflect": false
    },
    "icon": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The class name of the icon to use instead of the default icon."
      },
      "attribute": "icon",
      "reflect": false
    },
    "inputId": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The `id` attribute to apply to the input element."
      },
      "attribute": "input-id",
      "reflect": false
    },
    "isUploaded": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Set to `true` to show the Remove button, thumbnail, and `uploaded` slot content."
      },
      "attribute": "is-uploaded",
      "reflect": true,
      "defaultValue": "false"
    },
    "isUploading": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Set to `true` to disable the button and show the circular progress indicator."
      },
      "attribute": "is-uploading",
      "reflect": true,
      "defaultValue": "false"
    },
    "name": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The `name` attribute for the `input` element."
      },
      "attribute": "name",
      "reflect": false
    },
    "removeButtonLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The text to display on the Remove button"
      },
      "attribute": "remove-button-label",
      "reflect": false,
      "defaultValue": "'Remove'"
    },
    "showButton": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Set to `false` to hide the default Upload/Remove button."
      },
      "attribute": "show-button",
      "reflect": false,
      "defaultValue": "true"
    },
    "showIcon": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Set to `false` to hide the dropzone icon."
      },
      "attribute": "show-icon",
      "reflect": false,
      "defaultValue": "true"
    },
    "showDropzoneText": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Set to `false` to hide the dropzone text."
      },
      "attribute": "show-dropzone-text",
      "reflect": false,
      "defaultValue": "true"
    },
    "thumbnailUrl": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The URL for the thumbnail of the currently selected image."
      },
      "attribute": "thumbnail-url",
      "reflect": false
    },
    "uploadButtonLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The text to display on the Upload button"
      },
      "attribute": "upload-button-label",
      "reflect": false,
      "defaultValue": "'Upload'"
    },
    "width": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The width of the dropzone / thumbnail container (e.g. \"400px\" or \"50%\")."
      },
      "attribute": "width",
      "reflect": false
    }
  }; }
  static get states() { return {
    "isDraggingOver": {},
    "isFileSelected": {},
    "thumbnailDataUri": {}
  }; }
  static get events() { return [{
      "method": "mxThumbnailChange",
      "name": "mxThumbnailChange",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emits the thumbnail url as `CustomEvent.detail` whenever it changes (i.e. after generating a data URI)"
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "removeFile": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "selectFile": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "thumbnailUrl",
      "methodName": "onThumbnailUrlChange"
    }]; }
}
