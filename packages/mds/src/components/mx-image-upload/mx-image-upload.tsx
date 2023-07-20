import { Component, Host, h, Prop, Element, State, Method, Watch, Event, EventEmitter } from '@stencil/core';
import { BtnType } from '../mx-button/mx-button';

@Component({
  tag: 'mx-image-upload',
  shadow: false,
})
export class MxImageUpload {
  fileInput: HTMLInputElement;
  hasInstructions = false;
  hasSuccess = false;
  hasError = false;

  /** Set `acceptImage` to `false` and `acceptPdf` to `true` to only accept PDF files.  Set both to `false` to accept any file. */
  @Prop() acceptImage = true;
  /** Set `acceptImage` to `false` and `acceptPdf` to `true` to only accept PDF files.  Set both to `false` to accept any file. */
  @Prop() acceptPdf = false;
  /** Replaces the word "image" in the default dropzone text (i.e. "No image to show"). */
  @Prop() assetName = 'image';
  /** Assistive text to display under the dropzone. To add markup, use the `instructions` slot directly instead. */
  @Prop() assistiveText: string;
  /** Sets the width and height to 80px and changes the icon. */
  @Prop() avatar = false;
  @Prop({ mutable: true, reflect: true }) error = false;
  /** The aria-label attribute for the inner input element. */
  @Prop() elAriaLabel: string;
  /** The [`btnType` prop](/components/buttons.html) for the Upload button. */
  @Prop() uploadBtnType: BtnType = 'contained';
  /** Sets the thumbnail sizing strategy relative to the container. */
  @Prop() thumbnailSize: 'cover' | 'stretch' | 'contain' | 'auto' = 'cover';
  /** The height of the dropzone / thumbnail container (e.g. "400px" or "50%"). */
  @Prop() height: string;
  /** The class name of the icon to use instead of the default icon. */
  @Prop() icon: string;
  /** The `id` attribute to apply to the input element. */
  @Prop() inputId: string;
  /** Set to `true` to show the Remove button, thumbnail, and `uploaded` slot content. */
  @Prop({ mutable: true, reflect: true }) isUploaded = false;
  /** Set to `true` to disable the button and show the circular progress indicator. */
  @Prop({ mutable: true, reflect: true }) isUploading = false;
  /** The `name` attribute for the `input` element. */
  @Prop() name: string;
  /** The text to display on the Remove button */
  @Prop() removeButtonLabel = 'Remove';
  /** Set to `false` to hide the default Upload/Remove button. */
  @Prop() showButton = true;
  /** Set to `false` to hide the dropzone icon. */
  @Prop() showIcon = true;
  /** Set to `false` to hide the dropzone text. */
  @Prop() showDropzoneText = true;
  /** The URL for the thumbnail of the currently selected image. */
  @Prop() thumbnailUrl: string;
  /** The text to display on the Upload button */
  @Prop() uploadButtonLabel = 'Upload';
  /** The width of the dropzone / thumbnail container (e.g. "400px" or "50%"). */
  @Prop() width: string;

  @State() isDraggingOver = false;
  @State() isFileSelected = false;
  @State() thumbnailDataUri: string;

  @Element() element: HTMLMxTableElement;

  /** Emits the thumbnail url as `CustomEvent.detail` whenever it changes (i.e. after generating a data URI) */
  @Event() mxThumbnailChange: EventEmitter<string>;

  @Watch('thumbnailUrl')
  onThumbnailUrlChange() {
    if (this.thumbnailUrl) this.isUploaded = true;
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

  @Method()
  async removeFile() {
    if (!this.hasFile || this.isUploading) return;
    this.isFileSelected = false;
    this.isUploaded = false;
    this.isUploading = false;
    this.fileInput.value = '';
    this.fileInput.dispatchEvent(new window.Event('change', { bubbles: true, cancelable: true }));
    this.fileInput.dispatchEvent(new window.Event('input', { bubbles: true, cancelable: true }));
    this.mxThumbnailChange.emit(null);
  }

  @Method()
  async selectFile() {
    if (this.hasFile) return;
    this.isFileSelected = false;
    this.fileInput.value = '';
    this.fileInput.click();
  }

  onButtonClick(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (this.isUploading) return;
    if (!this.hasFile) {
      this.selectFile();
    } else {
      this.removeFile();
    }
  }

  onInput(e: Event) {
    this.error = false;
    this.isFileSelected = (e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files.length > 0;
    if (this.isFileSelected) this.setThumnailDataUri((e.target as HTMLInputElement).files[0]);
    else this.thumbnailDataUri = null;
  }

  setThumnailDataUri(file: File) {
    this.thumbnailDataUri = null;
    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.thumbnailDataUri = reader.result as string;
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
    const accept = [];
    if (this.acceptImage) accept.push('image/*');
    if (this.acceptPdf) accept.push('.pdf');
    return accept.join(',') || null;
  }

  /** The width is applied to the host element in order to support percent-based widths */
  get dropzoneWidth(): string {
    if (this.width) return this.width;
    return this.avatar ? '80px' : '308px';
  }

  get dropzoneHeight(): string {
    if (this.height) return this.height;
    return this.avatar ? '80px' : 'auto';
  }

  get dropzoneClass(): string {
    let str = 'dropzone relative w-full h-full px-16 rounded overflow-hidden';
    if (this.hasFile) str += ' opacity-0';
    if (this.isDraggingOver) str += ' drag-over';
    str += this.showIcon && this.showDropzoneText ? ' py-24' : ' py-16';
    return str;
  }

  get hasFile() {
    return this.isFileSelected || this.isUploaded;
  }

  get thumbnailBackgroundImage(): string {
    let url = this.thumbnailUrl;
    if (this.isFileSelected) url = this.thumbnailDataUri;
    if (!url) return null;
    return `url(${url})`;
  }

  get thumbnailBackgroundSize(): string {
    if (!['contain', 'cover', 'auto', 'stretch'].includes(this.thumbnailSize)) return 'cover';
    if (this.thumbnailSize === 'stretch') return '100% 100%';
    return this.thumbnailSize;
  }

  render() {
    let iconJsx;
    if (this.icon) {
      iconJsx = <i data-testid="upload-icon" class={'dropzone-icon ' + this.icon}></i>;
    } else if (this.avatar) {
      iconJsx = <i data-testid="avatar-icon" class="mds-user-circle text-icon"></i>;
    } else {
      iconJsx = <i data-testid="image-icon" class={'mds-image text-icon' + (this.showDropzoneText ? ' mb-8' : '')}></i>;
    }

    return (
      <Host class="mx-image-upload block">
        <div
          data-testid="dropzone-wrapper"
          class="dropzone-wrapper flex w-full items-center justify-center relative rounded text-3 overflow-hidden"
          style={{ height: this.dropzoneHeight, width: this.dropzoneWidth }}
        >
          <div class={this.dropzoneClass}>
            <div class="flex flex-col items-center justify-center w-full h-full">
              {this.showIcon && iconJsx}
              <slot name="dropzone-text">
                <div
                  data-testid="dropzone-text"
                  class={'text-center' + (this.showDropzoneText && !this.avatar ? '' : ' hidden')}
                >
                  <p class="subtitle1 my-0">No {this.assetName} to show</p>
                  <p class="text-4 my-0 mt-4">Click to add {this.assetName}</p>
                </div>
              </slot>
            </div>
            {/* Dashed Border SVG (CSS borders do not allow custom dash patterns) */}
            <svg class="dashed-border absolute inset-0 pointer-events-none" width="100%" height="100%">
              <rect width="100%" height="100%" fill="none" rx="16" ry="16" stroke-width="1" stroke-dasharray="4,8" />
            </svg>
            <input
              ref={el => (this.fileInput = el)}
              id={this.inputId}
              name={this.name}
              type="file"
              accept={this.accept}
              aria-label={this.elAriaLabel}
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onInput={this.onInput.bind(this)}
              onDragOver={this.onDragOver.bind(this)}
              onDragLeave={this.onDragLeave.bind(this)}
              onDrop={this.onDragLeave.bind(this)}
            ></input>
          </div>
          {this.hasFile && this.thumbnailBackgroundImage && (
            <div
              data-testid="thumbnail"
              class="thumbnail absolute inset-0 bg-center bg-no-repeat pointer-events-none"
              style={{ backgroundImage: this.thumbnailBackgroundImage, backgroundSize: this.thumbnailBackgroundSize }}
            ></div>
          )}
          <div
            data-testid="uploaded"
            class={
              'flex items-center justify-center absolute inset-0 pointer-events-none ' +
              (this.isUploaded ? '' : ' hidden')
            }
          >
            <slot name="uploaded"></slot>
          </div>
          {this.isUploading && (
            <div
              data-testid="progress"
              class="uploading-progress flex items-center justify-center opacity-50 absolute inset-0"
            >
              <mx-circular-progress size="2rem" />
            </div>
          )}
        </div>
        {this.showButton && (
          <mx-button
            data-testid="upload-button"
            class="mt-16"
            btnType={this.hasFile && !this.isUploading ? 'outlined' : this.uploadBtnType}
            onClick={this.onButtonClick.bind(this)}
            disabled={this.isUploading}
          >
            {this.hasFile && !this.isUploading ? this.removeButtonLabel : this.uploadButtonLabel}
          </mx-button>
        )}
        {(this.hasInstructions || this.assistiveText) && (
          <p class="caption1 my-16">
            <slot name="instructions">{this.assistiveText}</slot>
          </p>
        )}
        {this.hasSuccess && (
          <p class="upload-success caption1 my-16">
            <slot name="success"></slot>
          </p>
        )}
        {this.hasError && (
          <p class="upload-error caption1 my-16">
            <slot name="error"></slot>
          </p>
        )}
      </Host>
    );
  }
}
