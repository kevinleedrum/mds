# Upload

## Image Uploads

The `mx-image-upload` component is used to upload a single image file (or PDF file, if the `acceptPdf` prop is passed).

The component wraps an [`<input type="file">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file), which will emit a `change` event when a file is selected. The `isUploading` and `isUploaded` props can then be set accordingly.

<section class="mds">
  <div class="flex flex-col my-20 space-y-40">
<!-- #region image-uploads -->
    <mx-image-upload @change="onChange">
      <span slot="instructions">Upload instructions go here</span>
    </mx-image-upload>
    <mx-image-upload show-icon="false" asset-name="logo" @change="onChange">
    <span slot="instructions">
      The <code>assetName</code> is set to "logo" in this example.
    </span>
    </mx-image-upload>
    <mx-image-upload show-dropzone-text="false" icon="ph-file-arrow-up" @change="onChange" />
<!-- #endregion image-uploads -->
  </div>
</section>

<<< @/vuepress/components/upload.md#image-uploads
<<< @/vuepress/components/upload.md#onchange

### Avatars

Passing the `avatar` prop sets the `width` and `height` to 80px and changes the icon.

To provide an initial thumbnail image (e.g. if the user has previously uploaded an avatar), set the `thumbnail-url` prop. The component emits an `mxRemove` custom event when the Remove button is clicked.

<section class="mds">
  <div class="flex my-20">  
<!-- #region avatar -->
    <mx-image-upload
      avatar
      thumbnail-url="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" 
      @mxRemove="onRemove"
      @change="onChange"
    />
<!-- #endregion avatar -->
  </div>
</section>

<<< @/vuepress/components/upload.md#avatar

### Dimensions & thumbnail size

The `width` and `height` props may be used to set the dimensions of the dropzone/thumbnail container.

The `thumbnailSize` prop may also be used to set how the thumbnail fits inside the container: `cover` (default), `stretch`, `contain`, or `auto`.

<section class="mds">
  <div class="flex flex-col my-20 space-y-40">
<!-- #region image-upload-dimensions -->
    <mx-image-upload width="400px" height="150px" thumbnail-size="cover" thumbnail-url="https://via.placeholder.com/200x100" />
    <mx-image-upload width="400px" height="150px" thumbnail-size="stretch" thumbnail-url="https://via.placeholder.com/200x100" />
    <mx-image-upload width="400px" height="150px" thumbnail-size="contain" thumbnail-url="https://via.placeholder.com/200x100" />
    <mx-image-upload width="400px" height="150px" thumbnail-size="auto" thumbnail-url="https://via.placeholder.com/200x100" />
<!-- #endregion image-upload-dimensions -->
  </div>
</section>

<<< @/vuepress/components/upload.md#image-upload-dimensions

### Success and error messages

There are two slots for success and error status messages, named `success` and `error` respectively.

<section class="mds">
  <div class="flex flex-col my-20 space-y-40">
<!-- #region image-upload-dimensions -->
    <mx-image-upload thumbnail-size="cover" thumbnail-url="https://www.fillmurray.com/300/300">
      <span slot="success">
        The image was uploaded successfully
      </span>
    </mx-image-upload>
    <mx-image-upload thumbnail-size="cover" thumbnail-url="https://www.fillmurray.com/480/320">
      <span slot="instructions">
        Images may be up to 4800px in width or height.
      </span>
      <span slot="error">
        The selected image does not meet requirements.  The width must be less than 4800px.
      </span>
    </mx-image-upload>
<!-- #endregion image-upload-dimensions -->
  </div>
</section>

<script>
export default {
  methods: {
    // #region onchange
    onChange(e) {
      const upload = e.target.closest('mx-image-upload')
      console.log('Uploading ' + e.target.files[0].name)
      upload.isUploading = true
      // Simulate upload
      setTimeout(() => {
        upload.isUploaded = true
        upload.isUploading = false
        console.log('Uploaded ' + e.target.files[0].name)
      }, 2000)
      // #endregion onchange
    },
    onRemove() {
      console.log('File removed')
    }
  }
}
</script>
