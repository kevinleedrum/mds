# Selection Controls

Selection controls consist of checkboxes, radios, toggles, and range selectors.

## Checkboxes

<section class="mds">
  <div class="max-w-sm my-12 grid grid-flow-row grid-cols-2 gap-12">
    <!-- #region checkboxes -->
    <mc-checkbox label-name="Label" checked />
    <mc-checkbox label-name="Label" />
    <mc-checkbox label-name="Disabled" disabled />
    <mc-checkbox label-name="Disabled" checked disabled />
    <mc-checkbox label-name="Indeterminate" indeterminate />
    <mc-checkbox label-name="Indeterminate" indeterminate disabled />
    <mc-checkbox label-name="Text label that wraps multiple lines" />
    <!-- #endregion checkboxes -->
  </div>
</section>

<<<@/vuepress/components/selection-controls.md#checkboxes

## mc-checkbox Properties

<ComponentReadme component="mc-checkbox" />

## Radio Buttons

<section class="mds">
  <div class="max-w-sm my-12 grid grid-flow-row grid-cols-2 gap-12">
    <!-- #region radio-buttons -->
    <mc-radio name="rad" label-name="Label" checked />
    <mc-radio name="rad" label-name="Label" />
    <mc-radio label-name="Disabled" disabled />
    <mc-radio label-name="Disabled" checked disabled />
    <mc-radio name="rad" label-name="Text label that wraps multiple lines" />
    <!-- #endregion radio-buttons -->
  </div>
</section>

<<<@/vuepress/components/selection-controls.md#radio-buttons

## mc-radio Properties

<ComponentReadme component="mc-radio" />

## Deprecated components ⚠️

### Checkboxes

<!-- #region checkboxes-dep -->
<div class="mds">
  <div class="my-12 grid grid-flow-row grid-cols-2 gap-4">
    <div><mx-checkbox name="foo" label-name="Premier" checked /></div>
    <div><mx-checkbox name="foo" label-name="W Collection" /></div>
    <div><mx-checkbox name="foo" label-name="Equestrian" /></div>
    <div><mx-checkbox name="foo" label-name="Darkness falls across the land, The midnight hour is close at hand" /></div>
    <div><mx-checkbox name="foo" disabled label-name="Disabled" /></div>
    <div><mx-checkbox name="foo" checked disabled label-name="Disabled" /></div>
    <div><mx-checkbox name="foo" indeterminate label-name="Indeterminate" /></div>
    <div><mx-checkbox name="foo" indeterminate disabled label-name="Indeterminate" /></div>
  </div>
</div>
<!-- #endregion checkboxes-dep -->

<<< @/vuepress/components/selection-controls.md#checkboxes

#### Checkbox Properties

| Property        | Attribute       | Description                                                                   | Type      | Default     |
| --------------- | --------------- | ----------------------------------------------------------------------------- | --------- | ----------- |
| `checked`       | `checked`       |                                                                               | `boolean` | `false`     |
| `disabled`      | `disabled`      |                                                                               | `boolean` | `false`     |
| `elAriaLabel`   | `el-aria-label` | The aria-label attribute for the inner input element.                         | `string`  | `undefined` |
| `hideLabel`     | `hide-label`    | Hide the label text visually, but still make it accessible for screen readers | `boolean` | `false`     |
| `indeterminate` | `indeterminate` |                                                                               | `boolean` | `false`     |
| `labelClass`    | `label-class`   |                                                                               | `string`  | `''`        |
| `labelLeft`     | `label-left`    |                                                                               | `boolean` | `false`     |
| `labelName`     | `label-name`    |                                                                               | `string`  | `''`        |
| `name`          | `name`          |                                                                               | `string`  | `''`        |
| `value`         | `value`         |                                                                               | `string`  | `''`        |

### Radio Buttons

<!-- #region radio-buttons-dep -->
<div class="mds">
  <div class="my-12 grid grid-flow-row grid-cols-2 gap-4">
    <div><mx-radio name="foo" label-name="Premier" /></div>
    <div><mx-radio name="foo" label-name="W Collection" /></div>
    <div><mx-radio name="foo" label-name="Equestrian" /></div>
    <div><mx-radio name="foo" label-name="Darkness falls across the land, The midnight hour is close at hand" /></div>
    <div><mx-radio name="foo" disabled label-name="Disabled" /></div>
    <div><mx-radio name="foo" disabled checked label-name="Disabled" /></div>
  </div>
</div>
<!-- #endregion radio-buttons-dep -->

<<< @/vuepress/components/selection-controls.md#radio-buttons

#### Radio Button Properties

| Property     | Attribute     | Description | Type      | Default |
| ------------ | ------------- | ----------- | --------- | ------- |
| `checked`    | `checked`     |             | `boolean` | `false` |
| `disabled`   | `disabled`    |             | `boolean` | `false` |
| `labelClass` | `label-class` |             | `string`  | `''`    |
| `labelName`  | `label-name`  |             | `string`  | `''`    |
| `name`       | `name`        |             | `string`  | `''`    |
| `value`      | `value`       |             | `string`  | `''`    |

### Switches

<!-- #region switches-dep -->
<div class="mds">
  <div class="my-12 grid grid-flow-row grid-cols-2 gap-4">
    <div><mx-switch name="foo" label-name="Premier" /></div>
    <div><mx-switch name="foo" label-name="W Collection" /></div>
    <div><mx-switch name="foo" label-name="Equestrian" /></div>
    <div><mx-switch name="foo" label-name="Darkness falls across the land, The midnight hour is close at hand" /></div>
    <div><mx-switch name="foo" disabled label-name="Disabled" /></div>
    <div><mx-switch name="foo" disabled checked label-name="Disabled" /></div>
  </div>
</div>
<!-- #endregion switches-dep -->

<<< @/vuepress/components/selection-controls.md#switches

#### Switch Properties

| Property     | Attribute     | Description | Type      | Default |
| ------------ | ------------- | ----------- | --------- | ------- |
| `checked`    | `checked`     |             | `boolean` | `false` |
| `disabled`   | `disabled`    |             | `boolean` | `false` |
| `labelClass` | `label-class` |             | `string`  | `''`    |
| `labelName`  | `label-name`  |             | `string`  | `''`    |
| `name`       | `name`        |             | `string`  | `''`    |
| `value`      | `value`       |             | `string`  | `''`    |

## CSS Variables

<<< @/src/tailwind/variables/index.scss#selection-controls
