import { EventEmitter } from '../../stencil-public-runtime';
import { BtnType } from '../mx-button/mx-button';
export declare class MxImageUpload {
  fileInput: HTMLInputElement;
  hasInstructions: boolean;
  hasSuccess: boolean;
  hasError: boolean;
  /** Set `acceptImage` to `false` and `acceptPdf` to `true` to only accept PDF files.  Set both to `false` to accept any file. */
  acceptImage: boolean;
  /** Set `acceptImage` to `false` and `acceptPdf` to `true` to only accept PDF files.  Set both to `false` to accept any file. */
  acceptPdf: boolean;
  /** Replaces the word "image" in the default dropzone text (i.e. "No image to show"). */
  assetName: string;
  /** Assistive text to display under the dropzone. To add markup, use the `instructions` slot directly instead. */
  assistiveText: string;
  /** Sets the width and height to 80px and changes the icon. */
  avatar: boolean;
  /** The [`btnType` prop](/components/buttons.html) for the Upload button. */
  uploadBtnType: BtnType;
  /** Sets the thumbnail sizing strategy relative to the container. */
  thumbnailSize: 'cover' | 'stretch' | 'contain' | 'auto';
  /** The height of the dropzone / thumbnail container (e.g. "400px" or "50%"). */
  height: string;
  /** The class name of the icon to use instead of the default icon. */
  icon: string;
  /** The `id` attribute to apply to the input element. */
  inputId: string;
  /** Set to `true` to show the Remove button, thumbnail, and `uploaded` slot content. */
  isUploaded: boolean;
  /** Set to `true` to disable the button and show the circular progress indicator. */
  isUploading: boolean;
  /** The `name` attribute for the `input` element. */
  name: string;
  /** The text to display on the Remove button */
  removeButtonLabel: string;
  /** Set to `false` to hide the default Upload/Remove button. */
  showButton: boolean;
  /** Set to `false` to hide the dropzone icon. */
  showIcon: boolean;
  /** Set to `false` to hide the dropzone text. */
  showDropzoneText: boolean;
  /** The URL for the thumbnail of the currently selected image. */
  thumbnailUrl: string;
  /** The text to display on the Upload button */
  uploadButtonLabel: string;
  /** The width of the dropzone / thumbnail container (e.g. "400px" or "50%"). */
  width: string;
  isDraggingOver: boolean;
  isFileSelected: boolean;
  thumbnailDataUri: string;
  element: HTMLMxTableElement;
  /** Emits the thumbnail url as `CustomEvent.detail` whenever it changes (i.e. after generating a data URI) */
  mxThumbnailChange: EventEmitter<string>;
  onThumbnailUrlChange(): void;
  connectedCallback(): void;
  componentWillRender(): void;
  removeFile(): Promise<void>;
  selectFile(): Promise<void>;
  onButtonClick(e: MouseEvent): void;
  onInput(e: Event): void;
  setThumnailDataUri(file: File): void;
  onDragOver(): void;
  onDragLeave(): void;
  get accept(): string;
  /** The width is applied to the host element in order to support percent-based widths */
  get dropzoneWidth(): string;
  get dropzoneHeight(): string;
  get dropzoneClass(): string;
  get hasFile(): boolean;
  get thumbnailBackgroundImage(): string;
  get thumbnailBackgroundSize(): string;
  render(): any;
}
