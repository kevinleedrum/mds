import { Component, Host, h, Prop, Element, State, Method } from '@stencil/core';
import imageSvg from '../../assets/svg/image.svg';
import userCircleSvg from '../../assets/svg/user-circle.svg';

@Component({
  tag: 'mx-image-upload',
  shadow: false,
})
export class MxImageUpload {
  fileInput: HTMLInputElement;
  hasInstructions = false;
  hasSuccess = false;
  hasError = false;

  @Prop() acceptImage = true;
  @Prop() acceptPdf = false;
  @Prop() assetName = 'image';
  @Prop() avatar = false;
  @Prop() thumbnailSize: 'cover' | 'stretch' | 'contain' | 'auto' = 'cover';
  @Prop() height: string;
  @Prop() icon: string;
  @Prop() inputId: string;
  @Prop({ mutable: true, reflect: true }) isError = false;
  @Prop({ mutable: true, reflect: true }) isUploaded = false;
  @Prop({ mutable: true, reflect: true }) isUploading = false;
  @Prop() name: string;
  @Prop() showButton = true;
  @Prop() showIcon = true;
  @Prop() showDropzoneText = true;
  @Prop() thumbnailUrl: string;
  @Prop() width: string;

  @State() isDraggingOver = false;
  @State() isFileSelected = false;
  @State() thumbnailDataUri: string;

  @Element() element: HTMLMxTableElement;

  connectedCallback() {
    if (this.thumbnailUrl) this.isUploaded = true;
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
    this.fileInput.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    this.fileInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
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
    this.isFileSelected = (e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files.length > 0;
    if (this.isFileSelected) this.setThumnailDataUri((e.target as HTMLInputElement).files[0]);
    else this.thumbnailDataUri = null;
    this.isError = false;
  }

  setThumnailDataUri(file: File) {
    this.thumbnailDataUri = null;
    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.thumbnailDataUri = reader.result as string;
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
    if (this.acceptImage) accept.push('image/*');
    if (this.acceptPdf) accept.push('.pdf');
    return accept.join(',') || null;
  }

  get dropzoneWrapperStyle(): any {
    let width = this.avatar ? '80px' : '308px';
    let height = this.avatar ? '80px' : 'auto';
    if (this.width) width = this.width;
    if (this.height) height = this.height;
    return { width, height };
  }

  get dropzoneClass(): string {
    let str = 'dropzone relative w-full h-full px-16 rounded-2xl overflow-hidden';
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
      iconJsx = <i class={'dropzone-icon ' + this.icon}></i>;
    } else if (this.avatar) {
      iconJsx = <span innerHTML={userCircleSvg}></span>;
    } else {
      iconJsx = <span class={this.showDropzoneText ? 'mb-8' : ''} innerHTML={imageSvg}></span>;
    }

    return (
      <Host class="mx-image-upload inline-block" style={{ width: this.width }}>
        <div
          class="dropzone-wrapper flex items-center justify-center relative rounded-2xl text-3 overflow-hidden"
          style={this.dropzoneWrapperStyle}
        >
          <div class={this.dropzoneClass}>
            <div class="flex flex-col items-center justify-center w-full h-full">
              {this.showIcon && iconJsx}
              <slot name="dropzone-text">
                <div class={'text-center' + (this.showDropzoneText && !this.avatar ? '' : ' hidden')}>
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
              type="file"
              accept={this.accept}
              class="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-auto"
              disabled={this.hasFile}
              onInput={this.onInput.bind(this)}
              onDragOver={this.onDragOver.bind(this)}
              onDragLeave={this.onDragLeave.bind(this)}
              onDrop={this.onDragLeave.bind(this)}
            ></input>
          </div>
          {this.thumbnailBackgroundImage && (
            <div
              class="thumbnail absolute inset-0 bg-center bg-no-repeat"
              style={{ backgroundImage: this.thumbnailBackgroundImage, backgroundSize: this.thumbnailBackgroundSize }}
            ></div>
          )}
          <div class={'flex items-center justify-center absolute inset-0' + (this.isUploaded ? '' : ' hidden')}>
            <slot name="uploaded"></slot>
          </div>
          {this.isUploading && (
            <div class="uploading-progress flex items-center justify-center opacity-50 absolute inset-0">
              <mx-circular-progress size="2rem" />
            </div>
          )}
        </div>
        {this.showButton && (
          <mx-button
            class="mt-16"
            btnType={this.hasFile && !this.isUploading ? 'outlined' : 'contained'}
            onClick={this.onButtonClick.bind(this)}
            disabled={this.isUploading}
          >
            {this.hasFile && !this.isUploading ? 'Remove' : 'Upload'}
          </mx-button>
        )}
        {this.hasInstructions && (
          <p class="caption1 my-16">
            <slot name="instructions"></slot>
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
