# Buttons

## Standard Buttons

<!-- #region standard-buttons -->
<section class="mds">
  <div class="flex flex-row flex-nowrap justify-between mt-10">
    <div style="width: 47%;">
      <strong>Contained</strong>
      <div class="my-20">
        <mx-button>button</mx-button>
      </div>
      <div class="my-20">
        <mx-button disabled>Disabled button</mx-button>
      </div>
      <div class="my-20">
        <mx-button xl>XL button</mx-button>
      </div>
      <div class="my-20">
        <mx-button disabled xl>XL Disabled button</mx-button>
      </div>
       <div class="my-20">
        <mx-button href="https://google.com" target="_blank">Button as Link</mx-button>
      </div>
    </div>
    <div style="width: 47%;">
      <strong>Outline</strong>
      <div class="my-20">
        <mx-button btn-type="outlined">Outlined button</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="outlined" disabled>Outlined button</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="outlined" xl>XL outlined button</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="outlined" disabled xl>XL outlined Disabled</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="outlined" href="https://google.com" target="_blank">Button as Link</mx-button>
      </div>
    </div>
  </div>
  <div>
    <strong>Full</strong>
    <div class="my-20">
      <mx-button full>button</mx-button>
    </div>
    <div class="my-20">
      <mx-button xl full>XL button</mx-button>
    </div>
    <div class="my-20">
      <mx-button btn-type="outlined" full>Outlined button</mx-button>
    </div>
    <div class="my-20">
      <mx-button btn-type="outlined" full xl>XL Outlined button</mx-button>
    </div>
  </div>
</section>
<!-- #endregion standard-buttons -->

<<< @/vuepress/components/buttons.md#standard-buttons

## Action Buttons

<!-- #region action-buttons -->
<section class="mds">
  <div class="my-20">
    <mx-button btn-type="action">Button</mx-button>
  </div>
  <div class="my-20">
    <mx-button btn-type="action" icon="ph-apple-logo">Button with Icon</mx-button>
  </div>
  <div class="my-20">
    <mx-button btn-type="action" disabled>Disabled</mx-button>
  </div>
  <div class="my-20">
    <mx-button btn-type="action" dropdown>Dropdown</mx-button>
  </div>
  <div class="my-20">
    <mx-button btn-type="action" dropdown disabled>Disabled</mx-button>
  </div>
</section>
<!-- #endregion action-buttons -->

<<< @/vuepress/components/buttons.md#action-buttons

## Text Buttons

<!-- #region text-buttons -->
<section class="mds">
  <div class="my-20">
    <mx-button btn-type="text">button</mx-button>
  </div>
  <div class="my-20">
    <mx-button btn-type="text" icon="ph-apple-logo">button with icon</mx-button>
  </div>
  <div class="my-20">
    <mx-button btn-type="text" disabled>disabled</mx-button>
  </div>
  <div class="my-20">
    <mx-button btn-type="text" icon="ph-apple-logo" dropdown>Icon with Dropdown</mx-button>
  </div>
  <div class="my-20">
    <mx-button btn-type="text" icon="ph-apple-logo" dropdown disabled>Disabled</mx-button>
  </div>
</section>
<!-- #endregion text-buttons -->

<<< @/vuepress/components/buttons.md#text-buttons

## Icon Buttons

<!-- #region icon-buttons -->
<section class="mds">
  <div class="mt-5">
    <div>
      <div class="flex my-20 items-center">
        <mx-button btn-type="icon" icon="ph-thumbs-up"></mx-button>
        <mx-button btn-type="icon" icon="ph-heart"></mx-button>
        <mx-button btn-type="icon" icon="ph-x"></mx-button>
        <mx-button btn-type="icon" dropdown></mx-button>
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="flex my-20 items-center">
        <mx-button btn-type="icon" icon="ph-thumbs-up" disabled></mx-button>
        <mx-button btn-type="icon" icon="ph-heart" disabled></mx-button>
        <mx-button btn-type="icon" icon="ph-x" disabled></mx-button>
        <mx-button btn-type="icon" dropdown disabled></mx-button>
      </div>
    </div>
  </div>
</section>
<!-- #endregion icon-buttons -->

<<< @/vuepress/components/buttons.md#icon-buttons

### Button Properties

| Property   | Attribute  | Description                                 | Type                                                        | Default       |
| ---------- | ---------- | ------------------------------------------- | ----------------------------------------------------------- | ------------- |
| `btnType`  | `btn-type` |                                             | `"action" \| "contained" \| "icon" \| "outlined" \| "text"` | `'contained'` |
| `disabled` | `disabled` |                                             | `boolean`                                                   | `false`       |
| `dropdown` | `dropdown` | Show chevron icon                           | `boolean`                                                   | `false`       |
| `full`     | `full`     | Sets display to flex instead of inline-flex | `boolean`                                                   | `false`       |
| `href`     | `href`     | Create button as link                       | `string`                                                    | `undefined`   |
| `icon`     | `icon`     | Class name of icon                          | `string`                                                    | `undefined`   |
| `target`   | `target`   | Only for link buttons                       | `string`                                                    | `undefined`   |
| `type`     | `type`     |                                             | `"button" \| "reset" \| "submit"`                           | `'button'`    |
| `value`    | `value`    |                                             | `string`                                                    | `undefined`   |
| `xl`       | `xl`       |                                             | `boolean`                                                   | `false`       |

## Toggle Buttons

Unlike other buttons, Toggle Buttons also have a selected or "on" state, which is set using the <code>selected</code> prop.
When multiple Toggle Buttons are adjacent siblings, the <code>border-radius</code> is adjusted automatically to make them
appear as a group. They can act as radio buttons when given a <code>value</code> and placed inside a Toggle Button Group (see next section).

<!-- #region toggle-buttons -->
<section class="mds">
  <div class="mt-5 grid grid-cols-1 lg:grid-cols-2">
    <div>
      <strong>Single Button</strong>
      <div class="my-20">
        <mx-toggle-button  icon="ph-microphone-slash" :selected="isMuted" @click="isMuted = !isMuted" />
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="my-20">
        <mx-toggle-button  icon="ph-heart" disabled />
      </div>
    </div>
    <div>
      <strong>Multiple Buttons</strong>
      <div class="flex my-20">
        <mx-toggle-button icon="ph-text-bolder" :selected="hasStyle('bold')" @click="toggleStyle('bold')" />
        <mx-toggle-button icon="ph-text-italic" :selected="hasStyle('italic')" @click="toggleStyle('italic')" />
        <mx-toggle-button icon="ph-text-underline" :selected="hasStyle('underline')" @click="toggleStyle('underline')" />
      </div>
      <p class="my-20">Selected: <code>{{ JSON.stringify(textStyles) }}</code></p>
    </div>
  </div>
  </div>
</section>
<!-- #endregion toggle-buttons -->

<<< @/vuepress/components/buttons.md#toggle-buttons

### Toggle Button Properties

| Property   | Attribute  | Description                            | Type      | Default     |
| ---------- | ---------- | -------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` |                                        | `boolean` | `false`     |
| `icon`     | `icon`     |                                        | `string`  | `undefined` |
| `selected` | `selected` |                                        | `boolean` | `false`     |
| `value`    | `value`    | Only used inside a toggle button group | `any`     | `undefined` |

## Toggle Button Groups

A Toggle Button Group provides a convenient way to bind a group of toggle buttons to a single value, much like a radio button group.
However, unlike radio buttons, Toggle Buttons can be deselected. When a Toggle Button is clicked, the resulting value is
emitted via a custom <code>mxInput</code> event.

<!-- #region toggle-button-groups -->
<section class="mds">
  <div class="mt-5 grid grid-cols-1 lg:grid-cols-2">
    <div>
      <strong>Enabled</strong>
      <div class="my-20">
        <mx-toggle-button-group :value="textAlign" @mxInput="e => textAlign = e.detail">
          <mx-toggle-button icon="ph-text-align-left" value="left" />
          <mx-toggle-button icon="ph-text-align-center" value="center" />
          <mx-toggle-button icon="ph-text-align-right" value="right" />
        </mx-toggle-button-group>
      </div>
      <p class="my-20">Selected: <code>{{ JSON.stringify(textAlign) }}</code></p>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="my-20">
        <mx-toggle-button-group :value="textAlign" @mxInput="e => textAlign = e.detail">
          <mx-toggle-button icon="ph-text-align-left" value="left" disabled />
          <mx-toggle-button icon="ph-text-align-center" value="center" disabled />
          <mx-toggle-button icon="ph-text-align-right" value="right" disabled />
        </mx-toggle-button-group>
      </div>
    </div>
  </div>
  </div>
</section>
<!-- #endregion toggle-button-groups -->

<<< @/vuepress/components/buttons.md#toggle-button-groups

### Toggle Button Group Properties

| Property | Attribute | Description | Type  | Default     |
| -------- | --------- | ----------- | ----- | ----------- |
| `value`  | `value`   |             | `any` | `undefined` |

### Toggle Button Group Events

| Event     | Description                             | Type               |
| --------- | --------------------------------------- | ------------------ |
| `mxInput` | Emits the updated value as event.detail | `CustomEvent<any>` |

## CSS Variables

<<< @/src/tailwind/variables/index.scss#buttons

<script>
export default {
  data() {
    return {
      isMuted: false,
      textAlign: 'left',
      textStyles: ['underline', 'italic']
    }
  },
  methods: {
    hasStyle(value) {
      return this.textStyles.includes(value)
    },
    toggleStyle(value) {
      if (this.textStyles.includes(value)) this.textStyles = this.textStyles.filter(s => s !== value)
      else this.textStyles = [ ...this.textStyles, value]
    },
  }
}
</script>
