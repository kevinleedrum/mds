import { newSpecPage } from '@stencil/core/testing';
import { MxButton } from '../../mx-button/mx-button';
import { MxImageUpload } from '../mx-image-upload';

describe('mx-image-upload', () => {
  let page;
  let root: HTMLMxImageUploadElement;
  let input: HTMLInputElement;
  let dropzoneWrapper: HTMLElement;
  let button: HTMLMxButtonElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [MxImageUpload, MxButton],
      html: `
      <mx-image-upload>
        <span slot="uploaded">File uploaded!</span>
      </mx-image-upload>
      `,
    });
    root = page.root;
    input = root.querySelector('input[type="file"]');
    dropzoneWrapper = root.querySelector('[data-testid="dropzone-wrapper"]');
    button = root.querySelector('[data-testid="upload-button"]').closest('mx-button');
  });

  it('renders an input[type="file"]', async () => {
    expect(input).not.toBeNull();
  });

  it('sets the input accept attribute based on acceptImage and acceptPdf', async () => {
    expect(input.getAttribute('accept')).toBe('image/*');
    root.acceptPdf = true;
    await page.waitForChanges();
    expect(input.getAttribute('accept')).toBe('image/*,.pdf');
    root.acceptImage = false;
    await page.waitForChanges();
    expect(input.getAttribute('accept')).toBe('.pdf');
  });

  it('uses the assetName prop in the dropzone test', async () => {
    expect(root.innerText).toContain('No image to show');
    root.assetName = 'logo';
    await page.waitForChanges();
    expect(root.innerText).toContain('No logo to show');
  });

  it('sets the width and height based on the width and height props', async () => {
    root.width = '50%';
    root.height = '50px';
    await page.waitForChanges();
    expect(dropzoneWrapper.style.width).toBe('50%');
    expect(dropzoneWrapper.style.height).toBe('50px');
  });

  it('sets the width and height to 80px and changes the icon if the avatar prop is set', async () => {
    root.avatar = true;
    await page.waitForChanges();
    expect(dropzoneWrapper.style.width).toBe('80px');
    expect(dropzoneWrapper.style.height).toBe('80px');
    expect(root.querySelector('[data-testid="avatar-icon"]')).not.toBeNull();
  });

  it('renders a thumbnail from the thumbnailUrl prop', async () => {
    root.thumbnailUrl = 'test.jpg';
    await page.waitForChanges();
    const thumbnail = root.querySelector('[data-testid="thumbnail"]') as HTMLElement;
    expect(thumbnail.style.backgroundImage).toBe('url(test.jpg)');
  });

  it('sets the background-size of the thumbnail based on the thumbnailSize prop', async () => {
    root.thumbnailUrl = 'test.jpg';
    await page.waitForChanges();
    const thumbnail = root.querySelector('[data-testid="thumbnail"]') as HTMLElement;
    expect(thumbnail.style.backgroundSize).toBe('cover');
    root.thumbnailSize = 'contain';
    await page.waitForChanges();
    expect(thumbnail.style.backgroundSize).toBe('contain');
    root.thumbnailSize = 'stretch';
    await page.waitForChanges();
    expect(thumbnail.style.backgroundSize).toBe('100% 100%');
  });

  it('renders the icon specified by the icon prop', async () => {
    root.icon = 'ph-apple';
    await page.waitForChanges();
    expect(root.querySelector('[data-testid="image-icon"]')).toBeNull();
    const customIcon = root.querySelector('[data-testid="upload-icon"]') as HTMLElement;
    expect(customIcon.classList.contains('ph-apple')).toBe(true);
  });

  it('set the id and name attributes on the input based on the props', async () => {
    root.inputId = '123';
    root.name = 'abc';
    await page.waitForChanges();
    expect(input.getAttribute('id')).toBe('123');
    expect(input.getAttribute('name')).toBe('abc');
  });

  it('sets the upload button btnType prop to the uploadBtnType prop value', async () => {
    root.uploadBtnType = 'outlined';
    await page.waitForChanges();
    expect(button.btnType).toBe('outlined');
  });

  it('hides the button if showButton is false', async () => {
    expect(button).not.toBeNull();
    root.showButton = false;
    await page.waitForChanges();
    expect(root.querySelector('[data-testid="upload-button"]')).toBeNull();
  });

  it('hides the dropzone text if showDropzoneText is false', async () => {
    expect(root.querySelector('[data-testid="dropzone-text"]').classList.contains('hidden')).toBe(false);
    root.showDropzoneText = false;
    await page.waitForChanges();
    expect(root.querySelector('[data-testid="dropzone-text"]').classList.contains('hidden')).toBe(true);
  });

  it('hides the icon if showIcon is false', async () => {
    expect(root.querySelector('[data-testid="image-icon"]')).not.toBeNull();
    root.showIcon = false;
    await page.waitForChanges();
    expect(root.querySelector('[data-testid="image-icon"]')).toBeNull();
  });

  it('shows a Remove button and the "uploaded" slot content if isUploaded is true', async () => {
    const uploadedSlot = root.querySelector('[data-testid="uploaded"]') as HTMLElement;
    expect(button.innerText).toBe('Upload');
    expect(uploadedSlot.classList.contains('hidden')).toBe(true);
    root.isUploaded = true;
    await page.waitForChanges();
    expect(button.innerText).toBe('Remove');
    expect(uploadedSlot.classList.contains('hidden')).toBe(false);
  });

  it('disables the button and shows a progress indicator if isUploading is true', async () => {
    expect(button.disabled).toBeFalsy();
    expect(root.querySelector('[data-testid="progress"]')).toBeNull();
    root.isUploading = true;
    await page.waitForChanges();
    expect(button.disabled).toBe(true);
    expect(root.querySelector('[data-testid="progress"]')).not.toBeNull();
  });

  it('emits an mxThumbnailChange event when thumbnailUrl is changed', async () => {
    const listener = jest.fn();
    root.addEventListener('mxThumbnailChange', listener);
    root.thumbnailUrl = 'test.jpg';
    await page.waitForChanges();
    expect(listener).toHaveBeenCalled();
    expect(listener.mock.calls[0][0].detail).toBe('test.jpg');
  });

  it('emits input, change, and mxThumbnailChange events when Remove is clicked', async () => {
    root.thumbnailUrl = 'test.jpg';
    await page.waitForChanges();
    const listener = jest.fn();
    root.addEventListener('input', listener);
    root.addEventListener('change', listener);
    root.addEventListener('mxThumbnailChange', listener);
    button.click();
    expect(listener).toHaveBeenCalledTimes(3);
    const value = listener.mock.calls[0][0].target.value;
    const thumbnailUrl = listener.mock.calls[2][0].target.value;
    expect(value).toBe('');
    expect(thumbnailUrl).toBeFalsy();
  });

  it('removes the thumbnail when the removeFile method is called', async () => {
    root.thumbnailUrl = 'test.jpg';
    await page.waitForChanges();
    const listener = jest.fn();
    root.addEventListener('input', listener);
    root.addEventListener('change', listener);
    root.removeFile();
    await page.waitForChanges();
    expect(listener).toHaveBeenCalledTimes(2);
    const value = listener.mock.calls[0][0].target.value;
    expect(value).toBe('');
  });

  it('clicks the input when the selectFile method is called', async () => {
    const listener = jest.fn();
    input.addEventListener('click', listener);
    root.selectFile();
    await page.waitForChanges();
    expect(listener).toHaveBeenCalled();
  });
});
