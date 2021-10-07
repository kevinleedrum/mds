# Uploads

## Image Uploads

The `mx-image-upload` component is used to upload a single image file (or PDF file, if the `acceptPdf` prop is passed).

The component wraps an [`<input type="file">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file), which emits both an `input` event and a `change` event whenever a file is selected or removed. The `isUploading` and `isUploaded` props can then be set accordingly.

<section class="mds">
  <div class="flex flex-col my-20 space-y-40">
<!-- #region image-uploads -->
    <mx-image-upload @input="onInput">
      <span slot="instructions">Upload instructions go here</span>
    </mx-image-upload>
    <mx-image-upload show-icon="false" asset-name="logo" @input="onInput">
      <span slot="instructions">
        The <code>assetName</code> prop is set to "logo" in this example.
      </span>
    </mx-image-upload>
    <mx-image-upload show-dropzone-text="false" @input="onInput" />
    <mx-image-upload accept-pdf accept-image="false" icon="ph-file-arrow-up" @input="onInput">
      <span slot="dropzone-text" class="mt-8">
        Upload PDF &hellip;
      </span>
      <span slot="uploaded">
        PDF Uploaded! 🎉
      </span>
      <span slot="instructions">
        This example uses the <code>dropzone-text</code> and <code>uploaded</code> slots.
      </span>
    </mx-image-upload>
<!-- #endregion image-uploads -->
  </div>
</section>

<<< @/vuepress/components/uploads.md#image-uploads
<<< @/vuepress/components/uploads.md#on-input

### Success and error messages

There are two slots for success and error status messages, named `success` and `error` respectively.

<section class="mds">
  <div class="flex flex-col my-20 space-y-40">
<!-- #region status-messages -->
    <mx-image-upload thumbnail-size="cover" thumbnail-url="https://picsum.photos/300">
      <span slot="success">
        The image was uploaded successfully
      </span>
    </mx-image-upload>
    <mx-image-upload thumbnail-size="cover" thumbnail-url="https://picsum.photos/320">
      <span slot="instructions">
        Images may be up to 4800px in width or height.
      </span>
      <span slot="error">
        The selected image does not meet requirements.  The width must be less than 4800px.
      </span>
    </mx-image-upload>
<!-- #endregion status-messages -->
  </div>
</section>

<<< @/vuepress/components/uploads.md#status-messages

### Avatars

Passing the `avatar` prop sets the `width` and `height` to 80px and changes the icon.

To provide an initial thumbnail image (e.g. if the user has previously uploaded an avatar), set the `thumbnail-url` prop.

<section class="mds">
  <div class="flex my-20">  
<!-- #region avatar -->
    <mx-image-upload
      avatar
      thumbnail-url="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" 
      @input="onInput"
    />
<!-- #endregion avatar -->
  </div>
</section>

<<< @/vuepress/components/uploads.md#avatar

### Dimensions & thumbnail size

The `width` and `height` props may be used to set the dimensions of the dropzone/thumbnail container.

The `thumbnailSize` prop may also be used to set how the thumbnail fits inside the container: `cover` (default), `stretch`, `contain`, or `auto`.

<section class="mds">
  <div class="flex flex-col my-20 space-y-40">
<!-- #region image-upload-dimensions -->
    <mx-image-upload width="100%" height="150px" thumbnail-size="cover" thumbnail-url="https://via.placeholder.com/200x100" />
    <mx-image-upload width="100%" height="150px" thumbnail-size="stretch" thumbnail-url="https://via.placeholder.com/200x100" />
    <mx-image-upload width="100%" height="150px" thumbnail-size="contain" thumbnail-url="https://via.placeholder.com/200x100" />
    <mx-image-upload width="100%" height="150px" thumbnail-size="auto" thumbnail-url="https://via.placeholder.com/200x100" />
<!-- #endregion image-upload-dimensions -->
  </div>
</section>

<<< @/vuepress/components/uploads.md#image-upload-dimensions

### External button

Set the `showButton` prop to `false` if you want to leverage the `selectFile` and `removeFile` methods with an external button.

<section class="mds">
  <div class="inline-flex flex-col items-center space-y-20">
<!-- #region external-button -->
    <mx-image-upload ref="upload" show-button="false" @change="onChange" />
    <mx-button
      btn-type="action"
      :icon="hasFile ? 'ph-trash-simple' : 'ph-arrow-fat-line-up'"
      @click="onButtonClick"
    >
      {{ hasFile ? 'Remove' : 'Select file ...' }}
    </mx-button>
<!-- #endregion external-button -->
  </div>
</section>

<<< @/vuepress/components/uploads.md#external-button
<<< @/vuepress/components/uploads.md#external-button-handlers

### Image Upload Properties

| Property           | Attribute            | Description                                                                                                              | Type                                          | Default     |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ----------- |
| `acceptImage`      | `accept-image`       | Set `acceptImage` to `false` and `acceptPdf` to `true` to only accept PDF files. Set both to `false` to accept any file. | `boolean`                                     | `true`      |
| `acceptPdf`        | `accept-pdf`         | Set `acceptImage` to `false` and `acceptPdf` to `true` to only accept PDF files. Set both to `false` to accept any file. | `boolean`                                     | `false`     |
| `assetName`        | `asset-name`         | Replaces the word "image" in the default dropzone text (i.e. "No image to show").                                        | `string`                                      | `'image'`   |
| `avatar`           | `avatar`             | Sets the width and height to 80px and changes the icon.                                                                  | `boolean`                                     | `false`     |
| `height`           | `height`             | The height of the dropzone / thumbnail container (e.g. "400px" or "50%").                                                | `string`                                      | `undefined` |
| `icon`             | `icon`               | The class name of the icon to use instead of the default icon.                                                           | `string`                                      | `undefined` |
| `inputId`          | `input-id`           | The `id` attribute to apply to the input element.                                                                        | `string`                                      | `undefined` |
| `isUploaded`       | `is-uploaded`        | Set to `true` to show the Remove button, thumbnail, and `uploaded` slot content.                                         | `boolean`                                     | `false`     |
| `isUploading`      | `is-uploading`       | Set to `true` to disable the button and show the circular progress indicator.                                            | `boolean`                                     | `false`     |
| `name`             | `name`               | The `name` attribute for the `input` element.                                                                            | `string`                                      | `undefined` |
| `showButton`       | `show-button`        | Set to `false` to hide the default Upload/Remove button.                                                                 | `boolean`                                     | `true`      |
| `showDropzoneText` | `show-dropzone-text` | Set to `false` to hide the dropzone text.                                                                                | `boolean`                                     | `true`      |
| `showIcon`         | `show-icon`          | Set to `false` to hide the dropzone icon.                                                                                | `boolean`                                     | `true`      |
| `thumbnailSize`    | `thumbnail-size`     | Sets the thumbnail sizing strategy relative to the container.                                                            | `"auto" \| "contain" \| "cover" \| "stretch"` | `'cover'`   |
| `thumbnailUrl`     | `thumbnail-url`      | The URL for the thumbnail of the currently selected image.                                                               | `string`                                      | `undefined` |
| `width`            | `width`              | The width of the dropzone / thumbnail container (e.g. "400px" or "50%").                                                 | `string`                                      | `undefined` |

### Image Upload Methods

#### `removeFile() => Promise<void>`

Remove the currently selected image. This will reset the file input, and it will disregard the `thumbnailUrl` prop value.

#### `selectFile() => Promise<void>`

If no image is selected, open the file dialog.

### CSS Variables

<<< @/src/tailwind/variables/index.scss#uploads

<script>
export default {
  data() {
    return {
      hasFile: false,
    }
  },
  methods: {
    // #region on-input
    onInput(e) {
      if (e.target.files.length === 0) return console.log('Removed file')
      console.log('Uploading ' + e.target.files[0].name)
      const mxImageUpload = e.target.closest('mx-image-upload')
      mxImageUpload.isUploading = true
      // Simulate upload
      setTimeout(() => {
        mxImageUpload.isUploaded = true
        mxImageUpload.isUploading = false
        console.log('Uploaded ' + e.target.files[0].name)
      }, 2000)
      // #endregion on-input
    },
    // #region external-button-handlers
    onChange(e) {
      this.hasFile = e.target.files.length > 0
    },
    onButtonClick() {
      if (this.hasFile) {
        this.$refs.upload.removeFile()
      } else {
        this.$refs.upload.selectFile()
      }
    },
    // #endregion external-button-handlers
  }
}
</script>
