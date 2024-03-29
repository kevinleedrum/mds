# Inputs & Textareas

The icons for Moxi Design System are from [https://phosphoricons.com/](https://phosphoricons.com/).

## Standard Input

<br />
<section class="mds">
  <div class="flex flex-row flex-nowrap justify-between">
    <div style="width: 47%;">
      <strong>Regular</strong>
      <div class="my-5">
        <mx-input label="Placeholder"></mx-input>
      </div>
      <div class="my-5">
        <mx-input label="Placeholder & Left Icon" left-icon="ph-apple-logo"></mx-input>
      </div>
      <div class="my-5">
        <mx-input label="Placeholder & Right Icon" right-icon="ph-apple-logo"></mx-input>
      </div>
      <div class="my-5">
        <mx-input label="Placeholder & Assistive Text" assistive-text="Helpful text about input"></mx-input>
      </div>
      <div class="my-5">
        <mx-input label="Placeholder & Right Icon" value="Some Error" error></mx-input>
      </div>
    </div>
    <div style="width: 47%;">
      <strong>Dense</strong>
      <div class="my-5">
        <mx-input label="Placeholder" dense></mx-input>
      </div>
      <div class="my-5">
        <mx-input label="Placeholder & Left Icon" left-icon="ph-apple-logo" dense></mx-input>
      </div>
      <div class="my-5">
        <mx-input label="Placeholder & Right Icon" right-icon="ph-apple-logo" dense></mx-input>
      </div>
      <div class="my-5">
        <mx-input label="Placeholder & Assistive Text" assistive-text="Helpful text about input" dense></mx-input>
      </div>
      <div class="my-5">
        <mx-input label="Placeholder & Right Icon" right-icon="ph-apple-logo" value="Some Error" error dense></mx-input>
      </div>
    </div>
  </div>
</section>

## Text Area

<br />
<mx-input label="Placeholder" textarea=true></mx-input>

### Properties

| Property              | Attribute               | Description | Type      | Default     |
| --------------------- | ----------------------- | ----------- | --------- | ----------- |
| `assistiveText`       | `assistive-text`        |             | `string`  | `undefined` |
| `dense`               | `dense`                 |             | `boolean` | `false`     |
| `error`               | `error`                 |             | `boolean` | `false`     |
| `isActive`            | `is-active`             |             | `boolean` | `false`     |
| `isFocused`           | `is-focused`            |             | `boolean` | `false`     |
| `label`               | `label`                 |             | `string`  | `undefined` |
| `labelClass`          | `label-class`           |             | `string`  | `''`        |
| `leftIcon`            | `left-icon`             |             | `string`  | `undefined` |
| `name`                | `name`                  |             | `string`  | `undefined` |
| `outerContainerClass` | `outer-container-class` |             | `string`  | `''`        |
| `rightIcon`           | `right-icon`            |             | `string`  | `undefined` |
| `textarea`            | `textarea`              |             | `boolean` | `false`     |
| `textareaHeight`      | `textarea-height`       |             | `string`  | `'250px'`   |
| `type`                | `type`                  |             | `string`  | `'text'`    |
| `value`               | `value`                 |             | `string`  | `undefined` |
