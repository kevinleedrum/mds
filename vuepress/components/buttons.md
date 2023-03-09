# Buttons

Buttons are used to indicate calls to actions (CTAs) that the user can take (e.g. save, delete, add, create). There are a variety of button types to create the desired level of emphasis and hierarchy when multiple actions can be taken.

## Primary Buttons

Contained buttons using the primary brandable color as a fill. Other than FAB, they have the highest level of emphasis. Commonly used at the top of page headers, within modals, and empty states. These are usually for the main action on a page. Avoid grouping multiple primary buttons together or using them for less important actions.

<!-- #region primary-buttons -->
<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2">
    <div>
      <strong>Enabled</strong>
      <div class="my-20">
        <mx-button>button</mx-button>
      </div>
      <div class="my-20">
        <mx-button xl>XL button</mx-button>
      </div>
       <div class="my-20">
        <mx-button href="https://google.com" target="_blank">Button as Link</mx-button>
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="my-20">
        <mx-button disabled>Disabled button</mx-button>
      </div>
      <div class="my-20">
        <mx-button disabled xl>XL Disabled button</mx-button>
      </div>
       <div class="my-20">
        <mx-button disabled href="https://google.com" target="_blank">Button as Link Disabled</mx-button>
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
  </div>
</section>
<!-- #endregion primary-buttons -->

<<< @/vuepress/components/buttons.md#primary-buttons

## Secondary Buttons

Outlined buttons without a fill. These are less emphasized than primary contained buttons but more so than a text button. Often grouped with primary buttons in page headers and modals. Use in place of a primary button whenever an action with less emphasis is appropriate.

<!-- #region secondary-buttons -->
<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2">
    <div>
      <strong>Enabled</strong>
      <div class="my-20">
        <mx-button btn-type="outlined">Outlined button</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="outlined" xl>XL outlined button</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="outlined" href="https://google.com" target="_blank">Button as Link</mx-button>
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="my-20">
        <mx-button btn-type="outlined" disabled>Outlined button</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="outlined" disabled xl>XL outlined Disabled</mx-button>
      </div>
      <div class="my-20">
        <mx-button disabled btn-type="outlined" href="https://google.com" target="_blank">Button as Link Disabled</mx-button>
      </div>
    </div>
  </div>
  <div>
    <strong>Full</strong>
    <div class="my-20">
      <mx-button btn-type="outlined" full>Outlined button</mx-button>
    </div>
    <div class="my-20">
      <mx-button btn-type="outlined" full xl>XL Outlined button</mx-button>
    </div>
  </div>
</section>
<!-- #endregion secondary-buttons -->

<<< @/vuepress/components/buttons.md#secondary-buttons

## Text/Tertiary Buttons

Text buttons in the primary brandable color without a stroke or fill. These are lower emphasis and multiple can be grouped together or appear in the same container (e.g. tables, simple dialog).

<!-- #region text-buttons -->
<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2">
    <div>
      <strong>Enabled</strong>
      <div class="my-20">
        <mx-button btn-type="text">button</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="text" icon="ph-apple-logo">button with icon</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="text" icon="ph-apple-logo" dropdown>Icon with Dropdown</mx-button>
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="my-20">
        <mx-button btn-type="text" disabled>disabled</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="text" icon="ph-apple-logo" disabled>button with icon</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="text" icon="ph-apple-logo" dropdown disabled>Disabled</mx-button>
      </div>
    </div>
  </div>
</section>
<!-- #endregion text-buttons -->

<<< @/vuepress/components/buttons.md#text-buttons

## Simple Buttons

Pill shaped buttons that can also have a leading or trailing icon. These are lower emphasis buttons for less commonly used actions. They are often used for filters or appear within cards.

<!-- #region simple-buttons -->
<section class="mds">
  <div class="grid grid-cols-1 lg:grid-cols-2">
    <div>
      <strong>Enabled</strong>
      <div class="my-20">
        <mx-button btn-type="simple">Button</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="simple" icon="ph-apple-logo">Button with Icon</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="simple" dropdown>Dropdown</mx-button>
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="my-20">
        <mx-button btn-type="simple" disabled>Disabled</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="simple" icon="ph-apple-logo" disabled>Button with Icon</mx-button>
      </div>
      <div class="my-20">
        <mx-button btn-type="simple" dropdown disabled>Disabled</mx-button>
      </div>
    </div>
  </div>
</section>
<!-- #endregion simple-buttons -->

<<< @/vuepress/components/buttons.md#simple-buttons

### Button Properties

| Property      | Attribute       | Description                                            | Type                                                          | Default       |
| ------------- | --------------- | ------------------------------------------------------ | ------------------------------------------------------------- | ------------- |
| `btnType`     | `btn-type`      |                                                        | `"action" \| "contained" \| "outlined" \| "simple" \| "text"` | `'contained'` |
| `disabled`    | `disabled`      |                                                        | `boolean`                                                     | `false`       |
| `dropdown`    | `dropdown`      | Show chevron icon                                      | `boolean`                                                     | `false`       |
| `elAriaLabel` | `el-aria-label` | The aria-label attribute for the inner button element. | `string`                                                      | `undefined`   |
| `form`        | `form`          |                                                        | `string`                                                      | `undefined`   |
| `formaction`  | `formaction`    |                                                        | `string`                                                      | `undefined`   |
| `full`        | `full`          | Sets display to flex instead of inline-flex            | `boolean`                                                     | `false`       |
| `href`        | `href`          | Create button as link                                  | `string`                                                      | `undefined`   |
| `icon`        | `icon`          | Class name of icon                                     | `string`                                                      | `undefined`   |
| `target`      | `target`        | Only for link buttons                                  | `string`                                                      | `undefined`   |
| `type`        | `type`          |                                                        | `"button" \| "reset" \| "submit"`                             | `'button'`    |
| `value`       | `value`         |                                                        | `string`                                                      | `undefined`   |
| `xl`          | `xl`            |                                                        | `boolean`                                                     | `false`       |

## Icon Buttons

Icon buttons are round buttons that only contain an icon. The icon can be set three different ways:

- the class name of an icon in the icon font library (i.e. [Phosphor Icons](/getting-started.html#phosphor-icons)) via the `icon` prop,
- an SVG passed into the default slot,
- or one of the built-in elevated chevron icons via the `chevron-dropdown`, `chevron-left`, and `chevron-right` props.

<!-- #region icon-buttons -->
<section class="mds">
  <div class="mt-5">
    <div>
      <div class="flex my-20 items-center">
        <mx-icon-button icon="ph-thumbs-up" el-aria-label="Like" />
        <mx-icon-button icon="ph-heart" el-aria-label="Fave" />
        <mx-icon-button icon="mds-x" el-aria-label="Close" />
        <mx-icon-button el-aria-label="OK">
          <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1 7l4.5 4.5L14 3" stroke="currentColor" stroke-linecap="square"></path></svg>
        </mx-icon-button>
        <mx-icon-button chevron-down el-aria-label="Down" />
        <mx-icon-button chevron-left el-aria-label="Left" />
        <mx-icon-button chevron-right el-aria-label="Right" />
        <mx-icon-button chevron-up el-aria-label="Up" />
        <mx-icon-button icon="ph-link" href="/" el-aria-label="Link" />
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="flex my-20 items-center">
        <mx-icon-button icon="ph-thumbs-up" disabled el-aria-label="Like" />
        <mx-icon-button icon="ph-heart" disabled el-aria-label="Fave" />
        <mx-icon-button icon="mds-x" disabled el-aria-label="Close" />
        <mx-icon-button disabled el-aria-label="OK">
          <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1 7l4.5 4.5L14 3" stroke="currentColor" stroke-linecap="square"></path></svg>
        </mx-icon-button>
        <mx-icon-button chevron-down disabled el-aria-label="Down" />
        <mx-icon-button chevron-left disabled el-aria-label="Left" />
        <mx-icon-button chevron-right disabled el-aria-label="Right" />
        <mx-icon-button chevron-up disabled el-aria-label="Up" />
        <mx-icon-button icon="ph-link" href="/" disabled el-aria-label="Link" />
      </div>
    </div>
  </div>
</section>
<!-- #endregion icon-buttons -->

<<< @/vuepress/components/buttons.md#icon-buttons

### Icon Button Properties

| Property       | Attribute       | Description                                            | Type                              | Default     |
| -------------- | --------------- | ------------------------------------------------------ | --------------------------------- | ----------- |
| `chevronDown`  | `chevron-down`  | Show downward chevron icon                             | `boolean`                         | `false`     |
| `chevronLeft`  | `chevron-left`  | Show left-pointing chevron icon                        | `boolean`                         | `false`     |
| `chevronRight` | `chevron-right` | Show right-pointing chevron icon                       | `boolean`                         | `false`     |
| `chevronUp`    | `chevron-up`    | Show upward chevron icon                               | `boolean`                         | `false`     |
| `disabled`     | `disabled`      |                                                        | `boolean`                         | `false`     |
| `elAriaLabel`  | `el-aria-label` | The aria-label attribute for the inner button element. | `string`                          | `undefined` |
| `form`         | `form`          |                                                        | `string`                          | `undefined` |
| `formaction`   | `formaction`    |                                                        | `string`                          | `undefined` |
| `href`         | `href`          | Create button as link                                  | `string`                          | `undefined` |
| `icon`         | `icon`          | Class name of icon (for icon font)                     | `string`                          | `undefined` |
| `target`       | `target`        | Only for link buttons                                  | `string`                          | `undefined` |
| `type`         | `type`          |                                                        | `"button" \| "reset" \| "submit"` | `'button'`  |
| `value`        | `value`         |                                                        | `string`                          | `undefined` |

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
        <mx-toggle-button  icon="ph-microphone-slash" :selected="isMuted" el-aria-label="Mute" @click="isMuted = !isMuted" />
      </div>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="my-20">
        <mx-toggle-button icon="ph-heart" disabled el-aria-label="Fave" />
      </div>
    </div>
    <div>
      <strong>Multiple Buttons</strong>
      <div class="flex my-20">
        <mx-toggle-button icon="ph-text-bolder" :selected="hasStyle('bold')" @click="toggleStyle('bold')" el-aria-label="Bold" />
        <mx-toggle-button icon="ph-text-italic" :selected="hasStyle('italic')" @click="toggleStyle('italic')" el-aria-label="Italic" />
        <mx-toggle-button icon="ph-text-underline" :selected="hasStyle('underline')" @click="toggleStyle('underline')" el-aria-label="Underline" />
      </div>
      <p class="my-20">Selected: <code>{{ JSON.stringify(textStyles) }}</code></p>
    </div>
  </div>
  </div>
</section>
<!-- #endregion toggle-buttons -->

<<< @/vuepress/components/buttons.md#toggle-buttons

### Toggle Button Properties

| Property      | Attribute       | Description                                            | Type      | Default     |
| ------------- | --------------- | ------------------------------------------------------ | --------- | ----------- |
| `disabled`    | `disabled`      |                                                        | `boolean` | `false`     |
| `elAriaLabel` | `el-aria-label` | The aria-label attribute for the inner button element. | `string`  | `undefined` |
| `icon`        | `icon`          |                                                        | `string`  | `undefined` |
| `selected`    | `selected`      |                                                        | `boolean` | `false`     |
| `value`       | `value`         | Only used inside a toggle button group                 | `any`     | `undefined` |

## Toggle Button Groups

A Toggle Button Group provides a convenient way to bind a group of toggle buttons to a single value, much like a radio button group.
However, unlike radio buttons, Toggle Buttons can be deselected. When a Toggle Button is clicked, the resulting value is
emitted via a custom <code>mxInput</code> event.

There is a `slot` available for SVG images or plain text as well. See Example.

<!-- #region toggle-button-groups -->
<section class="mds">
  <div class="mt-5 grid grid-cols-1 lg:grid-cols-3">
    <div>
      <strong>Enabled</strong>
      <div class="my-20">
        <mx-toggle-button-group :value="textAlign" @mxInput="e => textAlign = e.detail">
          <mx-toggle-button icon="ph-text-align-left" el-aria-label="Align left" value="left" />
          <mx-toggle-button icon="ph-text-align-center" el-aria-label="Align center" value="center" />
          <mx-toggle-button icon="ph-text-align-right" el-aria-label="Align right" value="right" />
        </mx-toggle-button-group>
      </div>
      <p class="my-20">Selected: <code>{{ JSON.stringify(textAlign) }}</code></p>
    </div>
    <div>
      <strong>Disabled</strong>
      <div class="my-20">
        <mx-toggle-button-group :value="textAlign" @mxInput="e => textAlign = e.detail">
          <mx-toggle-button icon="ph-text-align-left" value="left" el-aria-label="Align left" disabled />
          <mx-toggle-button icon="ph-text-align-center" value="center" el-aria-label="Align center" disabled />
          <mx-toggle-button icon="ph-text-align-right" value="right" el-aria-label="Align right" disabled />
        </mx-toggle-button-group>
      </div>
    </div>
    <div>
      <strong>Text Using Default Slot</strong>
      <div class="my-20">
        <mx-toggle-button-group :value="textAlign" @mxInput="e => textAlign = e.detail">
          <mx-toggle-button value="left" el-aria-label="Align left">
            <div class="caption1">Left</div>
          </mx-toggle-button>
          <mx-toggle-button value="center" el-aria-label="Align center">
            <div class="caption1">Center</div>
          </mx-toggle-button>
          <mx-toggle-button value="right" el-aria-label="Align right">
            <div class="caption1">Right</div>
          </mx-toggle-button>
        </mx-toggle-button-group>
      </div>
    </div>
  </div>
</section>
<!-- #endregion toggle-button-groups -->

<<< @/vuepress/components/buttons.md#toggle-button-groups

### Toggle Button Group Properties

| Property   | Attribute  | Description                                                          | Type      | Default     |
| ---------- | ---------- | -------------------------------------------------------------------- | --------- | ----------- |
| `required` | `required` | Set to `true` to prevent deselecting once a selection has been made. | `boolean` | `false`     |
| `value`    | `value`    |                                                                      | `any`     | `undefined` |

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
