# Inputs & Textareas

The icons for Moxi Design System are from [https://phosphoricons.com/](https://phosphoricons.com/).

## Standard Input

<br />
<section class="mds">
  <!-- #region text-inputs -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-40">
    <div>
      <strong>Regular</strong>
      <div class="my-20">
        <mx-input label="Label"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Floating Label" float-label></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Left Icon" left-icon="ph-apple-logo"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Floating Label & Left Icon" float-label left-icon="ph-apple-logo"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Right Icon" right-icon="ph-apple-logo"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Assistive Text" assistive-text="Helpful text about input"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Error" :value="inputValue" error assistive-text="Error message"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Disabled" assistive-text="This input is disabled" disabled :value="inputValue"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Read-only" assistive-text="This input is read-only" readonly :value="inputValue" @input="inputValue = $event.target.value"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Suffix" suffix="SQFT" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input maxlength="40" label="Label" assistive-text="This input has a maxlength attribute" :value="inputValue" @input="inputValue = $event.target.value"></mx-input>
      </div>
    </div>
    <div>
      <strong>Dense</strong>
      <div class="my-20">
        <mx-input label="Label" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Floating Label" float-label dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Left Icon" left-icon="ph-apple-logo" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Floating Label & Left Icon" float-label left-icon="ph-apple-logo" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Right Icon" right-icon="ph-apple-logo" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Assistive Text" assistive-text="Helpful text about input" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Error" :value="inputValue" error assistive-text="Error message" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Disabled" assistive-text="This input is disabled" disabled :value="inputValue" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Read-only" assistive-text="This input is read-only" readonly dense :value="inputValue" @input="inputValue = $event.target.value"></mx-input>
      </div>
      <div class="my-20">
        <mx-input label="Label & Suffix" suffix="SQFT" dense></mx-input>
      </div>
      <div class="my-20">
        <mx-input maxlength="40" label="Label" assistive-text="This input has a maxlength attribute" dense :value="inputValue" @input="inputValue = $event.target.value"></mx-input>
      </div>
    </div>
  </div>
  <!-- #endregion text-inputs -->
</section>

<<< @/vuepress/components/inputs.md#text-inputs

## Text Area

<br />
<section class="mds">
  <!-- #region textareas -->
  <mx-input label="Label" textarea assistive-text="This textarea has a height of 100px" textarea-height="100px"></mx-input>
  <mx-input class="mt-40" label="Label & Error" textarea error assistive-text="Error message"></mx-input>
  <mx-input class="my-40" label="Floating Label" textarea float-label maxlength="255" assistive-text="This textarea has a maxlength and really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really long assistive text"></mx-input>
  <!-- #endregion textareas -->
</section>

<<< @/vuepress/components/inputs.md#textareas

### Properties

| Property              | Attribute               | Description                                           | Type      | Default     |
| --------------------- | ----------------------- | ----------------------------------------------------- | --------- | ----------- |
| `assistiveText`       | `assistive-text`        |                                                       | `string`  | `undefined` |
| `dense`               | `dense`                 |                                                       | `boolean` | `false`     |
| `disabled`            | `disabled`              |                                                       | `boolean` | `false`     |
| `error`               | `error`                 |                                                       | `boolean` | `false`     |
| `floatLabel`          | `float-label`           |                                                       | `boolean` | `false`     |
| `inputId`             | `input-id`              | The `id` attribute for the text input                 | `string`  | `undefined` |
| `label`               | `label`                 |                                                       | `string`  | `undefined` |
| `labelClass`          | `label-class`           |                                                       | `string`  | `''`        |
| `leftIcon`            | `left-icon`             |                                                       | `string`  | `undefined` |
| `maxlength`           | `maxlength`             |                                                       | `number`  | `undefined` |
| `name`                | `name`                  | The `name` attribute for the text input               | `string`  | `undefined` |
| `outerContainerClass` | `outer-container-class` |                                                       | `string`  | `''`        |
| `readonly`            | `readonly`              |                                                       | `boolean` | `false`     |
| `rightIcon`           | `right-icon`            |                                                       | `string`  | `undefined` |
| `suffix`              | `suffix`                | Text shown to the right of the input value            | `string`  | `undefined` |
| `textarea`            | `textarea`              | Display a multi-line `textarea` instead of an `input` | `boolean` | `false`     |
| `textareaHeight`      | `textarea-height`       |                                                       | `string`  | `'250px'`   |
| `type`                | `type`                  | The `type` attribute for the text input               | `string`  | `'text'`    |
| `value`               | `value`                 |                                                       | `string`  | `undefined` |

### CSS Variables

<<< @/src/tailwind/variables/index.scss#inputs

<script>
export default {
  data() {
    return {
      inputValue: 'Input text'
    }
  }
}
</script>
