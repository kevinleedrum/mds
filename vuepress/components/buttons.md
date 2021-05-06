# Buttons

## Standard Buttons

<section class="mds">
  <div class="flex flex-row flex-nowrap justify-between mt-10">
    <div style="width: 47%;">
      <strong>Contained</strong>
      <div class="my-5">
        <mx-button value="button" />
      </div>
      <div class="my-5">
        <mx-button value="Disabled button" disabled />
      </div>
      <div class="my-5">
        <mx-button value="XL button" xl />
      </div>
      <div class="my-5">
        <mx-button value="XL Disabled button" disabled xl />
      </div>
       <div class="my-5">
        <mx-button value="Button as Link" href="https://google.com" target="_blank" />
      </div>
    </div>
    <div style="width: 47%;">
      <strong>Outline</strong>
      <div class="my-5">
        <mx-button value="Outlined button" type="outlined" />
      </div>
      <div class="my-5">
        <mx-button value="Outlined button" type="outlined" disabled />
      </div>
      <div class="my-5">
        <mx-button value="XL outlined button" type="outlined" xl />
      </div>
      <div class="my-5">
        <mx-button value="XL outlined Disabled" type="outlined" disabled xl />
      </div>
      <div class="my-5">
        <mx-button value="Button as Link" type="outlined" href="https://google.com" target="_blank" />
      </div>
    </div>
  </div>
  <div>
    <strong>Full</strong>
    <div class="my-5">
      <mx-button value="button" full />
    </div>
    <div class="my-5">
      <mx-button value="XL button" xl full />
    </div>
    <div class="my-5">
      <mx-button value="Outlined button" type="outlined" full />
    </div>
    <div class="my-5">
      <mx-button value="Outlined button" type="outlined" full xl />
    </div>
  </div>
</section>

## Action Buttons

<section class="mds">
  <div class="my-5">
    <mx-button value="button" type="action" />
  </div>
  <div class="my-5">
    <mx-button value="button with icon" type="action" icon-left="ph-apple-logo" />
  </div>
  <div class="my-5">
    <mx-button value="disabled" type="action" disabled />
  </div>
</section>

## Text Buttons

<section class="mds">
  <div class="my-5">
    <mx-button value="button" type="text" />
  </div>
  <div class="my-5">
    <mx-button value="button with icon" type="text" icon-left="ph-apple-logo" />
  </div>
  <div class="my-5">
    <mx-button value="disabled" type="text" disabled />
  </div>
</section>

### Properties

| Property   | Attribute   | Description | Type      | Default       |
| ---------- | ----------- | ----------- | --------- | ------------- |
| `disabled` | `disabled`  |             | `boolean` | `false`       |
| `full`     | `full`      |             | `boolean` | `false`       |
| `href`     | `href`      |             | `string`  | `undefined`   |
| `iconLeft` | `icon-left` |             | `string`  | `undefined`   |
| `target`   | `target`    |             | `string`  | `undefined`   |
| `type`     | `type`      |             | `string`  | `'contained'` |
| `value`    | `value`     |             | `string`  | `undefined`   |
| `xl`       | `xl`        |             | `boolean` | `false`       |
