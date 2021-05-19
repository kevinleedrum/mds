# Buttons

## Standard Buttons

<section class="mds">
  <div class="flex flex-row flex-nowrap justify-between mt-10">
    <div style="width: 47%;">
      <strong>Contained</strong>
      <div class="my-5">
        <mx-button @click="() => { debugger }">button</mx-button>
      </div>
      <div class="my-5">
        <mx-button disabled @click="() => { debugger }">Disabled button</mx-button>
      </div>
      <div class="my-5">
        <mx-button xl>XL button</mx-button>
      </div>
      <div class="my-5">
        <mx-button disabled xl>XL Disabled button</mx-button>
      </div>
       <div class="my-5">
        <mx-button href="https://google.com" target="_blank">Button as Link</mx-button>
      </div>
    </div>
    <div style="width: 47%;">
      <strong>Outline</strong>
      <div class="my-5">
        <mx-button btn-type="outlined">Outlined button</mx-button>
      </div>
      <div class="my-5">
        <mx-button btn-type="outlined" disabled>Outlined button</mx-button>
      </div>
      <div class="my-5">
        <mx-button btn-type="outlined" xl>XL outlined button</mx-button>
      </div>
      <div class="my-5">
        <mx-button btn-type="outlined" disabled xl>XL outlined Disabled</mx-button>
      </div>
      <div class="my-5">
        <mx-button btn-type="outlined" href="https://google.com" target="_blank">Button as Link</mx-button>
      </div>
    </div>
  </div>
  <div>
    <strong>Full</strong>
    <div class="my-5">
      <mx-button full>button</mx-button>
    </div>
    <div class="my-5">
      <mx-button xl full>XL button</mx-button>
    </div>
    <div class="my-5">
      <mx-button btn-type="outlined" full>Outlined button</mx-button>
    </div>
    <div class="my-5">
      <mx-button btn-type="outlined" full xl>Outlined button</mx-button>
    </div>
  </div>
</section>

## Action Buttons

<section class="mds">
  <div class="my-5">
    <mx-button btn-type="action">Button</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" icon-left="ph-apple-logo">Button with Icon</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" dropdown>Dropdown</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" disabled>Disabled</mx-button>
  </div>
</section>

## Text Buttons

<section class="mds">
  <div class="my-5">
    <mx-button btn-type="text">button</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="text" icon-left="ph-apple-logo">button with icon</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="text" disabled>disabled</mx-button>
  </div>
</section>

### Properties

| Property   | Attribute   | Description | Type      | Default       |
| ---------- | ----------- | ----------- | --------- | ------------- |
| `btnType`  | `btn-type`  |             | `string`  | `'contained'` |
| `disabled` | `disabled`  |             | `boolean` | `false`       |
| `full`     | `full`      |             | `boolean` | `false`       |
| `href`     | `href`      |             | `string`  | `undefined`   |
| `iconLeft` | `icon-left` |             | `string`  | `undefined`   |
| `target`   | `target`    |             | `string`  | `undefined`   |
| `type`     | `type`      |             | `string`  | `'button'`    |
| `value`    | `value`     |             | `string`  | `undefined`   |
| `xl`       | `xl`        |             | `boolean` | `false`       |
