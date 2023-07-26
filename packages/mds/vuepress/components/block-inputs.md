# Block Inputs

## Block Wrapper

Block inputs should always be contained within the `mx-block-wrapper` component.

Block Wrappers have a single attribute of `columns`

## Block Input (text)

The `mx-block-input` component...

<br />
<section class="mds">
  <!-- #region block-inputs -->
  <div class="grid grid-cols-1 gap-40">
    <div>
      <strong>Regular in 2 columns</strong>
      <div class="my-20">
        <mx-block-wrapper columns="2">
          <mx-block-input label="Label" placeholder="Placeholder" />
          <mx-block-input label="Label" placeholder="Placeholder" />
        </mx-block-wrapper>
      </div>
      <strong>Regular in 3 columns</strong>
      <div class="my-20">
        <mx-block-wrapper columns="3">
          <mx-block-input label="Label" placeholder="Placeholder" />
          <mx-block-input label="Label" placeholder="Placeholder" />
          <mx-block-input label="Label" placeholder="Placeholder" />
          <mx-block-input label="Label" colspan="2" placeholder="Placeholder" />
          <mx-block-input label="Label" placeholder="Placeholder" />
        </mx-block-wrapper>
      </div>
      <strong>Disabled with assistive text</strong>
      <div class="my-20">
        <mx-block-wrapper>
          <mx-block-input label="Label" assistive-text="Helpful text about input" disabled placeholder="Placeholder" />
        </mx-block-wrapper>
      </div>
      <strong>Error</strong>
      <div class="my-20">
        <mx-block-wrapper>
          <mx-block-input label="Label" assistive-text="Reason goes here" error placeholder="Placeholder" />
        </mx-block-wrapper>
      </div>
    </div>
  </div>
  <!-- #endregion block-inputs -->
</section>

<<< @/vuepress/components/block-inputs.md#block-inputs

### Properties

| Property        | Attribute        | Description                                                                       | Type      | Default     |
| --------------- | ---------------- | --------------------------------------------------------------------------------- | --------- | ----------- |
| `assistiveText` | `assistive-text` |                                                                                   | `string`  | `undefined` |
| `colspan`       | `colspan`        | Used to define the number of columns to span in the parent wrapper if more than 1 | `number`  | `undefined` |
| `disabled`      | `disabled`       |                                                                                   | `boolean` | `false`     |
| `error`         | `error`          |                                                                                   | `boolean` | `false`     |
| `inputId`       | `input-id`       | The `id` attribute for the text input                                             | `string`  | `undefined` |
| `label`         | `label`          | Text for the label element                                                        | `string`  | `undefined` |
| `maxlength`     | `maxlength`      |                                                                                   | `number`  | `undefined` |
| `name`          | `name`           | The `name` attribute for the text input                                           | `string`  | `undefined` |
| `placeholder`   | `placeholder`    | Placeholder text for the input.                                                   | `string`  | `undefined` |
| `readonly`      | `readonly`       |                                                                                   | `boolean` | `false`     |
| `type`          | `type`           | The `type` attribute for the text input                                           | `string`  | `'text'`    |
| `value`         | `value`          |                                                                                   | `string`  | `undefined` |
