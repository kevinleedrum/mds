# Buttons

## Standard Buttons

<section class="mds">
  <div class="flex flex-row flex-nowrap justify-between mt-10">
    <div style="width: 47%;">
      <strong>Contained</strong>
      <div class="my-5">
        <mx-button>button</mx-button>
      </div>
      <div class="my-5">
        <mx-button disabled>Disabled button</mx-button>
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
      <mx-button btn-type="outlined" full xl>XL Outlined button</mx-button>
    </div>
  </div>
</section>

```html
<section class="mds">
  <div class="flex flex-row flex-nowrap justify-between mt-10">
    <div style="width: 47%;">
      <strong>Contained</strong>
      <div class="my-5">
        <mx-button>button</mx-button>
      </div>
      <div class="my-5">
        <mx-button disabled>Disabled button</mx-button>
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
      <mx-button btn-type="outlined" full xl>XL Outlined button</mx-button>
    </div>
  </div>
</section>
```

## Action Buttons

<section class="mds">
  <div class="my-5">
    <mx-button btn-type="action">Button</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" icon="ph-apple-logo">Button with Icon</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" disabled>Disabled</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" dropdown>Dropdown</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" dropdown disabled>Disabled</mx-button>
  </div>
</section>

```html
<section class="mds">
  <div class="my-5">
    <mx-button btn-type="action">Button</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" icon="ph-apple-logo">Button with Icon</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" disabled>Disabled</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" dropdown>Dropdown</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="action" dropdown disabled>Disabled</mx-button>
  </div>
</section>
```

## Text Buttons

<section class="mds">
  <div class="my-5">
    <mx-button btn-type="text">button</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="text" icon="ph-apple-logo">button with icon</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="text" disabled>disabled</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="text" icon="ph-apple-logo" dropdown>Icon with Dropdown</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="text" icon="ph-apple-logo" dropdown disabled>Disabled</mx-button>
  </div>
</section>

```html
<section class="mds">
  <div class="my-5">
    <mx-button btn-type="text">button</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="text" icon="ph-apple-logo">button with icon</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="text" disabled>disabled</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="text" icon="ph-apple-logo" dropdown>Icon with Dropdown</mx-button>
  </div>
  <div class="my-5">
    <mx-button btn-type="text" icon="ph-apple-logo" dropdown disabled>Disabled</mx-button>
  </div>
</section>
```

## Icon Buttons

<section class="mds">
  <div class="mt-5">
    <div>
      <div class="flex my-5 items-center">
        <mx-button btn-type="icon" icon="ph-thumbs-up"></mx-button>
        <mx-button btn-type="icon" icon="ph-heart"></mx-button>
        <mx-button btn-type="icon" icon="ph-x"></mx-button>
        <mx-button btn-type="icon" dropdown></mx-button>
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="flex my-5 items-center">
        <mx-button btn-type="icon" icon="ph-thumbs-up" disabled></mx-button>
        <mx-button btn-type="icon" icon="ph-heart" disabled></mx-button>
        <mx-button btn-type="icon" icon="ph-x" disabled></mx-button>
        <mx-button btn-type="icon" dropdown disabled></mx-button>
      </div>
    </div>
  </div>
</section>

```html
<section class="mds">
  <div class="mt-5">
    <div>
      <div class="flex my-5 items-center">
        <mx-button btn-type="icon" icon="ph-thumbs-up"></mx-button>
        <mx-button btn-type="icon" icon="ph-heart"></mx-button>
        <mx-button btn-type="icon" icon="ph-x"></mx-button>
        <mx-button btn-type="icon" dropdown></mx-button>
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="flex my-5 items-center">
        <mx-button btn-type="icon" icon="ph-thumbs-up" disabled></mx-button>
        <mx-button btn-type="icon" icon="ph-heart" disabled></mx-button>
        <mx-button btn-type="icon" icon="ph-x" disabled></mx-button>
        <mx-button btn-type="icon" dropdown disabled></mx-button>
      </div>
    </div>
  </div>
</section>
```

### Button Properties

| Property   | Attribute  | Description                                 | Type                                                    | Default       |
| ---------- | ---------- | ------------------------------------------- | ------------------------------------------------------- | ------------- |
| `btnType`  | `btn-type` |                                             | `"action" | "contained" | "icon" | "outlined" | "text"` | `'contained'` |
| `disabled` | `disabled` |                                             | `boolean`                                               | `false`       |
| `dropdown` | `dropdown` | Show chevron icon                           | `boolean`                                               | `false`       |
| `full`     | `full`     | Sets display to flex instead of inline-flex | `boolean`                                               | `false`       |
| `href`     | `href`     | Create button as link                       | `string`                                                | `undefined`   |
| `icon`     | `icon`     | Class name of icon                          | `string`                                                | `undefined`   |
| `target`   | `target`   | Combine with href                           | `string`                                                | `undefined`   |
| `type`     | `type`     |                                             | `"button" | "reset" | "submit"`                         | `'button'`    |
| `value`    | `value`    |                                             | `string`                                                | `undefined`   |
| `xl`       | `xl`       |                                             | `boolean`                                               | `false`       |

## Toggle Buttons

<section class="mds">
<div class="mt-5 grid grid-cols-1 lg:grid-cols-2">
  <div>
    <strong>Single Selection</strong>
    <div class="flex my-5 items-center">
      <mx-toggle-button name="foo" icon="ph-text-align-left" value="left" checked single></mx-toggle-button>
      <mx-toggle-button name="foo" icon="ph-text-align-center" value="center" single></mx-toggle-button>
      <mx-toggle-button name="foo" icon="ph-text-align-right" value="right" single></mx-toggle-button>
    </div>
  </div>
    <div>
      <strong>Multiple Selection</strong>
      <div class="flex my-5 items-center">
        <mx-toggle-button name="baz" icon="ph-text-bolder" value="bold"></mx-toggle-button>
        <mx-toggle-button name="baz" icon="ph-text-italic" value="italic" checked></mx-toggle-button>
        <mx-toggle-button name="baz" icon="ph-text-underline" value="underline" checked></mx-toggle-button>
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="flex my-5 items-center">
      <mx-toggle-button name="bar" icon="ph-text-align-left" value="left" single disabled></mx-toggle-button>
      <mx-toggle-button name="bar" icon="ph-text-align-center" value="center" single disabled></mx-toggle-button>
      <mx-toggle-button name="bar" icon="ph-text-align-right" value="right" single disabled></mx-toggle-button>
      </div>
    </div>
    <div>
      <strong>Single Button</strong>
      <div class="flex my-5 items-center">
        <mx-toggle-button name="grapes" icon="ph-microphone-slash"></mx-toggle-button>
      </div>
    </div>
  </div>
  </div>
</section>

```html
<section class="mds">
<div class="mt-5 grid grid-cols-1 lg:grid-cols-2">
  <div>
    <strong>Single Selection</strong>
    <div class="flex my-5 items-center">
      <mx-toggle-button name="foo" icon="ph-text-align-left" value="left" checked single></mx-toggle-button>
      <mx-toggle-button name="foo" icon="ph-text-align-center" value="center" single></mx-toggle-button>
      <mx-toggle-button name="foo" icon="ph-text-align-right" value="right" single></mx-toggle-button>
    </div>
  </div>
    <div>
      <strong>Multiple Selection</strong>
      <div class="flex my-5 items-center">
        <mx-toggle-button name="baz" icon="ph-text-bolder" value="bold"></mx-toggle-button>
        <mx-toggle-button name="baz" icon="ph-text-italic" value="italic" checked></mx-toggle-button>
        <mx-toggle-button name="baz" icon="ph-text-underline" value="underline" checked></mx-toggle-button>
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="flex my-5 items-center">
      <mx-toggle-button name="bar" icon="ph-text-align-left" value="left" single disabled></mx-toggle-button>
      <mx-toggle-button name="bar" icon="ph-text-align-center" value="center" single disabled></mx-toggle-button>
      <mx-toggle-button name="bar" icon="ph-text-align-right" value="right" single disabled></mx-toggle-button>
      </div>
    </div>
    <div>
      <strong>Single Button</strong>
      <div class="flex my-5 items-center">
        <mx-toggle-button name="grapes" icon="ph-microphone-slash"></mx-toggle-button>
      </div>
    </div>
  </div>
  </div>
</section>
```

### Toggle Button Properties

| Property   | Attribute  | Description                                | Type      | Default     |
| ---------- | ---------- | ------------------------------------------ | --------- | ----------- |
| `checked`  | `checked`  |                                            | `boolean` | `false`     |
| `disabled` | `disabled` |                                            | `boolean` | `false`     |
| `icon`     | `icon`     | Class name of icon                         | `string`  | `undefined` |
| `name`     | `name`     |                                            | `string`  | `undefined` |
| `single`   | `single`   | Create as radio button instead of checkbox | `boolean` | `false`     |
| `value`    | `value`    |                                            | `string`  | `undefined` |
